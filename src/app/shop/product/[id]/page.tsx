"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components";
import { getProductById } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function ProductDetailPage() {
  const params = useParams();
  const product = getProductById(params.id as string);
  const { addItem } = useCart();

  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="headline-lg text-[var(--on-surface)] mb-4">Product Not Found</h1>
          <p className="body-lg text-[var(--on-surface-variant)] mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/shop" className="btn-primary inline-flex">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity, selectedColor, selectedSize);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--surface)]">
      {/* Breadcrumb */}
      <div className="bg-[var(--surface-container-low)] py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-[var(--on-surface-variant)] hover:text-[var(--primary)]">
              Home
            </Link>
            <span className="text-[var(--on-surface-variant)]">/</span>
            <Link href="/shop" className="text-[var(--on-surface-variant)] hover:text-[var(--primary)]">
              Shop
            </Link>
            <span className="text-[var(--on-surface-variant)]">/</span>
            <Link
              href={`/shop?category=${product.category}`}
              className="text-[var(--on-surface-variant)] hover:text-[var(--primary)]"
            >
              {product.category}
            </Link>
            <span className="text-[var(--on-surface-variant)]">/</span>
            <span className="text-[var(--on-surface)]">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <section className="flex-1 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Product Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-[var(--surface-container-low)] rounded-3xl overflow-hidden">
                <img
                  src={product.images[activeImage] || "/placeholder-product.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all ${
                        activeImage === index
                          ? "border-[var(--primary)]"
                          : "border-transparent hover:border-[var(--outline-variant)]"
                      }`}
                    >
                      <img
                        src={image || "/placeholder-product.svg"}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="lg:sticky lg:top-32 lg:self-start space-y-6">
              {/* Header */}
              <div>
                <p className="label-md text-[var(--primary)] mb-2">{product.category}</p>
                <h1 className="headline-lg text-[var(--on-surface)] mb-4">{product.name}</h1>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-[var(--primary)]" : "text-[var(--outline-variant)]"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="body-md text-[var(--on-surface-variant)]">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-4">
                  <span className="display-sm text-[var(--on-surface)]">
                    ${product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="body-lg text-[var(--on-surface-variant)] line-through">
                        ${product.originalPrice.toLocaleString()}
                      </span>
                      <span className="px-3 py-1 bg-[var(--tertiary)] text-white text-sm font-semibold rounded-full">
                        Save ${(product.originalPrice - product.price).toLocaleString()}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Short Description */}
              <p className="body-lg text-[var(--on-surface-variant)]">{product.shortDescription}</p>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                {product.inStock ? (
                  <>
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="body-md text-green-600 font-medium">In Stock</span>
                    {product.stockCount && product.stockCount < 10 && (
                      <span className="body-md text-[var(--tertiary)]">
                        - Only {product.stockCount} left
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="body-md text-red-600 font-medium">Out of Stock</span>
                  </>
                )}
              </div>

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <p className="label-md text-[var(--on-surface)]">Color</p>
                    <p className="body-md text-[var(--on-surface-variant)]">{selectedColor?.name}</p>
                  </div>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`w-12 h-12 rounded-full border-2 transition-all ${
                          selectedColor?.name === color.name
                            ? "border-[var(--primary)] scale-110"
                            : "border-transparent hover:scale-105"
                        }`}
                        style={{ backgroundColor: color.hex }}
                        aria-label={color.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <p className="label-md text-[var(--on-surface)]">Size</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-3 rounded-xl border-2 transition-all ${
                          selectedSize === size
                            ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]"
                            : "border-[var(--outline-variant)] text-[var(--on-surface)] hover:border-[var(--primary)]"
                        }`}
                      >
                        <span className="body-md font-medium">{size}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <p className="label-md text-[var(--on-surface)] mb-3">Quantity</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-[var(--outline-variant)] rounded-xl">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 flex items-center justify-center text-[var(--on-surface)] hover:bg-[var(--surface-container-low)] transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="w-16 text-center body-lg text-[var(--on-surface)] font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 flex items-center justify-center text-[var(--on-surface)] hover:bg-[var(--surface-container-low)] transition-colors"
                      aria-label="Increase quantity"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  className="text-lg"
                  onClick={handleAddToCart}
                >
                  {addedToCart ? (
                    <span className="flex items-center gap-2">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Added to Cart
                    </span>
                  ) : (
                    `Add to Cart - $${(product.price * quantity).toLocaleString()}`
                  )}
                </Button>
                <Button variant="secondary" size="lg" className="px-8">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </Button>
              </div>

              {/* Product Details */}
              <div className="border-t border-outline-variant/15 pt-8">
                <h3 className="label-md text-[var(--on-surface)] mb-4">Product Details</h3>
                <p className="body-md text-[var(--on-surface-variant)] leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Shipping Info */}
              <div className="bg-[var(--surface-container-low)] rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <svg className="w-6 h-6 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  <div>
                    <p className="body-md font-medium text-[var(--on-surface)]">Free Shipping</p>
                    <p className="body-sm text-[var(--on-surface-variant)]">On orders over $200</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <svg className="w-6 h-6 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <p className="body-md font-medium text-[var(--on-surface)]">30-Day Returns</p>
                    <p className="body-sm text-[var(--on-surface-variant)]">Full refund if not satisfied</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <svg className="w-6 h-6 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <div>
                    <p className="body-md font-medium text-[var(--on-surface)]">Secure Payment</p>
                    <p className="body-sm text-[var(--on-surface-variant)]">All major cards accepted</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}