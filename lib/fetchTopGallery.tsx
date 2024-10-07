// lib/fetchTopGallery.tsx
import directus from './directus';
import { readItems } from '@directus/sdk';

interface TopGalleryItem {
  id: string;
  image: string;
}

export async function fetchTopGallery(): Promise<TopGalleryItem[]> {
  try {
    const response = await directus.request(
      readItems('top_gallery', {
        fields: ['id', 'image'], // Fetch image field from the top_gallery
      })
    );

    const baseUrl = process.env.NEXT_PUBLIC_DIRECTUS_API_URL;

    // Map the response and prepend the baseUrl to the image field
    const topGallery = (response as TopGalleryItem[]).map((item) => ({
      ...item,
      image: `${baseUrl}/assets/${item.image}`, // Prepend base URL to the image path
    }));

    console.log('Top Gallery Data:', topGallery); // Log fetched data to check
    return topGallery;
  } catch (error) {
    console.error('Error fetching top gallery:', error);
    return [];
  }
}