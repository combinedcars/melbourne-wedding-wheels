
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Mail, 
  ChevronUp 
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email) {
      toast({
        title: "Thank you for subscribing!",
        description: "You'll receive our latest news and offers.",
      });
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-16">
          <div>
            <h3 className="text-2xl font-playfair font-semibold mb-6">
              <span className="text-gold">Melbourne</span> Wedding Wheels
            </h3>
            <p className="text-gray-300 mb-6">
              Providing luxury chauffeur services for weddings across Melbourne. Make your special day truly unforgettable with our premium fleet of vehicles.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="#" 
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="#" 
                aria-label="Twitter"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'About', 'Services', 'Our Fleet', 'Testimonials', 'Contact'].map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => {
                      const element = document.getElementById(item.toLowerCase().replace(' ', '-'));
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="text-gray-300 hover:text-gold transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-6">Newsletter</h4>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for the latest offers and updates.
            </p>
            <form onSubmit={handleSubscribe} className="flex">
              <div className="relative flex-grow">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/10 border-0 text-white pl-10 focus:ring-gold"
                />
              </div>
              <Button type="submit" className="ml-2 btn-gold">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        
        <div className="py-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Melbourne Wedding Wheels. All rights reserved.
          </p>
          
          <button 
            onClick={scrollToTop}
            className="mt-4 md:mt-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors"
            aria-label="Scroll to top"
          >
            <ChevronUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
