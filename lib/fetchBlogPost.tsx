import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';

interface BlogPost {
  title: string;
  content: string;
  slug: string;
  date_published: string;
  author: string;
  category: string; // Assuming you are fetching the category as well
}

export default async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const response = await directus.request(
      readItems('posts', {
        fields: ['title', 'content', 'slug', 'date_published', 'author', 'category'],
        filter: {
          slug: {
            _eq: slug,
          },
        },
      })
    );

    // Debug the API response structure
    console.log('API Response:', JSON.stringify(response, null, 2));

    // Check if the response is an array and has at least one post
    if (!response || response.length === 0) {
      console.log('No blog post data found');
      return null;
    }

    // Return the first post if response is an array
    return response[0] as BlogPost;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}
