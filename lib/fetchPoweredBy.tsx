import directus from './directus';
import { readSingleton, readItems } from '@directus/sdk';
import { notFound } from 'next/navigation';

async function fetchPoweredBy() {
  try {
    // Fetching the powered_by singleton
    const poweredByData = await directus.request(
      readSingleton('powered_by', {
        fields: [
          'title',
          'description',
          'milestones', // This is the title of the next section.
        ],
      })
    );

    // Log the fetched poweredByData
    console.log('Fetched poweredByData:', poweredByData);

    // Fetching logos collection
    const poweredByLogos = await directus.request(
      readItems('powered_by_logos', {
        fields: ['logo', 'name'], // Adjust the fields as necessary
      })
    );

    // Log the fetched poweredByLogos
    console.log('Fetched poweredByLogos:', poweredByLogos);

    return { poweredByData, poweredByLogos };
  } catch (error) {
    console.error('Error fetching Powered By data:', error);
    notFound();
  }
}

export default fetchPoweredBy;