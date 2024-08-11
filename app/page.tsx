import getHomePage from '../lib/fetchHomePage';
import styles from '../styles/HomePage.module.css'; // Import your CSS module for styling

export default async function HomePage() {
  const { homePage, supportLogos } = await getHomePage();

  // Access the Directus API URL from the environment variable
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_API_URL;

  // Construct full URLs for the images
  const heroBackgroundUrl = `${directusUrl}/assets/${homePage.hero_background}`;
  const leftHandUrl = `${directusUrl}/assets/${homePage.left_hand}`;
  const rightHandUrl = `${directusUrl}/assets/${homePage.right_hand}`;
  const supportBackgroundUrl = `${directusUrl}/assets/${homePage.support_background}`;
  const tinuPictureUrl = `${directusUrl}/assets/${homePage.tinu_picture}`; // URL for the tinu_picture
  const coinsImageUrl = `${directusUrl}/assets/${homePage.coins_image}`; // URL for the coins_image
  const coinsBackgroundUrl = `${directusUrl}/assets/${homePage.coins_background}`; // URL for the coins_background

  // Split the title into two parts: first 3 words and the rest
  const titleWords = homePage.title.split(' ');
  const firstLine = titleWords.slice(0, 3).join(' ');
  const secondLine = titleWords.slice(3).join(' ');

  // Prepare description HTML
  const descriptionHTML = { __html: homePage.description };
  const description2HTML = { __html: homePage.description2 }; // Description 2
  const description3HTML = { __html: homePage.description3 }; // Description 3

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
        <a href={homePage.link} className={styles.button}>
          {homePage.button}
        </a>
      </div>
      {/* Separator Line */}
      <div className={styles.separatorLine}></div>
      {/* New section for total market cap */}
      <div className={styles.statsSection}>
        <div className={`${styles.statItem} ${styles.totalUnits}`}>
          <p>{homePage.total_units}</p>
        </div>
        <div className={`${styles.statItem} ${styles.totalMarketCap}`}>
          <p>{homePage.total_market_cap}</p>
        </div>
      </div>
      {/* Title1 Section and Logos with Background */}
      <div 
        className={styles.backgroundContainer}
        style={{ backgroundImage: `url(${supportBackgroundUrl})` }}
      >
        <div className={styles.title1Section}>
          <h2>{homePage.title1}</h2>
        </div>
        <div className={styles.logosSection}>
          {supportLogos.map((logo) => (
            <img
              key={logo.id}
              src={`${directusUrl}/assets/${logo.logo}`}
              alt="Support Logo"
              className={styles.logo}
            />
          ))}
        </div>
      </div>
      {/* New Section for Title2, Description2, and Tinu Picture */}
      <div className={styles.newSection}>
        <img 
          src={tinuPictureUrl} 
          alt="Tinu Picture" 
          className={styles.tinuPicture} 
        />
        <div className={styles.content}>
          <h2 className={styles.title2}>{homePage.title2}</h2>
          <div 
            className={styles.description2} 
            dangerouslySetInnerHTML={description2HTML}
          ></div>
          <a href={homePage.link2} className={styles.button2}>
            {homePage.button2}
          </a>
        </div>
      </div>
      {/* New Section for Title3, Description3, and Coins Image */}
      <div 
        className={styles.coinsSection}
        style={{ backgroundImage: `url(${coinsBackgroundUrl})` }}
      >
        <div className={styles.content}>
          <h2 className={styles.title3}>{homePage.title3}</h2>
          <div 
            className={styles.description3} 
            dangerouslySetInnerHTML={description3HTML}
          ></div>
          <a href={homePage.link3} className={styles.button3}>
            {homePage.button3}
          </a>
        </div>
        <img 
          src={coinsImageUrl} 
          alt="Coins Image" 
          className={styles.coinsImage} 
        />
      </div>
    </div>
  );
}