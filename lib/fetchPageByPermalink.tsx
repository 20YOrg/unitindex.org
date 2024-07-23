import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';

interface Page {
  id: string;
  title: string;
  permalink: string;
}

export async function fetchPageByPermalink(permalink: string): Promise<Page | null> {
  try {
    const response = await directus.request(
      readItems('pages', {
        fields: ['title', 'permalink'],
        filter: {
          permalink: {
            _eq: permalink,
          },
        },
      })
    );

    console.log('Fetched page response:', response); // Log the entire response

    const data = response as Page[];
    console.log('Fetched page data:', data); // Log the fetched data

    if (data && data.length > 0) {
      console.log('Page found:', data[0]); // Log the found page
      return data[0];
    } else {
      console.log('No page data found');
    }
    return null;
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
}