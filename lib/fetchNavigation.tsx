// lib/fetchNavigation.ts
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
  logo: string;
}

export async function fetchNavigation(): Promise<Navigation[]> {
  try {
    const response = await directus.request(
      readItems('navigation', {
        fields: ['id', 'title', 'items.*', 'logo'],
      })
    );

    console.log('API Response:', JSON.stringify(response, null, 2)); // Add detailed logging

    return response as Navigation[];
  } catch (error) {
    console.error('Error fetching navigation:', error);
    return [];
  }
}