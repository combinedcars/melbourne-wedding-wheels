
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah & Michael",
    date: "February 2025",
    image: "https://images.unsplash.com/photo-1523419409543-a5e549c1faa1?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    text: "The team at Melbourne Wedding Wheels made our special day even more incredible. The Rolls Royce was immaculate, and our chauffeur was professional and courteous. We couldn't have asked for better service!"
  },
  {
    id: 2,
    name: "Emma & James",
    date: "November 2024",
    image: "https://images.unsplash.com/photo-1532694115846-302e337359f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    text: "From the first inquiry to the final drop-off, the service was impeccable. The Mercedes S-Class was stunning and made for beautiful photos. Thank you for helping make our day perfect!"
  },
  {
    id: 3,
    name: "Jessica & David",
    date: "July 2024",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    text: "Our chauffeur went above and beyond, even helping with my dress as I got in and out of the car. The Bentley was gorgeous and added such elegance to our wedding. Highly recommend!"
  },
  {
    id: 4,
    name: "Olivia & Thomas",
    date: "March 2024",
    image: "https://images.unsplash.com/photo-1537633552985-df8429e8d7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    text: "The V-Class was perfect for our wedding party! Everyone was comfortable and arrived on time. The driver was friendly and accommodating with our schedule changes. Fantastic service!"
  }
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('');

  const nextTestimonial = () => {
    setSlideDirection('slide-left');
    setTimeout(() => {
      setActiveIndex((activeIndex + 1) % testimonials.length);
      setSlideDirection('');
    }, 300);
  };

  const prevTestimonial = () => {
    setSlideDirection('slide-right');
    setTimeout(() => {
      setActiveIndex((activeIndex - 1 + testimonials.length) % testimonials.length);
      setSlideDirection('');
    }, 300);
  };

  return (
    <section 
      id="testimonials" 
      className="py-24 relative text-white"
      style={{
        backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container mx-auto px-4">
        <h2 className="section-heading text-white">Happy Couples</h2>
        <p className="section-subheading text-silver">
          Read what our clients have to say about their experience
        </p>

        <div className="mt-12 max-w-4xl mx-auto">
          <div className={`transition-all duration-300 ${slideDirection}`}>
            <Card className="bg-black/50 backdrop-blur-sm border-none shadow-xl">
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-gold">
                    <img 
                      src={testimonials[activeIndex].image}
                      alt={testimonials[activeIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <Quote className="text-gold mb-4 h-10 w-10" />
                    <p className="text-xl font-light italic mb-6">
                      {testimonials[activeIndex].text}
                    </p>
                    
                    <div className="mt-4">
                      <h4 className="text-xl font-playfair font-semibold">{testimonials[activeIndex].name}</h4>
                      <p className="text-gold">{testimonials[activeIndex].date}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center mt-8 space-x-4">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={prevTestimonial}
              className="rounded-full border-2 border-white text-white hover:bg-white/10"
            >
              <ChevronLeft size={20} />
            </Button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === activeIndex ? 'bg-gold' : 'bg-white/50'
                  }`}
                  onClick={() => setActiveIndex(index)}
                ></button>
              ))}
            </div>

            <Button 
              variant="outline" 
              size="icon" 
              onClick={nextTestimonial}
              className="rounded-full border-2 border-white text-white hover:bg-white/10"
            >
              <ChevronRight size={20} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
