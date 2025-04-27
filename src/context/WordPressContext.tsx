
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  getPosts, 
  getPageBySlug, 
  getTestimonials, 
  getServices,
  getPackages,
  getSiteSettings 
} from '../services/wordpressApi';

interface WordPressContextType {
  homePageData: any | null;
  testimonials: any[];
  services: any[];
  packages: any[];
  siteSettings: Record<string, any>;
  loading: boolean;
  error: string | null;
}

const WordPressContext = createContext<WordPressContextType>({
  homePageData: null,
  testimonials: [],
  services: [],
  packages: [],
  siteSettings: {},
  loading: true,
  error: null
});

export const useWordPress = () => useContext(WordPressContext);

interface WordPressProviderProps {
  children: ReactNode;
}

export const WordPressProvider = ({ children }: WordPressProviderProps) => {
  const [homePageData, setHomePageData] = useState<any | null>(null);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [siteSettings, setSiteSettings] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch home page data
        const homePage = await getPageBySlug('home');
        if (homePage) {
          setHomePageData(homePage);
        }
        
        // Fetch testimonials
        const testimonialData = await getTestimonials();
        setTestimonials(testimonialData);
        
        // Fetch services
        const serviceData = await getServices();
        setServices(serviceData);
        
        // Fetch packages
        const packageData = await getPackages();
        setPackages(packageData);
        
        // Fetch site settings
        const settings = await getSiteSettings();
        setSiteSettings(settings);
        
        setError(null);
      } catch (err) {
        setError('Failed to load content from WordPress');
        console.error('Error fetching WordPress data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <WordPressContext.Provider value={{
      homePageData,
      testimonials,
      services,
      packages,
      siteSettings,
      loading,
      error
    }}>
      {children}
    </WordPressContext.Provider>
  );
};
