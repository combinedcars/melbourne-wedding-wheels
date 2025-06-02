
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center bg-black"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{ 
          backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)), url("/lovable-uploads/2ded3841-e5bf-4a03-991b-3f7be497a830.png")',
          backgroundPosition: 'center center',
          backgroundSize: 'cover'
        }}
      >
        {/* Mobile responsive overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30 md:bg-opacity-0"></div>
      </div>
      
      <div className="container relative z-10 px-4 pt-20 flex flex-col items-center text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight animate-fade-in mb-4 sm:mb-6">
          Luxury Wedding <span className="text-gold">Chauffeur</span> Service
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-silver-light max-w-3xl animate-fade-in opacity-0 px-4" style={{ animationDelay: '0.2s' }}>
          Make your special day truly unforgettable with our premium fleet of luxury vehicles and professional chauffeurs in Melbourne.
        </p>
        
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in opacity-0 w-full sm:w-auto px-4 sm:px-0" style={{ animationDelay: '0.4s' }}>
          <Button onClick={scrollToContact} className="btn-gold text-sm sm:text-base px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto">
            Request a Quote
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <Button 
            variant="outline" 
            onClick={() => {
              const element = document.getElementById('fleet');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-sm sm:text-base px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto"
          >
            View Our Fleet
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
