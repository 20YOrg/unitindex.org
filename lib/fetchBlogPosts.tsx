import directus from "./directus";
import { readItems } from "@directus/sdk";

type BlogPost = {
  title: string;
  description: string;
  slug: string;
};

type DirectusResponse<T> = {
  data: T;
};

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await directus.request<DirectusResponse<BlogPost[]>>(readItems('Blog_Posts', {
      fields: ['title', 'description', 'slug'],
      sort: ['-publish_date'],
    }));
    console.log('Fetched blog posts:', response);
    if (response && response.data) {
      return response.data;
    }
    return [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}