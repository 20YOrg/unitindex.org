import directus from './directus';
import { readSingleton, readItems } from '@directus/sdk';
import { notFound } from 'next/navigation';

async function getAboutPage() {
  try {
    // Fetching the about page singleton
    const aboutPage = await directus.request(readSingleton('about', {
      fields: [
        'unite_build',
        'title',
        'title1',
        'description1',
        'image1',
        'arrow1',
        'title2',
        'description2',
        'image2',
        'arrow2',
        'title3',
        'description3',
        'image3',
        'button',
        'link'
      ],
    }));

    // You can add any additional collections here if needed
    // const additionalData = await directus.request(readItems('collection_name', {
    //   fields: ['field1', 'field2'], // Adjust the fields as necessary
    // }));

    return aboutPage;

  } catch (error) {
    console.error('Error fetching About page data:', error);
    notFound();
  }
}

export default getAboutPage;