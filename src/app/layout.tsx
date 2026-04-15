import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { Navbar, Footer, Providers } from "@/components";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nexus Prime | Curated Modern Essentials",
  description: "Discover thoughtfully designed furniture, lighting, and home decor. Quality crafted pieces designed to elevate your space.",
  keywords: ["furniture", "home decor", "lighting", "modern design", "interior design"],
  authors: [{ name: "Nexus Prime" }],
  openGraph: {
    title: "Nexus Prime | Curated Modern Essentials",
    description: "Discover thoughtfully designed furniture, lighting, and home decor.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] antialiased">
        <Providers>
          <Navbar />
          <main className="flex-1 pt-16 lg:pt-20">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}