import { db } from "./db";
import { products } from "@shared/schema";

const seedProducts = [
  // Tiles
  {
    title: "Carrara Marble Tile",
    category: "tiles",
    subcategory: "Marble Tiles",
    description: "Classic white marble with soft grey veining, perfect for elegant bathrooms and kitchens.",
    price: "45.99",
    imageUrl: "/api/placeholder/tiles",
    inStock: true,
  },
  {
    title: "Glossy Porcelain Tile",
    category: "tiles",
    subcategory: "Porcelain Tiles",
    description: "High gloss finish porcelain tiles for a modern, reflective look.",
    price: "38.00",
    imageUrl: "/api/placeholder/tiles",
    inStock: true,
  },
  {
    title: "Natural Granite Tile",
    category: "tiles",
    subcategory: "Granite Tiles",
    description: "Durable granite tiles with natural patterns, ideal for high-traffic areas.",
    price: "52.50",
    imageUrl: "/api/placeholder/tiles",
    inStock: true,
  },
  
  // Wood
  {
    title: "Rustic Oak Plank",
    category: "wood",
    subcategory: "Solid Wood Flooring",
    description: "Genuine oak wood with a warm, natural finish that ages beautifully.",
    price: "89.50",
    imageUrl: "/api/placeholder/wood",
    inStock: true,
  },
  {
    title: "Engineered Walnut",
    category: "wood",
    subcategory: "Engineered Wood",
    description: "Stable and beautiful walnut finish, resistant to moisture and temperature changes.",
    price: "75.00",
    imageUrl: "/api/placeholder/wood",
    inStock: true,
  },
  {
    title: "Classic Oak Parquet",
    category: "wood",
    subcategory: "Parquet Flooring",
    description: "Traditional herringbone pattern oak parquet for timeless elegance.",
    price: "95.00",
    imageUrl: "/api/placeholder/wood",
    inStock: true,
  },
  
  // Vinyl
  {
    title: "Herringbone Grey Vinyl",
    category: "vinyl",
    subcategory: "Luxury Vinyl Tiles (LVT)",
    description: "Modern herringbone pattern with superior water resistance and easy maintenance.",
    price: "32.00",
    imageUrl: "/api/placeholder/vinyl",
    inStock: true,
  },
  {
    title: "Stone Look SPC Vinyl",
    category: "vinyl",
    subcategory: "SPC Vinyl",
    description: "Stone-look SPC vinyl with enhanced durability and stability.",
    price: "42.00",
    imageUrl: "/api/placeholder/vinyl",
    inStock: true,
  },
  {
    title: "Commercial Sheet Vinyl",
    category: "vinyl",
    subcategory: "Sheet Vinyl Flooring",
    description: "Wide-format vinyl flooring perfect for commercial spaces.",
    price: "28.00",
    imageUrl: "/api/placeholder/vinyl",
    inStock: true,
  },
  
  // Stone
  {
    title: "Natural Slate Tile",
    category: "stone",
    subcategory: "Slate Stone",
    description: "Textured natural slate for a robust, earthy look in any space.",
    price: "55.00",
    imageUrl: "/api/placeholder/stone",
    inStock: true,
  },
  {
    title: "Beige Sandstone",
    category: "stone",
    subcategory: "Sandstone",
    description: "Warm beige sandstone with natural texture and variations.",
    price: "48.00",
    imageUrl: "/api/placeholder/stone",
    inStock: true,
  },
  
  // Carpet
  {
    title: "Plush Beige Carpet",
    category: "carpet",
    subcategory: "Wall-to-Wall Carpets",
    description: "Soft, luxurious beige carpet for ultimate comfort underfoot.",
    price: "35.00",
    imageUrl: "/api/placeholder/carpet",
    inStock: true,
  },
  {
    title: "Commercial Carpet Tiles",
    category: "carpet",
    subcategory: "Carpet Tiles",
    description: "Modular carpet tiles perfect for offices and commercial spaces.",
    price: "25.00",
    imageUrl: "/api/placeholder/carpet",
    inStock: true,
  },
];

async function seed() {
  console.log("Seeding database...");
  
  // Check if products already exist
  const existing = await db.select().from(products).limit(1);
  if (existing.length > 0) {
    console.log("Database already seeded. Skipping...");
    return;
  }
  
  await db.insert(products).values(seedProducts);
  console.log(`✓ Seeded ${seedProducts.length} products`);
}

seed().catch(console.error);
