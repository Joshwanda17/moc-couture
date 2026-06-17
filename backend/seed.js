const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const crypto = require('crypto');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

const defaultProducts = [
  {
    name: "The Ethereal Vest",
    description: "Hand-crocheted over a period of 42 hours, the Ethereal Vest is a testament to the meditative rhythm of slow craft. Each stitch is intentionally placed to create a structural lace that breathes with the body.",
    price: 840.00,
    category: "Archive Collection",
    main_image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_ZEBopkf7VKAFHEv2AmEPwrWNJDo1g48gdffR8-HcwuUgQdU2vhGuEVoKFHRBkU3eA31bYiAlSKKrLNdo7W3xChyEkkTovs0XvCq0zBpwdDmfkYncx-UArfhiybJ1_c0wjsCPwAliMhlGSeyDTpaA7Nrz9ly11oytQiPXmQhpBCMOEWKzKh3hnFHY92d4q0_kpvUHcUXkF7uvwJ0aQY9ut5G0wC0F5fAuRfs6JVOl12445F7-hFBXxxM9pdl1CE-i0npEezFk5Vo",
    featured: 1,
    status: "Made to Order"
  },
  {
    name: "The Solstice Shawl",
    description: "A lightweight crochet shawl in a deep terracotta tone. The sunlight creates a beautiful shadow pattern of the lace on the wall. The style is editorial and luxurious, emphasizing high-quality natural fibers.",
    price: 320.00,
    category: "Archive Collection",
    main_image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6lDxeJclPiP9jiV9yqeoXhgDzogD_tllRnC1Ji8cyd6fAHHS5yzqgCmke0cOLaBi79PUNfrmg05lT49-G_mKGLk3EN46-uUp6krQBIzeXor-wiG2jp66b32W5LUvH4O9Xp97nIBb0EuYPX4wlECJj6HRmedcSEzW9JsO2wsgk_ZgNblYZkkS3Z-YTrrUBWXcTG5IzkFTbxyCU581IPgSOeccAHterE4ZkJj17_ITj3YwHDp8e3pfH5rPieCjRjTLFXRdio51r_6g",
    featured: 1,
    status: "Available"
  },
  {
    name: "Atelier Tote",
    description: "An artisanal crochet tote bag with a complex geometric weave pattern. The handle is made of rolled silk, showing a high level of detail and luxury.",
    price: 190.00,
    category: "Accessories",
    main_image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3a92JJCDuWw-mjFVK3l18SIwSnvlyTdzvxfwhz4-Vnv3cjX6eelGO543D6HWWed-06A6ydDC2hR4BTTHtAyWfCLwRSiY7aGyL83F1UywwdGLdAP99gwzFmJl11JCDRnl2sphga8Y0MyqZx29q7gEfC4W6eUE8P-r1Rrg3ZrgTUdPG7wl7nGaRi6ElsLPXd6DUIVWwbTjM_j5DTnYyZ1qz8L4n4I7pwfqCv96PFJ4B54fRsuCrkCb6SlGDLeRcWi-_6cqo864R4Xc",
    featured: 1,
    status: "Available"
  },
  {
    name: "Silk Gossamer Gloves",
    description: "Hand-crocheted gloves in a delicate silk blend. The fine texture of the work is emphasized in this high-end fashion piece.",
    price: 145.00,
    category: "Accessories",
    main_image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAlL-XqL3jkJeps8iLhkXS95GYan5F3yTK0wLt0Kmx7o2AEqsCUUphkOQtwleN_tn-Qo_g0iKSSJBlO6zBYVexJ-ZVFgePhLKR_zZb6sXdSRCPMV08ED7LaAU1jSYW4JnQUiCexfvMex1vdh2177ymdVLMpbtgW95psyfsk8WTdAVi-b_97WE5UVTWtMhZxi-PBzqHaWJ7c2_0qcD_gHjaXT7oNS-SH7rJeUvTsCN4SFKjvQnHHDm08gHAnjQC9qdDS0Na_nFQs1J8",
    featured: 1,
    status: "Made to Order"
  }
];

db.serialize(() => {
  defaultProducts.forEach(product => {
    const id = crypto.randomUUID();
    db.run(
      `INSERT INTO products (id, name, description, price, category, main_image, featured, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, product.name, product.description, product.price, product.category, product.main_image, product.featured, product.status],
      function(err) {
        if (err) {
          console.error("Error inserting product:", err.message);
        } else {
          console.log(`Inserted product: ${product.name}`);
        }
      }
    );
  });
});

setTimeout(() => {
  db.close();
  console.log("Database seeded successfully.");
}, 1000);
