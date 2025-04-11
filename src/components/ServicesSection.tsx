
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Gift, MapPin, Users, Sparkles } from 'lucide-react';

const services = [
  {
    title: "Wedding Day Transportation",
    description: "Luxury transportation for the bride, groom, and wedding party on your special day. We ensure timely arrivals and elegant entrances.",
    icon: Calendar,
  },
  {
    title: "Photography Tour",
    description: "After the ceremony, we'll take you to the best photography locations around Melbourne to capture perfect memories.",
    icon: MapPin,
  },
  {
    title: "Ceremony to Reception",
    description: "Stress-free transportation between your ceremony and reception venues with professional chauffeurs.",
    icon: Clock,
  },
  {
    title: "Wedding Party Transfers",
    description: "Comfortable group transportation options for your entire wedding party, ensuring everyone arrives together.",
    icon: Users,
  },
  {
    title: "Honeymoon Airport Transfer",
    description: "Start your honeymoon journey in style with our luxury airport transfer service.",
    icon: Gift,
  },
  {
    title: "Customized Packages",
    description: "We offer bespoke packages tailored to your specific requirements and schedule.",
    icon: Sparkles,
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="bg-silver-light py-24">
      <div className="container mx-auto px-4">
        <h2 className="section-heading">Our Premium Services</h2>
        <p className="section-subheading">
          Tailored luxury transportation solutions for your perfect wedding day
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {services.map((service, index) => (
            <Card key={index} className="border border-silver shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                  <service.icon className="text-gold h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-gray-600">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
