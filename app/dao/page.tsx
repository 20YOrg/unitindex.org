import { fetchPageByPermalink } from '@/lib/fetchPageByPermalink';
import getDaoPage from '@/lib/fetchDaoPage';
import fetchSocialMediaCards, { SocialMediaCard } from '@/lib/fetchSocialMediaCards';
import styles from '@/styles/DaoPage.module.css';

const DaoPage = async () => {
  const pageData = await fetchPageByPermalink('/dao');
  const daoPageData = await getDaoPage();
  const socialMediaCards: SocialMediaCard[] = await fetchSocialMediaCards();
  const baseUrl = process.env.NEXT_PUBLIC_DIRECTUS_API_URL;

  if (!pageData || !daoPageData) {
    return <div>No page data found</div>;
  }

  const backgroundImageUrl = `${baseUrl}/assets/${pageData.background}`;
  const descriptionHTML = { __html: pageData.description };

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
        <div className={styles.description} dangerouslySetInnerHTML={descriptionHTML}></div>

        {/* Section for logo, title1, ticker, and description1 */}
        <div className={styles.additionalSection}>
          <img src={`${baseUrl}/assets/${daoPageData.logo}`} alt="DAO Logo" className={styles.logo} />
          <div className={styles.textSection}>
            <div className={styles.titleTicker}>
              <h2 className={styles.subsectionTitle}>{daoPageData.title1}</h2>
              <img src={`${baseUrl}/assets/${daoPageData.ticker}`} alt="Ticker" className={styles.ticker} />
            </div>
            <div className={styles.description} dangerouslySetInnerHTML={{ __html: daoPageData.description1 }}></div>
            <a href="#" className={styles.button1} target="_blank" rel="noopener noreferrer">{daoPageData.button1}</a>
          </div>
        </div>

        <div className={styles.separatorLine}></div>

        {/* Second Section */}
        <div className={styles.additionalSection}>
          <div className={styles.textSection}>
            <h2 className={styles.sectionTitle}>{daoPageData.title2}</h2>
            <div className={styles.description} dangerouslySetInnerHTML={{ __html: daoPageData.description2 }}></div>
            <a href="#" className={styles.button1} target="_blank" rel="noopener noreferrer">{daoPageData.button2}</a>
          </div>
          <img src={`${baseUrl}/assets/${daoPageData.image1}`} alt="Image 1" className={styles.image1} />
        </div>

        <div className={styles.separatorLine}></div>

        {/* Third Section: Social Media Cards */}
        <div className={styles.socialMediaSection}>
          <h2 className={styles.sectionTitle}>{daoPageData.title3}</h2>
          <div className={styles.description} dangerouslySetInnerHTML={{ __html: daoPageData.description3 }}></div>
          <div className={styles.cardsContainer}>
            {socialMediaCards.length > 0 ? (
              socialMediaCards.map((card) => (
                <div
                  key={card.id}
                  className={styles.card}
                  style={{ backgroundImage: `url(${baseUrl}/assets/${card.background})` }}
                >
                  <div className={styles.cardContent}>
                  <div className={styles.cardDescription} dangerouslySetInnerHTML={{ __html: card.description }}></div>
                  <a href={card.link} className={styles.cardButton} target="_blank" rel="noopener noreferrer">
                    {card.button}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ width: '16px', height: '16px' }} // Adjust size as needed
                    >
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </a>
                  </div>
                </div>
              ))
            ) : (
              <p>No social media cards found.</p>
            )}
          </div>
        </div>

        <div className={styles.separatorLine}></div>

        {/* Section 4: Download ZIP */}
        <div id="brand-assets"></div>
        <div className={styles.downloadSection}>
        <h2 className={styles.sectionTitle}>{daoPageData.title4}</h2>
        <div className={styles.zipContainer}>
            <img src={`${baseUrl}/assets/${daoPageData.zip_icon}`} alt="ZIP Icon" className={styles.zipIcon} />
            <a href={`${baseUrl}/assets/${daoPageData.zip_file}`} className={styles.button2} download>
            {daoPageData.button3}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.arrowIcon}
                style={{ width: '16px', height: '16px' }}  // Adjust these values as needed
            >
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 19 19 12" />
            </svg>
            </a>
        </div>
        </div>
      </div>
    </>
  );
};

export default DaoPage;