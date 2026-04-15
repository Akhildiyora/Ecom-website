"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components";
import { products } from "@/data/products";

export default function CheckoutPage() {
  const [step, setStep] = useState<"shipping" | "payment" | "review">("shipping");
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  });

  // Sample cart items
  const cartItems = [
    { product: products[0], quantity: 1 },
    { product: products[2], quantity: 2 },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 200 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--surface)]">
      {/* Header */}
      <header className="bg-[var(--surface-container-low)] py-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-container)] flex items-center justify-center">
                <span className="text-white font-bold">N</span>
              </div>
              <span className="headline-md text-[var(--on-surface)]">Nexus Prime</span>
            </Link>

            {/* Checkout Steps */}
            <div className="hidden md:flex items-center gap-8">
              {["shipping", "payment", "review"].map((s, index) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                      step === s
                        ? "bg-[var(--primary)] text-white"
                        : index < ["shipping", "payment", "review"].indexOf(step)
                        ? "bg-green-500 text-white"
                        : "bg-[var(--surface-container-high)] text-[var(--on-surface-variant)]"
                    }`}
                  >
                    {index < ["shipping", "payment", "review"].indexOf(step) ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span
                    className={`body-md capitalize ${
                      step === s ? "text-[var(--on-surface)]" : "text-[var(--on-surface-variant)]"
                    }`}
                  >
                    {s}
                  </span>
                </div>
              ))}
            </div>

            {/* Security Badge */}
            <div className="flex items-center gap-2 text-[var(--on-surface-variant)]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="body-sm hidden sm:inline">Secure Checkout</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="flex-1 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Form Section */}
            <div className="lg:col-span-2">
              {/* Shipping Step */}
              {step === "shipping" && (
                <div className="space-y-8">
                  <div className="bg-[var(--surface-container-lowest)] rounded-3xl p-8">
                    <h2 className="headline-md text-[var(--on-surface)] mb-6">Contact Information</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="label-md text-[var(--on-surface)] mb-2 block">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="input-field"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-[var(--surface-container-lowest)] rounded-3xl p-8">
                    <h2 className="headline-md text-[var(--on-surface)] mb-6">Shipping Address</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="label-md text-[var(--on-surface)] mb-2 block">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="input-field"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="label-md text-[var(--on-surface)] mb-2 block">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="input-field"
                          placeholder="Doe"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="label-md text-[var(--on-surface)] mb-2 block">Street Address</label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="input-field"
                          placeholder="123 Main Street"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="label-md text-[var(--on-surface)] mb-2 block">Apartment, Suite, etc. (optional)</label>
                        <input
                          type="text"
                          name="apartment"
                          value={formData.apartment}
                          onChange={handleInputChange}
                          className="input-field"
                          placeholder="Apt 4B"
                        />
                      </div>
                      <div>
                        <label className="label-md text-[var(--on-surface)] mb-2 block">City</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="input-field"
                          placeholder="New York"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="label-md text-[var(--on-surface)] mb-2 block">State</label>
                          <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            className="input-field"
                            placeholder="NY"
                          />
                        </div>
                        <div>
                          <label className="label-md text-[var(--on-surface)] mb-2 block">ZIP Code</label>
                          <input
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            className="input-field"
                            placeholder="10001"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="label-md text-[var(--on-surface)] mb-2 block">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="input-field"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <Link href="/shop" className="body-lg text-[var(--primary)] hover:underline">
                      Return to Shop
                    </Link>
                    <Button variant="primary" size="lg" onClick={() => setStep("payment")}>
                      Continue to Payment
                    </Button>
                  </div>
                </div>
              )}

              {/* Payment Step */}
              {step === "payment" && (
                <div className="space-y-8">
                  <div className="bg-[var(--surface-container-lowest)] rounded-3xl p-8">
                    <h2 className="headline-md text-[var(--on-surface)] mb-6">Payment Method</h2>

                    {/* Card Types */}
                    <div className="flex gap-4 mb-8">
                      <div className="px-6 py-3 bg-[var(--surface-container-high)] rounded-xl border-2 border-[var(--primary)]">
                        <img src="/payments/visa.svg" alt="Visa" className="h-8" />
                      </div>
                      <div className="px-6 py-3 bg-[var(--surface-container-high)] rounded-xl border-2 border-transparent hover:border-[var(--outline-variant)] transition-colors">
                        <img src="/payments/mastercard.svg" alt="Mastercard" className="h-8" />
                      </div>
                      <div className="px-6 py-3 bg-[var(--surface-container-high)] rounded-xl border-2 border-transparent hover:border-[var(--outline-variant)] transition-colors">
                        <img src="/payments/amex.svg" alt="Amex" className="h-8" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="label-md text-[var(--on-surface)] mb-2 block">Name on Card</label>
                        <input
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          className="input-field"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="label-md text-[var(--on-surface)] mb-2 block">Card Number</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className="input-field"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="label-md text-[var(--on-surface)] mb-2 block">Expiry Date</label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            className="input-field"
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <label className="label-md text-[var(--on-surface)] mb-2 block">CVV</label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            className="input-field"
                            placeholder="123"
                            maxLength={4}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center gap-3">
                      <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span className="body-sm text-[var(--on-surface-variant)]">
                        Your payment information is encrypted and secure
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <button onClick={() => setStep("shipping")} className="body-lg text-[var(--primary)] hover:underline">
                      Return to Shipping
                    </button>
                    <Button variant="primary" size="lg" onClick={() => setStep("review")}>
                      Continue to Review
                    </Button>
                  </div>
                </div>
              )}

              {/* Review Step */}
              {step === "review" && (
                <div className="space-y-8">
                  <div className="bg-[var(--surface-container-lowest)] rounded-3xl p-8">
                    <h2 className="headline-md text-[var(--on-surface)] mb-6">Review Your Order</h2>

                    {/* Shipping Summary */}
                    <div className="mb-8">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="label-md text-[var(--primary)]">Shipping Address</h3>
                        <button onClick={() => setStep("shipping")} className="body-sm text-[var(--primary)] hover:underline">
                          Edit
                        </button>
                      </div>
                      <p className="body-md text-[var(--on-surface)]">
                        {formData.firstName} {formData.lastName}
                      </p>
                      <p className="body-md text-[var(--on-surface-variant)]">
                        {formData.address} {formData.apartment}
                      </p>
                      <p className="body-md text-[var(--on-surface-variant)]">
                        {formData.city}, {formData.state} {formData.zipCode}
                      </p>
                    </div>

                    {/* Payment Summary */}
                    <div className="mb-8">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="label-md text-[var(--primary)]">Payment Method</h3>
                        <button onClick={() => setStep("payment")} className="body-sm text-[var(--primary)] hover:underline">
                          Edit
                        </button>
                      </div>
                      <p className="body-md text-[var(--on-surface)]">
                        {formData.cardName}
                      </p>
                      <p className="body-md text-[var(--on-surface-variant)]">
                        Card ending in {formData.cardNumber.slice(-4)}
                      </p>
                    </div>

                    {/* Order Items */}
                    <div>
                      <h3 className="label-md text-[var(--primary)] mb-4">Order Items</h3>
                      <div className="space-y-4">
                        {cartItems.map((item, index) => (
                          <div key={index} className="flex gap-4">
                            <div className="w-20 h-20 bg-[var(--surface-container-low)] rounded-xl overflow-hidden">
                              <img
                                src={item.product.images[0] || "/placeholder-product.svg"}
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="body-md font-medium text-[var(--on-surface)]">{item.product.name}</p>
                              <p className="body-sm text-[var(--on-surface-variant)]">Qty: {item.quantity}</p>
                            </div>
                            <p className="body-md text-[var(--on-surface)]">
                              ${(item.product.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <button onClick={() => setStep("payment")} className="body-lg text-[var(--primary)] hover:underline">
                      Return to Payment
                    </button>
                    <Button variant="primary" size="lg" className="px-12">
                      Place Order - ${total.toFixed(2)}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[var(--surface-container-lowest)] rounded-3xl p-6 lg:p-8 sticky top-32">
                <h2 className="headline-md text-[var(--on-surface)] mb-6">Order Summary</h2>

                {/* Items */}
                <div className="space-y-4 mb-6">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="relative w-16 h-16 bg-[var(--surface-container-low)] rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={item.product.images[0] || "/placeholder-product.svg"}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute -top-2 -right-2 w-6 h-6 bg-[var(--primary)] text-white text-xs rounded-full flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="body-sm font-medium text-[var(--on-surface)] truncate">{item.product.name}</p>
                        <p className="body-xs text-[var(--on-surface-variant)]">{item.product.category}</p>
                      </div>
                      <p className="body-sm text-[var(--on-surface)]">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t border-outline-variant/15 pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="body-md text-[var(--on-surface-variant)]">Subtotal</span>
                    <span className="body-md text-[var(--on-surface)]">${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="body-md text-[var(--on-surface-variant)]">Shipping</span>
                    <span className="body-md text-[var(--on-surface)]">
                      {shipping === 0 ? "Free" : `$${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="body-md text-[var(--on-surface-variant)]">Tax</span>
                    <span className="body-md text-[var(--on-surface)]">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-outline-variant/15">
                    <span className="body-lg font-semibold text-[var(--on-surface)]">Total</span>
                    <span className="body-lg font-semibold text-[var(--on-surface)]">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mt-6 pt-6 border-t border-outline-variant/15">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code"
                      className="input-field flex-1"
                    />
                    <Button variant="secondary" className="px-4">
                      Apply
                    </Button>
                  </div>
                </div>

                {/* Benefits */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-[var(--on-surface-variant)]">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="body-sm">Free shipping on orders over $200</span>
                  </div>
                  <div className="flex items-center gap-3 text-[var(--on-surface-variant)]">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="body-sm">30-day money-back guarantee</span>
                  </div>
                  <div className="flex items-center gap-3 text-[var(--on-surface-variant)]">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="body-sm">Secure SSL encryption</span>
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