import React from 'react';
import { HeroSection } from './HeroSection';
import { CategoriesGrid } from './CategoriesGrid';
import { FeaturedProvidersSection } from './FeaturedProvidersSection';
import { HowItWorksSection } from './HowItWorksSection';
import { QuoteComparisonView } from './QuoteComparisonView';
import { EmergencyBannerSection } from './EmergencyBannerSection';
import { DigitalGaragePreviewSection } from './DigitalGaragePreviewSection';
import { AIAssistantBannerSection } from './AIAssistantBannerSection';
import { TestimonialsSection } from './TestimonialsSection';
import { AppDownloadSection } from './AppDownloadSection';
import { FAQSection } from './FAQSection';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-0">
      {/* 1. Hero & Search Terminal */}
      <HeroSection />

      {/* 2. Official Automotive Taxonomy (21+ Categories) */}
      <CategoriesGrid />

      {/* 3. Top Verified Workshops & Centers Spotlight */}
      <FeaturedProvidersSection />

      {/* 4. How It Works (4 Interactive Steps) */}
      <HowItWorksSection />

      {/* 5. Live Transparent Quote Comparison Matrix */}
      <QuoteComparisonView />

      {/* 6. 24/7 Roadside SOS & Towing Callout */}
      <EmergencyBannerSection />

      {/* 7. Digital Vehicle Ownership Cockpit Teaser */}
      <DigitalGaragePreviewSection />

      {/* 8. Ask Ahl AI — Automotive Diagnostics & OBD-II Scanner */}
      <AIAssistantBannerSection />

      {/* 9. Verified Customer Testimonials & Reviews */}
      <TestimonialsSection />

      {/* 10. Mobile Apps Download & QR Section */}
      <AppDownloadSection />

      {/* 11. Frequently Asked Questions Accordion */}
      <FAQSection />
    </div>
  );
};
