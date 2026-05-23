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
  {
    name: "Electronics",
    slug: "electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    name: "Books",
    slug: "books",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    name: "Fashion",
    slug: "fashion",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    name: "Home & Kitchen",
    slug: "home-kitchen",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    name: "Sports & Outdoors",
    slug: "sports-outdoors",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    name: "Beauty & Personal Care",
    slug: "beauty",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
];

const productsData = [
  // CATEGORY: Electronics
  {
    categorySlug: "electronics",
    title: "AzoSound Noise Cancelling Wireless Headphones",
    slug: "azosound-noise-cancelling-headphones",
    description: "Experience premium, immersive sound with active noise cancellation. Features up to 40 hours of battery life, quick charge, and comfortable memory foam earcups. Perfect for work, travel, and gaming.",
    price: 8999.00,
    originalPrice: 14999.00,
    discount: 40,
    brand: "AzoSound",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80",
    ],
    stock: 25,
    features: [
      "Industry-leading active noise cancellation (ANC)",
      "40-hour battery life with Fast Fuel USB-C charging",
      "Bluetooth 5.2 for stable wireless connectivity",
      "Built-in microphone for crystal-clear hands-free calls",
      "Premium memory foam earcups for all-day comfort",
    ],
    isFeatured: true,
    reviews: [
      { userName: "Aarav Mehta", rating: 5, title: "Superb Sound Quality", comment: "Amazing noise cancellation. Bass is punchy and mid-tones are clear. Battery life is stellar!" },
      { userName: "Priya Sharma", rating: 4, title: "Very Comfortable", comment: "I wear these for hours at work and my ears don't hurt. Noise cancellation is 9/10." },
      { userName: "Amit Patel", rating: 5, title: "Value for Money", comment: "Compares well to much more expensive Bose/Sony options. Highly recommend." },
    ],
  },
  {
    categorySlug: "electronics",
    title: "AzoWatch Pro Fitness Tracker Smartwatch",
    slug: "azowatch-pro-fitness-smartwatch",
    description: "Track your health and daily activities with precision. Monitor your heart rate, sleep quality, and blood oxygen levels. Features a bright AMOLED touch screen, 5ATM water resistance, and 12-day battery life.",
    price: 4999.00,
    originalPrice: 7999.00,
    discount: 37,
    brand: "AzoWatch",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800&auto=format&fit=crop&q=80",
    ],
    stock: 30,
    features: [
      "1.43-inch Always-On AMOLED Display",
      "24/7 Heart Rate and SpO2 Blood Oxygen monitor",
      "Built-in multi-system GPS for outdoor tracking",
      "120+ workout modes with automatic exercise detection",
      "Up to 12 days of battery life on a single charge",
    ],
    isFeatured: true,
    reviews: [
      { userName: "Rohit Verma", rating: 4, title: "Great tracking, nice display", comment: "The AMOLED screen is super bright even under direct sunlight. Battery lasts a full week with heavy use." },
      { userName: "Neha Sen", rating: 5, title: "Love the health tracking features", comment: "The sleep analysis is highly detailed. It has helped me improve my bedtime routine significantly!" },
    ],
  },
  {
    categorySlug: "electronics",
    title: "VividView 4K Ultra HD Streaming Projector",
    slug: "vividview-4k-streaming-projector",
    description: "Transform your living room into a high-end home cinema. With 3000 ANSI Lumens, 4K resolution, and built-in Dolby Audio stereo speakers, this smart projector provides breathtaking movie nights.",
    price: 34999.00,
    originalPrice: 49999.00,
    discount: 30,
    brand: "VividView",
    images: [
      "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=800&auto=format&fit=crop&q=80",
    ],
    stock: 8,
    features: [
      "Native 4K Ultra HD Resolution with HDR10 support",
      "Ultra-bright 3000 ANSI Lumens for daylight viewing",
      "Android TV built-in: Stream Netflix, YouTube, Prime Video",
      "Dual 10W Harman Kardon speakers with Dolby Audio",
      "Auto-keystone correction and auto-focus in 3 seconds",
    ],
    isFeatured: false,
    reviews: [
      { userName: "Vikram Raj", rating: 5, title: "Unbelievable Cinema at Home", comment: "Brightness is amazing. I can watch movies with the curtains open. Colors are highly vibrant!" },
    ],
  },
  {
    categorySlug: "electronics",
    title: "AzoCharge 20,000mAh Power Bank",
    slug: "azocharge-20000mah-power-bank",
    description: "Keep all your devices charged on the go. Compact high-capacity external battery with 22.5W Power Delivery and dual USB-A / USB-C fast charging outputs.",
    price: 1499.00,
    originalPrice: 2499.00,
    discount: 40,
    brand: "AzoCharge",
    images: [
      "https://images.unsplash.com/photo-1609592424109-dd9892f1b17c?w=800&auto=format&fit=crop&q=80",
    ],
    stock: 50,
    features: [
      "Massive 20,000mAh capacity - charge a phone 4 to 5 times",
      "22.5W Super Fast Charging with USB Power Delivery 3.0",
      "Three outputs: Charge three devices simultaneously",
      "Intelligent safety protection against overheating and short-circuit",
      "LED digital percentage display showing remaining battery level",
    ],
    isFeatured: false,
    reviews: [
      { userName: "Aniket Rao", rating: 4, title: "Rugged and efficient", comment: "A bit heavy but charging speed is top-notch. Easily charges my iPhone 15 Pro Max 4 times fully." },
    ],
  },
  {
    categorySlug: "electronics",
    title: "ErgoClick Mechanical Wireless Keyboard",
    slug: "ergoclick-mechanical-wireless-keyboard",
    description: "Ultimate tactile typing experience. A compact 75% hot-swappable mechanical keyboard featuring quiet tactile brown switches, dynamic RGB backlighting, and triple-mode connectivity.",
    price: 3999.00,
    originalPrice: 5999.00,
    discount: 33,
    brand: "ErgoClick",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80",
    ],
    stock: 15,
    features: [
      "75% Layout - Compact ergonomic desk footprint",
      "Pre-lubed Brown tactile mechanical switches (hot-swappable)",
      "Triple connectivity: 2.4Ghz Wireless, Bluetooth 5.0, USB-C Wired",
      "18 RGB dynamic backlighting effects with custom software",
      "Double-shot PBT keycaps for durability",
    ],
    isFeatured: false,
    reviews: [
      { userName: "Deepak S.", rating: 5, title: "Simply Awesome Keyboard", comment: "The sound is perfectly damp and satisfyingly tactile. Battery lasts 2 weeks with RGB off." },
    ],
  },

  // CATEGORY: Books
  {
    categorySlug: "books",
    title: "Atomic Habits by James Clear",
    slug: "atomic-habits-james-clear",
    description: "The million-copy bestseller. An easy & proven way to build good habits & break bad ones. James Clear, one of the world's leading experts on habit formation, reveals practical strategies to form good habits.",
    price: 399.00,
    originalPrice: 799.00,
    discount: 50,
    brand: "Penguin Random House",
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&auto=format&fit=crop&q=80",
    ],
    stock: 100,
    features: [
      "Life-changing advice on tiny daily adjustments",
      "Over 15 million copies sold worldwide",
      "Includes highly actionable frameworks and tools",
      "Premium quality paperback binding",
    ],
    isFeatured: true,
    reviews: [
      { userName: "Sonia G.", rating: 5, title: "Life Changing Book!", comment: "The 1% better daily concept is revolutionary. Simple, direct, and incredibly impactful." },
      { userName: "Karan Johar", rating: 5, title: "Highly recommend", comment: "Everyone should read this. It gives a practical manual on human behavior." },
    ],
  },
  {
    categorySlug: "books",
    title: "Deep Work by Cal Newport",
    slug: "deep-work-cal-newport",
    description: "Rules for focused success in a distracted world. Cal Newport teaches you how to focus without distraction on cognitively demanding tasks, a super-power in our increasingly competitive digital economy.",
    price: 349.00,
    originalPrice: 599.00,
    discount: 41,
    brand: "Grand Central Publishing",
    images: [
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80",
    ],
    stock: 80,
    features: [
      "Explains the neuroscience behind deep focus",
      "4 actionable rules to practice intense concentration",
      "Perfect for professionals, developers, and students",
    ],
    isFeatured: false,
    reviews: [
      { userName: "Rohan Das", rating: 5, title: "Essential for Devs", comment: "If you work in software, this book will change how you treat notifications. Masterpiece." },
    ],
  },
  {
    categorySlug: "books",
    title: "The Psychology of Money by Morgan Housel",
    slug: "the-psychology-of-money-morgan-housel",
    description: "Timeless lessons on wealth, greed, and happiness. Doing well with money isn’t necessarily about what you know. It’s about how you behave. And behavior is hard to teach, even to really smart people.",
    price: 299.00,
    originalPrice: 499.00,
    discount: 40,
    brand: "Jaico Publishing House",
    images: [
      "https://images.unsplash.com/photo-1614849963640-9cc74b2a826f?w=800&auto=format&fit=crop&q=80",
    ],
    stock: 120,
    features: [
      "19 short stories exploring the weird ways people think about money",
      "Easy to read and extremely insightful",
      "Offers deep wisdom on long-term wealth compounding",
    ],
    isFeatured: true,
    reviews: [
      { userName: "Sunita Reddy", rating: 5, title: "Best Personal Finance Book", comment: "Housel writes beautifully. It's not about math, it's about human behavior. Loved every page." },
    ],
  },
  {
    categorySlug: "books",
    title: "Sapiens: A Brief History of Humankind",
    slug: "sapiens-brief-history-humankind",
    description: "Yuval Noah Harari explores how biology and history have defined us and enhanced our understanding of what it means to be human. Destined to become a classic.",
    price: 449.00,
    originalPrice: 899.00,
    discount: 50,
    brand: "Vintage Books",
    images: [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80",
    ],
    stock: 60,
    features: [
      "Spans from 70,000 years ago to modern globalized society",
      "Explores Cognitive, Agricultural, and Scientific Revolutions",
      "Highly engaging and historically rigorous",
    ],
    isFeatured: false,
    reviews: [
      { userName: "Rajesh K.", rating: 4, title: "Mind-expanding history", comment: "Really changes your perspective on societies, myths, and money. A must-read." },
    ],
  },
  {
    categorySlug: "books",
    title: "Rich Dad Poor Dad by Robert T. Kiyosaki",
    slug: "rich-dad-poor-dad-robert-kiyosaki",
    description: "What the rich teach their kids about money that the poor and middle class do not! Robert Kiyosaki shares his story of growing up with two father figures and the financial mindset difference.",
    price: 249.00,
    originalPrice: 499.00,
    discount: 50,
    brand: "Warner Books",
    images: [
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800&auto=format&fit=crop&q=80",
    ],
    stock: 90,
    features: [
      "Classic foundation for financial literacy",
      "Explains the difference between assets and liabilities",
      "Encourages entrepreneurship and investing",
    ],
    isFeatured: false,
    reviews: [
      { userName: "Vijay M.", rating: 4, title: "Eye opening concepts", comment: "A simple guide to escape the rat race. Very motivational!" },
    ],
  },

  // CATEGORY: Fashion
  {
    categorySlug: "fashion",
    title: "AzoFit Men's Premium Cotton Slim-Fit T-Shirt",
    slug: "azofit-mens-premium-cotton-tshirt",
    description: "Elevate your everyday wardrobe with our ultra-soft premium cotton t-shirt. Features a perfect slim fit, breathable comb-cotton knit, and robust crew neckline that retains its shape after repeated washing.",
    price: 699.00,
    originalPrice: 1299.00,
    discount: 46,
    brand: "AzoFit",
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80",
    ],
    stock: 150,
    features: [
      "100% Premium Combed Cotton (180 GSM)",
      "Breathable, lightweight, and sweat-wicking knit",
      "Tailored slim-fit cut with structured shoulders",
      "Tag-less neck label for scratch-free comfort",
      "Pre-shrunk fabric to prevent shrinking in wash",
    ],
    isFeatured: true,
    reviews: [
      { userName: "Rahul N.", rating: 5, title: "Perfect Fit!", comment: "The cloth feels so soft and premium. Fits perfectly on the chest and arms. Ordered three more!" },
      { userName: "Preeti S.", rating: 4, title: "Nice fabric", comment: "Bought for my husband. Colors are beautiful, didn't fade after 3 washes." },
    ],
  },
  {
    categorySlug: "fashion",
    title: "AzoWalk Men's Lightweight Running Shoes",
    slug: "azowalk-mens-lightweight-running-shoes",
    description: "Engineered for maximum speed and cushioning. Extremely lightweight mesh upper provides excellent breathability, while the impact-absorbing foam midsole returns energy with every stride.",
    price: 1899.00,
    originalPrice: 3499.00,
    discount: 45,
    brand: "AzoWalk",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80",
    ],
    stock: 45,
    features: [
      "High-elastic knit mesh upper for adaptive, cool fit",
      "Responsive Phylon midsole offering bouncy cushioning",
      "Anti-slip durable rubber outsole with premium grip",
      "Padded collar and soft insole reducing foot strain",
    ],
    isFeatured: true,
    reviews: [
      { userName: "Sachin T.", rating: 5, title: "Like running on clouds", comment: "Extremely lightweight and soft. I run 5k daily and these have been an absolute lifesaver." },
    ],
  },
  {
    categorySlug: "fashion",
    title: "VogueFit Women's High-Waist Yoga Leggings",
    slug: "voguefit-womens-highwaist-yoga-leggings",
    description: "Premium buttery-soft athleisure wear. Squat-proof, 4-way stretch leggings featuring a high compression waistband that stays secure during high-intensity workouts.",
    price: 999.00,
    originalPrice: 1999.00,
    discount: 50,
    brand: "VogueFit",
    images: [
      "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=800&auto=format&fit=crop&q=80",
    ],
    stock: 80,
    features: [
      "80% Nylon, 20% Spandex buttery-soft blend",
      "Squat-proof thick double-knit, absolutely opaque",
      "Hidden waistband pocket for keys/cards",
      "Moisture-wicking, quick-dry technology",
    ],
    isFeatured: false,
    reviews: [
      { userName: "Meera Sen", rating: 5, title: "Super comfy and squat proof", comment: "Absolutely love these! They compress well but are incredibly soft to touch. Best leggings I own." },
    ],
  },
  {
    categorySlug: "fashion",
    title: "ChicStyle Unisex Polarized Wayfarer Sunglasses",
    slug: "chicstyle-polarized-wayfarer-sunglasses",
    description: "Timeless classic aesthetic combined with top-tier eye protection. Features impact-resistant polarized lenses that eliminate glare while blocking 100% of harmful UVA/UVB rays.",
    price: 1299.00,
    originalPrice: 2499.00,
    discount: 48,
    brand: "ChicStyle",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80",
    ],
    stock: 60,
    features: [
      "UV400 protection coating: blocks 100% UVA & UVB rays",
      "Polarized TAC lenses for high-definition visual clarity",
      "Premium lightweight polycarbonate frames",
      "Reinforced metal hinges for long-lasting durability",
    ],
    isFeatured: false,
    reviews: [
      { userName: "Abhay D.", rating: 4, title: "Sleek and sturdy", comment: "Fits perfectly. Polarization is excellent when driving in midday sun. Looks very stylish." },
    ],
  },
  {
    categorySlug: "fashion",
    title: "AzoLeather Men's Premium Bifold Leather Wallet",
    slug: "azoleather-mens-premium-bifold-leather-wallet",
    description: "Handcrafted from 100% genuine top-grain cowhide leather. Sleek design featuring RFID blocking defense to keep your debit, credit cards, and personal data secure.",
    price: 899.00,
    originalPrice: 1599.00,
    discount: 43,
    brand: "AzoLeather",
    images: [
      "https://images.unsplash.com/photo-1627124765135-56f3f0cf6eb3?w=800&auto=format&fit=crop&q=80",
    ],
    stock: 75,
    features: [
      "100% Handcrafted Genuine Leather",
      "Built-in advanced RFID protection lining",
      "Slim profile: 6 card slots, 2 hidden slots, 2 cash compartments",
      "Clear ID window for quick driver license access",
    ],
    isFeatured: false,
    reviews: [
      { userName: "Vikram S.", rating: 5, title: "Smells like genuine leather!", comment: "Outstanding stitching. Very slim and doesn't bulge out my back pocket. Great buy." },
    ],
  },

  // CATEGORY: Home & Kitchen
  {
    categorySlug: "home-kitchen",
    title: "AzoBrew Smart Drip Coffee Maker",
    slug: "azobrew-smart-drip-coffee-maker",
    description: "Wake up to fresh, hot, custom-brewed coffee. Features programmable automatic start times, bold flavor strength control, a 12-cup glass carafe, and an advanced hot-plate that keeps coffee at optimal drinking temperature.",
    price: 3499.00,
    originalPrice: 5999.00,
    discount: 41,
    brand: "AzoBrew",
    images: [
      "https://images.unsplash.com/photo-1517256064527-09c53b2d0bc6?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=80",
    ],
    stock: 20,
    features: [
      "24-Hour programmable auto start timer",
      "Flavor strength control: Select Normal or Bold profile",
      "Large 1.8L / 12-Cup borosilicate glass carafe",
      "Anti-drip system allows pouring a cup mid-brew",
      "Non-stick stain-resistant warming plate keeps coffee hot",
    ],
    isFeatured: true,
    reviews: [
      { userName: "Devika M.", rating: 5, title: "Best mornings ever", comment: "The program function is flawless. Smelling freshly brewed coffee right when I open my eyes is magical." },
      { userName: "Aditya C.", rating: 4, title: "Solid machine", comment: "Brew speed is fast. The carafe is well-designed and doesn't spill. Highly recommend for large families." },
    ],
  },
  {
    categorySlug: "home-kitchen",
    title: "ChefMaster 3-in-1 Smart Air Fryer & Grill",
    slug: "chefmaster-3in1-airfryer-grill",
    description: "Crispy, healthy, delicious food made in minutes with up to 90% less oil. Massive 5.5L non-stick basket allows cooking whole chickens, crispy fries, and succulent steaks with 8 one-touch smart presets.",
    price: 6499.00,
    originalPrice: 11999.00,
    discount: 45,
    brand: "ChefMaster",
    images: [
      "https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?w=800&auto=format&fit=crop&q=80",
    ],
    stock: 18,
    features: [
      "360-degree rapid heat air circulation system",
      "Massive 5.5L non-stick dish-washer safe basket",
      "8 Interactive preset programs: Fries, Baking, Steak, Fish",
      "Adjustable temperature control from 80°C to 200°C",
      "Touch control digital screen with automatic shut-off safety",
    ],
    isFeatured: true,
    reviews: [
      { userName: "Shruti P.", rating: 5, title: "Life changing kitchen appliance", comment: "I use this almost every day. Paneer tikka, French fries, samosas... all turn out crispy with just a brush of oil!" },
    ],
  },
  {
    categorySlug: "home-kitchen",
    title: "AzoRest Premium Memory Foam Cervical Pillow",
    slug: "azorest-memory-foam-pillow",
    description: "Say goodbye to morning neck pain. Ergonomically contoured therapeutic memory foam pillow designed to support your head, neck, and shoulders, ensuring deep, restorative sleep.",
    price: 1499.00,
    originalPrice: 2999.00,
    discount: 50,
    brand: "AzoRest",
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop&q=80",
    ],
    stock: 40,
    features: [
      "Ergonomic contour design for back and side sleepers",
      "Premium high-density slow-rebound memory foam",
      "Breathable, hypoallergenic, washable bamboo cover",
      "Relieves spinal pressure and opens airways for quiet sleep",
    ],
    isFeatured: false,
    reviews: [
      { userName: "Nikhil B.", rating: 5, title: "Incredible Neck Relief", comment: "Was skeptical at first, but after a week my chronic neck stiffness is gone. Keeps shape perfectly." },
    ],
  },
  {
    categorySlug: "home-kitchen",
    title: "PureFlow HEPA Air Purifier for Large Rooms",
    slug: "pureflow-hepa-air-purifier",
    description: "Breathe clean air. High-efficiency three-stage H13 True HEPA filtration capturing 99.97% of airborne particles including smog, smoke, dust, pet dander, and odors.",
    price: 7999.00,
    originalPrice: 12999.00,
    discount: 38,
    brand: "PureFlow",
    images: [
      "https://images.unsplash.com/photo-1618941724778-d419266a2cb1?w=800&auto=format&fit=crop&q=80",
    ],
    stock: 12,
    features: [
      "Coverage up to 350 sq ft with high CADR rating",
      "True H13 HEPA Filter combined with active carbon layer",
      "Ultra-quiet sleep mode operating at only 22dB",
      "Smart PM2.5 air quality indicator with color coding",
    ],
    isFeatured: false,
    reviews: [
      { userName: "Preet G.", rating: 4, title: "Excellent during winter pollution", comment: "Essential buy in Delhi-NCR. Reducer dust and allergies drastically within a couple of days." },
    ],
  },
  {
    categorySlug: "home-kitchen",
    title: "SleekSteel Insulated 1L Stainless Steel Flask",
    slug: "sleeksteel-insulated-stainless-steel-flask",
    description: "Keeps drinks ice cold for 24 hours or steaming hot for 12 hours. Double-wall vacuum insulated premium flask crafted from 18/8 food-grade stainless steel with leak-proof cap.",
    price: 799.00,
    originalPrice: 1499.00,
    discount: 46,
    brand: "SleekSteel",
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80",
    ],
    stock: 100,
    features: [
      "Premium Double-wall copper-coated vacuum insulation",
      "100% Food-grade 18/8 Stainless Steel inside and out",
      "Leak-proof, sweat-proof, condensation-free powder exterior",
    ],
    isFeatured: false,
    reviews: [
      { userName: "Manish P.", rating: 5, title: "Truly insulated", comment: "Ice water stays freezing cold even when left in a hot car. Beautiful matte finish!" },
    ],
  },

  // CATEGORY: Sports & Outdoors
  {
    categorySlug: "sports-outdoors",
    title: "AzoGrip Non-Slip TPE Exercise Yoga Mat",
    slug: "azogrip-nonslip-tpe-yoga-mat",
    description: "The ultimate companion for your home workouts. Dual-sided non-slip TPE yoga mat providing optimal cushion and joint support. Eco-friendly, waterproof, and extremely easy to clean.",
    price: 999.00,
    originalPrice: 1999.00,
    discount: 50,
    brand: "AzoGrip",
    images: [
      "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&auto=format&fit=crop&q=80",
    ],
    stock: 60,
    features: [
      "6mm optimal thickness for comfort and joint support",
      "Eco-friendly non-toxic certified TPE material",
      "Dual-sided textured non-slip grip technology",
      "Includes premium carry strap and mesh bag",
      "Lightweight (800g) and highly durable",
    ],
    isFeatured: true,
    reviews: [
      { userName: "Kriti S.", rating: 5, title: "Absolutely non-slip!", comment: "Even during sweaty hot yoga sessions, my hands don't slip at all. The grid patterns are helpful for alignment." },
      { userName: "Vivek G.", rating: 4, title: "Good cushioning", comment: "Nice thickness. Feels extremely comfortable on knees during floor core exercises." },
    ],
  },
  {
    categorySlug: "sports-outdoors",
    title: "FlexFit Adjustable Steel Dumbbell Set (20kg)",
    slug: "flexfit-adjustable-steel-dumbbell-20kg",
    description: "Versatile gym-grade dumbbells for full body workouts at home. Solid chrome steel bars featuring secure spinlock collars and customizable cast-iron weight plates totaling 20kg.",
    price: 2499.00,
    originalPrice: 4999.00,
    discount: 50,
    brand: "FlexFit",
    images: [
      "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=800&auto=format&fit=crop&q=80",
    ],
    stock: 15,
    features: [
      "Complete 20kg kit: 4x 2.5kg, 4x 1.25kg, 4x 0.5kg plates",
      "Includes two solid 14-inch chrome dumbbell bars",
      "Durable star spinlock collars prevent loosening during lifts",
      "Textured knurled grip prevents slipping from sweaty palms",
    ],
    isFeatured: true,
    reviews: [
      { userName: "Harsh L.", rating: 5, title: "Great quality plates", comment: "Solid iron build, doesn't rust. Excellent threads on the collars. Highly professional feel." },
    ],
  },
  {
    categorySlug: "sports-outdoors",
    title: "TrailBuddy Hydration Camping Backpack",
    slug: "trailbuddy-hydration-camping-backpack",
    description: "Perfect pack for weekend hikes and rugged treks. Lightweight, water-resistant 30L nylon backpack featuring multi-pocket organization and an integrated 2L BPA-free hydration bladder.",
    price: 1799.00,
    originalPrice: 2999.00,
    discount: 40,
    brand: "TrailBuddy",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
    ],
    stock: 25,
    features: [
      "Heavy-duty water-resistant ripstop nylon material",
      "Includes a premium leak-proof 2L hydration bladder and tube",
      "Ergonomic padded mesh shoulder straps and hip belt",
    ],
    isFeatured: false,
    reviews: [
      { userName: "Sid M.", rating: 4, title: "Awesome hiking bag", comment: "The bladder works great, no weird plastic taste. Pockets are well placed. Fits very snug." },
    ],
  },
  {
    categorySlug: "sports-outdoors",
    title: "AzoSpeed Multi-Speed Mountain Bicycle",
    slug: "azospeed-multi-speed-mountain-bicycle",
    description: "Conquer any terrain with ease. High-performance aluminum alloy hardtail mountain bike equipped with a smooth 21-speed drivetrain, responsive dual disc brakes, and rugged front suspension.",
    price: 15999.00,
    originalPrice: 24999.00,
    discount: 36,
    brand: "AzoSpeed",
    images: [
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&auto=format&fit=crop&q=80",
    ],
    stock: 5,
    features: [
      "Lightweight, high-strength 18-inch Aluminum Alloy frame",
      "Shimano 21-speed derailleur and thumb shifters",
      "100mm travel front suspension fork to absorb trail shocks",
      "Dual mechanical disc brakes for powerful stopping in all weather",
    ],
    isFeatured: false,
    reviews: [
      { userName: "Ankur D.", rating: 5, title: "Unbelievable Ride!", comment: "Gears shifting is smooth as butter. Disc brakes are incredibly sharp. Assembly was straightforward." },
    ],
  },

  // CATEGORY: Beauty & Personal Care
  {
    categorySlug: "beauty",
    title: "AzoGlow Premium Vitamin C Face Serum",
    slug: "azoglow-vitamin-c-face-serum",
    description: "Reveal radiant, youthful-looking skin. Our clinical-strength Vitamin C serum is enriched with Hyaluronic Acid and Vitamin E. Formulated to fade dark spots, smooth wrinkles, and boost natural radiance.",
    price: 499.00,
    originalPrice: 999.00,
    discount: 50,
    brand: "AzoGlow",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1608248597481-496100c80836?w=800&auto=format&fit=crop&q=80",
    ],
    stock: 120,
    features: [
      "20% Active Vitamin C (L-Ascorbic Acid) for intensive repair",
      "Infused with Hyaluronic Acid for deep skin hydration",
      "Fades dark spots, sun damage, and acne scars",
      "Cruelty-free, vegan formula, absolutely no parabens/sulfates",
      "Suitable for all skin types, including highly sensitive skin",
    ],
    isFeatured: true,
    reviews: [
      { userName: "Anjali S.", rating: 5, title: "Brightened my skin!", comment: "Using it for two weeks and my skin texture has improved incredibly. Hyperpigmentation is visibly lighter." },
      { userName: "Ritu M.", rating: 4, title: "Very hydrating", comment: "Absorbs super fast without feeling greasy. Gives a beautiful, clean glow." },
    ],
  },
  {
    categorySlug: "beauty",
    title: "AzoTrim Professional Beard Trimmer & Grooming Kit",
    slug: "azotrim-professional-beard-trimmer",
    description: "Master your style with precision. Premium cordless beard trimmer featuring self-sharpening titanium blades, 39 length settings, and a powerful rechargeable battery running up to 90 minutes.",
    price: 1999.00,
    originalPrice: 3499.00,
    discount: 42,
    brand: "AzoTrim",
    images: [
      "https://images.unsplash.com/photo-1621607512214-68297480165e?w=800&auto=format&fit=crop&q=80",
    ],
    stock: 35,
    features: [
      "Self-sharpening Titanium coated stainless steel blades",
      "Precision dial with 39 length settings in 0.5mm steps",
      "High-power Li-ion battery with 90-min runtime",
      "100% waterproof design for easy wet/dry grooming",
    ],
    isFeatured: true,
    reviews: [
      { userName: "Deepak V.", rating: 5, title: "Flawless trim", comment: "The dial is super convenient, no need to keep changing plastic guards. Battery life is fantastic." },
    ],
  },
  {
    categorySlug: "beauty",
    title: "NourishHair Organic Argan Oil Shampoo",
    slug: "nourishhair-organic-argan-oil-shampoo",
    description: "Restore shine, moisture, and strength to damaged hair. Enriched with cold-pressed Moroccan Argan Oil, Keratin, and Avocado oil, this luxurious sulfate-free shampoo combats frizz.",
    price: 599.00,
    originalPrice: 999.00,
    discount: 40,
    brand: "NourishHair",
    images: [
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800&auto=format&fit=crop&q=80",
    ],
    stock: 90,
    features: [
      "100% Pure Moroccan Cold-Pressed Argan Oil",
      "Sulfate, Paraben, and Silicone free botanical formula",
      "Deeply hydrates and restores damaged cuticles",
    ],
    isFeatured: false,
    reviews: [
      { userName: "Tanya P.", rating: 5, title: "Goodbye frizz!", comment: "Makes my hair super soft, shiny and easily manageable. Smells absolutely heavenly too!" },
    ],
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
    const createdCat = await prisma.category.create({
      data: cat,
    });
    categoriesMap[cat.slug] = createdCat.id;
  }
  console.log(`Successfully seeded ${Object.keys(categoriesMap).length} categories.`);

  console.log("Seeding products...");
  let count = 0;
  for (const prod of productsData) {
    const catId = categoriesMap[prod.categorySlug];
    if (!catId) continue;

    // Calculate rating averages from reviews
    const reviews = prod.reviews || [];
    const ratingCount = reviews.length;
    const ratingAvg = ratingCount > 0 
      ? Number((reviews.reduce((sum, r) => sum + r.rating, 0) / ratingCount).toFixed(1))
      : 0;

    // Create the product along with its reviews in a single nested write
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

    const createdProduct = await prisma.product.create({
      data: productData,
    });

    if (reviews.length > 0) {
      await prisma.review.createMany({
        data: reviews.map(r => ({
          userName: r.userName,
          rating: r.rating,
          title: r.title,
          comment: r.comment,
          productId: createdProduct.id,
        }))
      });
    }

    count++;
  }

  // To reach 50+ total products as per plan, we'll auto-generate variations of products
  console.log(`Seeding dynamic product variations to reach 50+ total items...`);
  const dynamicWords = ["Elite", "Ultra", "Max", "Prime", "Signature", "Advanced", "Classic", "Premium"];
  const dynamicBrands = ["AzoSmart", "VibeCraft", "ComfortLuxe", "FitForce", "GlowGlow"];
  const adjectives = ["Superior", "Ergonomic", "Professional", "Multi-functional", "Compact", "High-performance"];

  const baseProducts = await prisma.product.findMany({
    include: { category: true }
  });

  let currentId = baseProducts.length;
  const targetProductsCount = 52;

  while (currentId < targetProductsCount) {
    const randomBase = baseProducts[Math.floor(Math.random() * baseProducts.length)];
    const word = dynamicWords[Math.floor(Math.random() * dynamicWords.length)];
    const brand = dynamicBrands[Math.floor(Math.random() * dynamicBrands.length)];
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    
    const newTitle = `${brand} ${word} ${randomBase.title.replace(randomBase.brand, "").trim()}`;
    const newSlug = `${randomBase.slug}-${word.toLowerCase()}-${brand.toLowerCase()}-${Math.floor(100 + Math.random() * 900)}`;
    
    // Slight price variations
    const multiplier = 0.8 + Math.random() * 0.4; // 80% to 120%
    const newPrice = Math.round((randomBase.price * multiplier) / 9) * 9 + 9; // Round to ending in 9
    const newOrigPrice = Math.round((newPrice / (1 - (randomBase.discount / 100))) / 9) * 9 + 9;
    
    const reviewsCount = Math.floor(Math.random() * 5); // 0 to 4 reviews
    const reviews = [];
    const reviewers = ["Arjun", "Pooja", "Vikram", "Sneha", "Kabir", "Meera", "Aanya", "Zayan"];
    const reviewTitles = ["Superb", "Okay okay", "Outstanding", "Decent product", "Average quality", "Loved it!"];
    const reviewComments = [
      "This product exceeded my expectations. Quality is exceptional.",
      "Good performance but pricing could be slightly better.",
      "Highly durable and serves its purpose perfectly.",
      "The color is slightly different from picture, but overall happy with purchase.",
      "Decent product, quick delivery."
    ];

    for (let r = 0; r < reviewsCount; r++) {
      reviews.push({
        userName: reviewers[Math.floor(Math.random() * reviewers.length)],
        rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 rating
        title: reviewTitles[Math.floor(Math.random() * reviewTitles.length)],
        comment: reviewComments[Math.floor(Math.random() * reviewComments.length)]
      });
    }

    const ratingCount = reviews.length;
    const ratingAvg = ratingCount > 0 
      ? Number((reviews.reduce((sum, r) => sum + r.rating, 0) / ratingCount).toFixed(1))
      : 0;

    const createdProd = await prisma.product.create({
      data: {
        title: newTitle,
        slug: newSlug,
        description: `Upgraded version: ${adj} features. ${randomBase.description}`,
        price: newPrice,
        originalPrice: newOrigPrice,
        discount: randomBase.discount,
        brand: brand,
        images: randomBase.images,
        stock: Math.floor(Math.random() * 40) + 5,
        features: [
          `Upgraded ${adj} design`,
          ...randomBase.features.slice(0, 3)
        ],
        ratingAvg,
        ratingCount,
        isFeatured: Math.random() > 0.8,
        categoryId: randomBase.categoryId,
      }
    });

    if (reviews.length > 0) {
      await prisma.review.createMany({
        data: reviews.map(r => ({
          userName: r.userName,
          rating: r.rating,
          title: r.title,
          comment: r.comment,
          productId: createdProd.id,
        }))
      });
    }

    currentId++;
  }

  console.log(`Seeding finished. Seeded ${currentId} total products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
