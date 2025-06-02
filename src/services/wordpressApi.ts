
/**
 * WordPress API service for fetching content from a WordPress site
 */

// Configure your WordPress site URL here
const WORDPRESS_API_URL = "https://your-wordpress-site.com/wp-json/wp/v2";

// Request timeout configuration
const REQUEST_TIMEOUT = 10000; // 10 seconds

// Types for WordPress responses
interface WordPressPost {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  featured_media: number;
  date: string;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
    }>;
  };
}

interface WordPressPage {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  acf?: Record<string, any>; // For Advanced Custom Fields data
}

/**
 * Enhanced fetch with timeout and error handling
 */
const secureFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout - please try again');
      }
      throw new Error(`Network error: ${error.message}`);
    }
    throw new Error('Unknown error occurred');
  }
};

// Fetch posts from WordPress
export const getPosts = async (): Promise<WordPressPost[]> => {
  try {
    const response = await secureFetch(`${WORDPRESS_API_URL}/posts?_embed`);
    const posts = await response.json();
    
    // Validate response structure
    if (!Array.isArray(posts)) {
      console.warn('Invalid posts response structure');
      return [];
    }
    
    return posts;
  } catch (error) {
    console.error('Error fetching posts from WordPress:', error);
    return [];
  }
};

// Fetch a specific page by slug
export const getPageBySlug = async (slug: string): Promise<WordPressPage | null> => {
  try {
    // Sanitize slug input
    const sanitizedSlug = slug.replace(/[^a-z0-9-]/gi, '').substring(0, 100);
    
    if (!sanitizedSlug) {
      throw new Error('Invalid slug provided');
    }

    const response = await secureFetch(`${WORDPRESS_API_URL}/pages?slug=${encodeURIComponent(sanitizedSlug)}`);
    const pages = await response.json();
    
    if (!Array.isArray(pages)) {
      console.warn('Invalid page response structure');
      return null;
    }
    
    return pages.length > 0 ? pages[0] : null;
  } catch (error) {
    console.error(`Error fetching page ${slug} from WordPress:`, error);
    return null;
  }
};

// Fetch testimonials (assuming you have a custom post type for testimonials)
export const getTestimonials = async (): Promise<any[]> => {
  try {
    const response = await secureFetch(`${WORDPRESS_API_URL}/testimonials?_embed`);
    const testimonials = await response.json();
    
    if (!Array.isArray(testimonials)) {
      console.warn('Invalid testimonials response structure');
      return [];
    }
    
    return testimonials;
  } catch (error) {
    console.error('Error fetching testimonials from WordPress:', error);
    return [];
  }
};

// Fetch services (assuming you have a custom post type for services)
export const getServices = async (): Promise<any[]> => {
  try {
    const response = await secureFetch(`${WORDPRESS_API_URL}/services?_embed`);
    const services = await response.json();
    
    if (!Array.isArray(services)) {
      console.warn('Invalid services response structure');
      return [];
    }
    
    return services;
  } catch (error) {
    console.error('Error fetching services from WordPress:', error);
    return [];
  }
};

// Fetch packages (assuming you have a custom post type for packages)
export const getPackages = async (): Promise<any[]> => {
  try {
    const response = await secureFetch(`${WORDPRESS_API_URL}/packages?_embed`);
    const packages = await response.json();
    
    if (!Array.isArray(packages)) {
      console.warn('Invalid packages response structure');
      return [];
    }
    
    return packages;
  } catch (error) {
    console.error('Error fetching packages from WordPress:', error);
    return [];
  }
};

// Fetch settings (using ACF to REST API plugin)
export const getSiteSettings = async (): Promise<Record<string, any>> => {
  try {
    const response = await secureFetch(`${WORDPRESS_API_URL}/acf/v3/options/options`);
    const data = await response.json();
    
    if (typeof data !== 'object' || data === null) {
      console.warn('Invalid settings response structure');
      return {};
    }
    
    return data.acf || {};
  } catch (error) {
    console.error('Error fetching site settings from WordPress:', error);
    return {};
  }
};
