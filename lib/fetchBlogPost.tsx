import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';

interface BlogPost {
  title: string;
  content: string;
  slug: string;
  date_published: string;
  author: string;
}

export default async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const response = await directus.request(
      readItems('posts', {
        fields: ['title', 'content', 'slug', 'date_published', 'author','category'],
        filter: {
          slug: {
            _eq: slug,
          },
        },
      })
    );

    // Remove or comment out this detailed logging
    // console.log('API Response:', JSON.stringify(response, null, 2));

    if (!response || !response.length) {
      console.log('No blog post data found');
      return null;
    }

    return response[0] as BlogPost;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}