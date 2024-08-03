// components/MilestoneTimeline.tsx
import React from 'react';
import styles from '@/styles/MilestoneTimeline.module.css';

interface Milestone {
  quarter: string;
  titles: string[];
}

interface MilestoneTimelineProps {
  milestones: Milestone[];
}

const MilestoneTimeline: React.FC<MilestoneTimelineProps> = ({ milestones }) => {
  return (
    <div className={styles.timelineContainer}>
      <div className={styles.timeline}>
        {milestones.map((milestone, index) => (
          <div key={index} className={styles.milestone}>
            <div className={styles.milestoneDot}></div>
            <div className={styles.milestoneQuarter}>{milestone.quarter}</div>
            <ul className={styles.milestoneList}>
              {milestone.titles.map((title, i) => (
                <li key={i} className={styles.milestoneTitle}>{title}</li>
              ))}
            </ul>
          </div>
        ))}
        <div className={styles.milestoneLine}></div>
      </div>
    </div>
  );
};

export default MilestoneTimeline;