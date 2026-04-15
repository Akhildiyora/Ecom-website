"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components";
import { products, categories, getProductsByCategory, Product } from "@/data/products";

export default function ShopPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const filterParam = searchParams.get("filter");

  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "All");
  const [sortBy, setSortBy] = useState("featured");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    let result = selectedCategory === "All"
      ? [...products]
      : getProductsByCategory(selectedCategory);

    if (filterParam === "new") {
      result = result.filter(p => p.isNew);
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    setFilteredProducts(result);
  }, [selectedCategory, sortBy, filterParam]);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--surface)]">
      {/* Header */}
      <section className="bg-[var(--surface-container-low)] py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <p className="label-md text-[var(--primary)] mb-4">DISCOVER</p>
            <h1 className="headline-lg text-[var(--on-surface)] mb-4">All Products</h1>
            <p className="body-lg text-[var(--on-surface-variant)] max-w-2xl mx-auto">
              Explore our curated collection of furniture, lighting, and home decor designed for the modern home.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar - Desktop */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-32 space-y-8">
                {/* Categories */}
                <div>
                  <h3 className="label-md text-[var(--on-surface)] mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${
                          selectedCategory === category
                            ? "bg-[var(--primary)] text-white"
                            : "bg-transparent text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-low)]"
                        }`}
                      >
                        <span className="body-md">{category}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="label-md text-[var(--on-surface)] mb-4">Price Range</h3>
                  <div className="space-y-2">
                    {["All Prices", "Under $100", "$100 - $300", "$300 - $500", "Over $500"].map((range) => (
                      <button
                        key={range}
                        className="w-full text-left px-4 py-3 rounded-xl bg-transparent text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-low)] transition-colors"
                      >
                        <span className="body-md">{range}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div>
                  <h3 className="label-md text-[var(--on-surface)] mb-4">Colors</h3>
                  <div className="flex flex-wrap gap-2">
                    {["#424656", "#f8f7ff", "#b3c5ff", "#cc4204", "#d0e1fb"].map((color) => (
                      <button
                        key={color}
                        className="w-10 h-10 rounded-full border-2 border-transparent hover:border-[var(--primary)] transition-colors"
                        style={{ backgroundColor: color }}
                        aria-label={`Filter by color ${color}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div className="flex items-center gap-4">
                  {/* Mobile Filter Toggle */}
                  <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="lg:hidden btn-secondary inline-flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    Filters
                  </button>

                  <p className="body-md text-[var(--on-surface-variant)]">
                    {filteredProducts.length} {filteredProducts.length === 1 ? "Product" : "Products"}
                  </p>
                </div>

                {/* Sort */}
                <div className="flex items-center gap-4">
                  <label className="body-md text-[var(--on-surface-variant)]">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="input-field py-2 px-4 w-auto"
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
              </div>

              {/* Mobile Filter Drawer */}
              {isFilterOpen && (
                <div className="lg:hidden mb-8 p-6 bg-[var(--surface-container-lowest)] rounded-2xl">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="headline-md text-[var(--on-surface)]">Filters</h3>
                    <button onClick={() => setIsFilterOpen(false)} aria-label="Close filters">
                      <svg className="w-6 h-6 text-[var(--on-surface)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="mb-6">
                    <h4 className="label-md text-[var(--on-surface)] mb-3">Categories</h4>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => {
                            setSelectedCategory(category);
                            setIsFilterOpen(false);
                          }}
                          className={`px-4 py-2 rounded-full transition-colors ${
                            selectedCategory === category
                              ? "bg-[var(--primary)] text-white"
                              : "bg-[var(--surface-container-high)] text-[var(--on-surface)]"
                          }`}
                        >
                          <span className="body-sm">{category}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Products */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-[var(--surface-container-low)] rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-[var(--on-surface-variant)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="headline-md text-[var(--on-surface)] mb-2">No products found</h3>
                  <p className="body-md text-[var(--on-surface-variant)] mb-6">
                    Try adjusting your filters or browse all products.
                  </p>
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className="btn-primary inline-flex"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}