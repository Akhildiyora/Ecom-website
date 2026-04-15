import { Suspense } from "react";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<div className="min-h-screen bg-[var(--surface)]" />}>{children}</Suspense>;
}