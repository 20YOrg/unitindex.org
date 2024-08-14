// lib/fetchFaqs.tsx
import directus from './directus';
import { readSingleton } from '@directus/sdk';

export default async function getFaqs(): Promise<any> {
  try {
    const response = await directus.request(
      readSingleton('block_faqs', {
        fields: [
          '*', // Fetch all fields in the singleton
          'faqs.title',
          'faqs.answer',
        ],
      })
    );

    console.log('Raw Directus Response:', JSON.stringify(response, null, 2));

    // Assuming the response is an array, get the first item in the array
    if (Array.isArray(response) && response.length > 0) {
      return response[0];
    } else {
      console.log('No FAQ section found.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return null;
  }
}