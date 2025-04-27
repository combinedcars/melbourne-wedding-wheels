
/**
 * WordPress API service for fetching content from a WordPress site
 */

// Configure your WordPress site URL here
const WORDPRESS_API_URL = "https://your-wordpress-site.com/wp-json/wp/v2";

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

// Fetch posts from WordPress
export const getPosts = async (): Promise<WordPressPost[]> => {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/posts?_embed`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching posts from WordPress:', error);
    return [];
  }
};

// Fetch a specific page by slug
export const getPageBySlug = async (slug: string): Promise<WordPressPage | null> => {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/pages?slug=${slug}`);
    if (!response.ok) {
      throw new Error('Failed to fetch page');
    }
    const pages = await response.json();
    return pages.length > 0 ? pages[0] : null;
  } catch (error) {
    console.error(`Error fetching page ${slug} from WordPress:`, error);
    return null;
  }
};

// Fetch testimonials (assuming you have a custom post type for testimonials)
export const getTestimonials = async (): Promise<any[]> => {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/testimonials?_embed`);
    if (!response.ok) {
      throw new Error('Failed to fetch testimonials');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching testimonials from WordPress:', error);
    return [];
  }
};

// Fetch services (assuming you have a custom post type for services)
export const getServices = async (): Promise<any[]> => {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/services?_embed`);
    if (!response.ok) {
      throw new Error('Failed to fetch services');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching services from WordPress:', error);
    return [];
  }
};

// Fetch packages (assuming you have a custom post type for packages)
export const getPackages = async (): Promise<any[]> => {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/packages?_embed`);
    if (!response.ok) {
      throw new Error('Failed to fetch packages');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching packages from WordPress:', error);
    return [];
  }
};

// Fetch settings (using ACF to REST API plugin)
export const getSiteSettings = async (): Promise<Record<string, any>> => {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/acf/v3/options/options`);
    if (!response.ok) {
      throw new Error('Failed to fetch site settings');
    }
    const data = await response.json();
    return data.acf || {};
  } catch (error) {
    console.error('Error fetching site settings from WordPress:', error);
    return {};
  }
};
