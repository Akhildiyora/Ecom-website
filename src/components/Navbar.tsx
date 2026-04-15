"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 glass border-b border-outline-variant/15">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-container)] flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="headline-md text-[var(--on-surface)] hidden sm:block">Nexus Prime</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <Link href="/" className="body-lg text-[var(--on-surface)] hover:text-[var(--primary)] transition-colors">
                Home
              </Link>
              <Link href="/shop" className="body-lg text-[var(--on-surface)] hover:text-[var(--primary)] transition-colors">
                Shop
              </Link>
              <Link href="/shop?category=Furniture" className="body-lg text-[var(--on-surface)] hover:text-[var(--primary)] transition-colors">
                Furniture
              </Link>
              <Link href="/shop?category=Lighting" className="body-lg text-[var(--on-surface)] hover:text-[var(--primary)] transition-colors">
                Lighting
              </Link>
              <Link href="/shop?category=Decor" className="body-lg text-[var(--on-surface)] hover:text-[var(--primary)] transition-colors">
                Decor
              </Link>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 rounded-full hover:bg-[var(--surface-container-low)] transition-colors"
                aria-label="Search"
              >
                <svg className="w-5 h-5 text-[var(--on-surface)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Account */}
              <Link
                href="/signin"
                className="p-2 rounded-full hover:bg-[var(--surface-container-low)] transition-colors hidden sm:block"
                aria-label="Account"
              >
                <svg className="w-5 h-5 text-[var(--on-surface)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>

              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 rounded-full hover:bg-[var(--surface-container-low)] transition-colors relative"
                aria-label="Cart"
              >
                <svg className="w-5 h-5 text-[var(--on-surface)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[var(--primary)] text-white text-xs flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-full hover:bg-[var(--surface-container-low)] transition-colors"
                aria-label="Menu"
              >
                <svg className="w-5 h-5 text-[var(--on-surface)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {isSearchOpen && (
            <div className="py-4 border-t border-outline-variant/15">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="input-field pl-12"
                  autoFocus
                />
                <svg className="w-5 h-5 text-[var(--on-surface-variant)] absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-[var(--surface-container-lowest)] border-t border-outline-variant/15">
            <div className="px-6 py-4 space-y-4">
              <Link
                href="/"
                className="block body-lg text-[var(--on-surface)] py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="block body-lg text-[var(--on-surface)] py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/shop?category=Furniture"
                className="block body-lg text-[var(--on-surface)] py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Furniture
              </Link>
              <Link
                href="/shop?category=Lighting"
                className="block body-lg text-[var(--on-surface)] py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Lighting
              </Link>
              <Link
                href="/shop?category=Decor"
                className="block body-lg text-[var(--on-surface)] py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Decor
              </Link>
              <div className="pt-4 border-t border-outline-variant/15">
                <Link
                  href="/signin"
                  className="block body-lg text-[var(--on-surface)] py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="block body-lg text-[var(--on-surface)] py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}