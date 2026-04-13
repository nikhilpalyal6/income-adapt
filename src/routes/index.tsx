import { createFileRoute } from '@tanstack/react-router';
import { LandingNav } from '../components/landing/LandingNav';
import { HeroSection } from '../components/landing/HeroSection';
import { ProblemSection } from '../components/landing/ProblemSection';
import { SolutionSection } from '../components/landing/SolutionSection';
import { FeaturesSection } from '../components/landing/FeaturesSection';
import { HowItWorksSection } from '../components/landing/HowItWorksSection';
import { DemoPreviewSection } from '../components/landing/DemoPreviewSection';
import { TrustSection } from '../components/landing/TrustSection';
import { CTASection } from '../components/landing/CTASection';
import { Footer } from '../components/landing/Footer';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'FreelanceFin - Finance That Adapts to Your Freelance Life' },
      { name: 'description', content: 'Manage irregular income, save taxes automatically, and stay financially stable. Built for Gen-Z freelancers in India.' },
      { property: 'og:title', content: 'FreelanceFin - Finance That Adapts to Your Freelance Life' },
      { property: 'og:description', content: 'Manage irregular income, save taxes automatically, and stay financially stable.' },
    ],
  }),
  component: IndexPage,
});

function IndexPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <HowItWorksSection />
      <DemoPreviewSection />
      <TrustSection />
      <CTASection />
      <Footer />
    </div>
  );
}
