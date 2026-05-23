export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(price);
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `AZM-${timestamp}-${random}`;
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

export function getCategoryTaxRate(categorySlug: string): number {
  if (!categorySlug) return 0.18; // Default 18% GST
  const slug = categorySlug.toLowerCase();
  
  switch (slug) {
    case "books":
      return 0.0; // 0% GST on Books in India
    case "fashion":
    case "sports-outdoors":
      return 0.12; // 12% GST
    case "electronics":
    case "home-kitchen":
    case "beauty":
    default:
      return 0.18; // 18% GST on Electronics, Appliances, Cosmetics
  }
}

export function calculateInclusiveTax(price: number, categorySlug: string): number {
  const rate = getCategoryTaxRate(categorySlug);
  if (rate === 0) return 0;
  // Formula: Tax Component = Price - (Price / (1 + Rate))
  return price - (price / (1 + rate));
}
