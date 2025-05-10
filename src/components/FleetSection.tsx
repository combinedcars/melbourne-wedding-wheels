
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Users, Award, Settings } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const fleetData = [
  {
    id: 1,
    name: "BMW 7 Series",
    image: "https://1drv.ms/u/c/72672a5a563e27e8/EWi85ZHwlu5NuNyEJT6h3XsBMZDt_fTQ40w8dIxrVFiUnA?e=PGUef0",
    capacity: "3 passengers",
    description: "The epitome of luxury, our BMW 7 Series offers an unforgettable experience for the bride and groom.",
    features: ["White exterior", "Cream leather interior", "Champagne cooler", "Premium sound system"]
  },
  {
    id: 2,
    name: "Mercedes S-Class",
    image: "https://1drv.ms/u/c/72672a5a563e27e8/EZ0MMdKjY_xKke6Q4nEGVDgBSu4k0jD7sQvv7LCK6EzWNg?e=Z7EO30",
    capacity: "3 passengers",
    description: "Elegant and sophisticated, our Mercedes S-Class provides a smooth and luxurious ride for the wedding party.",
    features: ["Black exterior", "Black leather interior", "Climate control", "Privacy windows"]
  },
  {
    id: 3,
    name: "Mercedes E Class",
    image: "https://1drv.ms/i/c/72672a5a563e27e8/Ecsn3plIJhhEteueysJsv_UBVtHqMmdfqV8vbdtmREv1-g?e=C4TQ9z",
    capacity: "3 passengers",
    description: "Sleek European luxury with modern comfort, perfect for making a statement on your wedding day.",
    features: ["Black exterior", "Tan leather interior", "Panoramic roof", "Advanced climate control"]
  },
  {
    id: 4,
    name: "Mercedes V-Class",
    image: "https://1drv.ms/i/c/72672a5a563e27e8/EXiFqdLEl1ZEnFgSRGhz3gcBaGoZub-DoahQGxnfQRk3Ug?e=4dGLUq",
    capacity: "7 passengers",
    description: "Spacious luxury for the entire wedding party, ensuring everyone travels together in comfort and style.",
    features: ["Black exterior", "Leather interior", "Individual seats", "Ambient lighting"]
  }
];

const FleetSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState('');
  const isMobile = useIsMobile();
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Handle swipe gestures on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // Swipe left
      nextCar();
    }
    
    if (touchEnd - touchStart > 100) {
      // Swipe right
      prevCar();
    }
  };

  const displayedCars = () => {
    // For mobile, show 1, for tablet 2, for desktop 3
    let count = 1;
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) {
        count = 3;
      } else if (window.innerWidth >= 768) {
        count = 2;
      }
    }
    
    const result = [];
    for (let i = 0; i < count; i++) {
      const index = (currentIndex + i) % fleetData.length;
      result.push(fleetData[index]);
    }
    return result;
  };

  const nextCar = () => {
    setAnimationDirection('slide-left');
    setTimeout(() => {
      setCurrentIndex((currentIndex + 1) % fleetData.length);
      setAnimationDirection('');
    }, 300);
  };

  const prevCar = () => {
    setAnimationDirection('slide-right');
    setTimeout(() => {
      setCurrentIndex((currentIndex - 1 + fleetData.length) % fleetData.length);
      setAnimationDirection('');
    }, 300);
  };

  return (
    <section id="fleet" className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="section-heading">Our Luxury Fleet</h2>
        <p className="section-subheading">
          Experience unparalleled elegance with our collection of premium vehicles
        </p>

        <div className="mt-8 md:mt-12 relative">
          <div 
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 transition-all duration-300 ${animationDirection}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {displayedCars().map((car) => (
              <Card key={car.id} className="overflow-hidden border border-silver shadow-xl h-full flex flex-col">
                <div className="relative h-48 sm:h-64 overflow-hidden">
                  <img 
                    src={car.image} 
                    alt={car.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-0 right-0 bg-black/70 text-white px-3 py-1 text-sm font-medium">
                    <div className="flex items-center">
                      <Users size={14} className="mr-1" />
                      {car.capacity}
                    </div>
                  </div>
                </div>
                <CardContent className="flex-1 p-4 md:p-6">
                  <h3 className="font-playfair text-xl md:text-2xl font-semibold mb-2">{car.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm md:text-base">{car.description}</p>
                  
                  <div className="mt-3 md:mt-4">
                    <h4 className="font-semibold flex items-center text-xs md:text-sm uppercase tracking-wider text-gray-500 mb-2">
                      <Award size={isMobile ? 14 : 16} className="mr-1" /> Features
                    </h4>
                    <ul className="space-y-1">
                      {car.features.map((feature, index) => (
                        <li key={index} className="text-xs md:text-sm flex items-start">
                          <Settings size={isMobile ? 10 : 12} className="mr-1 mt-1 text-gold" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {isMobile && (
            <p className="text-center text-sm text-muted-foreground mt-4">
              Swipe left or right to view more
            </p>
          )}

          <div className="flex justify-center mt-6 md:mt-8 space-x-4">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={prevCar}
              className="rounded-full border-2 border-gold text-gold hover:bg-gold/10"
            >
              <ChevronLeft size={isMobile ? 16 : 20} />
            </Button>
            
            <div className="flex space-x-2">
              {fleetData.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-gold' : 'bg-silver'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                ></button>
              ))}
            </div>

            <Button 
              variant="outline" 
              size="icon" 
              onClick={nextCar}
              className="rounded-full border-2 border-gold text-gold hover:bg-gold/10"
            >
              <ChevronRight size={isMobile ? 16 : 20} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FleetSection;
