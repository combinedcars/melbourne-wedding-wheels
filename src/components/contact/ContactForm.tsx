
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, CarFront } from 'lucide-react';
import emailjs from '@emailjs/browser';

interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  vehicle: string;
  message: string;
}

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
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
    const { name, value } = e.target;
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

  return (
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
  );
};

export default ContactForm;
