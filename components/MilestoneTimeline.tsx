'use client';

import React, { useEffect, useRef } from 'react';
import styles from '@/styles/MilestoneTimeline.module.css';

interface Milestone {
  quarter: string;
  titles: string[];
}

interface MilestoneTimelineProps {
  milestones: Milestone[];
}

const MilestoneTimeline: React.FC<MilestoneTimelineProps> = ({ milestones }) => {
  const currentQuarter = getCurrentQuarter();
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (timelineRef.current) {
      const currentQuarterIndex = milestones.findIndex(milestone => milestone.quarter === currentQuarter);
      if (currentQuarterIndex !== -1) {
        const focusElement = timelineRef.current.children[currentQuarterIndex + 1] as HTMLDivElement; // +1 to account for the spacer
        
        // Ensure only horizontal scrolling
        const scrollContainer = timelineRef.current;
        const scrollLeft = focusElement.offsetLeft - scrollContainer.clientWidth / 2 + focusElement.clientWidth / 2;
        scrollContainer.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [milestones, currentQuarter]);

  return (
    <div className={styles.timelineWrapper}>
      <div className={styles.timelineContainer} ref={timelineRef}>
        <div className={styles.spacer}></div> {/* Add spacer at the start */}
        {milestones.map((milestone) => (
          <div key={milestone.quarter} className={styles.card}>
            <div className={styles.cardQuarter}>{milestone.quarter}</div>
            <ul className={styles.cardList}>
              {milestone.titles.map((title, i) => (
                <li key={i} className={styles.cardTitle}>{title}</li>
              ))}
            </ul>
          </div>
        ))}
        <div className={styles.spacer}></div> {/* Add spacer at the end */}
      </div>
    </div>
  );
};

const getCurrentQuarter = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const quarter = Math.floor(month / 3) + 1;
  return `${year}-Q${quarter}`;
};

export default MilestoneTimeline;