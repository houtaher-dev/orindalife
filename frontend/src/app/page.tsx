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
      <div className="bg-[#1A365D] py-8 border-y border-[#FF6B35]/20">
        <div className="dark-theme-override">
          <ReviewsSection isDark={true} />
        </div>
      </div>
      <FeaturesSection />
      <HowItWorksSection />
      <div className="bg-[#0B1B3D] py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="dark-theme-override">
            <FAQSection isDark={true} />
          </div>
        </div>
      </div>
    </>
  );
}
