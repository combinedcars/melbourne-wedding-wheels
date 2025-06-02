
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, CarFront } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { validateEmail, validatePhone, sanitizeInput, formRateLimiter } from '@/utils/security';

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
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    // Validate name
    if (!formData.name.trim() || formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    // Validate email
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate phone
    if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Validate date (must be in the future)
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (!formData.date || selectedDate < today) {
      newErrors.date = 'Please select a future date';
    }

    // Validate time
    if (!formData.time) {
      newErrors.time = 'Please select a time';
    }

    // Validate vehicle
    if (!formData.vehicle) {
      newErrors.vehicle = 'Please select a vehicle';
    }

    // Validate message length
    if (formData.message && formData.message.length > 1000) {
      newErrors.message = 'Message must be less than 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value);
    
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user selects
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check rate limiting
    const identifier = formData.email || 'anonymous';
    if (!formRateLimiter.isAllowed(identifier)) {
      toast({
        title: "Too many requests",
        description: "Please wait before submitting another inquiry.",
        variant: "destructive"
      });
      return;
    }

    if (!validateForm()) {
      toast({
        title: "Form validation failed",
        description: "Please check the errors and try again.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    if (formRef.current) {
      // Replace these with your actual EmailJS service ID, template ID, and public key
      const serviceId = 'service_heqyxmc';
      const templateId = 'template_sspgt49';
      const publicKey = 'pQ4yj83t2C-Xnp4BW';

      emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
        .then((result) => {
          console.log('Email sent successfully');
          setIsSubmitting(false);
          toast({
            title: "Inquiry Sent!",
            description: "Thank you for your inquiry. We'll get back to you shortly."
          });

          // Reset form and rate limiter
          setFormData({
            name: '',
            email: '',
            phone: '',
            date: '',
            time: '',
            vehicle: '',
            message: ''
          });
          setErrors({});
          formRateLimiter.reset(identifier);
        }, (error) => {
          console.error('Failed to send email');
          setIsSubmitting(false);
          toast({
            title: "Unable to send inquiry",
            description: "Please try again later or contact us directly.",
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
            <Input 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="John & Jane Doe" 
              required 
              className={`mt-1 ${errors.name ? 'border-red-500' : ''}`}
              maxLength={100}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="your@email.com" 
                required 
                className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
                maxLength={254}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input 
                id="phone" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="0400 000 000" 
                required 
                className={`mt-1 ${errors.phone ? 'border-red-500' : ''}`}
                maxLength={20}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Wedding Date</Label>
              <div className="relative mt-1">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  id="date" 
                  name="date" 
                  type="date" 
                  value={formData.date} 
                  onChange={handleChange} 
                  required 
                  className={`pl-10 ${errors.date ? 'border-red-500' : ''}`}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
            </div>
            <div>
              <Label htmlFor="time">Pickup Time</Label>
              <div className="relative mt-1">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  id="time" 
                  name="time" 
                  type="time" 
                  value={formData.time} 
                  onChange={handleChange} 
                  required 
                  className={`pl-10 ${errors.time ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
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
                <SelectTrigger className={`pl-10 ${errors.vehicle ? 'border-red-500' : ''}`}>
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
            {errors.vehicle && <p className="text-red-500 text-sm mt-1">{errors.vehicle}</p>}
          </div>
          
          <div>
            <Label htmlFor="message">Additional Details</Label>
            <Textarea 
              id="message" 
              name="message" 
              value={formData.message} 
              onChange={handleChange} 
              placeholder="Tell us about your requirements..." 
              className={`mt-1 min-h-[120px] ${errors.message ? 'border-red-500' : ''}`}
              maxLength={1000}
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            <p className="text-sm text-gray-500 mt-1">{formData.message.length}/1000 characters</p>
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
