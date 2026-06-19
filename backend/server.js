const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const multer = require('multer');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'moc_couture_secret_123';

const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
});
const upload = multer({ storage: storage });

// Basic Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'MoC Couture API is running' });
});

// --- AUTH ROUTES ---

// Register
app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        password_hash: passwordHash,
        role: 'admin'
      }
    });

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- UPLOAD ROUTE ---
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image provided' });
  }
  const imageUrl = `/uploads/${req.file.filename}`;
  res.status(200).json({ url: imageUrl });
});

// --- CATEGORIES ROUTES ---
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/categories', async (req, res) => {
  const { name } = req.body;
  try {
    const category = await prisma.category.create({ data: { name } });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/categories/:id', async (req, res) => {
  try {
    await prisma.category.delete({ where: { id: req.params.id } });
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- PRODUCT ROUTES ---
app.get('/api/products', async (req, res) => {
  const { search, category, collection, availability } = req.query;
  
  let where = {};
  if (search) where.name = { contains: search, mode: 'insensitive' };
  if (category) where.category_id = category;
  if (collection) where.collection_id = collection;
  if (availability) where.availability = availability;

  try {
    const products = await prisma.product.findMany({
      where,
      orderBy: { created_at: 'desc' },
      include: {
        category: { select: { name: true } }
      }
    });

    const formattedProducts = products.map(p => ({
      ...p,
      category_name: p.category?.name || null,
      category: undefined
    }));
    
    res.json(formattedProducts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/products/:slug', async (req, res) => {
  try {
    const product = await prisma.product.findFirst({
      where: {
        OR: [
          { slug: req.params.slug },
          { id: req.params.slug }
        ]
      },
      include: {
        category: { select: { name: true } },
        images: { orderBy: { sort_order: 'asc' } }
      }
    });

    if (!product) return res.status(404).json({ error: 'Product not found' });
    
    const formattedProduct = {
      ...product,
      category_name: product.category?.name || null,
      category: undefined
    };

    res.json(formattedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/products', async (req, res) => {
  const { name, slug, description, story, materials, dimensions, price, category_id, main_image, featured, status, availability, collection_id, images } = req.body;
  
  try {
    const product = await prisma.product.create({
      data: {
        name,
        slug: slug || undefined,
        description,
        story,
        materials,
        dimensions,
        price,
        category_id,
        main_image,
        featured: featured ? true : false,
        status: status || 'Published',
        availability: availability || 'Available',
        collection_id,
        images: images && Array.isArray(images) ? {
          create: images.map((url, idx) => ({ image_url: url, sort_order: idx }))
        } : undefined
      }
    });
    
    res.status(201).json({ id: product.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/products/:id', async (req, res) => {
  const { name, slug, description, story, materials, dimensions, price, category_id, main_image, featured, status, availability, collection_id, images } = req.body;
  const id = req.params.id;
  
  try {
    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        story,
        materials,
        dimensions,
        price,
        category_id,
        main_image,
        featured: featured ? true : false,
        status,
        availability,
        collection_id,
      }
    });

    if (images && Array.isArray(images)) {
      await prisma.productImage.deleteMany({ where: { product_id: id } });
      await prisma.productImage.createMany({
        data: images.map((url, idx) => ({ product_id: id, image_url: url, sort_order: idx }))
      });
    }

    res.status(200).json({ id: product.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    await prisma.product.delete({ where: { id: req.params.id } });
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- COLLECTION ROUTES ---
app.get('/api/collections', async (req, res) => {
  try {
    const collections = await prisma.collection.findMany({
      include: {
        _count: {
          select: { collectionProducts: true }
        }
      }
    });

    const formattedCollections = collections.map(c => ({
      ...c,
      product_count: c._count.collectionProducts,
      _count: undefined
    }));

    res.json(formattedCollections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/collections/:slug', async (req, res) => {
  try {
    const collection = await prisma.collection.findUnique({
      where: { slug: req.params.slug },
      include: {
        collectionProducts: {
          include: { product: true }
        },
        media: true
      }
    });

    if (!collection) return res.status(404).json({ error: 'Collection not found' });
    
    const formattedCollection = {
      ...collection,
      products: collection.collectionProducts.map(cp => cp.product),
      collectionProducts: undefined
    };

    res.json(formattedCollection);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/collections', async (req, res) => {
  const { name, slug, short_description, story, cover_image, hero_image, season, theme, status, featured, product_ids } = req.body;
  
  try {
    const collection = await prisma.collection.create({
      data: {
        name,
        slug,
        short_description,
        story,
        cover_image,
        hero_image,
        season,
        theme,
        status,
        featured: featured ? true : false,
        collectionProducts: product_ids && Array.isArray(product_ids) ? {
          create: product_ids.map(id => ({ product_id: id }))
        } : undefined
      }
    });
    
    res.status(201).json({ id: collection.id, name: collection.name, slug: collection.slug, status: collection.status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/collections/:id', async (req, res) => {
  const { name, slug, short_description, story, cover_image, hero_image, season, theme, status, featured, product_ids } = req.body;
  const id = req.params.id;
  
  try {
    const collection = await prisma.collection.update({
      where: { id },
      data: {
        name,
        slug,
        short_description,
        story,
        cover_image,
        hero_image,
        season,
        theme,
        status,
        featured: featured ? true : false,
      }
    });

    if (product_ids && Array.isArray(product_ids)) {
      await prisma.collectionProduct.deleteMany({ where: { collection_id: id } });
      await prisma.collectionProduct.createMany({
        data: product_ids.map(pid => ({ collection_id: id, product_id: pid }))
      });
    }

    res.status(200).json({ id: collection.id, name: collection.name, slug: collection.slug, status: collection.status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/collections/:id', async (req, res) => {
  try {
    await prisma.collection.delete({ where: { id: req.params.id } });
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- LOOKBOOK ROUTES ---
app.get('/api/lookbooks', async (req, res) => {
  try {
    const lookbooks = await prisma.lookbook.findMany({
      orderBy: { created_at: 'desc' }
    });
    res.json(lookbooks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/lookbooks/:slug', async (req, res) => {
  try {
    const lookbook = await prisma.lookbook.findFirst({
      where: {
        OR: [
          { slug: req.params.slug },
          { id: req.params.slug }
        ]
      },
      include: {
        images: { orderBy: { sort_order: 'asc' } },
        products: {
          include: { product: true }
        }
      }
    });

    if (!lookbook) return res.status(404).json({ error: 'Lookbook not found' });
    
    const formattedLookbook = {
      ...lookbook,
      products: lookbook.products.map(lp => lp.product).filter(p => p !== null),
      lookbookProducts: undefined
    };

    res.json(formattedLookbook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/lookbooks', async (req, res) => {
  const { title, slug, description, story, cover_image, status, images, product_ids } = req.body;
  
  try {
    const lookbook = await prisma.lookbook.create({
      data: {
        title,
        slug: slug || undefined,
        description,
        story,
        cover_image,
        status: status || 'Draft',
        images: images && Array.isArray(images) ? {
          create: images.map((url, idx) => ({ image_url: url, sort_order: idx }))
        } : undefined,
        products: product_ids && Array.isArray(product_ids) ? {
          create: product_ids.map(pid => ({ product_id: pid }))
        } : undefined
      }
    });
    
    res.status(201).json({ id: lookbook.id, title: lookbook.title, slug: lookbook.slug });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/lookbooks/:id', async (req, res) => {
  const { title, slug, description, story, cover_image, status, images, product_ids } = req.body;
  const id = req.params.id;
  
  try {
    const lookbook = await prisma.lookbook.update({
      where: { id },
      data: {
        title,
        slug,
        description,
        story,
        cover_image,
        status,
      }
    });

    if (images && Array.isArray(images)) {
      await prisma.lookbookImage.deleteMany({ where: { lookbook_id: id } });
      await prisma.lookbookImage.createMany({
        data: images.map((url, idx) => ({ lookbook_id: id, image_url: url, sort_order: idx }))
      });
    }

    if (product_ids && Array.isArray(product_ids)) {
      await prisma.lookbookProduct.deleteMany({ where: { lookbook_id: id } });
      await prisma.lookbookProduct.createMany({
        data: product_ids.map(pid => ({ lookbook_id: id, product_id: pid }))
      });
    }

    res.status(200).json({ id: lookbook.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/lookbooks/:id', async (req, res) => {
  try {
    await prisma.lookbook.delete({ where: { id: req.params.id } });
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
