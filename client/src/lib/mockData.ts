import heroImage from "@assets/generated_images/elegant_living_room_with_hardwood_flooring.png";
import tileImage from "@assets/generated_images/ceramic_marble_tiles_texture.png";
import woodImage from "@assets/generated_images/oak_wood_flooring_texture.png";
import vinylImage from "@assets/generated_images/herringbone_vinyl_flooring.png";
import stoneImage from "@assets/generated_images/slate_stone_flooring_texture.png";

export const CATEGORIES = [
  {
    id: "tiles",
    title: "Tiles Flooring",
    description: "Elegant and durable ceramic, porcelain, and marble tiles for every room.",
    image: tileImage,
    subcategories: ["Ceramic Tiles", "Porcelain Tiles", "Marble Tiles", "Granite Tiles", "Outdoor Tiles"]
  },
  {
    id: "wood",
    title: "Wooden Flooring",
    description: "Timeless beauty with solid, engineered, and laminate wood options.",
    image: woodImage,
    subcategories: ["Solid Wood Flooring", "Engineered Wood", "Laminate Flooring", "Parquet Flooring"]
  },
  {
    id: "vinyl",
    title: "Vinyl Flooring",
    description: "Versatile, water-resistant, and stylish vinyl solutions.",
    image: vinylImage,
    subcategories: ["Luxury Vinyl Tiles (LVT)", "SPC Vinyl", "PVC Vinyl Flooring", "Sheet Vinyl Flooring"]
  },
  {
    id: "carpet",
    title: "Carpet Flooring",
    description: "Soft, comfortable, and luxurious carpets for a cozy atmosphere.",
    image: heroImage, // Reusing hero for now or could use a color placeholder
    subcategories: ["Carpet Tiles", "Wall-to-Wall Carpets", "Artificial Grass Carpet"]
  },
  {
    id: "stone",
    title: "Stone Flooring",
    description: "Natural and rugged stone flooring for a unique aesthetic.",
    image: stoneImage,
    subcategories: ["Slate Stone", "Sandstone", "Kota Stone"]
  }
];

export const PRODUCTS = [
  {
    id: 1,
    title: "Carrara Marble Tile",
    category: "tiles",
    subcategory: "Marble Tiles",
    price: 45.99,
    image: tileImage,
    description: "Classic white marble with soft grey veining."
  },
  {
    id: 2,
    title: "Rustic Oak Plank",
    category: "wood",
    subcategory: "Solid Wood Flooring",
    price: 89.50,
    image: woodImage,
    description: "Genuine oak wood with a warm, natural finish."
  },
  {
    id: 3,
    title: "Herringbone Grey Vinyl",
    category: "vinyl",
    subcategory: "Luxury Vinyl Tiles (LVT)",
    price: 32.00,
    image: vinylImage,
    description: "Modern herringbone pattern with water resistance."
  },
  {
    id: 4,
    title: "Natural Slate Tile",
    category: "stone",
    subcategory: "Slate Stone",
    price: 55.00,
    image: stoneImage,
    description: "Textured natural slate for a robust look."
  },
  // Added more mock products for variety
  {
    id: 5,
    title: "Glossy Porcelain",
    category: "tiles",
    subcategory: "Porcelain Tiles",
    price: 38.00,
    image: tileImage,
    description: "High gloss finish for a modern look."
  },
  {
    id: 6,
    title: "Engineered Walnut",
    category: "wood",
    subcategory: "Engineered Wood",
    price: 75.00,
    image: woodImage,
    description: "Stable and beautiful walnut finish."
  }
];

export const REVIEWS = [
  {
    id: 1,
    name: "Sarah Jenkins",
    text: "The quality of the oak flooring is absolutely stunning. Transformed our living room completely.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Ross",
    text: "Great service and fast delivery. The vinyl tiles look exactly like real wood.",
    rating: 5
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    text: "Love my new kitchen tiles. Easy to clean and very durable.",
    rating: 4
  }
];
