
import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import PackagesSection from '@/components/PackagesSection';
import FleetSection from '@/components/FleetSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useWordPress } from '@/context/WordPressContext';

const Index = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { siteSettings, loading } = useWordPress();

  useEffect(() => {
    // Update the title from WordPress settings if available
    document.title = siteSettings?.site_title || 'Wedding Chauffeurs Melbourne | Luxury Wedding Chauffeurs';

    // Add scroll event listener for the scroll-to-top button
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [siteSettings]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold mb-4"></div>
          <p className="text-primary">Loading content from WordPress...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PackagesSection />
      <FleetSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      
      {/* Scroll to top button - visible on mobile and desktop */}
      {showScrollTop && (
        <Button 
          onClick={scrollToTop} 
          className="fixed bottom-6 right-6 z-50 p-2 rounded-full bg-gold hover:bg-gold-dark text-white shadow-lg"
          size="icon"
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </Button>
      )}
    </div>
  );
};

export default Index;
