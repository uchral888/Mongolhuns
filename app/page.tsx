import { Suspense } from 'react';
import { HeroSection } from '@/components/landing/hero-section';
import { FeatureSection } from '@/components/landing/feature-section';
import { StatsSection } from '@/components/landing/stats-section';
import { CTASection } from '@/components/landing/cta-section';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Suspense fallback={<LoadingSpinner />}>
        <main className="relative">
          <HeroSection />
          <FeatureSection />
          <StatsSection />
          <CTASection />
        </main>
      </Suspense>
      <Footer />
    </div>
  );
}