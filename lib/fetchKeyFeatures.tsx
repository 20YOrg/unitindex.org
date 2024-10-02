// lib/fetchKeyFeatures.ts
import directus from './directus';
import { readItems } from '@directus/sdk';

interface KeyFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export async function fetchKeyFeatures(): Promise<KeyFeature[]> {
  try {
    const response = await directus.request(
      readItems('block_key_features', {
        fields: ['id', 'title', 'description', 'icon'],
      })
    );

    const baseUrl = process.env.NEXT_PUBLIC_DIRECTUS_API_URL;

    // Cast response to KeyFeature[] and prepend the baseUrl to the icon field
    const keyFeatures = (response as KeyFeature[]).map((feature) => ({
      ...feature,
      icon: `${baseUrl}/assets/${feature.icon}` // Prepend base URL to icon
    }));

    return keyFeatures;
  } catch (error) {
    console.error('Error fetching key features:', error);
    return [];
  }
}