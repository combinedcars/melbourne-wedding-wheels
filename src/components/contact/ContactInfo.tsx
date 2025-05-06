
import { MapPin, Phone, Mail } from 'lucide-react';

const ContactInfo = () => {
  return (
    <div>
      <h3 className="text-2xl font-playfair font-semibold mb-6">Get In Touch</h3>
      
      <div className="space-y-6">
        <div className="flex items-start">
          <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mr-4 flex-shrink-0">
            <MapPin className="text-gold h-5 w-5" />
          </div>
          <div>
            <h4 className="font-semibold text-lg">Our Location</h4>
            <p className="text-gray-600">123 Collins Street, Melbourne VIC 3000</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mr-4 flex-shrink-0">
            <Phone className="text-gold h-5 w-5" />
          </div>
          <div>
            <h4 className="font-semibold text-lg">Phone</h4>
            <p className="text-gray-600">
              <a href="tel:+61395478883" className="hover:text-gold">+61 3 9547 8883</a>
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mr-4 flex-shrink-0">
            <Mail className="text-gold h-5 w-5" />
          </div>
          <div>
            <h4 className="font-semibold text-lg">Email</h4>
            <p className="text-gray-600">
              <a href="mailto:bookings@combinedcars.com" className="hover:text-gold">bookings@combinedcars.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
