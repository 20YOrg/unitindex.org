// app/dao/page.tsx
import { fetchPageByPermalink } from '@/lib/fetchPageByPermalink';
import styles from '@/styles/DaoPage.module.css';

const DaoPage = async () => {
  const pageData = await fetchPageByPermalink('/dao');
  const baseUrl = process.env.NEXT_PUBLIC_DIRECTUS_API_URL;

  if (!pageData) {
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
      </div>
    </>
  );
};

export default DaoPage;