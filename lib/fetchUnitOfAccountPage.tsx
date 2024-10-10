// lib/fetchUnitOfAccountPage.ts
import directus from './directus';
import { readSingleton } from '@directus/sdk';
import { notFound } from 'next/navigation';
import { UnitOfAccountData } from './types'; // Adjust this import based on where the types file is located

async function getUnitOfAccountPage(): Promise<UnitOfAccountData> {
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

    // Explicitly return the data as UnitOfAccountData
    return indexPage as UnitOfAccountData;

  } catch (error) {
    console.error('Error fetching Unit of Account page data:', error);
    notFound();
  }
}

export default getUnitOfAccountPage;