
import { Check } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="bg-white py-24">
      <div className="container mx-auto px-4">
        <h2 className="section-heading">About Melbourne Wedding Wheels</h2>
        <p className="section-subheading">
          Providing luxury chauffeur services for weddings across Melbourne for over 15 years
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-12">
          <div className="space-y-6 animate-slide-up opacity-0">
            <p className="text-lg">
              At Melbourne Wedding Wheels, we understand that your wedding day is one of the most important days of your life. Our premium chauffeur service is designed to provide you with a touch of elegance and sophistication, ensuring that your transportation is as memorable as the celebration itself.
            </p>
            <p className="text-lg">
              With a fleet of meticulously maintained luxury vehicles and professionally trained chauffeurs, we take pride in offering a service that exceeds expectations. From the moment we pick you up to the final destination, we ensure a seamless, stress-free experience.
            </p>
            
            <div className="pt-4">
              <h3 className="text-xl font-semibold mb-4">Why Choose Us?</h3>
              <ul className="space-y-3">
                {[
                  "Professional, uniformed chauffeurs",
                  "Luxury vehicles meticulously maintained",
                  "Punctual and reliable service",
                  "Attention to detail",
                  "Customized packages to suit your needs"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="text-gold mr-2 mt-1 flex-shrink-0" size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl animate-slide-up opacity-0" style={{animationDelay: '0.2s'}}>
            <img 
              src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
              alt="Luxury wedding car with flowers" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <p className="text-white text-xl font-playfair italic">
                "Elegance in every journey"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
