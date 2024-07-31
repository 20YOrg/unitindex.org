// lib/fetchBlogPage.ts
import directus from './directus';
import { readItems } from '@directus/sdk';

export interface BlogPage {
  background: string;
  back: string;
  written_by: string;
}

export default async function getBlogPage(): Promise<BlogPage> {
  try {
    console.log('Fetching blog page data...');
    const response = await directus.request(
      readItems('blog_page', {
        fields: ['background', 'back', 'written_by'],
        limit: 1, // assuming there's only one item in the collection
      })
    );

    console.log('API Response for blog page:', JSON.stringify(response, null, 2));

    if (!response || !response.length) {
      console.log('No blog page data found');
      return { background: '', back: 'Back', written_by: 'Written by' };
    }

    return response[0] as BlogPage;
  } catch (error) {
    console.error('Error fetching blog page data:', error);
    return { background: '', back: 'Back', written_by: 'Written by' };
  }
}