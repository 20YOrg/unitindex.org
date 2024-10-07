// lib/fetchBottomGallery.tsx
import directus from './directus';
import { readItems } from '@directus/sdk';

interface BottomGalleryItem {
  id: string;
  image: string;
}

export async function fetchBottomGallery(): Promise<BottomGalleryItem[]> {
  try {
    const response = await directus.request(
      readItems('bottom_gallery', {
        fields: ['id', 'image'], // Fetch image field from the bottom_gallery
      })
    );

    const baseUrl = process.env.NEXT_PUBLIC_DIRECTUS_API_URL;

    // Map the response and prepend the baseUrl to the image field
    const bottomGallery = (response as BottomGalleryItem[]).map((item) => ({
      ...item,
      image: `${baseUrl}/assets/${item.image}`, // Prepend base URL to the image path
    }));

    console.log('Bottom Gallery Data:', bottomGallery); // Log fetched data to check
    return bottomGallery;
  } catch (error) {
    console.error('Error fetching bottom gallery:', error);
    return [];
  }
}