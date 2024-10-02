import React from 'react';
import { fetchPageByPermalink } from '@/lib/fetchPageByPermalink';
import getIndexPage from '@/lib/fetchIndexPage';
import { fetchKeyFeatures } from '@/lib/fetchKeyFeatures';
import { fetchIndexTypes } from '@/lib/fetchIndexTypes';
import styles from '@/styles/IndexPage.module.css';

const IndexPage: React.FC = async () => {
  const pageData = await fetchPageByPermalink('/products/index');

  // Fetch index_page specific data and key features
  const indexPageData = await getIndexPage();
  const keyFeatures = await fetchKeyFeatures();
  const indexTypesData = await fetchIndexTypes();

  const baseUrl = process.env.NEXT_PUBLIC_DIRECTUS_API_URL;

  // Check if both pageData and indexPageData exist
  if (!pageData || !indexPageData) {
    return <div>Loading...</div>;
  }

  // Get the background image and title from the pageData
  const backgroundImageUrl = `${baseUrl}/assets/${pageData.background}`;
  const image1Url = `${baseUrl}/assets/${indexPageData.image1}`;
  const iconLeftUrl = `${baseUrl}/assets/${indexPageData.box_icon_left}`;
  const iconRightUrl = `${baseUrl}/assets/${indexPageData.box_icon_right}`;

  return (
    <>
      {/* Fullscreen Background */}
      <div
        className={styles.fullscreenBackground}
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      ></div>

      {/* Page Container */}
      <div className={styles.pageContainer}>
        <div className={styles.contentSection}>
          {/* Text Content */}
          <div className={styles.textContent}>
            <h1 className={styles.title}>{pageData.title}</h1>
            <h2 className={styles.subsectionTitle}>{indexPageData.title1}</h2>
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: indexPageData.description1 }}
            ></div>
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
            <img src={image1Url} alt="Section Image" className={styles.image1} />
          </div>
        </div>

        {/* Title2 and Description2 Section */}
        <div className={styles.additionalContentSection}>
          <h2 className={styles.subsectionTitle}>{indexPageData.title2}</h2>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: indexPageData.description2 }}
          ></div>
        </div>

        {/* Title3 Section */}
        <div className={styles.additionalContentSection}>
          <h2 className={styles.subsectionTitle}>{indexPageData.title3}</h2>
          {/* Key Features Cards */}
          <div className={styles.cardsContainer}>
            {keyFeatures.map((feature) => (
              <div key={feature.id} className={styles.card}>
                <img src={feature.icon} alt={feature.title} className={styles.cardIcon} />
                <h3 className={styles.cardTitle}>{feature.title}</h3>
                <div
                  className={styles.cardDescription}
                  dangerouslySetInnerHTML={{ __html: feature.description }}
                ></div>
              </div>
            ))}
          </div>
        </div>

        {/* Title4 Section */}
        <div className={styles.additionalContentSection}>
          <h2 className={styles.subsectionTitle}>{indexPageData.title4}</h2>
        </div>

        {/* Table Section */}
        <div className={styles.tableContainer}>
          <div className={styles.tableRow}>
            {/* Left Icon and Title */}
            <div className={styles.iconTitleWrapper}>
              <img src={iconLeftUrl} alt="Left Icon" className={styles.icon} />
              <h2 className={styles.tableTitle}>{indexPageData.box_title_left}</h2>
            </div>

            {/* Right Icon and Title */}
            <div className={styles.iconTitleWrapper}>
              <img src={iconRightUrl} alt="Right Icon" className={styles.icon} />
              <h2 className={styles.tableTitle}>{indexPageData.box_title_right}</h2>
            </div>
          </div>

          {/* Table Rows */}
          {indexTypesData.map((item) => (
            <div key={item.id} className={styles.tableRow}>
              {/* Left column description_unit */}
              <div className={styles.tableCell}>
                <div
                  dangerouslySetInnerHTML={{ __html: item.description_unit }}
                ></div>
              </div>

              {/* Right column description_other */}
              <div className={styles.tableCell}>
                <div
                  dangerouslySetInnerHTML={{ __html: item.description_other }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default IndexPage;