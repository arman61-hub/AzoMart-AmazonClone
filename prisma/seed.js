const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");
require("dotenv").config();

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in environment variables.");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const categoriesData = [
  { name: "Electronics", slug: "electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&auto=format&fit=crop&q=60" },
  { name: "Books", slug: "books", image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&auto=format&fit=crop&q=60" },
  { name: "Fashion", slug: "fashion", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&auto=format&fit=crop&q=60" },
  { name: "Home & Kitchen", slug: "home-kitchen", image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&auto=format&fit=crop&q=60" },
  { name: "Sports & Outdoors", slug: "sports-outdoors", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&auto=format&fit=crop&q=60" },
  { name: "Beauty & Personal Care", slug: "beauty", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&auto=format&fit=crop&q=60" },
];

const productsData = [
  // ==================== ELECTRONICS ====================
  {
    categorySlug: "electronics",
    title: "AzoWatch Pro Fitness Smartwatch",
    slug: "azowatch-pro-fitness-smartwatch",
    description: "Advanced health tracking with AMOLED display, SpO2, GPS, and 12-day battery.",
    price: 4999.00,
    originalPrice: 7999.00,
    discount: 37,
    brand: "AzoWatch",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800&auto=format&fit=crop&q=80"
    ],
    stock: 30,
    features: ["AMOLED Display", "Heart Rate + SpO2", "Built-in GPS"],
    isFeatured: true,
    reviews: [
      { userName: "Rohit Verma", rating: 5, title: "Excellent", comment: "Battery life is outstanding. Tracking is very accurate." },
      { userName: "Neha Kapoor", rating: 4, title: "Great value", comment: "Display is bright and features are useful for daily fitness." },
    ],
  },
  {
    categorySlug: "electronics",
    title: "VividView 4K Ultra HD Projector",
    slug: "vividview-4k-ultra-hd-projector",
    description: "Transform your room into a cinema with native 4K and 3000 lumens brightness.",
    price: 34999.00,
    originalPrice: 49999.00,
    discount: 30,
    brand: "VividView",
    images: ["https://images.unsplash.com/photo-1535016120720-40c646be5580?w=800&auto=format&fit=crop&q=80"],
    stock: 8,
    features: ["Native 4K", "3000 ANSI Lumens", "Dolby Audio"],
    isFeatured: false,
    reviews: [
      { userName: "Vikram Singh", rating: 5, title: "Movie Night Upgrade", comment: "Picture quality is stunning even in daylight." },
    ],
  },
  {
    categorySlug: "electronics",
    title: "AzoCharge 20000mAh Fast Power Bank",
    slug: "azocharge-20000mah-power-bank",
    description: "High-capacity power bank with 22.5W fast charging and LED display.",
    price: 1499.00,
    originalPrice: 2499.00,
    discount: 40,
    brand: "AzoCharge",
    images: ["https://images.unsplash.com/photo-1614399113305-a127bb2ca893?w=800&auto=format&fit=crop&q=80"],
    stock: 50,
    features: ["20000mAh", "22.5W PD", "LED Display"],
    isFeatured: false,
    reviews: [
      { userName: "Aniket Sharma", rating: 5, title: "Very Reliable", comment: "Charges my phone multiple times. Build quality is solid." },
    ],
  },
  {
    categorySlug: "electronics",
    title: "ErgoClick Wireless Mechanical Keyboard",
    slug: "ergoclick-wireless-mechanical-keyboard",
    description: "Compact 75% mechanical keyboard with RGB lighting and hot-swappable switches.",
    price: 3999.00,
    originalPrice: 5999.00,
    discount: 33,
    brand: "ErgoClick",
    images: ["https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80"],
    stock: 15,
    features: ["Hot-swappable", "RGB Backlight", "Triple Connectivity"],
    isFeatured: false,
    reviews: [
      { userName: "Deepak Malhotra", rating: 5, title: "Typing feels premium", comment: "Switches are smooth and battery lasts long." },
    ],
  },
  {
    categorySlug: "electronics",
    title: "Sony WH-1000XM5 Wireless Headphones",
    slug: "sony-wh-1000xm5-headphones",
    description: "Industry-leading noise cancelling headphones with premium audio.",
    price: 24999.00,
    originalPrice: 29999.00,
    discount: 17,
    brand: "Sony",
    images: [
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80"
    ],
    stock: 25,
    features: ["Active Noise Cancellation", "40H Battery", "Bluetooth 5.2"],
    isFeatured: true,
    reviews: [
      { userName: "Aarav Mehta", rating: 5, title: "Superb Sound", comment: "Best headphones in this range!" },
      { userName: "Priya Sharma", rating: 4, title: "Very Comfortable", comment: "Noise cancellation works great." },
      { userName: "Siddharth Rao", rating: 5, title: "Worth every rupee", comment: "Audio quality is crystal clear." },
    ],
  },

  // ==================== BOOKS ====================
  {
    categorySlug: "books",
    title: "Atomic Habits by James Clear",
    slug: "atomic-habits-james-clear",
    description: "The million-copy bestseller on building good habits and breaking bad ones.",
    price: 399.00,
    originalPrice: 799.00,
    discount: 50,
    brand: "Penguin Random House",
    images: ["https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&auto=format&fit=crop&q=80"],
    stock: 100,
    features: [],
    isFeatured: true,
    reviews: [
      { userName: "Sonia G.", rating: 5, title: "Life Changing", comment: "Best book I’ve ever read." },
      { userName: "Karan Malhotra", rating: 5, title: "Highly Practical", comment: "Small changes, big results. Must read!" },
    ],
  },
  {
    categorySlug: "books",
    title: "Deep Work by Cal Newport",
    slug: "deep-work-cal-newport",
    description: "Rules for focused success in a distracted world.",
    price: 349.00,
    originalPrice: 599.00,
    discount: 41,
    brand: "Grand Central Publishing",
    images: ["https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80"],
    stock: 80,
    features: [],
    isFeatured: false,
    reviews: [
      { userName: "Rohan Das", rating: 5, title: "Game Changer", comment: "Helped me focus better while working from home." },
    ],
  },
  {
    categorySlug: "books",
    title: "The Psychology of Money by Morgan Housel",
    slug: "the-psychology-of-money-morgan-housel",
    description: "Timeless lessons on wealth and happiness.",
    price: 299.00,
    originalPrice: 499.00,
    discount: 40,
    brand: "Jaico Publishing House",
    images: ["https://images.unsplash.com/photo-1614849963640-9cc74b2a826f?w=800&auto=format&fit=crop&q=80"],
    stock: 120,
    features: [],
    isFeatured: true,
    reviews: [
      { userName: "Sunita Reddy", rating: 5, title: "Eye Opening", comment: "Changed how I think about saving and investing." },
    ],
  },
  {
    categorySlug: "books",
    title: "Sapiens: A Brief History of Humankind",
    slug: "sapiens-brief-history-humankind",
    description: "A groundbreaking exploration of human history.",
    price: 449.00,
    originalPrice: 899.00,
    discount: 50,
    brand: "Vintage Books",
    images: ["https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80"],
    stock: 60,
    features: [],
    isFeatured: false,
    reviews: [
      { userName: "Rajesh Kumar", rating: 4, title: "Mind Expanding", comment: "Very informative and well written." },
    ],
  },
  {
    categorySlug: "books",
    title: "Rich Dad Poor Dad by Robert Kiyosaki",
    slug: "rich-dad-poor-dad-robert-kiyosaki",
    description: "What the rich teach their kids about money.",
    price: 249.00,
    originalPrice: 499.00,
    discount: 50,
    brand: "Warner Books",
    images: ["https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800&auto=format&fit=crop&q=80"],
    stock: 90,
    features: [],
    isFeatured: false,
    reviews: [
      { userName: "Vijay Mehra", rating: 5, title: "Financial Awakening", comment: "Everyone should read this book." },
    ],
  },

  // ==================== FASHION ====================
  {
    categorySlug: "fashion",
    title: "AzoFit Men's Premium Cotton Slim T-Shirt",
    slug: "azofit-mens-premium-cotton-tshirt",
    description: "Ultra-soft combed cotton with perfect slim fit.",
    price: 699.00,
    originalPrice: 1299.00,
    discount: 46,
    brand: "AzoFit",
    images: ["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80"],
    stock: 150,
    features: ["180 GSM", "Pre-shrunk"],
    isFeatured: true,
    reviews: [
      { userName: "Rahul Nair", rating: 5, title: "Perfect Fit", comment: "Soft fabric and great quality." },
      { userName: "Pooja Sharma", rating: 4, title: "Good purchase", comment: "Bought for my husband, he loved it." },
    ],
  },
  {
    categorySlug: "fashion",
    title: "AzoWalk Men's Lightweight Running Shoes",
    slug: "azowalk-mens-lightweight-running-shoes",
    description: "Breathable mesh running shoes with excellent cushioning.",
    price: 1899.00,
    originalPrice: 3499.00,
    discount: 45,
    brand: "AzoWalk",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80"
    ],
    stock: 45,
    features: [],
    isFeatured: true,
    reviews: [
      { userName: "Sachin Tendulkar", rating: 5, title: "Very Comfortable", comment: "Great for daily runs." },
    ],
  },
  {
    categorySlug: "fashion",
    title: "VogueFit Women's High-Waist Yoga Leggings",
    slug: "voguefit-womens-highwaist-yoga-leggings",
    description: "Buttery soft, squat-proof compression leggings.",
    price: 999.00,
    originalPrice: 1999.00,
    discount: 50,
    brand: "VogueFit",
    images: ["https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=800&auto=format&fit=crop&q=80"],
    stock: 80,
    features: [],
    isFeatured: false,
    reviews: [
      { userName: "Meera Sen", rating: 5, title: "Super Soft", comment: "Best leggings I have bought." },
    ],
  },
  {
    categorySlug: "fashion",
    title: "ChicStyle Polarized Wayfarer Sunglasses",
    slug: "chicstyle-polarized-wayfarer-sunglasses",
    description: "Classic style with UV400 polarized protection.",
    price: 1299.00,
    originalPrice: 2499.00,
    discount: 48,
    brand: "ChicStyle",
    images: ["https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80"],
    stock: 60,
    features: [],
    isFeatured: false,
    reviews: [],
  },
  {
    categorySlug: "fashion",
    title: "AzoLeather Men's Genuine Leather Wallet",
    slug: "azoleather-mens-premium-bifold-leather-wallet",
    description: "RFID blocking premium bifold leather wallet.",
    price: 899.00,
    originalPrice: 1599.00,
    discount: 43,
    brand: "AzoLeather",
    images: ["https://images.unsplash.com/photo-1614330315526-166f2d71e544?w=800&auto=format&fit=crop&q=80"],
    stock: 75,
    features: [],
    isFeatured: false,
    reviews: [
      { userName: "Arjun Patel", rating: 5, title: "Premium Feel", comment: "Looks and feels expensive." },
    ],
  },
  {
    categorySlug: "fashion",
    title: "UrbanVibe Oversized Hoodie for Men",
    slug: "urbanvibe-oversized-hoodie-men",
    description: "Premium fleece oversized hoodie for casual street style.",
    price: 1499.00,
    originalPrice: 2499.00,
    discount: 40,
    brand: "UrbanVibe",
    images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop&q=80"],
    stock: 55,
    features: [],
    isFeatured: false,
    reviews: [],
  },

  // ==================== HOME & KITCHEN ====================
  {
    categorySlug: "home-kitchen",
    title: "AzoBrew Smart Drip Coffee Maker",
    slug: "azobrew-smart-drip-coffee-maker",
    description: "Programmable 12-cup coffee maker with bold flavor control.",
    price: 3499.00,
    originalPrice: 5999.00,
    discount: 41,
    brand: "AzoBrew",
    images: ["https://plus.unsplash.com/premium_photo-1671379498511-80aabd92e69f?w=800&auto=format&fit=crop&q=80"],
    stock: 20,
    features: ["Programmable", "12-Cup Carafe"],
    isFeatured: true,
    reviews: [
      { userName: "Devika Nair", rating: 5, title: "Perfect Mornings", comment: "Brews excellent coffee every time." },
    ],
  },
  {
    categorySlug: "home-kitchen",
    title: "PureFlow HEPA Air Purifier",
    slug: "pureflow-hepa-air-purifier",
    description: "True HEPA filter for large rooms up to 350 sq ft.",
    price: 7999.00,
    originalPrice: 12999.00,
    discount: 38,
    brand: "PureFlow",
    images: ["https://plus.unsplash.com/premium_photo-1711051351811-9a78bf59453a?w=800&auto=format&fit=crop&q=80"],
    stock: 12,
    features: [],
    isFeatured: false,
    reviews: [
      { userName: "Preeti Gupta", rating: 4, title: "Helps with pollution", comment: "Very useful in Delhi winters." },
    ],
  },
  {
    categorySlug: "home-kitchen",
    title: "SleekSteel 1L Stainless Steel Flask",
    slug: "sleeksteel-insulated-stainless-steel-flask",
    description: "Double-wall vacuum insulated flask keeps drinks hot/cold for hours.",
    price: 799.00,
    originalPrice: 1499.00,
    discount: 46,
    brand: "SleekSteel",
    images: ["https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80"],
    stock: 100,
    features: [],
    isFeatured: false,
    reviews: [
      { userName: "Manish Verma", rating: 5, title: "Keeps hot for long", comment: "Best flask I have used." },
    ],
  },
  {
    categorySlug: "home-kitchen",
    title: "Instant Pot 7-in-1 Electric Pressure Cooker",
    slug: "instant-pot-7-in-1-pressure-cooker",
    description: "Multi-functional pressure cooker, slow cooker, and more.",
    price: 5499.00,
    originalPrice: 8999.00,
    discount: 39,
    brand: "Instant Pot",
    images: ["https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?w=800&auto=format&fit=crop&q=80"],
    stock: 22,
    features: [],
    isFeatured: false,
    reviews: [],
  },

  // ==================== SPORTS & OUTDOORS ====================
  {
    categorySlug: "sports-outdoors",
    title: "AzoGrip Non-Slip TPE Yoga Mat",
    slug: "azogrip-nonslip-tpe-yoga-mat",
    description: "Eco-friendly 6mm thick yoga mat with excellent grip.",
    price: 999.00,
    originalPrice: 1999.00,
    discount: 50,
    brand: "AzoGrip",
    images: ["https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=800&auto=format&fit=crop&q=80"],
    stock: 60,
    features: [],
    isFeatured: true,
    reviews: [
      { userName: "Kriti Sharma", rating: 5, title: "Non-slip & Comfortable", comment: "Great for home yoga sessions." },
    ],
  },
  {
    categorySlug: "sports-outdoors",
    title: "FlexFit Adjustable Dumbbell Set 20kg",
    slug: "flexfit-adjustable-dumbbell-20kg",
    description: "Versatile adjustable dumbbells for home workouts.",
    price: 2499.00,
    originalPrice: 4999.00,
    discount: 50,
    brand: "FlexFit",
    images: ["https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=800&auto=format&fit=crop&q=80"],
    stock: 15,
    features: [],
    isFeatured: true,
    reviews: [
      { userName: "Harsh Lohia", rating: 5, title: "Good Quality", comment: "Perfect for home gym." },
    ],
  },
  {
    categorySlug: "sports-outdoors",
    title: "TrailBuddy 30L Hiking Backpack",
    slug: "trailbuddy-30l-hiking-backpack",
    description: "Water-resistant hiking backpack with hydration bladder.",
    price: 1799.00,
    originalPrice: 2999.00,
    discount: 40,
    brand: "TrailBuddy",
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80"],
    stock: 25,
    features: [],
    isFeatured: false,
    reviews: [],
  },
  {
    categorySlug: "sports-outdoors",
    title: "AzoSpeed 21-Speed Mountain Bicycle",
    slug: "azospeed-21-speed-mountain-bicycle",
    description: "Aluminum frame mountain bike with disc brakes.",
    price: 15999.00,
    originalPrice: 24999.00,
    discount: 36,
    brand: "AzoSpeed",
    images: ["https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&auto=format&fit=crop&q=80"],
    stock: 5,
    features: [],
    isFeatured: false,
    reviews: [],
  },
  {
    categorySlug: "sports-outdoors",
    title: "ProStrike Badminton Racket Set",
    slug: "prostrike-badminton-racket-set",
    description: "Lightweight carbon fiber badminton rackets with shuttlecocks.",
    price: 1299.00,
    originalPrice: 2199.00,
    discount: 41,
    brand: "ProStrike",
    images: ["https://images.unsplash.com/photo-1559309106-ed14040fd35d?w=800&auto=format&fit=crop&q=80"],
    stock: 35,
    features: [],
    isFeatured: false,
    reviews: [
      { userName: "Aanya Reddy", rating: 4, title: "Good for beginners", comment: "Lightweight and comfortable grip." },
    ],
  },

  // ==================== BEAUTY & PERSONAL CARE ====================
  {
    categorySlug: "beauty",
    title: "AzoGlow Vitamin C Face Serum",
    slug: "azoglow-vitamin-c-face-serum",
    description: "Brightening serum with 20% Vitamin C and Hyaluronic Acid.",
    price: 499.00,
    originalPrice: 999.00,
    discount: 50,
    brand: "AzoGlow",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1608248597481-496100c80836?w=800&auto=format&fit=crop&q=80"
    ],
    stock: 120,
    features: ["20% Vitamin C", "Vegan", "Cruelty-Free"],
    isFeatured: true,
    reviews: [
      { userName: "Anjali Sharma", rating: 5, title: "Glowing Skin", comment: "Visible difference in 2 weeks." },
      { userName: "Ritu Mehra", rating: 4, title: "Lightweight", comment: "Absorbs quickly, no stickiness." },
    ],
  },
  {
    categorySlug: "beauty",
    title: "AzoTrim Professional Beard Trimmer",
    slug: "azotrim-professional-beard-trimmer",
    description: "Cordless beard trimmer with 39 length settings.",
    price: 1999.00,
    originalPrice: 3499.00,
    discount: 42,
    brand: "AzoTrim",
    images: ["https://images.unsplash.com/photo-1621607512214-68297480165e?w=800&auto=format&fit=crop&q=80"],
    stock: 35,
    features: [],
    isFeatured: true,
    reviews: [
      { userName: "Deepak Verma", rating: 5, title: "Precise Trimming", comment: "Battery backup is excellent." },
    ],
  },
  {
    categorySlug: "beauty",
    title: "NourishHair Organic Argan Oil Shampoo",
    slug: "nourishhair-organic-argan-oil-shampoo",
    description: "Sulfate-free shampoo with Moroccan Argan Oil.",
    price: 599.00,
    originalPrice: 999.00,
    discount: 40,
    brand: "NourishHair",
    images: ["https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800&auto=format&fit=crop&q=80"],
    stock: 90,
    features: [],
    isFeatured: false,
    reviews: [
      { userName: "Tanya Patel", rating: 5, title: "Hair feels softer", comment: "Reduced frizz noticeably." },
    ],
  },
  {
    categorySlug: "beauty",
    title: "LumiSkin 24K Gold Face Mask Pack",
    slug: "lumiskin-24k-gold-face-mask",
    description: "Hydrating and brightening gold facial mask sheets.",
    price: 399.00,
    originalPrice: 799.00,
    discount: 50,
    brand: "LumiSkin",
    images: ["https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop&q=80"],
    stock: 70,
    features: [],
    isFeatured: false,
    reviews: [],
  },
];

async function main() {
  console.log("Cleaning database...");
  await prisma.review.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  console.log("Seeding categories...");
  const categoriesMap = {};
  for (const cat of categoriesData) {
    const created = await prisma.category.create({ data: cat });
    categoriesMap[cat.slug] = created.id;
  }

  console.log("Seeding products...");
  for (const prod of productsData) {
    const catId = categoriesMap[prod.categorySlug];
    if (!catId) continue;

    const reviews = prod.reviews || [];
    const ratingCount = reviews.length;
    const ratingAvg = ratingCount > 0 
      ? Number((reviews.reduce((sum, r) => sum + r.rating, 0) / ratingCount).toFixed(1)) 
      : 0;

    const productData = {
      title: prod.title,
      slug: prod.slug,
      description: prod.description,
      price: prod.price,
      originalPrice: prod.originalPrice,
      discount: prod.discount,
      brand: prod.brand,
      images: prod.images,
      stock: prod.stock,
      features: prod.features,
      ratingAvg,
      ratingCount,
      isFeatured: prod.isFeatured,
      categoryId: catId,
    };

    const createdProduct = await prisma.product.create({ data: productData });

    if (reviews.length > 0) {
      await prisma.review.createMany({
        data: reviews.map(r => ({ ...r, productId: createdProduct.id })),
      });
    }
  }

  console.log(`✅ Seeding completed! Total Products: ${productsData.length}`);
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => await prisma.$disconnect());