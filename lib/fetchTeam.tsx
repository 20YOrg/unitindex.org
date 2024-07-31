// lib/fetchTeam.tsx
import directus from './directus';
import { readItems } from '@directus/sdk';

export interface TeamMember {
  id: string;
  name: string;
  image: string;
}

export default async function getTeamMember(id: string): Promise<TeamMember | null> {
  try {
    const response = await directus.request(
      readItems('team', {
        fields: ['id', 'name', 'image'],
        filter: {
          id: {
            _eq: id,
          },
        },
      })
    );

    console.log('Team API Response:', JSON.stringify(response, null, 2));

    if (!response || !response.length) {
      console.log('No team member data found');
      return null;
    }

    return response[0] as TeamMember;
  } catch (error) {
    console.error('Error fetching team member:', error);
    return null;
  }
}