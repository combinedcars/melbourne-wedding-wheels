
import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import FleetSection from '@/components/FleetSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Update the title
    document.title = 'Melbourne Wedding Wheels | Luxury Wedding Chauffeurs';

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
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
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
