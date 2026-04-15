"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[var(--on-surface)]/30 z-50 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[var(--surface-container-lowest)] z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ boxShadow: "0 20px 50px rgba(19, 27, 46, 0.05)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-outline-variant/15">
          <h2 className="headline-md text-[var(--on-surface)]">Your Cart</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[var(--surface-container-low)] transition-colors"
            aria-label="Close cart"
          >
            <svg className="w-6 h-6 text-[var(--on-surface)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col h-[calc(100%-180px)]">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6">
              <div className="w-24 h-24 bg-[var(--surface-container-low)] rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-[var(--on-surface-variant)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="headline-md text-[var(--on-surface)] mb-2">Your cart is empty</h3>
              <p className="body-md text-[var(--on-surface-variant)] mb-6 text-center">
                Add some beautiful pieces to get started
              </p>
              <Link href="/shop" onClick={onClose} className="btn-primary">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.selectedColor?.name || ""}-${item.selectedSize || ""}`} className="flex gap-4">
                  <div className="w-24 h-24 bg-[var(--surface-container-low)] rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.images[0] || "/placeholder-product.svg"}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="body-lg font-medium text-[var(--on-surface)] truncate">{item.product.name}</h3>
                    <p className="body-sm text-[var(--on-surface-variant)]">
                      {item.selectedColor && `${item.selectedColor.name}`}
                      {item.selectedColor && item.selectedSize && " • "}
                      {item.selectedSize && item.selectedSize}
                    </p>
                    <p className="body-md font-semibold text-[var(--on-surface)] mt-1">
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="p-1 text-[var(--on-surface-variant)] hover:text-[var(--error)] transition-colors"
                      aria-label="Remove item"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-[var(--surface-container-high)] flex items-center justify-center hover:bg-[var(--surface-container)] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="w-8 text-center body-md">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-[var(--surface-container-high)] flex items-center justify-center hover:bg-[var(--surface-container)] transition-colors"
                        aria-label="Increase quantity"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-outline-variant/15 bg-[var(--surface-container-lowest)]">
            <div className="flex justify-between items-center mb-4">
              <span className="body-lg text-[var(--on-surface)]">Subtotal</span>
              <span className="headline-md text-[var(--on-surface)]">${subtotal.toLocaleString()}</span>
            </div>
            <p className="body-sm text-[var(--on-surface-variant)] mb-4">
              Shipping and taxes calculated at checkout
            </p>
            <Link
              href="/checkout"
              onClick={onClose}
              className="btn-primary w-full text-center block"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}