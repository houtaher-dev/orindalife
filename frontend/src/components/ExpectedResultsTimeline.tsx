import React from "react";
import { getExpectedResults, ExpectedResultStage } from "@/lib/productExpectedResults";

type Variant = "vertical" | "grid";

export function ExpectedResultsTimeline({
  slug,
  variant = "vertical",
  title,
}: {
  slug: string;
  variant?: Variant;
  title?: string;
}) {
  const stages = getExpectedResults(slug);

  if (variant === "grid") {
    return (
      <section className="py-20 md:py-32 bg-[#141414]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="mb-4 inline-block px-4 py-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] font-bold text-sm rounded-full">
            من أول شهر استخدام
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B8860B] mb-16">
            {title ?? "وش راح تشوف خلال أول 30 يوم؟"}
          </h2>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-1/6 right-1/6 h-0.5 bg-[#333333] z-0" />

            {stages.map((stage, index) => (
              <StageCard key={stage.title} stage={stage} index={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="space-y-8 relative before:absolute before:right-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#333333] z-10">
      {stages.map((stage, index) => (
        <div key={stage.title} className="relative flex items-start gap-5">
          <StageBadge index={index} />
          <div className="text-right pt-1">
            <h4 className="font-black text-[#F3E5AB] text-base mb-2">{stage.title}</h4>
            <p className="text-sm text-gray-300 leading-relaxed">{stage.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function StageBadge({ index }: { index: number }) {
  const isLast = index === 2;

  return (
    <div
      className={`w-8 h-8 rounded-full font-black flex items-center justify-center shrink-0 z-10 border-2 ${
        isLast
          ? "bg-gradient-to-br from-[#D4AF37] to-[#B8860B] text-[#0a0a0a] border-[#141414] shadow-[0_0_15px_rgba(212,175,55,0.4)]"
          : "bg-[#1a1a1a] text-[#D4AF37] border-[#D4AF37]/50 shadow-[0_0_10px_rgba(212,175,55,0.2)]"
      }`}
    >
      {index + 1}
    </div>
  );
}

function StageCard({ stage, index }: { stage: ExpectedResultStage; index: number }) {
  const isLast = index === 2;

  return (
    <div className={`relative z-10 ${index > 0 ? "mt-8 md:mt-0" : ""}`}>
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-black mx-auto mb-6 border-2 ${
          isLast
            ? "bg-gradient-to-br from-[#D4AF37] to-[#B8860B] text-[#0a0a0a] border-[#141414] shadow-[0_0_20px_rgba(212,175,55,0.4)]"
            : "bg-[#1a1a1a] border-[#D4AF37] text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.2)]"
        }`}
      >
        {index + 1}
      </div>
      <div className="bg-[#1a1a1a] p-8 rounded-3xl shadow-sm border border-[#333333] h-full hover:border-[#D4AF37]/30 transition-colors">
        <h3 className={`text-xl font-black mb-3 ${isLast ? "text-[#D4AF37]" : "text-white"}`}>
          {stage.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed">{stage.description}</p>
      </div>
    </div>
  );
}
