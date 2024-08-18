import React from 'react';
import { fetchPageByPermalink } from '@/lib/fetchPageByPermalink';
import getAboutPage from '@/lib/fetchAboutPage';
import getFaqs from '@/lib/fetchFaqs';
import styles from '@/styles/AboutPage.module.css';
import FaqSection from '@/components/FaqSection';

const AboutPage: React.FC = async () => {
  const pageData = await fetchPageByPermalink('/about');
  const aboutPage = await getAboutPage();
  const faqSection = await getFaqs();
  const baseUrl = process.env.NEXT_PUBLIC_DIRECTUS_API_URL;

  // Ensure pageData is not null before accessing its properties
  if (!pageData || !aboutPage) {
    return <div>Loading...</div>; // Render a loading state or an appropriate fallback
  }

  const backgroundImageUrl = `${baseUrl}/assets/${pageData.background}`;
  const descriptionHTML = { __html: pageData.description };
  const description1HTML = { __html: aboutPage.description1 };
  const description2HTML = { __html: aboutPage.description2 };
  const description3HTML = { __html: aboutPage.description3 };

  return (
    <>
      <div
        className={styles.fullscreenBackground}
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
        }}
      ></div>
      <div className={styles.pageContainer}>
        {/* First Section: Title and Description from fetchPageByPermalink */}
        <div className={styles.textAndImageContainer}>
          <div className={styles.textContainer}>
            <h1 className={styles.title}>{pageData.title}</h1>
            <div className={styles.description} dangerouslySetInnerHTML={descriptionHTML}></div>
          </div>
          <div className={styles.imageContainer}>
            <img
              src={`${baseUrl}/assets/${aboutPage.unite_build}`}
              alt="Unite Build"
              className={styles.uniteBuildImage}
            />
          </div>
        </div>

        {/* Separator Line */}
        <div className={styles.separatorLine}></div>

        {/* Second Section: Main Title */}
        <h2 className={styles.title}>{aboutPage.title}</h2>

        {/* Second Section: Card with Title1, Description1, and Image1 */}
        <div className={styles.card}>
          <div className={styles.cardImageContainer}>
            <img
              src={`${baseUrl}/assets/${aboutPage.image1}`}
              alt="Section Image"
              className={styles.cardImage}
            />
          </div>
          <div className={styles.cardTextContainer}>
            <h3 className={styles.cardTitle}>{aboutPage.title1}</h3>
            <div
              className={styles.cardDescription}
              dangerouslySetInnerHTML={description1HTML}
            ></div>
          </div>
        </div>

        {/* Arrow1 below the first card */}
        <div className={styles.arrowContainer}>
          <img
            src={`${baseUrl}/assets/${aboutPage.arrow1}`}
            alt="Arrow"
            className={styles.arrowImage}
          />
        </div>

        {/* Third Section: Card with Title2, Description2, and Image2 */}
        <div className={styles.cardReverse}>
          <div className={styles.cardTextContainer}>
            <h3 className={styles.cardTitle}>{aboutPage.title2}</h3>
            <div
              className={styles.cardDescription}
              dangerouslySetInnerHTML={description2HTML}
            ></div>
          </div>
          <div className={styles.cardImageContainer}>
            <img
              src={`${baseUrl}/assets/${aboutPage.image2}`}
              alt="Section Image"
              className={styles.cardImage}
            />
          </div>
        </div>

        {/* Arrow2 below the second card */}
        <div className={styles.arrowContainer}>
          <img
            src={`${baseUrl}/assets/${aboutPage.arrow2}`}
            alt="Arrow"
            className={styles.arrowImage}
          />
        </div>

        {/* Fourth Section: Card with Title3, Description3, and Image3 (Like the First Card) */}
        <div className={styles.card}>
          <div className={styles.cardImageContainer}>
            <img
              src={`${baseUrl}/assets/${aboutPage.image3}`}
              alt="Section Image"
              className={styles.cardImage}
            />
          </div>
          <div className={styles.cardTextContainer}>
            <h3 className={styles.cardTitle}>{aboutPage.title3}</h3>
            <div
              className={styles.cardDescription}
              dangerouslySetInnerHTML={description3HTML}
            ></div>
          </div>
        </div>

        {/* Button */}
        <div className={styles.buttonContainer}>
          <a href={aboutPage.link} className={styles.button}>
            {aboutPage.button}
          </a>
        </div>

        {/* FAQ Section */}
        {faqSection && faqSection.faqs.length > 0 && (
            <FaqSection faqSection={faqSection} />
        )}
      </div>
    </>
  );
};

export default AboutPage;