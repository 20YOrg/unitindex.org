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

        {/* New section for logo, title1, ticker, and description1 */}
        <div className={styles.additionalSection}>
          <img src={`${baseUrl}/assets/${daoPageData.logo}`} alt="DAO Logo" className={styles.logo} />
          <h2 className={styles.sectionTitle}>{daoPageData.title1}</h2>
          <div className={styles.ticker}>{daoPageData.ticker}</div>
          <div className={styles.description} dangerouslySetInnerHTML={{ __html: daoPageData.description1 }}></div>
        </div>
      </div>
    </>
  );
};

export default DaoPage;