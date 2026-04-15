import Link from "next/link";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  size?: "default" | "large";
}

export default function ProductCard({ product, size = "default" }: ProductCardProps) {
  const isLarge = size === "large";

  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className={`card relative overflow-hidden ${isLarge ? "aspect-[4/5]" : "aspect-square"}`}>
        {/* Product Image */}
        <div className={`relative ${isLarge ? "aspect-[4/5]" : "aspect-square"} bg-[var(--surface-container-low)]`}>
          <img
            src={product.images[0] || "/placeholder-product.svg"}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNew && (
              <span className="px-3 py-1 bg-[var(--primary)] text-white text-xs font-semibold rounded-full">
                NEW
              </span>
            )}
            {product.originalPrice && (
              <span className="px-3 py-1 bg-[var(--tertiary)] text-white text-xs font-semibold rounded-full">
                SALE
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute bottom-4 left-4 right-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <button className="w-full py-3 bg-[var(--surface-container-highest)] backdrop-blur-md text-[var(--on-surface)] rounded-full font-semibold text-sm hover:bg-[var(--primary)] hover:text-white transition-colors">
              Quick View
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 lg:p-6">
          <p className="label-md text-[var(--primary)] mb-2">{product.category}</p>
          <h3 className={`${isLarge ? "headline-md" : "body-lg"} text-[var(--on-surface)] mb-2 line-clamp-1`}>
            {product.name}
          </h3>
          <p className="body-md text-[var(--on-surface-variant)] mb-3 line-clamp-2 hidden sm:block">
            {product.shortDescription}
          </p>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="headline-md text-[var(--on-surface)]">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="body-md text-[var(--on-surface-variant)] line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-[var(--primary)]" : "text-[var(--outline-variant)]"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="body-sm text-[var(--on-surface-variant)]">
              {product.rating} ({product.reviewCount})
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}