const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 3000;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.json': 'application/json',
  '.woff2':'font/woff2',
  '.woff': 'font/woff',
  '.ttf':  'font/ttf',
  '.webp': 'image/webp',
};

// ── FILE PATH CONSTANTS ──
const PRODUCTS_FILE   = path.join(ROOT, 'products.json');
const ORDERS_FILE     = path.join(ROOT, 'orders.json');
const CUSTOMERS_FILE  = path.join(ROOT, 'customers.json');
const CATEGORIES_FILE = path.join(ROOT, 'categories.json');
const BRANDS_FILE     = path.join(ROOT, 'brands.json');

// ── DEFAULT DATA ──

const defaultProducts = [
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
    description: "<p>The BUXAA Voyager Backpack is your ultimate travel companion. Designed with high-density ballistic polyester, it provides excellent water resistance and durability. Features dedicated compartments for a 16-inch laptop, tablets, travel documents, and clothes. Perfect for week-long business trips or weekend getaways.</p>",
    seo: {
      title: "BUXAA Voyager Backpack - Travel Backpack",
      description: "Discover the premium BUXAA Voyager Backpack. 32L capacity, durable ballistic fabric, fits up to 16\" laptop.",
      keywords: ["travel backpack", "business bag", "BUXAA backpack"],
      slug: "buxaa-voyager-backpack",
      ogImage: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80"
    }
  },
  {
    id: 2,
    sku: "BX-WKD-02",
    name: "BUXAA Weekender Duffel",
    brand: "BUXAA",
    slug: "buxaa-weekender-duffel",
    subtitle: "Spacious and durable weekender duffel for short getaways",
    category: "duffel-bags",
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
    description: "<p>A classic duffel with modern organization. The Weekender Duffel features an isolated shoe pocket to keep your clothes clean, water-resistant interior lining, and heavy-duty brass hardware. Crafted from wax-coated heavy-duty canvas and premium vegan leather trims.</p>",
    seo: {
      title: "BUXAA Weekender Duffel Bag",
      description: "Premium 40L travel duffle bag by BUXAA. Includes shoe compartment and premium brass buckles.",
      keywords: ["duffle bag", "weekender bag", "travel duffel"],
      slug: "buxaa-weekender-duffel",
      ogImage: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=500&auto=format&fit=crop&q=80"
    }
  },
  {
    id: 3,
    sku: "BX-EXE-03",
    name: "BUXAA Executive Laptop Bag",
    brand: "BUXAA",
    slug: "buxaa-executive-laptop-bag",
    subtitle: "Elegant brief laptop bag designed for business professionals",
    category: "business-bags",
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
    description: "<p>Elevate your everyday office carry. The Executive Laptop Bag blends structured nylon panels with full-grain leather details. Features smart organizing slots for chargers, tablets, and cables, and slides easily onto any rolling suitcase handle.</p>",
    seo: {
      title: "BUXAA Executive Laptop Briefcase",
      description: "Slim professional laptop messenger bag with luggage strap and key hook.",
      keywords: ["laptop bag", "office briefcase", "messenger bag"],
      slug: "buxaa-executive-laptop-bag",
      ogImage: "https://images.unsplash.com/photo-1508847154043-be12a62861c1?w=500&auto=format&fit=crop&q=80"
    }
  },
  {
    id: 4,
    sku: "BX-CSB-04",
    name: "BUXAA Crossbody Sling Bag",
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
    description: "<p>A lightweight, quick-access sling built for active city walks and travels. Fits a kindle, phone, keys, wallet, and sunglasses with ease. Features a quick-release magnetic chest buckle and breathable back panel.</p>",
    seo: {
      title: "BUXAA Crossbody Sling Bag",
      description: "Secure, lightweight anti-theft sling bag with magnetic lock.",
      keywords: ["sling bag", "crossbody bag", "chest bag"],
      slug: "buxaa-crossbody-sling-bag",
      ogImage: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&auto=format&fit=crop&q=80"
    }
  },
  {
    id: 5,
    sku: "BX-TRV-05",
    name: "BUXAA Pro Traveler Suitcase",
    brand: "BUXAA",
    slug: "buxaa-pro-traveler-suitcase",
    subtitle: "Premium hard-shell travel case with TSA approved lock",
    category: "travel-collection",
    status: "active",
    isFeatured: true,
    price: 8999,
    originalPrice: 9999,
    discount: 10,
    sizes: ["Carry-On", "Check-In"],
    selectedSize: "Carry-On",
    variants: [
      { size: "Carry-On", price: 8999, stock: 20, sku: "BX-TRV-05-CO" },
      { size: "Check-In", price: 11999, stock: 15, sku: "BX-TRV-05-CI" }
    ],
    notes: {
      top: ["German Polycarbonate Shell"],
      heart: ["45L to 85L Expandable"],
      base: ["360° Whisper-Quiet Spinners, TSA Integrated Lock"]
    },
    scentFamily: "Polycarbonate",
    gender: "travel",
    concentration: "45L / 85L Capacity",
    rating: 4.9,
    reviews: 118,
    stock: 35,
    isNew: true,
    isBestseller: true,
    img: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=500&auto=format&fit=crop&q=80",
    imgs: [
      "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=500&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581553674786-636eaa2f1a6b?w=500&auto=format&fit=crop&q=80"
    ],
    description: "<p>Travel effortlessly with the BUXAA Pro Traveler. Built with a tough, lightweight polycarbonate outer shell designed to absorb impacts. High-performance dual spinner wheels roll smoothly over any surface. Complete with compression pads inside to double your packing volume.</p>",
    seo: {
      title: "BUXAA Pro Traveler Carry-On Suitcase",
      description: "Durable polycarbonate suitcase with TSA locks and Japanese Hinomoto spinner wheels.",
      keywords: ["suitcase", "luggage", "trolley bag", "BUXAA travel case"],
      slug: "buxaa-pro-traveler-suitcase",
      ogImage: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=500&auto=format&fit=crop&q=80"
    }
  },
  {
    id: 6,
    sku: "BX-PCH-06",
    name: "BUXAA Tech Organizer Pouch",
    brand: "BUXAA",
    slug: "buxaa-tech-organizer-pouch",
    subtitle: "Compact gadget and cable organizer for neat packing",
    category: "organizer-pouches",
    status: "active",
    isFeatured: false,
    price: 999,
    originalPrice: 1299,
    discount: 23,
    sizes: ["One Size"],
    selectedSize: "One Size",
    variants: [
      { size: "One Size", price: 999, stock: 60, sku: "BX-PCH-06-OS" }
    ],
    notes: {
      top: ["900D Water-resistant Polyester"],
      heart: ["2.5 Liters Capacity"],
      base: ["Elastic Cable Loops, Mesh Zipper Slots"]
    },
    scentFamily: "Polyester",
    gender: "commute",
    concentration: "2.5L Capacity",
    rating: 4.8,
    reviews: 43,
    stock: 60,
    isNew: false,
    isBestseller: false,
    img: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500&auto=format&fit=crop&q=80",
    imgs: [
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500&auto=format&fit=crop&q=80"
    ],
    description: "<p>Keep all your cables, chargers, power banks, and memory cards organized in one place. The BUXAA Tech Organizer features an origami-style folding structure to provide maximum packing space within a compact footprint.</p>",
    seo: {
      title: "BUXAA Tech Organizer Pouch",
      description: "Premium tech organizer pouch with elastic loops and zipper pockets.",
      keywords: ["tech pouch", "cable organizer", "travel case"],
      slug: "buxaa-tech-organizer-pouch",
      ogImage: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500&auto=format&fit=crop&q=80"
    }
  },
  {
    id: 7,
    sku: "BX-GFT-07",
    name: "BUXAA Elite Corporate Gift Set",
    brand: "BUXAA",
    slug: "buxaa-elite-corporate-gift-set",
    subtitle: "Premium dual-gift box including leather organizer & thermal mug",
    category: "corporate-gifting",
    status: "active",
    isFeatured: false,
    price: 4999,
    originalPrice: 5999,
    discount: 16,
    sizes: ["One Size"],
    selectedSize: "One Size",
    variants: [
      { size: "One Size", price: 4999, stock: 100, sku: "BX-GFT-07-OS" }
    ],
    notes: {
      top: ["Genuine Leather Accessories"],
      heart: ["Corporate Hardwood Giftbox"],
      base: ["Custom Name Engraving Available"]
    },
    scentFamily: "Leather",
    gender: "custom",
    concentration: "Custom Engraving",
    rating: 5.0,
    reviews: 12,
    stock: 100,
    isNew: true,
    isBestseller: false,
    img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop&q=80",
    imgs: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop&q=80"
    ],
    description: "<p>A high-end corporate gift set to honor your employees and partners. Includes a handcrafted top-grain leather notebook, a matching slim cardholder, and a double-walled insulated coffee mug. Packed inside an elegant wooden presentation case.</p>",
    seo: {
      title: "BUXAA Elite Corporate Gifting Sets",
      description: "Luxurious leather business diaries, thermal mugs and customized gifts by BUXAA.",
      keywords: ["corporate gifting", "executive gift", "customized office gifts"],
      slug: "buxaa-elite-corporate-gift-set",
      ogImage: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop&q=80"
    }
  }
];

