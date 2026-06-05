export const products = [
  {
    id: 1,
    name: "BUXXA Executive Laptop Backpack",
    slug: "buxxa-executive-laptop-backpack",
    price: 3499.0,
    oldPrice: 4999.0,
    rating: 4.8,
    reviewCount: 65,
    category: "Backpacks",
    brand: "BUXXA",
    badge: "-30%",
    featured: true,
    trending: true,
    bestSeller: true,
    newArrival: false,
    onSale: true,
    images: [
      "/assets/imgs/page/homepage1/computer.png",
      "/assets/imgs/page/homepage1/laptop.png",
      "/assets/imgs/page/homepage1/smartphone.png"
    ],
    description: "Immersive ergonomic design with multi-layered protective compartments. Water-resistant canvas shell, dedicated 15.6-inch laptop pocket, USB charging port, and hidden security pocket for cards and passport.",
    specs: {
      "Capacity": "25 Liters",
      "Laptop Pocket": "Fits up to 15.6-inch",
      "Material": "Water-resistant Ballistic Nylon",
      "Weight": "0.85 kg",
      "Warranty": "1 Year Brand Warranty"
    },
    variants: {
      colors: [
        { name: "Navy Blue", hex: "#1A3DAA" },
        { name: "Charcoal Black", hex: "#111827" }
      ],
      sizes: ["Standard"]
    },
    reviews: [
      { id: 1, author: "Aman Sharma", rating: 5, date: "2026-05-12", comment: "Outstanding durability and looks incredibly professional for office commute." }
    ]
  },
  {
    id: 2,
    name: "BUXXA Hardshell Tech Organizer Pouch",
    slug: "buxxa-hardshell-tech-organizer-pouch",
    price: 1299.0,
    oldPrice: 1899.0,
    rating: 4.5,
    reviewCount: 48,
    category: "Organizer Pouches",
    brand: "BUXXA",
    badge: "-31%",
    featured: true,
    trending: true,
    bestSeller: false,
    newArrival: true,
    onSale: true,
    images: [
      "/assets/imgs/page/homepage1/electric.png",
      "/assets/imgs/page/homepage1/outdoor.png"
    ],
    description: "Shockproof hardshell case equipped with customizable elastic organizer straps and layered mesh pockets. Perfect for organizing chargers, mouse, power banks, cables, and pen drives safely during travel.",
    specs: {
      "Dimensions": "22 x 15 x 6 cm",
      "Material": "EVA Hardshell & Waterproof Polyester",
      "Weight": "0.22 kg",
      "Compartments": "Double-layered mesh & straps"
    },
    variants: {
      colors: [
        { name: "Carbon Black", hex: "#111827" },
        { name: "Titanium Gray", hex: "#4B5563" }
      ],
      sizes: ["One Size"]
    },
    reviews: []
  },
  {
    id: 3,
    name: "BUXXA Premium Cabin Duffel Bag",
    slug: "buxxa-premium-cabin-duffel-bag",
    price: 2699.0,
    oldPrice: 3999.0,
    rating: 4.9,
    reviewCount: 120,
    category: "Travel Bags",
    brand: "BUXXA",
    badge: "Hot",
    featured: true,
    trending: true,
    bestSeller: true,
    newArrival: true,
    onSale: true,
    images: [
      "/assets/imgs/page/homepage1/outdoor.png",
      "/assets/imgs/page/homepage1/gaming.png"
    ],
    description: "Designed for modern travelers and weekend getaways. Features a dedicated shoe compartment, waterproof wet pocket for toiletries, and ergonomic dual-carry handles with padded shoulder strap.",
    specs: {
      "Capacity": "40 Liters",
      "Carry type": "Dual Handles + Detachable Shoulder Strap",
      "Special Pocket": "Separate shoe compartment",
      "Material": "Waterproof Ripstop Canvas"
    },
    variants: {
      colors: [
        { name: "Navy Blue", hex: "#1A3DAA" },
        { name: "Olive Green", hex: "#3F6212" }
      ],
      sizes: ["40L"]
    },
    reviews: []
  },
  {
    id: 4,
    name: "BUXXA Crossbody Everyday Sling Bag",
    slug: "buxxa-crossbody-everyday-sling-bag",
    price: 1699.0,
    oldPrice: 2499.0,
    rating: 4.7,
    reviewCount: 95,
    category: "Sling Bags",
    brand: "BUXXA",
    badge: "Sale",
    featured: true,
    trending: false,
    bestSeller: true,
    newArrival: false,
    onSale: true,
    images: [
      "/assets/imgs/page/homepage1/smartphone.png",
      "/assets/imgs/page/homepage1/smartwatches.png"
    ],
    description: "Compact and lightweight design for daily commute. Waterproof shell, external quick-access slots, card pockets, and breathable mesh backing for maximum comfort.",
    specs: {
      "Dimensions": "30 x 18 x 9 cm",
      "Capacity": "5 Liters",
      "Weight": "0.35 kg",
      "Back Panel": "Padded Breathable Mesh"
    },
    variants: {
      colors: [
        { name: "Charcoal Black", hex: "#111827" },
        { name: "Royal Blue", hex: "#1A3DAA" }
      ],
      sizes: ["Standard"]
    },
    reviews: []
  },
  {
    id: 5,
    name: "BUXXA Executive Leather Messenger Bag",
    slug: "buxxa-executive-leather-messenger-bag",
    price: 4299.0,
    oldPrice: 5999.0,
    rating: 4.4,
    reviewCount: 34,
    category: "Laptop Bags",
    brand: "BUXXA",
    badge: "-28%",
    featured: true,
    trending: true,
    bestSeller: false,
    newArrival: true,
    onSale: true,
    images: [
      "/assets/imgs/page/homepage1/laptop.png",
      "/assets/imgs/page/homepage1/computer.png"
    ],
    description: "Handcrafted using premium eco-leather and heavy-duty brass locks. Padded sleeves protect laptops up to 15.6 inches, while internal files organizers keep documents crisp.",
    specs: {
      "Material": "Premium Eco-Leather",
      "Hardware": "Heavy-duty Brass Hardware",
      "Laptop Compartment": "Padded 15.6-inch",
      "Strap": "Detachable Leather Strap"
    },
    variants: {
      colors: [
        { name: "Tan Brown", hex: "#78350F" },
        { name: "Classic Black", hex: "#111827" }
      ],
      sizes: ["Standard"]
    },
    reviews: []
  },
  {
    id: 6,
    name: "BUXXA Active Gym & Sports Duffel",
    slug: "buxxa-active-gym-and-sports-duffel",
    price: 1899.0,
    oldPrice: 2499.0,
    rating: 4.6,
    reviewCount: 88,
    category: "Duffel Bags",
    brand: "BUXXA",
    badge: "Sale",
    featured: false,
    trending: true,
    bestSeller: true,
    newArrival: false,
    onSale: true,
    images: [
      "/assets/imgs/page/homepage1/gaming.png",
      "/assets/imgs/page/homepage1/outdoor.png"
    ],
    description: "Compact fitness companion. Heavy-duty water-resistant fabrics, shoe container with ventilation hole, separate side pockets for shaker bottles, and dynamic styling.",
    specs: {
      "Capacity": "30 Liters",
      "Special Compartments": "Shoe Pocket with Vents",
      "Material": "Waterproof Oxford Fabric",
      "Care": "Easy wipe clean"
    },
    variants: {
      colors: [
        { name: "Black Red", hex: "#991B1B" },
        { name: "All Black", hex: "#111827" }
      ],
      sizes: ["Standard"]
    },
    reviews: []
  },
  {
    id: 7,
    name: "BUXXA Custom Branding Gift Box Set",
    slug: "buxxa-custom-branding-gift-box-set",
    price: 4999.0,
    oldPrice: 6999.0,
    rating: 4.6,
    reviewCount: 77,
    category: "Corporate Collection",
    brand: "BUXXA",
    badge: "Bulk",
    featured: false,
    trending: true,
    bestSeller: true,
    newArrival: false,
    onSale: true,
    images: [
      "/assets/imgs/page/homepage1/television.png",
      "/assets/imgs/page/homepage1/smartwatches.png"
    ],
    description: "Premium corporate gifting set. Includes custom branded leather folder, metallic engraving pen, hardshell cord organizer pouch, and sleek card holder. Beautifully boxed.",
    specs: {
      "Custom Branding": "Logo printing & metal engraving available",
      "Included Items": "Leather Folder, Pen, Tech Pouch, Card Holder",
      "Box Type": "Premium Textured Matte Box"
    },
    variants: {
      colors: [
        { name: "Corporate Black", hex: "#111827" }
      ],
      sizes: ["Premium Set"]
    },
    reviews: []
  },
  {
    id: 8,
    name: "BUXXA Double-Layer Cable Organizer",
    slug: "buxxa-double-layer-cable-organizer",
    price: 899.0,
    oldPrice: 1299.0,
    rating: 4.8,
    reviewCount: 230,
    category: "Organizer Pouches",
    brand: "BUXXA",
    badge: "-30%",
    featured: false,
    trending: false,
    bestSeller: true,
    newArrival: true,
    onSale: true,
    images: [
      "/assets/imgs/page/homepage1/electric.png",
      "/assets/imgs/page/homepage1/smartphone.png"
    ],
    description: "Double-layered travel pouch for managing cords, power adapters, mouse, memory cards, and headphones. Smooth dual-zipper closure and durable soft padding protection.",
    specs: {
      "Layers": "Double Layered",
      "Material": "Water-repellent Jacquard fabric",
      "Zippers": "Premium YKK Dual Zippers"
    },
    variants: {
      colors: [
        { name: "Space Gray", hex: "#4B5563" },
        { name: "Navy Blue", hex: "#1A3DAA" }
      ],
      sizes: ["Standard"]
    },
    reviews: []
  },
  {
    id: 9,
    name: "BUXXA Travel Passport Wallet",
    slug: "buxxa-travel-passport-wallet",
    price: 799.0,
    oldPrice: 1199.0,
    rating: 4.5,
    reviewCount: 154,
    category: "Travel Bags",
    brand: "BUXXA",
    badge: "New",
    featured: false,
    trending: true,
    bestSeller: true,
    newArrival: false,
    onSale: true,
    images: [
      "/assets/imgs/page/homepage1/smartwatches.png",
      "/assets/imgs/page/homepage1/smartphone.png"
    ],
    description: "RFID blocking travel document cover with slots for passport, boarding pass, credit cards, and cash. Sleek silhouette fits easily into bags or pocket.",
    specs: {
      "Protection": "RFID Blocking Technology",
      "Material": "Scratch-resistant Saffiano Leather",
      "Slots": "4 Cards, 1 Boarding Pass, 1 Passport"
    },
    variants: {
      colors: [
        { name: "Navy Blue", hex: "#1A3DAA" },
        { name: "Classic Black", hex: "#111827" }
      ],
      sizes: ["Standard"]
    },
    reviews: []
  },
  {
    id: 10,
    name: "BUXXA Casual College Backpack",
    slug: "buxxa-casual-college-backpack",
    price: 1999.0,
    oldPrice: 2999.0,
    rating: 4.7,
    reviewCount: 42,
    category: "Backpacks",
    brand: "BUXXA",
    badge: "Hot",
    featured: true,
    trending: true,
    bestSeller: false,
    newArrival: false,
    onSale: true,
    images: [
      "/assets/imgs/page/homepage1/computer.png",
      "/assets/imgs/page/homepage1/laptop.png"
    ],
    description: "Vibrant and lightweight backpack for students. Water-resistant fabrics, ergonomic back support, front accessory slots, and dual mesh bottle pockets.",
    specs: {
      "Capacity": "22 Liters",
      "Weight": "0.45 kg",
      "Compartments": "2 Main Compartments + 1 Front Pocket",
      "Material": "Premium Polyester"
    },
    variants: {
      colors: [
        { name: "Ocean Blue", hex: "#2563EB" },
        { name: "Jet Black", hex: "#111827" }
      ],
      sizes: ["Standard"]
    },
    reviews: []
  }
];

