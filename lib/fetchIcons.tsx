// lib/fetchIcons.tsx
import directus from './directus';
import { readItems } from '@directus/sdk';

export interface Icon {
  id: string;
  icon: string;
  name: string;
  effect: string;
  linkURL: string | null;
}

export default async function getIcons(): Promise<Icon[]> {
  try {
    console.log('Fetching icons...');
    const response = await directus.request(
      readItems('icons', {
        fields: ['id', 'icon', 'name', 'effect', 'linkURL'],
      })
    );

    console.log('API Response:', JSON.stringify(response, null, 2));

    if (!response || !response.length) {
      console.log('No icon data found');
      return [];
    }

    return response as Icon[];
  } catch (error) {
    console.error('Error fetching icons:', error);
    return [];
  }
}