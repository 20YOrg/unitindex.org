import directus from './directus';
import { readItems } from '@directus/sdk';

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  image: string;
  date_published: string;
  author: string;
  slug: string;
}

export default async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await directus.request(
      readItems('posts', {
        fields: ['id', 'title', 'summary', 'image', 'date_published', 'author', 'slug'],
      })
    );

    console.log('API Response:', JSON.stringify(response, null, 2));

    if (!response || !response.length) {
      console.log('No blog post data found');
      return [];
    }

    return response as BlogPost[];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}