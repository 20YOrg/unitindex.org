import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';

interface NavigationItem {
  id: string;
  title: string;
  link: string;
}

interface Navigation {
  id: string;
  title: string;
  items: NavigationItem[];
  logo: string; // Add logo field
}

export async function fetchNavigation(): Promise<Navigation[]> {
  try {
    const response = await directus.request(
      readItems('navigation', {
        fields: ['id', 'title', 'items.*', 'logo'], // Include logo field
      })
    );

    console.log('API Response:', JSON.stringify(response, null, 2)); // Add logging

    return response as Navigation[];
  } catch (error) {
    console.error('Error fetching navigation:', error);
    return [];
  }
}