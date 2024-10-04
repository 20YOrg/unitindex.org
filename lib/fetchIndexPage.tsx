// lib/fetchIndexPage.tsx
import directus from './directus';
import { readSingleton } from '@directus/sdk';
import { notFound } from 'next/navigation';

async function getIndexPage() {
  try {
    const indexPage = await directus.request(readSingleton('index_page', {
      fields: [
        'title1',
        'description1',
        'image1',
        'button1',
        'link1',
        'title2',
        'description2',
        'title3',
        'title4',
        'box_title_left',
        'box_icon_left',
        'box_title_right',
        'box_icon_right',
        'box_button',
        'box_link'
      ],
    }));
    return indexPage;

  } catch (error) {
    console.error('Error fetching Index page data:', error);
    notFound();
  }
}

export default getIndexPage;