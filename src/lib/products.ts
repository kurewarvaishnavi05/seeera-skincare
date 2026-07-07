export interface Product {
  id: number;
  slug: string;
  name: string;
  price: number;
  formattedPrice: string;
  category: string;
  image: string;
  description: string;
  badges?: string[];
  tags?: string[];
}

export const products: Product[] = [
  {
    id: 1,
    slug: "hydra-shield-sunscreen",
    name: "SeeEra HydraShield Sunscreen SPF 50 PA+++",
    price: 599,
    formattedPrice: "₹599.00",
    category: "Sun Care",
    image: "https://cdn.shopify.com/s/files/1/0935/2131/4156/files/1.png?v=1780647474",
    description: "HydraShield SPF 50 PA+++ is a lightweight, broad-spectrum sunscreen that provides advanced protection against harmful UVA and UVB rays while keeping skin hydrated, nourished, and comfortable throughout the day. Formulated with Niacinamide, Hyaluronic Acid, Ceramide Complex, Vitamin E, and Coconut Oil.",
    badges: ["Best Seller"],
    tags: ["SPF 50+", "Hydrating", "UV Protection"]
  },
  {
    id: 2,
    slug: "cica-pdrn-lip-balm",
    name: "CICA PDRN Lip Balm",
    price: 499,
    formattedPrice: "₹499.00",
    category: "Lip Care",
    image: "https://cdn.shopify.com/s/files/1/0935/2131/4156/files/option_1_jpg.jpg?v=1771262475",
    description: "A deeply nourishing lip balm infused with CICA and PDRN to repair dry, chapped lips while providing a smooth, glossy finish and lasting hydration.",
    badges: ["New"],
    tags: ["PDRN + CICA", "Hydrating"]
  },
  {
    id: 3,
    slug: "cica-pdrn-sunscreen",
    name: "CICA PDRN Sunscreen",
    price: 1299,
    formattedPrice: "₹1299.00",
    category: "Sun Care",
    image: "https://cdn.shopify.com/s/files/1/0935/2131/4156/files/Seeera_Sunscreen.webp?v=1772965540",
    description: "A premium sunscreen infused with Salmon PDRN and Centella Asiatica (CICA). Offers unmatched barrier repair, intense hydration, and high-performance sun protection without the white cast.",
    badges: ["Best Seller"],
    tags: ["SPF 50+ PA++++", "PDRN + CICA", "UV Protection"]
  },
  {
    id: 4,
    slug: "sunscreen-lip-balm-combo",
    name: "CICA PDRN Sunscreen & Lip Balm Combo",
    price: 1618,
    formattedPrice: "₹1618.00",
    category: "Sets",
    image: "https://cdn.shopify.com/s/files/1/0935/2131/4156/files/Combo.webp?v=1771121558",
    description: "The ultimate protection and repair set. Combine the healing power of our CICA PDRN Sunscreen with the intense nourishment of the CICA PDRN Lip Balm for complete daily care.",
    badges: ["Best Value"],
    tags: ["Set", "PDRN + CICA"]
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}
