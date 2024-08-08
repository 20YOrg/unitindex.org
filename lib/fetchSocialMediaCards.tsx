import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';

export interface SocialMediaCard {
  id: string;
  description: string;
  button: string;
  link: string;
  background: string; // Add background field
}

export default async function fetchSocialMediaCards(): Promise<SocialMediaCard[]> {
  try {
    const response = await directus.request(
      readItems('social', {
        fields: ['id', 'background', 'description', 'button', 'link'], // Ensure all fields are included
      })
    );

    if (!response || !response.length) {
      console.log('No social media cards data found');
      return [];
    }

    return response as SocialMediaCard[];
  } catch (error) {
    console.error('Error fetching social media cards:', error);
    return [];
  }
}