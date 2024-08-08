// lib/fetchDaoPage.tsx
import directus from './directus';
import { readSingleton } from '@directus/sdk';
import { notFound } from 'next/navigation';

async function getDaoPage() {
  try {
    const daoPage = await directus.request(readSingleton('dao_page', {
      fields: [
        'logo',
        'title1',
        'ticker',
        'description1',
        'button1',
        'title2',
        'image1',
        'description2',
        'button2',
        // Add other fields as needed
      ],
    }));
    return daoPage;
  } catch (error) {
    console.error('Error fetching DAO page data:', error);
    notFound();
  }
}

export default getDaoPage;