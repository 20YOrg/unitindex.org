import directus from './directus';
import { readItem } from '@directus/sdk';

export async function fetchBlogPost(slug: string) {
  try {
    console.log('Fetching blog post from Directus with slug:', slug);
    const response = await directus.request(
      readItem('Blog_Posts', slug, {
        fields: ['title', 'description', 'slug'],
      })
    );
    console.log('Directus API response:', response);

    // Ensure the response is structured as expected
    if (response) {
      const post = response; // Directly assigning response as it already has the post data
      console.log('Post found:', post);
      return post;
    } else {
      console.log('No post found in response:', response);
      return null;
    }
  } catch (error) {
    console.error('Error fetching blog post:', JSON.stringify(error, null, 2));
    return null;
  }
}