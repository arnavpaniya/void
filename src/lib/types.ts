export interface Edition {
  id: string;
  name: string;
  subtitle: string;
  devanagariName: string;
  priceINR: number;
  priceUSD: number;
  canvasBg: string;
  accentColor: string;
  rimColor: string;
  tshirtColor: string;
  graphicUrl: string;
  story: string;
  fabricSpecs: {
    weight: string;
    knit: string;
    yarn: string;
    origin: string;
  };
}

export interface CartItem {
  edition: Edition;
  size: string;
  quantity: number;
}

export interface WishlistItem {
  id: string;
  name: string;
  priceINR: number;
  originalPriceINR?: number;
  image: string;
  gsm: string;
  category: string;
  addedAt: string;
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: "confirmed" | "milling" | "dispatched" | "delivered";
  statusLabel: string;
  items: CartItem[];
  subtotalINR: number;
  discountINR: number;
  shippingINR: number;
  totalINR: number;
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: string;
  shippingAddress: Address;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferredSize: string;
  memberSince: string;
  tier: string;
  addresses: Address[];
}

export interface UserSettings {
  currency: "INR" | "USD";
  measurementUnit: "in" | "cm";
  ambientAudio: boolean;
  audioVolume: number;
  dropAlertsEmail: boolean;
  dropAlertsSMS: boolean;
}

export const EDITIONS: Edition[] = [
  {
    id: "edition-01",
    name: "Modernist Blueprint",
    subtitle: "Heavyweight Boxy Tee",
    devanagariName: "VOID // ARCHIVE 01",
    priceINR: 2890,
    priceUSD: 48,
    canvasBg: "#EFECE6",
    accentColor: "#2563EB",
    rimColor: "#1E40AF",
    tshirtColor: "#E6E2D8",
    graphicUrl: "/graphics/void_graphic_01.jpg",
    story: "Constructed with 300 GSM Tirupur combed cotton in raw vintage bone. Front chest typography paired with an avant-garde back drafting print in electric cobalt and obsidian ink.",
    fabricSpecs: {
      weight: "300 GSM Heavyweight",
      knit: "Single Jersey 24s",
      yarn: "100% Combed Indian Cotton",
      origin: "Milled in Tirupur, India",
    },
  },
  {
    id: "edition-02",
    name: "Terracotta Surya",
    subtitle: "Sun-Drenched Heavyweight",
    devanagariName: "VOID // ARCHIVE 02",
    priceINR: 3190,
    priceUSD: 52,
    canvasBg: "#EAE3D9",
    accentColor: "#EA580C",
    rimColor: "#C2410C",
    tshirtColor: "#B55A44",
    graphicUrl: "/graphics/void_graphic_02.jpg",
    story: "Washed in warm botanical earth pigments, paying homage to architectural brick and celestial sunburst motifs. Substantial 1.25-inch rib neckband and relaxed drop shoulder drape.",
    fabricSpecs: {
      weight: "300 GSM Heavyweight",
      knit: "Single Jersey 24s",
      yarn: "100% Combed Indian Cotton",
      origin: "Milled in Tirupur, India",
    },
  },
  {
    id: "edition-03",
    name: "Obsidian Monolith",
    subtitle: "Raw Carbon Heavyweight",
    devanagariName: "VOID // ARCHIVE 03",
    priceINR: 2990,
    priceUSD: 50,
    canvasBg: "#E2E7E2",
    accentColor: "#10B981",
    rimColor: "#047857",
    tshirtColor: "#181716",
    graphicUrl: "/graphics/void_graphic_01.jpg",
    story: "Pure pitch carbon black combed jersey. Deep reactive dyeing with minimal reflectance. Built with reinforced double-needle seams for decade-long structural wear.",
    fabricSpecs: {
      weight: "300 GSM Heavyweight",
      knit: "Single Jersey 24s",
      yarn: "100% Combed Indian Cotton",
      origin: "Milled in Tirupur, India",
    },
  },
];
