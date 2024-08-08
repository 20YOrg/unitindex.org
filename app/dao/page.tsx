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
              <h2 className={styles.sectionTitle}>{daoPageData.title1}</h2>
              <img src={`${baseUrl}/assets/${daoPageData.ticker}`} alt="Ticker" className={styles.ticker} />
            </div>
            <div className={styles.description} dangerouslySetInnerHTML={{ __html: daoPageData.description1 }}></div>
            <a href="#" className={styles.button1}>{daoPageData.button1}</a>
          </div>
        </div>

        <div className={styles.separatorLine}></div>

        {/* Second Section */}
        <div className={styles.additionalSection}>
          <div className={styles.textSection}>
            <h2 className={styles.sectionTitle}>{daoPageData.title2}</h2>
            <div className={styles.description} dangerouslySetInnerHTML={{ __html: daoPageData.description2 }}></div>
            <a href="#" className={styles.button1}>{daoPageData.button2}</a>
          </div>
          <img src={`${baseUrl}/assets/${daoPageData.image1}`} alt="Image 1" className={styles.image1} />
        </div>

        <div className={styles.separatorLine}></div>

        {/* Third Section: Social Media Cards */}
        <div className={styles.socialMediaSection}>
          <h2 className={styles.title}>{daoPageData.title3}</h2>
          <div className={styles.description} dangerouslySetInnerHTML={{ __html: daoPageData.description3 }}></div>
          <div className={styles.cardsContainer}>
            {socialMediaCards.length > 0 ? (
              socialMediaCards.map((card) => (
                <a href={card.link} key={card.id} className={styles.card} style={{ backgroundImage: `url(${baseUrl}/assets/${card.background})` }}>
                  <p className={styles.cardDescription}>{card.description}</p>
                  <a href={card.link} className={styles.cardButton}>{card.button}</a>
                </a>
              ))
            ) : (
              <p>No social media cards found.</p>
            )}
          </div>
        </div>

        <div className={styles.separatorLine}></div>
      </div>
    </>
  );
};

export default DaoPage;