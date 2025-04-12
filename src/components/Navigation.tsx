
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, PhoneCall } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="flex items-center">
          <h1 className={`text-2xl font-bold font-playfair ${isScrolled ? 'text-primary' : 'text-white'}`}>
            <span className="text-gold">Wedding</span> Chauffeurs Melbourne
          </h1>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => scrollTo('home')} 
            className={`font-medium transition-colors ${isScrolled ? 'text-primary hover:text-gold' : 'text-white hover:text-gold-light'}`}
          >
            Home
          </button>
          <button 
            onClick={() => scrollTo('about')} 
            className={`font-medium transition-colors ${isScrolled ? 'text-primary hover:text-gold' : 'text-white hover:text-gold-light'}`}
          >
            About
          </button>
          <button 
            onClick={() => scrollTo('services')} 
            className={`font-medium transition-colors ${isScrolled ? 'text-primary hover:text-gold' : 'text-white hover:text-gold-light'}`}
          >
            Services
          </button>
          <button 
            onClick={() => scrollTo('packages')} 
            className={`font-medium transition-colors ${isScrolled ? 'text-primary hover:text-gold' : 'text-white hover:text-gold-light'}`}
          >
            Packages
          </button>
          <button 
            onClick={() => scrollTo('fleet')} 
            className={`font-medium transition-colors ${isScrolled ? 'text-primary hover:text-gold' : 'text-white hover:text-gold-light'}`}
          >
            Our Fleet
          </button>
          <button 
            onClick={() => scrollTo('testimonials')} 
            className={`font-medium transition-colors ${isScrolled ? 'text-primary hover:text-gold' : 'text-white hover:text-gold-light'}`}
          >
            Testimonials
          </button>
          <button 
            onClick={() => scrollTo('contact')} 
            className="btn-gold"
          >
            <PhoneCall className="mr-2 h-4 w-4" />
            Contact Us
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className={isScrolled ? 'text-primary' : 'text-white'} size={24} />
          ) : (
            <Menu className={isScrolled ? 'text-primary' : 'text-white'} size={24} />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute w-full">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <button 
              onClick={() => scrollTo('home')}
              className="text-primary font-medium py-2 hover:text-gold text-left"
            >
              Home
            </button>
            <button 
              onClick={() => scrollTo('about')}
              className="text-primary font-medium py-2 hover:text-gold text-left"
            >
              About
            </button>
            <button 
              onClick={() => scrollTo('services')}
              className="text-primary font-medium py-2 hover:text-gold text-left"
            >
              Services
            </button>
            <button 
              onClick={() => scrollTo('packages')}
              className="text-primary font-medium py-2 hover:text-gold text-left"
            >
              Packages
            </button>
            <button 
              onClick={() => scrollTo('fleet')}
              className="text-primary font-medium py-2 hover:text-gold text-left"
            >
              Our Fleet
            </button>
            <button 
              onClick={() => scrollTo('testimonials')}
              className="text-primary font-medium py-2 hover:text-gold text-left"
            >
              Testimonials
            </button>
            <Button 
              onClick={() => scrollTo('contact')}
              className="btn-gold w-full"
            >
              <PhoneCall className="mr-2 h-4 w-4" />
              Contact Us
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
