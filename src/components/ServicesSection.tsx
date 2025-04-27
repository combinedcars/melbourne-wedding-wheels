import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Gift, MapPin, Users, Sparkles } from 'lucide-react';
import { useWordPress } from '@/context/WordPressContext';

// Icon mapping for service types
const iconMapping: Record<string, any> = {
  "calendar": Calendar,
  "clock": Clock,
  "gift": Gift,
  "map-pin": MapPin,
  "users": Users,
  "sparkles": Sparkles,
};

// Fallback services if WordPress data isn't available
const fallbackServices = [
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
  const { services, loading } = useWordPress();
  
  const displayServices = services.length > 0 ? services : fallbackServices;
  
  // Function to get icon based on WordPress ACF field or fallback
  const getIcon = (service: any) => {
    if (service.acf?.icon) {
      // This is a WordPress service with ACF field
      return iconMapping[service.acf.icon] || Sparkles;
    }
    // This is a fallback service
    return service.icon;
  };
  
  // Function to get title from WordPress or fallback
  const getTitle = (service: any) => {
    if (service.title?.rendered) {
      // This is a WordPress service
      return service.title.rendered;
    }
    // This is a fallback service
    return service.title;
  };
  
  // Function to get description from WordPress or fallback
  const getDescription = (service: any) => {
    if (service.content?.rendered) {
      // This is a WordPress service
      return service.content.rendered.replace(/<\/?[^>]+(>|$)/g, ""); // Strip HTML
    }
    // This is a fallback service
    return service.description;
  };

  return (
    <section id="services" className="bg-silver-light py-24">
      <div className="container mx-auto px-4">
        <h2 className="section-heading">Our Premium Services</h2>
        <p className="section-subheading">
          Tailored luxury transportation solutions for your perfect wedding day
        </p>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {displayServices.map((service, index) => {
              const ServiceIcon = getIcon(service);
              
              return (
                <Card key={index} className="border border-silver shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                      {typeof ServiceIcon === 'function' ? (
                        <ServiceIcon className="text-gold h-6 w-6" />
                      ) : (
                        <Sparkles className="text-gold h-6 w-6" />
                      )}
                    </div>
                    <CardTitle className="text-xl">{getTitle(service)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-gray-600">
                      {getDescription(service)}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
