"use client"; // This is a client component

import React, { useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline/next';
import styles from '@/styles/UnitOfAccountPage.module.css';

const UnitOfAccountClient = ({
  pageData,
  unitOfAccountData,
  topGallery,
  bottomGallery,
  backgroundImageUrl,
}) => {
  // Refs to control the scrolling of top and bottom galleries
  const topGalleryRef = useRef(null);
  const bottomGalleryRef = useRef(null);

  // Function to auto-scroll the galleries
  const autoScrollGallery = (ref, speed, direction) => {
    if (ref.current) {
      ref.current.scrollLeft += direction * speed;
    }
  };

  useEffect(() => {
    const scrollIntervalTop = setInterval(() => {
      autoScrollGallery(topGalleryRef, 1, 1); // Scroll to the right
    }, 20);

    const scrollIntervalBottom = setInterval(() => {
      autoScrollGallery(bottomGalleryRef, 1, -1); // Scroll to the left
    }, 20);

    // Clean up the intervals when the component unmounts
    return () => {
      clearInterval(scrollIntervalTop);
      clearInterval(scrollIntervalBottom);
    };
  }, []);

  return (
    <>
      {/* Page Container WITHOUT Background */}
      <div className={styles.pageContainer}>
        {/* Section with Title, Description, Button and Spline */}
        <div className={styles.sectionWithSpline}>
          <div className={styles.textContent}>
            <h1 className={styles.title}>{pageData?.title}</h1>

            {/* Title1 and Description1 from unit_of_account_page */}
            <h2 className={styles.subsectionTitle}>{unitOfAccountData.title1}</h2>
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: unitOfAccountData.description1 }}
            ></div>

            {/* Button1 with Link1 */}
            {unitOfAccountData.button1 && unitOfAccountData.link1 && (
              <div className={styles.buttonContainer}>
                <a
                  href={unitOfAccountData.link1}
                  className={styles.button1}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {unitOfAccountData.button1}
                </a>
              </div>
            )}
          </div>

          {/* Spline Component */}
          <div className={styles.splineContainer}>
            <Spline scene="https://prod.spline.design/ZlQ1u3q1kVSLAJu1/scene.splinecode" />
            {/* Overlay to cover the watermark */}
            <div className={styles.watermarkOverlay}></div>
          </div>
        </div>
      </div>

      {/* Rest of the Page with Background */}
      <div
        className={styles.restOfPageWithBackground}
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
        }}
      >
        {/* Top Gallery Section */}
        <div className={styles.gallerySection}>
          <div className={styles.topGallery} ref={topGalleryRef}>
            {topGallery.map((image) => (
              <img
                key={image.id}
                src={image.image}
                alt={`Top gallery image ${image.id}`}
                className={styles.galleryImage}
              />
            ))}
          </div>
        </div>

        {/* Quote Section */}
        <div className={styles.quoteSection}>
          <div className={styles.quoteSides}>
            <img
              src={`${process.env.NEXT_PUBLIC_DIRECTUS_API_URL}/assets/${unitOfAccountData.quote_left}`}
              alt="Quote Left"
              className={`${styles.quoteImage} ${styles.quoteLeft}`}
            />
          </div>
          <blockquote>{unitOfAccountData.quote}</blockquote>
          <div className={styles.quoteSides}>
            <img
              src={`${process.env.NEXT_PUBLIC_DIRECTUS_API_URL}/assets/${unitOfAccountData.quote_right}`}
              alt="Quote Right"
              className={`${styles.quoteImage} ${styles.quoteRight}`}
            />
          </div>
        </div>

        {/* Bottom Gallery Section */}
        <div className={styles.gallerySection}>
          <div className={styles.bottomGallery} ref={bottomGalleryRef}>
            {bottomGallery.map((image) => (
              <img
                key={image.id}
                src={image.image}
                alt={`Bottom gallery image ${image.id}`}
                className={styles.galleryImage}
              />
            ))}
          </div>
        </div>

        {/* Balance Section */}
        <div className={styles.sectionWithImage}>
          <div className={styles.sectionTextContent}>
            <h2 className={styles.subsectionTitle}>{unitOfAccountData.title2}</h2>
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: unitOfAccountData.description2 }}
            ></div>
          </div>
          <div className={styles.sectionImageContent}>
            <img
              src={`${process.env.NEXT_PUBLIC_DIRECTUS_API_URL}/assets/${unitOfAccountData.balance}`}
              alt="Balance Image"
              className={styles.balanceImage}
            />
          </div>
        </div>

        {/* Argument Section */}
        <div className={styles.sectionWithImage}>
          <div className={styles.sectionTextContent}>
            <h2 className={styles.subsectionTitle}>{unitOfAccountData.title3}</h2>
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: unitOfAccountData.description3 }}
            ></div>
          </div>
          <div className={styles.sectionImageContent}>
            <img
              src={`${process.env.NEXT_PUBLIC_DIRECTUS_API_URL}/assets/${unitOfAccountData.argument}`}
              alt="Argument Image"
              className={styles.argumentImage}
            />
          </div>
        </div>

        {/* Unite Build Section */}
        <div className={styles.sectionWithImage}>
          <div className={styles.sectionTextContent}>
            <h2 className={styles.subsectionTitle}>{unitOfAccountData.title4}</h2>
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: unitOfAccountData.description4 }}
            ></div>
          </div>
          <div className={styles.sectionImageContent}>
            <img
              src={`${process.env.NEXT_PUBLIC_DIRECTUS_API_URL}/assets/${unitOfAccountData.unite_build}`}
              alt="Unite Build Image"
              className={styles.uniteBuildImage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UnitOfAccountClient;