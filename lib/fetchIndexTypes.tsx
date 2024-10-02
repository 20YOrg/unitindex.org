// lib/fetchIndexTypes.tsx
import directus from './directus';
import { readItems } from '@directus/sdk';

interface IndexType {
  id: string;
  description_unit: string;
  description_other: string;
}

export async function fetchIndexTypes(): Promise<IndexType[]> {
  try {
    const response = await directus.request(
      readItems('index_types', {
        fields: ['id', 'description_unit', 'description_other'], // Fetch only the necessary fields
      })
    );

    return response as IndexType[];
  } catch (error) {
    console.error('Error fetching index types:', error);
    return [];
  }
}