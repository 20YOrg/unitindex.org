// lib/fetchUnitOfAccountPage.tsx
import directus from './directus';
import { readSingleton } from '@directus/sdk';
import { notFound } from 'next/navigation';

async function getUnitOfAccountPage() {
  try {
    const indexPage = await directus.request(readSingleton('unit_of_account_page', {
      fields: [
        'title1',
        'description1',
        'button1',
        'link1',
        'quote',
        'quote_left',
        'quote_right',
        'title2',
        'description2',
        'balance',
        'title3',
        'description3',
        'argument',
        'title4',
        'description4',
        'unite_build'
      ],
    }));
    return indexPage;

  } catch (error) {
    console.error('Error fetching Index page data:', error);
    notFound();
  }
}

export default getUnitOfAccountPage;