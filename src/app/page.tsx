// src/app/page.tsx
import { auth } from "@/src/auth";
import Hero from "@/src/components/Hero";
import CategorySection from "@/src/components/CategorySection";
import FeaturedVendors from "@/src/components/FeaturedVendors";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex-1 bg-white">
      <Hero />
      <CategorySection />
      <FeaturedVendors />

    </main>
  );
}