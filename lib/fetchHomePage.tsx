// lib/fetchHomePage.tsx
import directus from './directus';
import { readSingleton } from '@directus/sdk';
import { notFound } from 'next/navigation';

async function getHomePage() {
  try {
    const homePage = await directus.request(readSingleton('home_page', {
      fields: [
        'title',
        'description',
        'button',
        'link',
        'left_hand',
        'right_hand',
        'hero_background',
        'total_units',
        'total_market_cap',
        'title1',
        'support_background'
        // Add other fields as needed
      ],
    }));
    return homePage;
    
  } catch (error) {
    console.error('Error fetching Home page data:', error);
    notFound();
  }
}

export default getHomePage;