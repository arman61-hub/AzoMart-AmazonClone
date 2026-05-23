# AzoMart 🛒 (Amazon Clone - Full Stack Implementation)

AzoMart is a feature-rich, high-performance, and visually premium Amazon Clone built entirely from scratch. Leveraging Next.js 14, Prisma ORM (v7), and PostgreSQL, the platform delivers a native-feeling shopping experience with robust server-side APIs, interactive carousels, responsive grid columns, inclusive tax breakdowns, and animated checkouts.

---

## 🚀 Key Visual & Functional Features

1. **Fluid Responsive Architecture**:
   - **Double-Row Mobile & Tablet Navbar**: Below 1024px (`lg`), secondary links fold cleanly, and the search bar wraps to a full-width row, preventing visual overflows on iPad Mini, Surface Pro, and mobile screens.
   - **Collapsible Mobile Department Filters**: Sidebar controls collapse under a responsive `[Show Filters]` panel to optimize catalog workspace.
   - **Dynamic Grid Product Limits**: Automatically adjusts pagination bounds dynamically based on column count (4 products on 1-2 columns, 6 products on 3 columns, and 8 products on 4 columns) to eliminate awkward empty grid slots.
2. **Interactive Product Gallery Slider**: Next/previous chevrons, slide dot navigation, and thumbnail grid panels in product detail pages.
3. **Unified Checkout & Mockup Order Confirmation**:
   - Full shipping validation with Cash on Delivery (COD) methods.
   - Custom high-fidelity confirmation card redesigned to perfectly match the official Amazon mockup (green check alert banner, left-column reference and delivery addresses, right-column summarized order panel).
   - **10-Second Auto-Redirect Countdown**: Smoothly takes the customer back to the Home page after 10 seconds of receipt display.

---

## 🛠️ Technology Stack

- **Core Framework**: [Next.js 14 (App Router)](https://nextjs.org/) (TypeScript v5)
- **Database & Query Layer**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM v7](https://www.prisma.io/)
- **State Management**: [Zustand v5](https://github.com/pmndrs/zustand) (Client state with background REST synchronization)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) (Custom HSL palettes, Amazon dark/light aesthetics, and fluid animations)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## ⚙️ Local Setup Instructions

Follow these steps to run AzoMart locally on your system:

### 1. Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [PostgreSQL](https://www.postgresql.org/) running locally or in a container

### 2. Clone and Install Dependencies
Navigate to your project workspace directory and run:
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```env
# PostgreSQL connection string
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5412/azomart_db?schema=public"
```

### 4. Initialize the Database
Generate your Prisma v7 Client and push the schema definitions to your active PostgreSQL database:
```bash
npx prisma db push
```

### 5. Seed the Catalog
Populate the database with the pre-configured categories and 29 unique, high-quality products:
```bash
npx prisma db seed
```
*(The seeder runs `prisma/seed.js` and inserts premium Unsplash media, structured category department boundaries, and pre-composed verified reviews).*

### 6. Run the Development Server
Launch the application:
```bash
npm run dev
```
Navigate to [http://localhost:3000](http://localhost:3000) in your web browser.

### 7. Production Build Check
To verify strict type safety and compiler constraints before production deployment:
```bash
npm run build
```

---

## 🧠 Architectural & Implementation Assumptions

The following key technical decisions and assumptions were made during the development of AzoMart:

1. **Session & Cart Context**:
   - To provide immediate, frictionless checkout flows without requiring authentication integrations, a static identifier (`default-user`) is assumed as the user session. 
   - All cart CRUD operations are bound to this session, persisting items in the database across page refreshes.
2. **Inclusive GST Calculation**:
   - Formulated a standard inclusive tax schema where listed product prices already contain tax (averaging 8% across categories). 
   - During checkout, the tax contribution is computed dynamically using custom reverse-percent tax math so it is accurately broken down without altering the customer's payment amount.
3. **Estimated Shipping ETA**:
   - Assumed a simulated doorstep shipping standard: standard CoD delivery times are calculated relative to the purchase timestamp, scheduled exactly for "Tomorrow" (or Next Day).
4. **Prisma v7pg Driver Adapter**:
   - Configured the database layer using the native `@prisma/adapter-pg` driver combined with standard `pg` connection pools. This maintains thread-safety and client reuse during Fast Refresh cycles.
5. **Responsive Collapse Trigger (`lg` breakpoint)**:
   - Assumed that screens below `1024px` (tablets and mobiles) require simplified header navigation. Secondary widgets (Delivery Address, Language EN flag, and Returns) are hidden to maximize the search bar field and prevent horizontal layouts from expanding past the viewport boundaries.
