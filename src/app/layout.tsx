import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Header/Navbar";
import CategoryBar from "@/components/Header/CategoryBar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AzoMart:Online Shopping site in India",
  description:
    "AzoMart is a feature-rich, high-performance Amazon clone. Discover amazing deals on top quality products with secure cash on delivery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} bg-gray-50 text-gray-900 flex flex-col min-h-full antialiased`}>
        <Navbar />
        <CategoryBar />
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
