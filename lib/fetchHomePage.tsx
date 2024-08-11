import directus from './directus';
import { readSingleton, readItems } from '@directus/sdk';
import { notFound } from 'next/navigation';

async function getHomePage() {
  try {
    // Fetching the homepage singleton
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
        'support_background',
        'title2',
        'description2',
        'tinu_picture',
        'button2',
        'link2'
      ],
    }));

    // Fetching the support logos collection
    const supportLogos = await directus.request(readItems('support', {
      fields: ['logo', 'name'], // Adjust the fields as necessary
    }));

    return { homePage, supportLogos };
    
  } catch (error) {
    console.error('Error fetching Home page data:', error);
    notFound();
  }
}

export default getHomePage;