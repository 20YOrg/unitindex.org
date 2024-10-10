"use client"; // This is a client component

import React, { useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline/next';
import styles from '@/styles/UnitOfAccountPage.module.css';

// Define interfaces for the props
interface ImageData {
  id: string;
  image: string;
}

interface UnitOfAccountData {
  title1: string;
  description1: string;
  button1?: string;
  link1?: string;
  quote_left: string;
  quote: string;
  quote_right: string;
  title2: string;
  description2: string;
  balance: string;
  title3: string;
  description3: string;
  argument: string;
  title4: string;
  description4: string;
  unite_build: string;
}

interface UnitOfAccountClientProps {
  pageData: {
    title: string;
  };
  unitOfAccountData: UnitOfAccountData;
  topGallery: ImageData[];
  bottomGallery: ImageData[];
  backgroundImageUrl: string;
}

const UnitOfAccountClient: React.FC<UnitOfAccountClientProps> = ({
  pageData,
  unitOfAccountData,
  topGallery,
  bottomGallery,
  backgroundImageUrl,
}) => {
  // Refs to control the scrolling of top and bottom galleries
  const topGalleryRef = useRef<HTMLDivElement>(null);
  const bottomGalleryRef = useRef<HTMLDivElement>(null);

  // Function to auto-scroll the galleries
  const autoScrollGallery = (ref: React.RefObject<HTMLDivElement>, speed: number, direction: number) => {
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
        <div className={styles.sectionWithSpline}>
          <div className={styles.textContent}>
            <h1 className={styles.title}>{pageData?.title}</h1>

            <h2 className={styles.subsectionTitle}>{unitOfAccountData.title1}</h2>
            <div className={styles.description} dangerouslySetInnerHTML={{ __html: unitOfAccountData.description1 }} />

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
        <div className={styles.gallerySection}>
          <div className={styles.topGallery} ref={topGalleryRef}>
            {topGallery.map((image) => (
              <img key={image.id} src={image.image} alt={`Top gallery image ${image.id}`} className={styles.galleryImage} />
            ))}
          </div>
        </div>

        <div className={styles.pageContainer}>
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
        </div>

        <div className={styles.gallerySection}>
          <div className={styles.bottomGallery} ref={bottomGalleryRef}>
            {bottomGallery.map((image) => (
              <img key={image.id} src={image.image} alt={`Bottom gallery image ${image.id}`} className={styles.galleryImage} />
            ))}
          </div>
        </div>

        {/* Balance Section */}
        <div className={styles.pageContainer}>
          <div className={styles.sectionWithImage}>
            <div className={styles.sectionTextContent}>
              <h2 className={styles.subsectionTitle}>{unitOfAccountData.title2}</h2>
              <div className={styles.description} dangerouslySetInnerHTML={{ __html: unitOfAccountData.description2 }} />
            </div>
            <div className={styles.sectionImageContent}>
              <img
                src={`${process.env.NEXT_PUBLIC_DIRECTUS_API_URL}/assets/${unitOfAccountData.balance}`}
                alt="Balance Image"
                className={styles.balanceImage}
              />
            </div>
          </div>
        </div>

        {/* Argument Section */}
        <div className={styles.pageContainer}>
          <div className={styles.sectionWithImage}>
            <div className={styles.sectionTextContent}>
              <h2 className={styles.subsectionTitle}>{unitOfAccountData.title3}</h2>
              <div className={styles.description} dangerouslySetInnerHTML={{ __html: unitOfAccountData.description3 }} />
            </div>
            <div className={styles.sectionImageContent}>
              <img
                src={`${process.env.NEXT_PUBLIC_DIRECTUS_API_URL}/assets/${unitOfAccountData.argument}`}
                alt="Argument Image"
                className={styles.argumentImage}
              />
            </div>
          </div>
        </div>

        {/* Unite Build Section */}
        <div className={styles.pageContainer}>
          <div className={styles.sectionWithImage}>
            <div className={styles.sectionTextContent}>
              <h2 className={styles.subsectionTitle}>{unitOfAccountData.title4}</h2>
              <div className={styles.description} dangerouslySetInnerHTML={{ __html: unitOfAccountData.description4 }} />
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
      </div>
    </>
  );
};

export default UnitOfAccountClient;