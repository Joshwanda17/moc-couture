const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Starting Prisma seed...');

  // 1. Create Default Categories
  const categories = ['Archive Collection', 'Accessories', 'Dresses', 'Tops', 'Skirts', 'Resort'];
  for (const catName of categories) {
    await prisma.category.upsert({
      where: { name: catName },
      update: {},
      create: { name: catName }
    });
  }

  // Fetch created categories to map IDs
  const dbCats = await prisma.category.findMany();
  const getCatId = (name) => dbCats.find(c => c.name === name)?.id;

  // 2. Create Collections
  const summerBloom = await prisma.collection.upsert({
    where: { slug: 'summer-bloom' },
    update: {},
    create: {
      name: "Summer Bloom",
      slug: "summer-bloom",
      short_description: "A celebration of sunshine and handcrafted elegance.",
      story: "The Summer Bloom collection combines lightweight crochet patterns with soft fabrics inspired by nature's colors and textures. Each piece is designed to flow seamlessly from day to night.",
      cover_image: "/images/collections/Crochet Blossom dress 🍀 💚.jpg",
      hero_image: "/images/collections/5 Crochet Butterfly Shrug Free Patterns.jpg",
      season: "Summer 2024",
      theme: "Floral Elegance",
      status: "Published",
      featured: true,
      media: {
        create: [
          { url: '/images/collections/Butterfly Shawl, crocheted.webp', caption: 'Color Palette', type: 'inspiration' },
          { url: '/images/collections/Crochê é Moda Sempre.webp', caption: 'Texture Detail', type: 'inspiration' },
          { url: '/images/collections/974114594421429745.jpg', type: 'gallery' },
          { url: '/images/collections/Simple Maxi Mesh Dress Tutorial _ How To Crochet a Maxi Dress Beginner Friendly Guide.jpg', type: 'gallery' },
          { url: '/images/collections/720787115415847594.jpg', type: 'gallery' }
        ]
      }
    }
  });

  const heritageCore = await prisma.collection.upsert({
    where: { slug: 'heritage-core' },
    update: {},
    create: {
      name: "Heritage Core",
      slug: "heritage-core",
      short_description: "Returning to the roots of traditional handwoven craft.",
      story: "Our heritage core collection strips away the noise to focus purely on technique. Using only undyed, natural yarns, we explore complex stitches that have been passed down through generations.",
      cover_image: "/images/collections/813744226464145872.webp",
      hero_image: "/images/collections/crochet.jpg",
      season: "Core Collection",
      theme: "Minimalist Craft",
      status: "Published",
      featured: false
    }
  });

  const midnightLace = await prisma.collection.upsert({
    where: { slug: 'midnight-lace' },
    update: {},
    create: {
      name: "Midnight Lace",
      slug: "midnight-lace",
      short_description: "Dark, moody, and sophisticated evening wear.",
      story: "Midnight Lace explores the elegance of shadows. Intricate openwork patterns create a striking contrast against the skin, making every piece perfect for evening events and sophisticated gatherings.",
      cover_image: "/images/crochet-business/490f108b6ffcb2bfe511fdb9228c5750.jpg",
      hero_image: "/images/crochet-business/fae1465d3bd3a9ada3daaad67e7c3072.jpg",
      season: "Fall 2024",
      theme: "Evening Elegance",
      status: "Published",
      featured: true
    }
  });

  const etherealWhites = await prisma.collection.upsert({
    where: { slug: 'ethereal-whites' },
    update: {},
    create: {
      name: "Ethereal Whites",
      slug: "ethereal-whites",
      short_description: "Pure, pristine, and bridal-inspired creations.",
      story: "A collection dedicated purely to the beauty of white yarn. Perfect for beach weddings, summer parties, and moments when you want to look effortlessly angelic.",
      cover_image: "/images/crochet-business/07ee90c84a60e432972c47babc17ed8c.jpg",
      hero_image: "/images/crochet-business/48eca36e3c911c9cda0dbbc0b6e12815.jpg",
      season: "Bridal & Resort",
      theme: "Purity",
      status: "Published",
      featured: false
    }
  });

  // 3. Create Products
  const products = [
    // Original Default
    {
      name: "The Ethereal Vest",
      slug: "the-ethereal-vest",
      description: "Hand-crocheted over a period of 42 hours, the Ethereal Vest is a testament to the meditative rhythm of slow craft. Each stitch is intentionally placed to create a structural lace that breathes with the body.",
      price: 840.00,
      category_id: getCatId("Archive Collection"),
      main_image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_ZEBopkf7VKAFHEv2AmEPwrWNJDo1g48gdffR8-HcwuUgQdU2vhGuEVoKFHRBkU3eA31bYiAlSKKrLNdo7W3xChyEkkTovs0XvCq0zBpwdDmfkYncx-UArfhiybJ1_c0wjsCPwAliMhlGSeyDTpaA7Nrz9ly11oytQiPXmQhpBCMOEWKzKh3hnFHY92d4q0_kpvUHcUXkF7uvwJ0aQY9ut5G0wC0F5fAuRfs6JVOl12445F7-hFBXxxM9pdl1CE-i0npEezFk5Vo",
      featured: true,
      status: "Made to Order"
    },
    {
      name: "The Solstice Shawl",
      slug: "the-solstice-shawl",
      description: "A lightweight crochet shawl in a deep terracotta tone. The sunlight creates a beautiful shadow pattern of the lace on the wall. The style is editorial and luxurious, emphasizing high-quality natural fibers.",
      price: 320.00,
      category_id: getCatId("Archive Collection"),
      main_image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6lDxeJclPiP9jiV9yqeoXhgDzogD_tllRnC1Ji8cyd6fAHHS5yzqgCmke0cOLaBi79PUNfrmg05lT49-G_mKGLk3EN46-uUp6krQBIzeXor-wiG2jp66b32W5LUvH4O9Xp97nIBb0EuYPX4wlECJj6HRmedcSEzW9JsO2wsgk_ZgNblYZkkS3Z-YTrrUBWXcTG5IzkFTbxyCU581IPgSOeccAHterE4ZkJj17_ITj3YwHDp8e3pfH5rPieCjRjTLFXRdio51r_6g",
      featured: true,
      status: "Available"
    },
    {
      name: "Atelier Tote",
      slug: "atelier-tote",
      description: "An artisanal crochet tote bag with a complex geometric weave pattern. The handle is made of rolled silk, showing a high level of detail and luxury.",
      price: 190.00,
      category_id: getCatId("Accessories"),
      main_image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3a92JJCDuWw-mjFVK3l18SIwSnvlyTdzvxfwhz4-Vnv3cjX6eelGO543D6HWWed-06A6ydDC2hR4BTTHtAyWfCLwRSiY7aGyL83F1UywwdGLdAP99gwzFmJl11JCDRnl2sphga8Y0MyqZx29q7gEfC4W6eUE8P-r1Rrg3ZrgTUdPG7wl7nGaRi6ElsLPXd6DUIVWwbTjM_j5DTnYyZ1qz8L4n4I7pwfqCv96PFJ4B54fRsuCrkCb6SlGDLeRcWi-_6cqo864R4Xc",
      featured: true,
      status: "Available"
    },
    {
      name: "Silk Gossamer Gloves",
      slug: "silk-gossamer-gloves",
      description: "Hand-crocheted gloves in a delicate silk blend. The fine texture of the work is emphasized in this high-end fashion piece.",
      price: 145.00,
      category_id: getCatId("Accessories"),
      main_image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAlL-XqL3jkJeps8iLhkXS95GYan5F3yTK0wLt0Kmx7o2AEqsCUUphkOQtwleN_tn-Qo_g0iKSSJBlO6zBYVexJ-ZVFgePhLKR_zZb6sXdSRCPMV08ED7LaAU1jSYW4JnQUiCexfvMex1vdh2177ymdVLMpbtgW95psyfsk8WTdAVi-b_97WE5UVTWtMhZxi-PBzqHaWJ7c2_0qcD_gHjaXT7oNS-SH7rJeUvTsCN4SFKjvQnHHDm08gHAnjQC9qdDS0Na_nFQs1J8",
      featured: true,
      status: "Made to Order"
    },
    // Collection Products
    {
      name: "Emerald Blossom Maxi",
      slug: "emerald-blossom-maxi",
      description: "A stunning floor-length dress featuring intricate floral motifs.",
      price: 150.00,
      category_id: getCatId("Dresses"),
      main_image: "/images/crochet-business/Crochet Blossom dress 🍀 💚.jpg",
      status: "Available",
      collection_id: summerBloom.id
    },
    {
      name: "Butterfly Motif Shrug",
      slug: "butterfly-motif-shrug",
      description: "Lightweight shrug perfect for summer evenings.",
      price: 65.00,
      category_id: getCatId("Accessories"),
      main_image: "/images/crochet-business/5 Crochet Butterfly Shrug Free Patterns.jpg",
      status: "Available",
      collection_id: summerBloom.id
    },
    {
      name: "Golden Heritage Top",
      slug: "golden-heritage-top",
      description: "A beautifully textured top made with un-dyed heritage yarn.",
      price: 85.00,
      category_id: getCatId("Tops"),
      main_image: "/images/crochet-business/813744226464145872.webp",
      status: "Made to Order",
      collection_id: heritageCore.id
    },
    {
      name: "Classic Neutral Dress",
      slug: "classic-neutral-dress",
      description: "The core piece of our heritage collection.",
      price: 180.00,
      category_id: getCatId("Dresses"),
      main_image: "/images/crochet-business/crochet.jpg",
      status: "Available",
      collection_id: heritageCore.id
    },
    {
      name: "Obsidian Lace Gown",
      slug: "obsidian-lace-gown",
      description: "Breathtaking dark lace gown for formal events.",
      price: 250.00,
      category_id: getCatId("Dresses"),
      main_image: "/images/crochet-business/fae1465d3bd3a9ada3daaad67e7c3072.jpg",
      status: "Made to Order",
      collection_id: midnightLace.id
    },
    {
      name: "Shadow Mini Skirt",
      slug: "shadow-mini-skirt",
      description: "A chic dark crochet mini skirt.",
      price: 90.00,
      category_id: getCatId("Skirts"),
      main_image: "/images/crochet-business/eafc91400245977140fa871c997a628b.jpg",
      status: "Available",
      collection_id: midnightLace.id
    },
    {
      name: "Pearl Beach Coverup",
      slug: "pearl-beach-coverup",
      description: "Elegant white coverup for luxury resort wear.",
      price: 120.00,
      category_id: getCatId("Resort"),
      main_image: "/images/crochet-business/48eca36e3c911c9cda0dbbc0b6e12815.jpg",
      status: "Available",
      collection_id: etherealWhites.id
    },
    {
      name: "Angel Sleeve Top",
      slug: "angel-sleeve-top",
      description: "Delicate white top with dramatic sleeves.",
      price: 75.00,
      category_id: getCatId("Tops"),
      main_image: "/images/crochet-business/07ee90c84a60e432972c47babc17ed8c.jpg",
      status: "Available",
      collection_id: etherealWhites.id
    }
  ];

  for (const p of products) {
    const createdProduct = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: p.price,
        category_id: p.category_id,
        main_image: p.main_image,
        featured: p.featured || false,
        status: p.status,
        collection_id: p.collection_id
      }
    });

    if (p.collection_id) {
      // Create collection_products link if not exists
      const link = await prisma.collectionProduct.findFirst({
        where: { collection_id: p.collection_id, product_id: createdProduct.id }
      });
      if (!link) {
        await prisma.collectionProduct.create({
          data: { collection_id: p.collection_id, product_id: createdProduct.id }
        });
      }
    }
  }

  console.log('Database seeded successfully.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
