
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
      <div className="absolute inset-0 bg-cover bg-center" style={{ 
        backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)), url("https://images.unsplash.com/photo-1619961605548-a535cc7470fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80")', 
        backgroundAttachment: 'fixed' 
      }}></div>
      
      <div className="container relative z-10 px-4 pt-20 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight animate-fade-in mb-6">
          Luxury Wedding <span className="text-gold">Chauffeur</span> Service
        </h1>
        <p className="text-lg md:text-xl text-silver-light max-w-3xl animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
          Make your special day truly unforgettable with our premium fleet of luxury vehicles and professional chauffeurs in Melbourne.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in opacity-0" style={{ animationDelay: '0.4s' }}>
          <Button onClick={scrollToContact} className="btn-gold text-base px-8 py-6">
            Request a Quote
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            onClick={() => {
              const element = document.getElementById('fleet');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-base px-8 py-6"
          >
            View Our Fleet
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
