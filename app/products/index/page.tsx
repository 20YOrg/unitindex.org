// app/products/index/page.tsx
import React from 'react';
import { fetchPageByPermalink } from '@/lib/fetchPageByPermalink';
import styles from '@/styles/IndexPage.module.css';

const IndexPage: React.FC = async () => {
  const pageData = await fetchPageByPermalink('/products/index');
  const baseUrl = process.env.NEXT_PUBLIC_DIRECTUS_API_URL;

  if (!pageData) {
    return <div>Loading...</div>;
  }

  // Get the background image and title from the pageData
  const backgroundImageUrl = `${baseUrl}/assets/${pageData.background}`;

  return (
    <>
      <div
        className={styles.fullscreenBackground}
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
        }}
      ></div>
      <div className={styles.pageContainer}>
        <h1 className={styles.title}>{pageData.title}</h1>
      </div>
    </>
  );
};

export default IndexPage;