// lib/fetchIcons.tsx
import directus from './directus';
import { readItems } from '@directus/sdk';

export interface Icon {
  id: string;
  icon: string;
  name: string;
  effect: string;
  linkURL: string | null;
  description?: string;
  hoverIcon?: string;
  activeIcon?: string;
}

export default async function getIcons(): Promise<Icon[]> {
  try {
    console.log('Fetching icons...');
    const response = await directus.request(
      readItems('icons', {
        fields: ['id', 'icon', 'name', 'effect', 'linkURL', 'description'],
      })
    );

    // Create a map to store icons by name and effect
    const iconMap: { [key: string]: { normal?: string; hover?: string; active?: string } } = {};

    // Populate the map with icons based on their name and effect
    response.forEach((icon: Icon) => {
      if (!iconMap[icon.name]) {
        iconMap[icon.name] = {};
      }

      if (icon.effect === 'normal') {
        iconMap[icon.name].normal = icon.icon;
      } else if (icon.effect === 'hover') {
        iconMap[icon.name].hover = icon.icon;
      } else if (icon.effect === 'active') {
        iconMap[icon.name].active = icon.icon;
      }
    });

    // Add hoverIcon and activeIcon properties to each icon based on the map
    response.forEach((icon: Icon) => {
      icon.hoverIcon = iconMap[icon.name].hover;
      icon.activeIcon = iconMap[icon.name].active;
    });

    // console.log('API Response:', JSON.stringify(response, null, 2));

    if (!response || !response.length) {
      console.log('No icon data found');
      return [];
    }

    return response as Icon[];
  } catch (error) {
    console.error('Error fetching icons:', error);
    return [];
  }
}