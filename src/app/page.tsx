import Link from "next/link";
import { ProductCard } from "@/components";
import { getFeaturedProducts, getNewProducts } from "@/data/products";

export default function Home() {
  const featuredProducts = getFeaturedProducts();
  const newProducts = getNewProducts();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-[var(--surface)] overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-20 w-96 h-96 bg-[var(--primary-container)] rounded-full blur-[120px]" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-[var(--secondary-container)] rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Hero Content */}
            <div className="space-y-8">
              <div>
                <p className="label-md text-[var(--primary)] mb-4">NEW COLLECTION 2026</p>
                <h1 className="display-lg text-[var(--on-surface)] mb-6">
                  Curated for the
                  <span className="block text-[var(--primary)]">Modern Home</span>
                </h1>
                <p className="body-lg text-[var(--on-surface-variant)] max-w-lg">
                  Discover furniture, lighting, and decor designed to transform your space into a sanctuary of modern elegance.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/shop"
                  className="btn-primary inline-flex items-center justify-center gap-2"
                >
                  Shop Collection
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/shop?category=Furniture"
                  className="btn-secondary inline-flex items-center justify-center"
                >
                  Explore Furniture
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-12 pt-8 border-t border-outline-variant/15">
                <div>
                  <p className="headline-lg text-[var(--on-surface)]">500+</p>
                  <p className="body-md text-[var(--on-surface-variant)]">Products</p>
                </div>
                <div>
                  <p className="headline-lg text-[var(--on-surface)]">50+</p>
                  <p className="body-md text-[var(--on-surface-variant)]">Designers</p>
                </div>
                <div>
                  <p className="headline-lg text-[var(--on-surface)]">10K+</p>
                  <p className="body-md text-[var(--on-surface-variant)]">Happy Customers</p>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative lg:h-[600px]">
              <div className="absolute inset-0 bg-[var(--surface-container-low)] rounded-[2rem] overflow-hidden transform rotate-3">
                <img
                  src="/hero-furniture.svg"
                  alt="Modern furniture collection"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-[var(--surface-container-lowest)] rounded-2xl shadow-lg p-6 transform -rotate-6">
                <p className="label-md text-[var(--primary)] mb-2">Free Shipping</p>
                <p className="body-md text-[var(--on-surface)]">On orders over $200</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 lg:py-32 bg-[var(--surface-container-low)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
            <div>
              <p className="label-md text-[var(--primary)] mb-2">CURATED SELECTION</p>
              <h2 className="headline-lg text-[var(--on-surface)]">Featured Products</h2>
            </div>
            <Link
              href="/shop"
              className="body-lg text-[var(--primary)] hover:underline flex items-center gap-2"
            >
              View All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 lg:py-32 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="label-md text-[var(--primary)] mb-2">BROWSE BY</p>
            <h2 className="headline-lg text-[var(--on-surface)]">Shop by Category</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[
              { name: "Furniture", image: "/category/furniture.svg", count: 120 },
              { name: "Lighting", image: "/category/lighting.svg", count: 85 },
              { name: "Decor", image: "/category/decor.svg", count: 156 },
              { name: "Textiles", image: "/category/textiles.svg", count: 92 },
            ].map((category) => (
              <Link
                key={category.name}
                href={`/shop?category=${category.name}`}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--on-surface)]/80 via-[var(--on-surface)]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="headline-md text-white mb-1">{category.name}</p>
                  <p className="body-md text-white/70">{category.count} Products</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 lg:py-32 bg-[var(--surface-container-low)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            <div className="flex flex-col justify-center">
              <p className="label-md text-[var(--primary)] mb-4">LATEST ADDITIONS</p>
              <h2 className="headline-lg text-[var(--on-surface)] mb-6">New Arrivals</h2>
              <p className="body-lg text-[var(--on-surface-variant)] mb-8">
                Be the first to discover our latest additions. From statement furniture pieces to subtle decor accents, each item is carefully selected to bring fresh perspective to your home.
              </p>
              <Link
                href="/shop?filter=new"
                className="btn-primary inline-flex items-center justify-center gap-2 w-fit"
              >
                Shop New Arrivals
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {newProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-20 lg:py-32 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="relative bg-[var(--surface-container-high)] rounded-[2rem] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 to-[var(--primary-container)]/10" />
            <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-16 relative z-10">
              <div className="flex flex-col justify-center">
                <p className="label-md text-[var(--tertiary)] mb-4">LIMITED TIME OFFER</p>
                <h2 className="headline-lg text-[var(--on-surface)] mb-4">
                  Get 20% Off Your First Order
                </h2>
                <p className="body-lg text-[var(--on-surface-variant)] mb-8">
                  Sign up today and receive an exclusive discount on your first purchase. Plus, get early access to new collections and special promotions.
                </p>
                <Link
                  href="/signup"
                  className="btn-primary inline-flex items-center justify-center gap-2 w-fit"
                >
                  Create Account
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-64 h-64 bg-[var(--surface-container-highest)] rounded-full flex items-center justify-center">
                  <span className="display-lg text-[var(--primary)]">20%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-32 bg-[var(--surface-container-low)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="label-md text-[var(--primary)] mb-2">CUSTOMER LOVE</p>
            <h2 className="headline-lg text-[var(--on-surface)]">What Our Customers Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                name: "Sarah Mitchell",
                role: "Interior Designer",
                text: "Nexus Prime has completely transformed how I source furniture for my clients. The quality is exceptional and the designs are exactly what modern homes need.",
                image: "/testimonial-1.svg"
              },
              {
                name: "James Chen",
                role: "Homeowner",
                text: "The minimal chair is worth every penny. After long work days, it's the only chair that provides proper support. Plus, the design fits perfectly in my home office.",
                image: "/testimonial-2.svg"
              },
              {
                name: "Emily Rodriguez",
                role: "Architect",
                text: "I recommend Nexus Prime to all my clients. The attention to detail in their pieces is remarkable. Each item feels intentional and well-crafted.",
                image: "/testimonial-3.svg"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-[var(--surface-container-lowest)] rounded-2xl p-8">
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-[var(--primary)]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="body-lg text-[var(--on-surface)] mb-6 italic">
                  &quot;{testimonial.text}&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--surface-container-high)] overflow-hidden">
                    <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="body-lg font-semibold text-[var(--on-surface)]">{testimonial.name}</p>
                    <p className="body-md text-[var(--on-surface-variant)]">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}