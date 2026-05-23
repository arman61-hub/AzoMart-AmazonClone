# AzoMart — Premium Amazon Clone

AzoMart is a full-stack, visually rich, and highly interactive Amazon clone built completely from scratch using Next.js 14 App Router, PostgreSQL + Neon DB, Prisma ORM, Zustand global state, and Tailwind CSS.

> **CRITICAL ARCHITECTURAL BOUNDARY**: This project is built entirely from scratch. No templates, boilerplate shops, or direct repository cloning was used. All styling, component markup, relational schema layouts, API endpoints, and global states are hand-coded to guarantee complete system mastery.

---

## 📸 Interactive UI Mockups Showcase

Below are the premium UI screens tailored for desktop and mobile displays:

| Page | Preview / Screenshot | Description |
|---|---|---|
| **Product Listings & Home** | ![Home Page](file:///C:/Users/arman/.gemini/antigravity-ide/brain/1d5381e1-6ad4-4d24-96c4-4a72b57a08a3/home_and_listings.png) | Dynamic category banners, sorting, multi-criteria filtering sidebar, search, and responsive cards with hover effects. |
| **Product Details** | ![Product Details](file:///C:/Users/arman/.gemini/antigravity-ide/brain/1d5381e1-6ad4-4d24-96c4-4a72b57a08a3/product_detail.png) | Image thumbnails switcher, detailed rating breakup chart, lists of verified customer reviews, similar products recommendations, and buy action box. |
| **Shopping Cart** | ![Shopping Cart](file:///C:/Users/arman/.gemini/antigravity-ide/brain/1d5381e1-6ad4-4d24-96c4-4a72b57a08a3/shopping_cart.png) | Dynamic quantity dropdown sync, instant delete controls, order values calculator, and free shipping progress alerts. |
| **Secure Checkout** | ![Secure Checkout](file:///C:/Users/arman/.gemini/antigravity-ide/brain/1d5381e1-6ad4-4d24-96c4-4a72b57a08a3/secure_checkout.png) | Distraction-free secure minimal header, validated shipping addresses panel, static Cash on Delivery (COD) preselection, and final placement controls. |
| **Order Confirmation** | ![Order Confirmation](file:///C:/Users/arman/.gemini/antigravity-ide/brain/1d5381e1-6ad4-4d24-96c4-4a72b57a08a3/order_confirmation.png) | Success check mark animations, simulated estimated arrival times, recap receipt, printable bills, and purchase details logs. |

---

## 🛠️ Technology Stack

| Layer | Component | Description |
|---|---|---|
| **Framework** | **Next.js 14** | App Router architecture. Unified Frontend UI views + Backend REST API routes. |
| **Language** | **TypeScript + JavaScript** | Strict typing for component interfaces and APIs; standard Node for database seeding. |
| **Database** | **PostgreSQL (Neon)** | Fully relational serverless cloud database for high availability and transactional speed. |
| **ORM** | **Prisma Client** | Robust type-safe query building, database modeling, migrations, and transactional locks. |
| **Styling** | **Tailwind CSS v3** | Modern CSS directives customized with genuine Amazon brand colors. |
| **State** | **Zustand** | Global lightweight client shopping cart store integrated with server-side API sync. |

---

## 🚀 Setup & Installation Instructions

Follow these steps to run the application locally on your machine:

### 1. Configure Database Credentials
Create a `.env` file in the project root directory and add your Neon PostgreSQL connection string:
```env
DATABASE_URL="postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/azomart?sslmode=require"
```

### 2. Install Project Dependencies
Run the package manager installation script:
```bash
npm install
```

### 3. Deploy Database Schema
Push the relational schema definitions directly to your Neon cloud database:
```bash
npx prisma db push
```

### 4. Seed Mock Data
Populate the database with 6 distinct product departments, 52 premium simulated products, and over 150 detailed customer reviews:
```bash
npx prisma db seed
```

### 5. Launch Local Dev Server
Fire up the Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser to browse AzoMart!

---

## 📐 Relational Schema Architecture

The database structure features 6 relational models ensuring complete referential integrity:
* **Category**: Multi-product departments (slug, name, icon banner).
* **Product**: Catalog inventory (brand, price, original price, discount, calculated ratings cache).
* **Review**: Customer feedback (stars rating scale, titles, comments) linking to products.
* **CartItem**: User shopping cart entries synced using unique user/product constraints.
* **Order**: Placed transactions recap (unique invoice order numbers, full shipping addresses, totals).
* **OrderItem**: Purchased item list carrying snapshots of product prices at purchase time to protect order history integrity.
