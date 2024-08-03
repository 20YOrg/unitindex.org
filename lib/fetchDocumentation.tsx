// lib/fetchDocumentation.ts
import directus from './directus';
import { readItems } from '@directus/sdk';

interface DocumentationCard {
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
        fields: ['title', 'icon', 'link', 'button', 'description'],
      })
    );

    const baseUrl = process.env.NEXT_PUBLIC_DIRECTUS_API_URL;

    const documentationCards = response.map((card: DocumentationCard) => ({
      ...card,
      icon: `${baseUrl}/assets/${card.icon}`
    }));

    return documentationCards as DocumentationCard[];
  } catch (error) {
    console.error('Error fetching documentation cards:', error);
    return [];
  }
}