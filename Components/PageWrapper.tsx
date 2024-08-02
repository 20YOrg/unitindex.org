// components/PageWrapper.tsx
import React from 'react';
import styles from '@/styles/PageWrapper.module.css';

interface PageWrapperProps {
  backgroundImage: string;
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ backgroundImage, children }) => {
  return (
    <div className={styles.pageWrapper} style={{ backgroundImage: `url(${backgroundImage})` }}>
      {children}
    </div>
  );
};

export default PageWrapper;