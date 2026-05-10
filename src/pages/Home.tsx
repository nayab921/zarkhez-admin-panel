import HeroSection from '../components/home/HeroSection';
import ProblemSection from '../components/home/ProblemSection';
import FeaturesSection from '../components/home/FeaturesSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import PricingSection from '../components/home/PricingSection';
import CTASection from '../components/home/CTASection';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <ProblemSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
    </div>
  );
}