export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription: string;
  category: string;
  images: string[];
  colors?: { name: string; hex: string }[];
  sizes?: string[];
  inStock: boolean;
  stockCount?: number;
  isNew?: boolean;
  isFeatured?: boolean;
  rating: number;
  reviewCount: number;
}

export const products: Product[] = [
  {
    id: "minimal-chair",
    name: "Minimal Chair",
    price: 899,
    originalPrice: 1199,
    description: "Crafted with precision engineering and premium materials, the Minimal Chair embodies the perfect balance of form and function. Featuring an ergonomic design with lumbar support and breathable mesh backrest, this chair is built for extended comfort during long work sessions. The lightweight aluminum base provides stability while maintaining a sleek, minimal footprint that complements any modern workspace.",
    shortDescription: "Ergonomic office chair with breathable mesh backrest and aluminum base",
    category: "Furniture",
    images: ["/products/minimal-chair-1.svg", "/products/arc-lamp-1.svg", "/products/ceramic-vase-1.svg"],
    colors: [
      { name: "Charcoal", hex: "#424656" },
      { name: "Slate Blue", hex: "#505f76" },
      { name: "Pearl White", hex: "#f8f7ff" }
    ],
    sizes: ["Standard", "Large"],
    inStock: true,
    stockCount: 15,
    isNew: false,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 124
  },
  {
    id: "arc-floor-lamp",
    name: "Arc Floor Lamp",
    price: 449,
    description: "Make a statement in any room with the Arc Floor Lamp. Its graceful curved arm extends over seating areas, providing perfect ambient lighting for reading or relaxation. The weighted marble base ensures stability while adding a touch of luxury. Compatible with smart bulbs for customizable lighting scenes.",
    shortDescription: "Marble-base floor lamp with curved arm design",
    category: "Lighting",
    images: ["/products/arc-lamp-1.svg"],
    colors: [
      { name: "Brass", hex: "#b3c5ff" },
      { name: "Matte Black", hex: "#131b2e" }
    ],
    inStock: true,
    stockCount: 8,
    isNew: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 67
  },
  {
    id: "ceramic-vase-set",
    name: "Ceramic Vase Set",
    price: 189,
    originalPrice: 249,
    description: "A curated collection of hand-glazed ceramic vases in varying heights and finishes. Each piece features unique reactive glazes that ensure no two vases are identical. Perfect for displaying dried flowers, fresh arrangements, or as standalone sculptural elements.",
    shortDescription: "Set of 3 hand-glazed ceramic vases with reactive glazes",
    category: "Decor",
    images: ["/products/ceramic-vase-1.svg"],
    inStock: true,
    stockCount: 23,
    isFeatured: true,
    rating: 4.7,
    reviewCount: 89
  },
  {
    id: "oak-side-table",
    name: "Oak Side Table",
    price: 329,
    description: "Solid oak side table with clean lines and natural grain patterns. The perfect companion for sofas and beds, featuring a lower shelf for books and accessories. Sustainably sourced wood with a protective matte finish.",
    shortDescription: "Solid oak side table with lower display shelf",
    category: "Furniture",
    images: ["/products/oak-table-1.svg"],
    inStock: true,
    stockCount: 12,
    rating: 4.6,
    reviewCount: 45
  },
  {
    id: "linen-throw-blanket",
    name: "Linen Throw Blanket",
    price: 129,
    description: "Luxuriously soft stonewashed linen throw in a sophisticated neutral palette. Breathable and temperature-regulating, perfect for layering on sofas or at the foot of beds. Pre-washed for immediate softness.",
    shortDescription: "Stonewashed linen throw with fringed edges",
    category: "Textiles",
    images: ["/products/linen-blanket-1.svg"],
    colors: [
      { name: "Natural", hex: "#f8f7ff" },
      { name: "Sage", hex: "#d0e1fb" },
      { name: "Terracotta", hex: "#cc4204" }
    ],
    inStock: true,
    stockCount: 34,
    isNew: true,
    rating: 4.9,
    reviewCount: 156
  },
  {
    id: "brass-pendant-light",
    name: "Brass Pendant Light",
    price: 289,
    description: "Handcrafted brass pendant with frosted glass diffuser providing warm, ambient illumination. Adjustable hanging height makes it versatile for kitchen islands, dining tables, or entryways. LED compatible.",
    shortDescription: "Handcrafted brass pendant with frosted glass",
    category: "Lighting",
    images: ["/products/brass-pendant-1.svg"],
    inStock: true,
    stockCount: 6,
    isFeatured: true,
    rating: 4.5,
    reviewCount: 38
  },
  {
    id: "marble-cutting-board",
    name: "Marble Cutting Board",
    price: 79,
    description: "Carrara marble cutting board with natural grey veining. Non-porous surface resists bacteria and won't dull knives. Sleek enough to serve as a cheese board for entertaining.",
    shortDescription: "Carrara marble board with natural veining",
    category: "Kitchen",
    images: ["/products/marble-board-1.svg"],
    inStock: true,
    stockCount: 18,
    rating: 4.4,
    reviewCount: 72
  },
  {
    id: "wool-pillow-set",
    name: "Wool Pillow Set",
    price: 199,
    originalPrice: 279,
    description: "Set of 2 premium merino wool throw pillows with removable linen covers. Hypoallergenic and naturally temperature-regulating. Insert included.",
    shortDescription: "Set of 2 merino wool pillows with linen covers",
    category: "Textiles",
    images: ["/products/wool-pillow-1.svg"],
    colors: [
      { name: "Cream", hex: "#f8f7ff" },
      { name: "Charcoal", hex: "#424656" },
      { name: "Dusty Rose", hex: "#ffdbd0" }
    ],
    inStock: true,
    stockCount: 9,
    isNew: true,
    rating: 4.8,
    reviewCount: 93
  },
  {
    id: "steel-bookends",
    name: "Steel Bookends",
    price: 59,
    description: "Minimalist steel bookends with rubberized bases that protect surfaces and prevent slipping. Weighted for stability. Sold as a pair.",
    shortDescription: "Pair of minimalist steel bookends",
    category: "Decor",
    images: ["/products/bookends-1.svg"],
    inStock: true,
    stockCount: 27,
    rating: 4.3,
    reviewCount: 31
  },
  {
    id: "leather-ottoman",
    name: "Leather Ottoman",
    price: 549,
    description: "Hand-stitched genuine leather ottoman with high-density foam cushioning. Perfect as a footrest, extra seating, or coffee table alternative. Available in multiple leather grades.",
    shortDescription: "Hand-stitched leather ottoman with foam cushioning",
    category: "Furniture",
    images: ["/products/leather-ottoman-1.svg"],
    colors: [
      { name: "Cognac", hex: "#832600" },
      { name: "Black", hex: "#131b2e" },
      { name: "Tan", hex: "#b7c8e1" }
    ],
    inStock: true,
    stockCount: 4,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 67
  },
  {
    id: "glass-carafe",
    name: "Glass Carafe",
    price: 89,
    description: " Mouth-blown borosilicate glass carafe with cork stopper. Heat and thermal shock resistant. 1-liter capacity perfect for water, juice, or floral arrangements.",
    shortDescription: "Mouth-blown glass carafe with cork stopper",
    category: "Kitchen",
    images: ["/products/glass-carafe-1.svg"],
    inStock: true,
    stockCount: 15,
    rating: 4.6,
    reviewCount: 44
  },
  {
    id: "walnut-tray",
    name: "Walnut Serving Tray",
    price: 69,
    description: "Solid walnut serving tray with integrated handles and raised edges. Food-safe oil finish. Perfect for breakfast-in-bed or entertaining.",
    shortDescription: "Solid walnut tray with food-safe finish",
    category: "Kitchen",
    images: ["/products/walnut-tray-1.svg"],
    inStock: true,
    stockCount: 21,
    rating: 4.5,
    reviewCount: 58
  }
];

export const categories = [
  "All",
  "Furniture",
  "Lighting",
  "Decor",
  "Textiles",
  "Kitchen"
];

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "All") return products;
  return products.filter(p => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.isFeatured);
}

export function getNewProducts(): Product[] {
  return products.filter(p => p.isNew);
}