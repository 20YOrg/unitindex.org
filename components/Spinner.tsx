// components/Spinner.tsx
import React from 'react';
import styles from '@/styles/Spinner.module.css'; // Ensure Spinner CSS is in place

const Spinner: React.FC = () => {
  return (
    <div className={styles.spinnerContainer}>
      <img
        src={`${process.env.NEXT_PUBLIC_DIRECTUS_API_URL}/assets/7742b7e6-a4a9-44b2-aa16-10ffa10bfa41.png`}
        alt="Loading..."
        className={styles.spinner}
      />
    </div>
  );
};

export default Spinner;

