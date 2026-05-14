import { Hero } from "@/components/Hero";
import { ProductsSection } from "@/components/ProductsSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductsSection />
      <FeaturesSection />
      <HowItWorksSection />
    </>
  );
}
