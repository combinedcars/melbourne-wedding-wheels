
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Heart } from "lucide-react";

interface PackageFeature {
  included: boolean;
  text: string;
}

interface WeddingPackage {
  id: string;
  name: string;
  price: string;
  description: string;
  features: PackageFeature[];
  popular?: boolean;
}

const packages: WeddingPackage[] = [
  {
    id: "essential",
    name: "Essential",
    price: "$899",
    description: "Perfect for intimate weddings and smaller celebrations.",
    features: [
      { included: true, text: "Luxury sedan for 3 hours" },
      { included: true, text: "Professional chauffeur in formal attire" },
      { included: true, text: "Red carpet service" },
      { included: true, text: "Complimentary bottled water" },
      { included: false, text: "Champagne service" },
      { included: false, text: "Multiple vehicle options" },
      { included: false, text: "Extended hours coverage" }
    ]
  },
  {
    id: "premium",
    name: "Premium",
    price: "$1499",
    description: "Our most popular package for an unforgettable wedding day.",
    popular: true,
    features: [
      { included: true, text: "Luxury sedan or SUV for 5 hours" },
      { included: true, text: "Professional chauffeur in formal attire" },
      { included: true, text: "Red carpet service" },
      { included: true, text: "Complimentary champagne" },
      { included: true, text: "Wedding car decoration" },
      { included: true, text: "Multiple location stops" },
      { included: false, text: "Wedding party transportation" }
    ]
  },
  {
    id: "luxury",
    name: "Luxury",
    price: "$2999",
    description: "The ultimate luxury experience for your special day.",
    features: [
      { included: true, text: "Vintage or luxury vehicle for 8 hours" },
      { included: true, text: "Professional chauffeur in formal attire" },
      { included: true, text: "Red carpet service" },
      { included: true, text: "Premium champagne and refreshments" },
      { included: true, text: "Custom wedding car decoration" },
      { included: true, text: "Multiple vehicle options" },
      { included: true, text: "Wedding party transportation" }
    ]
  }
];

const PackagesSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="packages" className="bg-silver-light py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="section-heading text-primary">Wedding Packages</h2>
        <p className="section-subheading">
          Choose the perfect transportation package for your special day
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {packages.map((pkg) => (
            <Card 
              key={pkg.id} 
              className={`relative flex flex-col rounded-xl overflow-hidden border-2 ${
                pkg.popular ? 'border-gold shadow-lg' : 'border-border'
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-gold text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
                  Most Popular
                </div>
              )}
              <CardHeader className="text-center bg-white">
                <CardTitle className="text-2xl font-bold font-playfair">{pkg.name}</CardTitle>
                <CardDescription className="text-muted-foreground mt-2">{pkg.description}</CardDescription>
                <p className="text-3xl font-bold text-primary mt-4">{pkg.price}</p>
              </CardHeader>
              <CardContent className="flex-grow bg-white">
                <ul className="space-y-3 mt-4">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className={`flex-shrink-0 rounded-full p-1 ${feature.included ? 'text-gold bg-gold/10' : 'text-muted-foreground bg-muted'}`}>
                        {feature.included ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <span className="block h-4 w-4"></span>
                        )}
                      </span>
                      <span className={`ml-3 text-sm ${feature.included ? 'text-foreground' : 'text-muted-foreground line-through'}`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-6 pb-8 px-6 bg-white">
                <Button 
                  onClick={scrollToContact} 
                  className={`w-full ${pkg.popular ? 'bg-gold hover:bg-gold-dark' : ''}`}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Book this Package
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Need a custom package? Contact us for a personalized quote.</p>
          <Button onClick={scrollToContact} variant="outline" className="border-gold text-gold hover:bg-gold hover:text-white">
            Request Custom Quote
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
