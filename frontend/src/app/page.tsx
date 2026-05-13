import { Hero } from "@/components/Hero";
import { ProductsSection } from "@/components/ProductsSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { FAQSection } from "@/components/FAQSection";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductsSection />
      <ReviewsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <FAQSection />
    </>
  );
}
