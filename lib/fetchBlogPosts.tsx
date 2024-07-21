import directus from './directus';
import { readItems } from '@directus/sdk';

export async function fetchBlogPosts() {
  try {
    console.log('Fetching blog posts from Directus...');
    const response = await directus.request(
      readItems('Blog_Posts', {
        fields: ['title', 'description', 'slug'],
      })
    );
    console.log('Fetched blog posts:', response);
    if (response && response.data) {
      return response.data;
    }
    return [];
  } catch (error) {
    console.error('Error fetching blog posts:', JSON.stringify(error, null, 2));
    return [];
  }
}