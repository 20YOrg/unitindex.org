// components/MilestoneTimeline.tsx
import React from 'react';
import styles from '@/styles/MilestoneTimeline.module.css';

interface Milestone {
  id: string;
  title: string;
  quarter: string;
}

interface MilestoneTimelineProps {
  milestones: Milestone[];
}

const MilestoneTimeline: React.FC<MilestoneTimelineProps> = ({ milestones }) => {
  return (
    <div className={styles.timelineContainer}>
      {milestones.map((milestone) => (
        <div key={milestone.id} className={styles.milestone}>
          <div className={styles.milestoneQuarter}>{milestone.quarter}</div>
          <div className={styles.milestoneTitle}>{milestone.title}</div>
        </div>
      ))}
    </div>
  );
};

export default MilestoneTimeline;