import getHomePage from '../lib/fetchHomePage';
import styles from '../styles/HomePage.module.css'; // Import your CSS module for styling



export default async function HomePage() {
  const homePageData = await getHomePage();

  // Access the Directus API URL from the environment variable
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_API_URL;

  // Construct full URLs for the images
  const heroBackgroundUrl = `${directusUrl}/assets/${homePageData.hero_background}`;
  const leftHandUrl = `${directusUrl}/assets/${homePageData.left_hand}`;
  const rightHandUrl = `${directusUrl}/assets/${homePageData.right_hand}`;

  // Split the title into two parts: first 3 words and the rest
  const titleWords = homePageData.title.split(' ');
  const firstLine = titleWords.slice(0, 3).join(' ');
  const secondLine = titleWords.slice(3).join(' ');

  // Prepare description HTML
  const descriptionHTML = { __html: homePageData.description };

  return (
      <div className={styles.pageWrapper}>
          <div 
              className={styles.fullscreenBackground}
              style={{ 
                  backgroundImage: `url(${heroBackgroundUrl})`,
              }}
          />
          <div className={styles.handsContainer}>
              <div 
                  className={styles.leftHand} 
                  style={{ 
                      backgroundImage: `url(${leftHandUrl})`,
                  }}
              />
              <div 
                  className={styles.rightHand} 
                  style={{ 
                      backgroundImage: `url(${rightHandUrl})`,
                  }}
              />
          </div>
          <div className={styles.container}>
              <h1 className={styles.title}>
                  {firstLine} <br />
                  {secondLine}
              </h1>
              <div 
                  className={styles.description} 
                  dangerouslySetInnerHTML={descriptionHTML}
              ></div>
              <a href={homePageData.link} className={styles.button}>
                  {homePageData.button}
              </a>
          </div>
          {/* Separator Line */}
          <div className={styles.separatorLine}></div>
          {/* New section for total units and total market cap */}
          <div className={styles.statsSection}>
              <div className={styles.statItem}>
                  <h2>Total Units</h2>
                  <p>{homePageData.total_units}</p>
              </div>
              <div className={styles.statItem}>
                  <h2>Total Market Cap</h2>
                  <p>{homePageData.total_market_cap}</p>
              </div>
          </div>
      </div>
  );
}