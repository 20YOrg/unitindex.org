// lib/fetchMilestones.tsx
import directus from './directus';
import { readItems } from '@directus/sdk';

interface Milestone {
  title: string;
  quarter: string;
}

export async function fetchMilestones(): Promise<{ quarter: string, titles: string[] }[]> {
  try {
    const response = await directus.request(
      readItems('block_milestones', {
        fields: ['title', 'quarter'],
      })
    );

    const milestones = response as Milestone[];

    // Group milestones by quarter
    const groupedMilestones = milestones.reduce((acc: any, milestone: Milestone) => {
      if (!acc[milestone.quarter]) {
        acc[milestone.quarter] = [];
      }
      acc[milestone.quarter].push(milestone.title);
      return acc;
    }, {});

    // Sort quarters chronologically
    const sortedQuarters = Object.keys(groupedMilestones).sort();

    return sortedQuarters.map(quarter => ({
      quarter,
      titles: groupedMilestones[quarter],
    }));
  } catch (error) {
    console.error('Error fetching milestones:', error);
    return [];
  }
}