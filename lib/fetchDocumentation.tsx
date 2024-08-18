// lib/fetchDocumentation.ts
import directus from './directus';
import { readItems } from '@directus/sdk';

interface DocumentationCard {
  id: string;
  title: string;
  icon: string;
  link: string;
  button: string;
  description: string;
}

export async function fetchDocumentationCards(): Promise<DocumentationCard[]> {
  try {
    const response = await directus.request(
      readItems('block_documentation', {
        fields: ['id', 'title', 'icon', 'link', 'button', 'description'],
      })
    );

    const baseUrl = process.env.NEXT_PUBLIC_DIRECTUS_API_URL;

    // Cast response to DocumentationCard[] to ensure TypeScript understands the type
    const documentationCards = (response as DocumentationCard[]).map((card) => ({
      ...card,
      icon: `${baseUrl}/assets/${card.icon}`
    }));

    return documentationCards;
  } catch (error) {
    console.error('Error fetching documentation cards:', error);
    return [];
  }
}