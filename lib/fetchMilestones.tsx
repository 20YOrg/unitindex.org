// lib/fetchMilestones.tsx
import directus from './directus';
import { readItems } from '@directus/sdk';

interface Milestone {
  title: string;
  quarter: string;
}

export async function fetchMilestones(): Promise<Milestone[]> {
  try {
    const response = await directus.request(
      readItems('block_milestones', {
        fields: ['title', 'quarter'],
      })
    );

    return response as Milestone[];
  } catch (error) {
    console.error('Error fetching milestones:', error);
    return [];
  }
}