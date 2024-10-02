import React from 'react';
import { fetchPageByPermalink } from '@/lib/fetchPageByPermalink';
import getIndexPage from '@/lib/fetchIndexPage';
import { fetchKeyFeatures } from '@/lib/fetchKeyFeatures';
import { fetchIndexTypes } from '@/lib/fetchIndexTypes'; // Import the new fetch function
import styles from '@/styles/IndexPage.module.css';

const IndexPage: React.FC = async () => {
  const pageData = await fetchPageByPermalink('/products/index');
  const indexPageData = await getIndexPage();
  const keyFeatures = await fetchKeyFeatures();
  const indexTypesData = await fetchIndexTypes();

  const baseUrl = process.env.NEXT_PUBLIC_DIRECTUS_API_URL;

  if (!pageData || !indexPageData) {
    return <div>Loading...</div>;
  }

  const backgroundImageUrl = `${baseUrl}/assets/${pageData.background}`;
  const image1Url = `${baseUrl}/assets/${indexPageData.image1}`;
  const iconLeftUrl = `${baseUrl}/assets/${indexPageData.box_icon_left}`;
  const iconRightUrl = `${baseUrl}/assets/${indexPageData.box_icon_right}`;

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
          <div className={styles.cardsContainer}>
            {keyFeatures.map((feature) => (
              <div key={feature.id} className={styles.card}>
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className={styles.cardIcon}
                />
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
          {/* Left Column Header */}
          <div className={styles.columnHeader}>
            <img src={iconLeftUrl} alt="Left Icon" className={styles.icon} />
            <h2 className={styles.tableTitle}>{indexPageData.box_title_left}</h2>
          </div>
          {/* Right Column Header */}
          <div className={styles.columnHeader}>
            <img src={iconRightUrl} alt="Right Icon" className={styles.icon} />
            <h2 className={styles.tableTitle}>{indexPageData.box_title_right}</h2>
          </div>
          {indexTypesData.map((item, index) => (
            <>
              {/* Left column content */}
              <div key={`left-${index}`} className={`${styles.tableRow} ${styles.leftRow}`}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.description_unit,
                  }}
                ></div>
              </div>
              {/* Right column content */}
              <div key={`right-${index}`} className={`${styles.tableRow} ${styles.rightRow}`}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.description_other,
                  }}
                ></div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default IndexPage;