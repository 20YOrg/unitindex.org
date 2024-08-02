// lib/fetchCategories.tsx
import directus from './directus';
import { readItems } from '@directus/sdk';

export interface Category {
  id: string;
  title: string;
}

export default async function getCategories(): Promise<Category[]> {
  try {
    const response = await directus.request(
      readItems('categories', {
        fields: ['id', 'title'],
      })
    );

    // console.log('API Response for categories:', JSON.stringify(response, null, 2));

    if (!response || !response.length) {
      console.log('No category data found');
      return [];
    }

    return response as Category[];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}