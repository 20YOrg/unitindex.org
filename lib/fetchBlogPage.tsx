// lib/fetchBlogPage.ts
import directus from './directus';
import { readItems } from '@directus/sdk';

export interface BlogPage {
  title: string;
  headline: string;
  read_full_article: string;
  background: string;
}

export default async function getBlogPage(): Promise<BlogPage> {
  try {
    console.log('Fetching blog page data...');
    const response = await directus.request(
      readItems('pages_blog', {
        fields: ['title', 'headline', 'read_full_article', 'background'],
        limit: 1, // assuming there's only one item in the collection
      })
    );

    console.log('API Response for blog page:', JSON.stringify(response, null, 2));

    if (!response || !response.length) {
      console.log('No blog page data found');
      return { 
        title: 'BLOG', 
        headline: 'Latest updates, educational articles, and stories made for UNIT enthusiasts.', 
        read_full_article: 'READ FULL ARTICLE', 
        background: '7fc23c10-e519-425e-8549-ce8acaf5b01e' 
      };
    }

    return response[0] as BlogPage;
  } catch (error) {
    console.error('Error fetching blog page data:', error);
    return { 
      title: 'Blog', 
      headline: 'Latest updates, educational articles, and stories made for UNIT enthusiasts.', 
      read_full_article: 'Read Full Article', 
      background: '7fc23c10-e519-425e-8549-ce8acaf5b01e' 
    };
  }
}