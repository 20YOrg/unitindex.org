import directus from './directus';

export interface Icon {
  id: string;
  name: string;
  effect: string;
  icon: string;
  linkURL: string | null;
}

export default async function getIcons(): Promise<Icon[]> {
  try {
    const response = await directus.request({
      method: 'GET',
      url: '/items/icons',
      params: {
        fields: ['id', 'name', 'effect', 'icon', 'linkURL'],
      },
    });

    return response.data.data; // Adjusting to ensure we return the data correctly
  } catch (error) {
    console.error('Error fetching icons:', error);
    return [];
  }
}