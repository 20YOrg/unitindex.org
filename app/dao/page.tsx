// app/dao/page.tsx
import { fetchPageByPermalink } from '@/lib/fetchPageByPermalink';
import getDaoPage from '@/lib/fetchDaoPage';
import styles from '@/styles/DaoPage.module.css';

const DaoPage = async () => {
  const pageData = await fetchPageByPermalink('/dao');
  const baseUrl = process.env.NEXT_PUBLIC_DIRECTUS_API_URL;
  const daoPageData = await getDaoPage();

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

        {/* First section */}
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

        {/* Separator line */}
        <div className={styles.separatorLine}></div>

        {/* Second section */}
        <div className={styles.additionalSection}>
          <div className={styles.textSection}>
            <h2 className={styles.sectionTitle}>{daoPageData.title2}</h2>
            <div className={styles.description} dangerouslySetInnerHTML={{ __html: daoPageData.description2 }}></div>
            <a href="#" className={styles.button1}>{daoPageData.button2}</a>
          </div>
          <img src={`${baseUrl}/assets/${daoPageData.image1}`} alt="Governance Image" className={styles.image1} />
        </div>

        {/* Separator line */}
        <div className={styles.separatorLine}></div>
      </div>
    </>
  );
};

export default DaoPage;