// Generate mock items up to 32 to fulfill "30+ items" requirement
const defaultImages = [
  "/assets/imgs/page/homepage1/computer.png",
  "/assets/imgs/page/homepage1/laptop.png",
  "/assets/imgs/page/homepage1/smartphone.png",
  "/assets/imgs/page/homepage1/electric.png",
  "/assets/imgs/page/homepage1/gaming.png",
  "/assets/imgs/page/homepage1/outdoor.png",
  "/assets/imgs/page/homepage1/smartwatches.png"
];

const brands = ["BUXXA", "BUXXA Premium", "BUXXA Pro"];
const bagCategories = [
  "Travel Bags",
  "Laptop Bags",
  "Backpacks",
  "Sling Bags",
  "Duffel Bags",
  "Organizer Pouches",
  "Corporate Collection",
  "New Arrivals"
];

for (let i = 11; i <= 35; i++) {
  const category = bagCategories[i % bagCategories.length];
  const brand = brands[i % brands.length];
  const price = parseFloat((999 + (i * 120)).toFixed(2));
  const oldPrice = i % 3 === 0 ? parseFloat((price * 1.35).toFixed(2)) : null;
  const rating = parseFloat((4.0 + (i % 10) * 0.1).toFixed(2));
  const reviewCount = 10 + (i * 3);
  const badge = i % 5 === 0 ? "Sale" : (i % 7 === 0 ? "New" : "");
  
  products.push({
    id: i,
    name: `${brand} Elite ${category.slice(0, -1)} Model-${i}`,
    slug: `elite-${brand.toLowerCase().replace(/ /g, "-")}-${category.toLowerCase().replace("&", "and").replace(/ /g, "-")}-model-${i}`,
    price: price,
    oldPrice: oldPrice,
    rating: rating,
    reviewCount: reviewCount,
    category: category,
    brand: brand,
    badge: badge,
    featured: i % 4 === 0,
    trending: i % 5 === 0,
    bestSeller: i % 6 === 0,
    newArrival: i % 7 === 0,
    onSale: oldPrice !== null,
    images: [
      defaultImages[i % defaultImages.length]
    ],
    description: `A premium bag from the ${brand} Elite series in the ${category} collection. Crafted with durable materials, heavy-duty zippers, and sleek design for modern daily lifestyle.`,
    specs: {
      "Model": `BUXAA-${i}`,
      "Brand": brand,
      "Category": category,
      "Warranty": "1 Year Manufacturer Warranty"
    },
    variants: {
      colors: [
        { name: "Navy Blue", hex: "#1A3DAA" },
        { name: "Charcoal Black", hex: "#111827" }
      ],
      sizes: ["Standard"]
    },
    reviews: []
  });
}