const defaultCategories = [
  { id: 1, name: "Travel Bags", slug: "travel-collection", emoji: "✈️", img: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=300&auto=format&fit=crop&q=80", enabled: true, count: 12, subItems: ["Duffel Bags", "Weekender Bags", "Cabin Bags", "Travel Organizers"] },
  { id: 2, name: "Laptop Bags", slug: "business-bags", emoji: "💼", img: "https://images.unsplash.com/photo-1508847154043-be12a62861c1?w=300&auto=format&fit=crop&q=80", enabled: true, count: 8, subItems: ["Messenger Bags", "Executive Bags", "Laptop Sleeves", "Business Bags"] },
  { id: 3, name: "Backpacks", slug: "backpacks", emoji: "🎒", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&auto=format&fit=crop&q=80", enabled: true, count: 15, subItems: ["Laptop Backpacks", "Travel Backpacks", "Office Backpacks", "Casual Backpacks"] },
  { id: 4, name: "Sling Bags", slug: "sling-bags", emoji: "🧭", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&auto=format&fit=crop&q=80", enabled: true, count: 6, subItems: ["Crossbody Bags", "Mini Sling Bags", "Everyday Sling Bags", "Travel Sling Bags"] },
  { id: 5, name: "Duffel Bags", slug: "duffel-bags", emoji: "👜", img: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=300&auto=format&fit=crop&q=80", enabled: true, count: 10, subItems: ["Gym Bags", "Sports Duffels", "Shoe Bags", "Fitness Accessories"] },
  { id: 6, name: "Organizer Pouches", slug: "organizer-pouches", emoji: "📁", img: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=300&auto=format&fit=crop&q=80", enabled: true, count: 7, subItems: ["Gadget Organizers", "Cable Organizers", "Document Holders", "Utility Pouches"] },
  { id: 7, name: "Corporate Collection", slug: "corporate-gifting", emoji: "🎁", img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300&auto=format&fit=crop&q=80", enabled: true, count: 5, subItems: ["Custom Branding", "Corporate Gift Sets", "Promotional Bags", "Bulk Orders"] },
  { id: 8, name: "New Arrivals", slug: "new-arrivals", emoji: "✨", img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300&auto=format&fit=crop&q=80", enabled: true, count: 4, subItems: ["New Arrivals", "Bestsellers", "Premium Series", "Limited Edition"] }
];

const defaultBrands = [
  { id: 1, name: 'BUXAA', logo: '', tagline: 'Premium Bags & Luggage', enabled: true }
];

const defaultOrders = [
  { id: 'BXX-2401', customer: 'Priya Sharma',  email: 'priya@gmail.com',  date: '28 May 2026', items: 2, total: 8998,  status: 'delivered',  payment: 'paid',     city: 'Mumbai' },
  { id: 'BXX-2402', customer: 'Arjun Mehta',   email: 'arjun@gmail.com',  date: '27 May 2026', items: 1, total: 3799,  status: 'shipped',    payment: 'paid',     city: 'Delhi' },
  { id: 'BXX-2403', customer: 'Kavya Reddy',   email: 'kavya@gmail.com',  date: '27 May 2026', items: 3, total: 11297, status: 'processing', payment: 'paid',     city: 'Bangalore' },
  { id: 'BXX-2404', customer: 'Rohan Gupta',   email: 'rohan@gmail.com',  date: '26 May 2026', items: 1, total: 1999,  status: 'pending',    payment: 'pending',  city: 'Pune' }
];

// ── HELPER FUNCTIONS ──

function readJSON(file, defaults) {
  if (fs.existsSync(file)) {
    try {
      return JSON.parse(fs.readFileSync(file, 'utf8') || JSON.stringify(defaults));
    } catch (e) {
      return defaults;
    }
  }
  fs.writeFileSync(file, JSON.stringify(defaults, null, 2), 'utf8');
  return defaults;
}

function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      try {
        resolve(JSON.parse(body || '{}'));
      } catch (e) {
        reject(new Error('Invalid JSON body'));
      }
    });
    req.on('error', reject);
  });
}

function getDefaultImg(category) {
  const map = {
    women:      'images/prod-rose.png',
    men:        'images/prod-oud.png',
    unisex:     'images/prod-noir.png',
    'gift-sets':'images/hero3.png',
    oud:        'images/prod-velvet.png'
  };
  return map[category] || 'images/prod-rose.png';
}

// ── HTTP SERVER ──

const server = http.createServer(async (req, res) => {
  let urlPath = req.url.split('?')[0];

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // ── API ROUTES ──
  if (urlPath.startsWith('/api/')) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

    try {

      // ── PRODUCTS ──

      // GET /api/products
      if (urlPath === '/api/products' && req.method === 'GET') {
        const products = readJSON(PRODUCTS_FILE, defaultProducts);
        res.writeHead(200);
        res.end(JSON.stringify(products));
        return;
      }

      // POST /api/products/add
      if (urlPath === '/api/products/add' && req.method === 'POST') {
        const payload = await readBody(req);
        const products = readJSON(PRODUCTS_FILE, defaultProducts);

        const newId = products.reduce((max, p) => p.id > max ? p.id : max, 0) + 1;
        const slug = (payload.name || 'new-fragrance')
          .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const defaultImg = getDefaultImg(payload.category);

        // Handle notes: accept array or string format
        let notes = payload.notes || { top: ['Fresh Notes'], heart: ['Floral Notes'], base: ['Amber Notes'] };
        if (notes && !Array.isArray(notes.top)) {
          notes = {
            top:   typeof notes.top   === 'string' ? notes.top.split(',').map(s => s.trim())   : ['Fresh Notes'],
            heart: typeof notes.heart === 'string' ? notes.heart.split(',').map(s => s.trim()) : ['Floral Notes'],
            base:  typeof notes.base  === 'string' ? notes.base.split(',').map(s => s.trim())  : ['Amber Notes']
          };
        }

        // Handle variants
        const variants = Array.isArray(payload.variants) && payload.variants.length > 0
          ? payload.variants
          : (payload.sizes || ['50ml', '100ml']).map((size, i) => ({
              size,
              price: parseInt(payload.price) || 2999,
              stock: Math.floor((parseInt(payload.stock) || 50) / (payload.sizes ? payload.sizes.length : 2)),
              sku: `BXX-${String(newId).padStart(4, '0')}-${size.replace('ml','')}`
            }));

        // Handle imgs
        const imgs = Array.isArray(payload.imgs) && payload.imgs.length > 0
          ? payload.imgs
          : (payload.img ? [payload.img] : [defaultImg]);

        const newProduct = {
          id: newId,
          sku: payload.sku || `BUX-${String(newId).padStart(4, '0')}`,
          name: payload.name || 'New Product',
          brand: payload.brand || 'BUXAA',
          slug,
          subtitle: payload.subtitle || 'Premium Bag',
          category: payload.category || 'unisex',
          status: payload.status || 'active',
          isFeatured: payload.isFeatured !== undefined ? Boolean(payload.isFeatured) : Boolean(payload.isBestseller),
          price: parseInt(payload.price) || 2999,
          originalPrice: payload.originalPrice ? parseInt(payload.originalPrice) : null,
          discount: payload.originalPrice
            ? Math.round(((parseInt(payload.originalPrice) - parseInt(payload.price)) / parseInt(payload.originalPrice)) * 100)
            : 0,
          sizes: payload.sizes || ['Standard'],
          selectedSize: payload.sizes ? payload.sizes[0] : 'Standard',
          variants,
          notes,
          scentFamily: payload.scentFamily || 'floral',
          gender: payload.gender || 'unisex',
          concentration: payload.concentration || 'Eau de Parfum',
          rating: 5.0,
          reviews: 0,
          stock: parseInt(payload.stock) || 50,
          isNew: true,
          isNewArrival: true,
          isBestseller: Boolean(payload.isBestseller),
          img: payload.img || defaultImg,
          imgs,
          description: payload.description || '<p>A brand new addition to our premium collection.</p>',
          seo: payload.seo || {
            title: `${payload.name || 'New Product'} | BUXAA`,
            description: payload.subtitle || 'Premium BUXAA product',
            keywords: [slug, 'BUXAA', 'bag'],
            slug,
            ogImage: payload.img || defaultImg
          }
        };

        products.push(newProduct);
        writeJSON(PRODUCTS_FILE, products);

        res.writeHead(200);
        res.end(JSON.stringify({ success: true, product: newProduct }));
        return;
      }

      // POST /api/products/update
      if (urlPath === '/api/products/update' && req.method === 'POST') {
        const payload = await readBody(req);
        const products = readJSON(PRODUCTS_FILE, defaultProducts);
        const idx = products.findIndex(p => p.id === parseInt(payload.id));
        if (idx !== -1) {
          const p = products[idx];

          // Handle notes arrays
          let notes = payload.notes;
          if (notes && !Array.isArray(notes.top)) {
            notes = {
              top:   typeof notes.top   === 'string' ? notes.top.split(',').map(s => s.trim())   : p.notes.top,
              heart: typeof notes.heart === 'string' ? notes.heart.split(',').map(s => s.trim()) : p.notes.heart,
              base:  typeof notes.base  === 'string' ? notes.base.split(',').map(s => s.trim())  : p.notes.base
            };
          }

          products[idx] = {
            ...p,
            name:          payload.name          || p.name,
            sku:           payload.sku            || p.sku,
            brand:         payload.brand          || p.brand,
            subtitle:      payload.subtitle       || p.subtitle,
            category:      payload.category       || p.category,
            status:        payload.status         !== undefined ? payload.status         : p.status,
            isFeatured:    payload.isFeatured     !== undefined ? Boolean(payload.isFeatured) : p.isFeatured,
            isBestseller:  payload.isBestseller   !== undefined ? Boolean(payload.isBestseller) : p.isBestseller,
            isNewArrival:  payload.isNewArrival   !== undefined ? Boolean(payload.isNewArrival) : p.isNewArrival,
            isNew:         payload.isNewArrival   !== undefined ? Boolean(payload.isNewArrival) : p.isNew,
            price:         payload.price          ? parseInt(payload.price)  : p.price,
            originalPrice: payload.originalPrice  ? parseInt(payload.originalPrice) : null,
            discount:      payload.originalPrice
              ? Math.round(((parseInt(payload.originalPrice) - (parseInt(payload.price) || p.price)) / parseInt(payload.originalPrice)) * 100)
              : 0,
            stock:         payload.stock          !== undefined ? parseInt(payload.stock) : p.stock,
            description:   payload.description    || p.description,
            gender:        payload.gender         || p.gender,
            scentFamily:   payload.scentFamily    || p.scentFamily,
            concentration: payload.concentration  || p.concentration,
            notes:         notes                  || p.notes,
            sizes:         payload.sizes          || p.sizes,
            variants:      payload.variants       || p.variants,
            img:           payload.img            || p.img,
            imgs:          payload.imgs           || p.imgs,
            seo:           payload.seo            || p.seo
          };

          writeJSON(PRODUCTS_FILE, products);
          res.writeHead(200);
          res.end(JSON.stringify({ success: true }));
          return;
        }
        res.writeHead(404);
        res.end(JSON.stringify({ success: false, message: 'Product not found' }));
        return;
      }

      // POST /api/products/delete
      if (urlPath === '/api/products/delete' && req.method === 'POST') {
        const { id } = await readBody(req);
        const products = readJSON(PRODUCTS_FILE, defaultProducts);
        const filtered = products.filter(p => p.id !== parseInt(id));
        if (filtered.length !== products.length) {
          writeJSON(PRODUCTS_FILE, filtered);
          res.writeHead(200);
          res.end(JSON.stringify({ success: true }));
          return;
        }
        res.writeHead(404);
        res.end(JSON.stringify({ success: false, message: 'Product not found' }));
        return;
      }

      // ── IMAGE UPLOAD ──

      // POST /api/upload-image
      if (urlPath === '/api/upload-image' && req.method === 'POST') {
        const { filename, base64 } = await readBody(req);

        if (!filename || !base64) {
          res.writeHead(400);
          res.end(JSON.stringify({ success: false, message: 'filename and base64 are required' }));
          return;
        }

        const ext = path.extname(filename).toLowerCase();
        const allowed = ['.jpg', '.jpeg', '.png', '.webp'];
        if (!allowed.includes(ext)) {
          res.writeHead(400);
          res.end(JSON.stringify({ success: false, message: 'Only .jpg, .jpeg, .png, .webp files are allowed' }));
          return;
        }

        // Strip data URI prefix if present
        const base64Data = base64.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');

        // Max 5 MB
        if (buffer.length > 5 * 1024 * 1024) {
          res.writeHead(400);
          res.end(JSON.stringify({ success: false, message: 'File size exceeds 5MB limit' }));
          return;
        }

        const safeName = path.basename(filename).replace(/[^a-zA-Z0-9._-]/g, '_');
        const uniqueName = `upload-${Date.now()}-${safeName}`;
        const imagesDir = path.join(ROOT, 'images');

        if (!fs.existsSync(imagesDir)) {
          fs.mkdirSync(imagesDir, { recursive: true });
        }

        const destPath = path.join(imagesDir, uniqueName);
        fs.writeFileSync(destPath, buffer);

        res.writeHead(200);
        res.end(JSON.stringify({ success: true, path: `images/${uniqueName}` }));
        return;
      }

      // ── AUTH ──

      // POST /api/auth/login
      if (urlPath === '/api/auth/login' && req.method === 'POST') {
        const { email, password } = await readBody(req);
        if (email === 'admin@buxaa.com' && password === 'admin123') {
          res.writeHead(200);
          res.end(JSON.stringify({
            success: true,
            token: 'buxaa-mock-admin-session-token',
            user: { name: 'BUXAA Admin', email: 'admin@buxaa.com', role: 'admin' }
          }));
        } else {
          res.writeHead(401);
          res.end(JSON.stringify({ success: false, message: 'Invalid email or password' }));
        }
        return;
      }

      // ── ORDERS ──

      // GET /api/orders
      if (urlPath === '/api/orders' && req.method === 'GET') {
        const orders = readJSON(ORDERS_FILE, defaultOrders);
        res.writeHead(200);
        res.end(JSON.stringify(orders));
        return;
      }

      // POST /api/orders
      if (urlPath === '/api/orders' && req.method === 'POST') {
        const newOrder = await readBody(req);
        const orders = readJSON(ORDERS_FILE, defaultOrders);

        const orderNum = 2400 + orders.length + 1;
        const orderId = `BXX-${orderNum}`;

        const date = new Date().toLocaleDateString('en-IN', {
          day: 'numeric', month: 'short', year: 'numeric'
        });

        const savedOrder = {
          id: orderId,
          customer: newOrder.customer || 'Guest Customer',
          email: newOrder.email || '',
          date,
          items: newOrder.itemsCount || 0,
          itemsDetails: newOrder.items || [],
          total: newOrder.total || 0,
          status: 'pending',
          payment: newOrder.paymentMethod === 'cod' ? 'pending' : 'paid',
          city: newOrder.city || '',
          address: `${newOrder.address1 || ''}, ${newOrder.city || ''}, ${newOrder.state || ''} - ${newOrder.pincode || ''}`
        };

        orders.unshift(savedOrder);
        writeJSON(ORDERS_FILE, orders);

        res.writeHead(200);
        res.end(JSON.stringify({ success: true, orderId }));
        return;
      }

      // POST /api/orders/update-status
      if (urlPath === '/api/orders/update-status' && req.method === 'POST') {
        const { orderId, status } = await readBody(req);
        const orders = readJSON(ORDERS_FILE, defaultOrders);
        const order = orders.find(o => o.id === orderId);
        if (order) {
          order.status = status;
          if (status === 'delivered') order.payment = 'paid';
          writeJSON(ORDERS_FILE, orders);
          res.writeHead(200);
          res.end(JSON.stringify({ success: true }));
          return;
        }
        res.writeHead(404);
        res.end(JSON.stringify({ success: false, message: 'Order not found' }));
        return;
      }

      // ── CUSTOMERS ──

      // GET /api/customers
      if (urlPath === '/api/customers' && req.method === 'GET') {
        const customers = readJSON(CUSTOMERS_FILE, []);
        res.writeHead(200);
        res.end(JSON.stringify(customers));
        return;
      }

      // POST /api/customers/register
      if (urlPath === '/api/customers/register' && req.method === 'POST') {
        const payload = await readBody(req);

        if (!payload.email || !payload.firstName) {
          res.writeHead(400);
          res.end(JSON.stringify({ success: false, message: 'Missing required fields' }));
          return;
        }

        const customers = readJSON(CUSTOMERS_FILE, []);
        const emailExists = customers.some(c => c.email.toLowerCase() === payload.email.toLowerCase());
        if (emailExists) {
          res.writeHead(400);
          res.end(JSON.stringify({ success: false, message: 'Email address already registered' }));
          return;
        }

        const newId = customers.reduce((max, c) => c.id > max ? c.id : max, 0) + 1;
        const date = new Date().toLocaleDateString('en-IN', {
          day: 'numeric', month: 'short', year: 'numeric'
        });

        const newCustomer = {
          id: newId,
          name: `${payload.firstName} ${payload.lastName || ''}`.trim(),
          email: payload.email,
          phone: payload.phone || '',
          city: payload.city || 'Not specified',
          joined: date
        };

        customers.unshift(newCustomer);
        writeJSON(CUSTOMERS_FILE, customers);

        res.writeHead(200);
        res.end(JSON.stringify({ success: true, customer: newCustomer }));
        return;
      }

      // ── CATEGORIES ──

      // GET /api/categories
      if (urlPath === '/api/categories' && req.method === 'GET') {
        const categories = readJSON(CATEGORIES_FILE, defaultCategories);
        res.writeHead(200);
        res.end(JSON.stringify(categories));
        return;
      }

      // POST /api/categories/add
      if (urlPath === '/api/categories/add' && req.method === 'POST') {
        const payload = await readBody(req);
        const categories = readJSON(CATEGORIES_FILE, defaultCategories);

        const newId = categories.reduce((max, c) => c.id > max ? c.id : max, 0) + 1;
        const slug = (payload.name || 'category')
          .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

        const newCategory = {
          id: newId,
          name: payload.name || 'New Category',
          slug: payload.slug || slug,
          emoji: payload.emoji || '✨',
          img: payload.img || 'images/prod-rose.png',
          enabled: payload.enabled !== undefined ? Boolean(payload.enabled) : true,
          count: parseInt(payload.count) || 0,
          subItems: Array.isArray(payload.subItems) ? payload.subItems : []
        };

        categories.push(newCategory);
        writeJSON(CATEGORIES_FILE, categories);

        res.writeHead(200);
        res.end(JSON.stringify({ success: true, category: newCategory }));
        return;
      }

      // POST /api/categories/update
      if (urlPath === '/api/categories/update' && req.method === 'POST') {
        const payload = await readBody(req);
        const categories = readJSON(CATEGORIES_FILE, defaultCategories);
        const idx = categories.findIndex(c => c.id === parseInt(payload.id));
        if (idx !== -1) {
          categories[idx] = { ...categories[idx], ...payload, id: categories[idx].id };
          writeJSON(CATEGORIES_FILE, categories);
          res.writeHead(200);
          res.end(JSON.stringify({ success: true }));
          return;
        }
        res.writeHead(404);
        res.end(JSON.stringify({ success: false, message: 'Category not found' }));
        return;
      }

      // POST /api/categories/delete
      if (urlPath === '/api/categories/delete' && req.method === 'POST') {
        const { id } = await readBody(req);
        const categories = readJSON(CATEGORIES_FILE, defaultCategories);
        const filtered = categories.filter(c => c.id !== parseInt(id));
        writeJSON(CATEGORIES_FILE, filtered);
        res.writeHead(200);
        res.end(JSON.stringify({ success: true }));
        return;
      }

      // ── BRANDS ──

      // GET /api/brands
      if (urlPath === '/api/brands' && req.method === 'GET') {
        const brands = readJSON(BRANDS_FILE, defaultBrands);
        res.writeHead(200);
        res.end(JSON.stringify(brands));
        return;
      }

      // POST /api/brands/add
      if (urlPath === '/api/brands/add' && req.method === 'POST') {
        const payload = await readBody(req);
        const brands = readJSON(BRANDS_FILE, defaultBrands);

        const newId = brands.reduce((max, b) => b.id > max ? b.id : max, 0) + 1;

        const newBrand = {
          id: newId,
          name: payload.name || 'New Brand',
          logo: payload.logo || '',
          tagline: payload.tagline || '',
          enabled: payload.enabled !== undefined ? Boolean(payload.enabled) : true
        };

        brands.push(newBrand);
        writeJSON(BRANDS_FILE, brands);

        res.writeHead(200);
        res.end(JSON.stringify({ success: true, brand: newBrand }));
        return;
      }

      // POST /api/brands/update
      if (urlPath === '/api/brands/update' && req.method === 'POST') {
        const payload = await readBody(req);
        const brands = readJSON(BRANDS_FILE, defaultBrands);
        const idx = brands.findIndex(b => b.id === parseInt(payload.id));
        if (idx !== -1) {
          brands[idx] = { ...brands[idx], ...payload, id: brands[idx].id };
          writeJSON(BRANDS_FILE, brands);
          res.writeHead(200);
          res.end(JSON.stringify({ success: true }));
          return;
        }
        res.writeHead(404);
        res.end(JSON.stringify({ success: false, message: 'Brand not found' }));
        return;
      }

      // POST /api/brands/delete
      if (urlPath === '/api/brands/delete' && req.method === 'POST') {
        const { id } = await readBody(req);
        const brands = readJSON(BRANDS_FILE, defaultBrands);
        const filtered = brands.filter(b => b.id !== parseInt(id));
        writeJSON(BRANDS_FILE, filtered);
        res.writeHead(200);
        res.end(JSON.stringify({ success: true }));
        return;
      }

      // ── 404 FALLBACK FOR UNKNOWN API ROUTES ──
      res.writeHead(404);
      res.end(JSON.stringify({ success: false, message: 'API endpoint not found' }));
      return;

    } catch (err) {
      console.error('[API Error]', err.message);
      res.writeHead(500);
      res.end(JSON.stringify({ success: false, message: 'Internal server error: ' + err.message }));
      return;
    }
  }

  // ── STATIC FILE SERVING ──

  if (urlPath === '/') urlPath = '/index.html';

  const filePath = path.join(ROOT, urlPath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Page Not Found</h1><a href="/">Go Home</a>');
      } else {
        res.writeHead(500);
        res.end('Server Error');
      }
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log('\n✨ BUXAA is running!');
  console.log(`\n   → Local:   ${url}`);
  console.log(`   → Admin:   ${url}/admin.html`);
  console.log(`   → Shop:    ${url}/shop.html`);
  console.log('\n   Press Ctrl+C to stop\n');

  // Auto-open browser
  const start = process.platform === 'win32' ? 'start' :
                process.platform === 'darwin' ? 'open' : 'xdg-open';
  exec(`${start} ${url}`);
});
