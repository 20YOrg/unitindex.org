import React from 'react';
import { fetchPageByPermalink } from '@/lib/fetchPageByPermalink';
import getIndexPage from '@/lib/fetchIndexPage';
import styles from '@/styles/IndexPage.module.css';

const IndexPage: React.FC = async () => {
  const pageData = await fetchPageByPermalink('/products/index');

  // Fetch index_page specific data (for title1, description1, and image1)
  const indexPageData = await getIndexPage();

  const baseUrl = process.env.NEXT_PUBLIC_DIRECTUS_API_URL;

  // Check if both pageData and indexPageData exist
  if (!pageData || !indexPageData) {
    return <div>Loading...</div>;
  }

  // Get the background image and title from the pageData
  const backgroundImageUrl = `${baseUrl}/assets/${pageData.background}`;
  const image1Url = `${baseUrl}/assets/${indexPageData.image1}`;

  return (
    <>
      {/* Fullscreen Background */}
      <div
        className={styles.fullscreenBackground}
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
        }}
      ></div>
      
      {/* Page Container */}
      <div className={styles.pageContainer}>
        <div className={styles.contentSection}>
          {/* Text Content */}
          <div className={styles.textContent}>
            {/* Main Title from fetchPageByPermalink */}
            <h1 className={styles.title}>{pageData.title}</h1>
            
            {/* Title1 from index_page */}
            <h2 className={styles.subsectionTitle}>{indexPageData.title1}</h2>

            {/* Description1 from index_page */}
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: indexPageData.description1 }}
            ></div>

            {/* Button1 from index_page */}
            <a
              href="#"
              className={styles.button1}
              target="_blank"
              rel="noopener noreferrer"
            >
              {indexPageData.button1}
            </a>
          </div>

          {/* Image1 from index_page */}
          <div className={styles.imageContent}>
            <img
              src={image1Url}
              alt="Section Image"
              className={styles.image1}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexPage;