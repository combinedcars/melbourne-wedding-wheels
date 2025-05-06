
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Calendar, Clock, CarFront } from 'lucide-react';
import emailjs from '@emailjs/browser';

const ContactSection = () => {
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    vehicle: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (formRef.current) {
      // Replace these with your actual EmailJS service ID, template ID, and public key
      const serviceId = 'YOUR_SERVICE_ID';
      const templateId = 'YOUR_TEMPLATE_ID';
      const publicKey = 'YOUR_PUBLIC_KEY';

      emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
        .then((result) => {
          console.log('Email sent successfully:', result.text);
          setIsSubmitting(false);
          toast({
            title: "Inquiry Sent!",
            description: "Thank you for your inquiry. We'll get back to you shortly."
          });

          // Reset form
          setFormData({
            name: '',
            email: '',
            phone: '',
            date: '',
            time: '',
            vehicle: '',
            message: ''
          });
        }, (error) => {
          console.error('Failed to send email:', error.text);
          setIsSubmitting(false);
          toast({
            title: "Something went wrong",
            description: "We couldn't send your inquiry. Please try again later.",
            variant: "destructive"
          });
        });
    }
  };

  return <section id="contact" className="bg-silver-light py-24">
      <div className="container mx-auto px-4">
        <h2 className="section-heading">Contact Us</h2>
        <p className="section-subheading">
          Ready to make your wedding transportation extraordinary? Get in touch with us today!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
            <h3 className="text-2xl font-playfair font-semibold mb-6">Request a Quote</h3>
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John & Jane Doe" required className="mt-1" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="0400 000 000" required className="mt-1" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Wedding Date</Label>
                    <div className="relative mt-1">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} required className="pl-10" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="time">Pickup Time</Label>
                    <div className="relative mt-1">
                      <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input id="time" name="time" type="time" value={formData.time} onChange={handleChange} required className="pl-10" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="vehicle">Preferred Vehicle</Label>
                  <div className="relative mt-1">
                    <CarFront className="absolute left-3 top-3 h-4 w-4 text-gray-400 z-10" />
                    <Select 
                      name="vehicle" 
                      value={formData.vehicle} 
                      onValueChange={value => handleSelectChange('vehicle', value)}
                    >
                      <SelectTrigger className="pl-10">
                        <SelectValue placeholder="Select a vehicle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rolls-royce">Rolls Royce Phantom</SelectItem>
                        <SelectItem value="mercedes-s">Mercedes S-Class</SelectItem>
                        <SelectItem value="bentley">Bentley Continental</SelectItem>
                        <SelectItem value="mercedes-v">Mercedes V-Class</SelectItem>
                        <SelectItem value="not-sure">Not sure yet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="message">Additional Details</Label>
                  <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your requirements..." className="mt-1 min-h-[120px]" />
                </div>
              </div>

              <Button type="submit" className="w-full btn-gold" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Inquiry'}
              </Button>
            </form>
          </div>

          <div className="flex flex-col justify-between">
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
                      <a href="tel:+61399998888" className="hover:text-gold">+61 3 9999 8888</a>
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
            
            <div className="mt-12 bg-primary text-white p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4">Our Hours</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>By Appointment</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/20">
                <p className="italic">
                  Note: Wedding transportation services available 24/7 by prior arrangement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default ContactSection;
