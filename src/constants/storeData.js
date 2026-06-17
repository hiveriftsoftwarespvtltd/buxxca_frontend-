export const STORE = {
  name: 'BUXAA',
  tagline: 'Premium Bags & Luggage',
  currency: '₹',
  currencyCode: 'INR'
};

export const CATEGORIES = [
  { id: 1, name: "Backpacks", slug: "backpacks", count: 15, emoji: "🎒", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&auto=format&fit=crop&q=80" },
  { id: 2, name: "Laptop Bags", slug: "laptop-bags", count: 8, emoji: "💼", img: "https://images.unsplash.com/photo-1508847154043-be12a62861c1?w=300&auto=format&fit=crop&q=80" },
  { id: 3, name: "Travel Bags", slug: "travel-bags", count: 12, emoji: "✈️", img: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=300&auto=format&fit=crop&q=80" },
  { id: 4, name: "Sling Bags", slug: "sling-bags", count: 6, emoji: "🧭", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&auto=format&fit=crop&q=80" },
  { id: 5, name: "Corporate Gifting", slug: "corporate-gifting", count: 5, emoji: "🎁", img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300&auto=format&fit=crop&q=80" },
  { id: 6, name: "Organizers", slug: "organizers", count: 7, emoji: "📁", img: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=300&auto=format&fit=crop&q=80" },
  { id: 7, name: "Gym & Sports", slug: "gym-sports", count: 10, emoji: "👜", img: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=300&auto=format&fit=crop&q=80" },
  { id: 8, name: "Premium Collection", slug: "premium-collection", count: 4, emoji: "✨", img: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=300&auto=format&fit=crop&q=80" }
];

export const SCENT_FAMILIES = [
  { id: 'Polyester', name: 'Ballistic Polyester', icon: 'ShieldCheck', desc: 'Durable and tear-resistant fabric' },
  { id: 'Nylon', name: 'Ripstop Nylon', icon: 'Compass', desc: 'Lightweight water-resistant nylon' },
  { id: 'Leather', name: 'Premium Leather', icon: 'Sparkles', desc: 'Top-grain vegan & genuine leather' },
  { id: 'Canvas', name: 'Waxed Canvas', icon: 'Briefcase', desc: 'Classic heavy-duty coated canvas' },
  { id: 'Polycarbonate', name: 'German Polycarbonate', icon: 'Star', desc: 'Impact-absorbing hardshell casing' }
];

export const DEFAULT_PRODUCTS = [
  {
    id: 1,
    sku: "BX-VGY-01",
    name: "BUXAA Voyager Backpack",
    brand: "BUXAA",
    slug: "buxaa-voyager-backpack",
    subtitle: "Premium storage voyager backpack designed for modern travelers",
    category: "backpacks",
    status: "active",
    isFeatured: true,
    price: 4499,
    originalPrice: 4999,
    discount: 10,
    sizes: ["One Size"],
    selectedSize: "One Size",
    variants: [
      { size: "One Size", price: 4499, stock: 50, sku: "BX-VGY-01-OS" }
    ],
    notes: {
      top: ["Ballistic Polyester"],
      heart: ["32 Liters Capacity"],
      base: ["YKK Zippers, Laptop Compartment up to 16\""]
    },
    scentFamily: "Polyester",
    gender: "travel",
    concentration: "32L Capacity",
    rating: 5.0,
    reviews: 125,
    stock: 50,
    isNew: false,
    isBestseller: true,
    img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80",
    imgs: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1575916140120-bfa5c3f1f6c0?w=500&auto=format&fit=crop&q=80"
    ],
    description: "<p>The BUXAA Voyager Backpack is your ultimate travel companion. Designed with high-density ballistic polyester, it provides excellent water resistance and durability. Features dedicated compartments for a 16-inch laptop, tablets, travel documents, and clothes. Perfect for week-long business trips or weekend getaways.</p>"
  },
  {
    id: 2,
    sku: "BX-WKD-02",
    name: "BUXAA Weekender Duffel",
    brand: "BUXAA",
    slug: "buxaa-weekender-duffel",
    subtitle: "Spacious and durable weekender duffel for short getaways",
    category: "travel-bags",
    status: "active",
    isFeatured: true,
    price: 3799,
    originalPrice: 4499,
    discount: 15,
    sizes: ["One Size"],
    selectedSize: "One Size",
    variants: [
      { size: "One Size", price: 3799, stock: 30, sku: "BX-WKD-02-OS" }
    ],
    notes: {
      top: ["Premium Canvas / Leather"],
      heart: ["40 Liters Capacity"],
      base: ["Shoe Compartment, Removable Shoulder Strap"]
    },
    scentFamily: "Canvas & Leather",
    gender: "travel",
    concentration: "40L Capacity",
    rating: 5.0,
    reviews: 86,
    stock: 30,
    isNew: false,
    isBestseller: true,
    img: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=500&auto=format&fit=crop&q=80",
    imgs: [
      "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=500&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80"
    ],
    description: "<p>A classic duffel with modern organization. The Weekender Duffel features an isolated shoe pocket to keep your clothes clean, water-resistant interior lining, and heavy-duty brass hardware. Crafted from wax-coated heavy-duty canvas and premium vegan leather trims.</p>"
  },
  {
    id: 3,
    sku: "BX-EXE-03",
    name: "BUXAA Executive Laptop Bag",
    brand: "BUXAA",
    slug: "buxaa-executive-laptop-bag",
    subtitle: "Elegant brief laptop bag designed for business professionals",
    category: "laptop-bags",
    status: "active",
    isFeatured: true,
    price: 3299,
    originalPrice: 3800,
    discount: 13,
    sizes: ["One Size"],
    selectedSize: "One Size",
    variants: [
      { size: "One Size", price: 3299, stock: 25, sku: "BX-EXE-03-OS" }
    ],
    notes: {
      top: ["Genuine Leather Trims / Nylon"],
      heart: ["15 Liters Capacity"],
      base: ["Padded 15.6\" Laptop Sleeve, Luggage Trolley Strap"]
    },
    scentFamily: "Nylon & Leather",
    gender: "commute",
    concentration: "15L Capacity",
    rating: 5.0,
    reviews: 72,
    stock: 25,
    isNew: true,
    isBestseller: false,
    img: "https://images.unsplash.com/photo-1508847154043-be12a62861c1?w=500&auto=format&fit=crop&q=80",
    imgs: [
      "https://images.unsplash.com/photo-1508847154043-be12a62861c1?w=500&auto=format&fit=crop&q=80"
    ],
    description: "<p>Elevate your everyday office carry. The Executive Laptop Bag blends structured nylon panels with full-grain leather details. Features smart organizing slots for chargers, tablets, and basics, and slides easily onto any rolling suitcase handle.</p>"
  },
  {
    id: 4,
    sku: "BX-CSB-04",
    name: "BX Crossbody Sling Bag",
    brand: "BUXAA",
    slug: "buxaa-crossbody-sling-bag",
    subtitle: "Compact and secure crossbody sling bag for everyday essentials",
    category: "sling-bags",
    status: "active",
    isFeatured: true,
    price: 1999,
    originalPrice: 2399,
    discount: 12,
    sizes: ["One Size"],
    selectedSize: "One Size",
    variants: [
      { size: "One Size", price: 1999, stock: 40, sku: "BX-CSB-04-OS" }
    ],
    notes: {
      top: ["Water-resistant Ripstop Nylon"],
      heart: ["6 Liters Capacity"],
      base: ["Anti-theft Hidden Pockets, Magnetic Buckle Strap"]
    },
    scentFamily: "Nylon",
    gender: "commute",
    concentration: "6L Capacity",
    rating: 5.0,
    reviews: 55,
    stock: 40,
    isNew: false,
    isBestseller: false,
    img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&auto=format&fit=crop&q=80",
    imgs: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&auto=format&fit=crop&q=80"
    ],
    description: "<p>A lightweight, quick-access sling built for active city walks and travels. Fits a kindle, phone, keys, wallet, and sunglasses with ease. Features a quick-release magnetic chest buckle and breathable back panel.</p>"
  }
];

export const TESTIMONIALS = [
  { name: 'Priya Sharma', role: 'Mumbai', text: 'BUXAA has completely transformed my travel gear. The Voyager Backpack is my absolute favorite - fits my laptop and clothes beautifully. The quality is solid!', rating: 5, initial: 'P' },
  { name: 'Arjun Mehta', role: 'Delhi', text: 'Highly impressed with the Pro Traveler Suitcase. Whisper quiet wheels, tough shell and excellent compression pad system.', rating: 5, initial: 'A' }
];

export const COUPONS = {
  'BUXAA10': { type: 'percent', value: 10, desc: '10% off your order' },
  'WELCOME20': { type: 'percent', value: 20, desc: '20% off for new customers' }
};

export const BRAND_VALUES = [
  { icon: 'ShieldCheck', title: 'Premium Build', desc: "Crafted with Japanese Hinomoto wheels and high-density ballistic nylon" },
  { icon: 'Award', title: 'Quality Guarantee', desc: 'Backed by a 2-year warranty against any manufacturing defects' },
  { icon: 'Truck', title: 'Free Shipping', desc: 'Complimentary shipping on all orders above ₹2,999' },
  { icon: 'RotateCcw', title: '30-Day Returns', desc: 'Not satisfied? Return within 30 days for a full refund' }
];

export const formatPrice = (amount) => {
  return `${STORE.currency}${Number(amount).toLocaleString('en-IN')}`;
};

export const renderStars = (rating) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
};

export const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  // Check if this is a backend-uploaded image (starts with images/upload- or /images/upload-)
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  if (cleanPath.startsWith('images/upload-')) {
    const apiUrl = import.meta.env.VITE_API_URL || '';
    const baseUrl = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
    if (apiUrl) {
      if (baseUrl.endsWith('/api')) {
        return `${baseUrl}/${cleanPath}`;
      } else {
        return `${baseUrl}/api/${cleanPath}`;
      }
    }
    return `/${cleanPath}`;
  }
  const resolvedPath = path;
  return resolvedPath.startsWith('/') ? resolvedPath : '/' + resolvedPath;
};
