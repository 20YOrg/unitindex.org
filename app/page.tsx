import getHomePage from '../lib/fetchHomePage';
import styles from '../styles/HomePage.module.css'; // Import your CSS module for styling
import blogStyles from '@/styles/BlogPage.module.css'; // Import BlogPage styles
import fetchSocialMediaCards, { SocialMediaCard } from '@/lib/fetchSocialMediaCards';
import getAllBlogPosts from '@/lib/fetchAllBlogPosts';
import Link from 'next/link';

export default async function HomePage() {
  const { homePage, supportLogos } = await getHomePage();
  const socialMediaCards: SocialMediaCard[] = await fetchSocialMediaCards();

  // Access the Directus API URL from the environment variable
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_API_URL;

  // Construct full URLs for the images
  const heroBackgroundUrl = `${directusUrl}/assets/${homePage.hero_background}`;
  const leftHandUrl = `${directusUrl}/assets/${homePage.left_hand}`;
  const rightHandUrl = `${directusUrl}/assets/${homePage.right_hand}`;
  const supportBackgroundUrl = `${directusUrl}/assets/${homePage.support_background}`;
  const tinuPictureUrl = `${directusUrl}/assets/${homePage.tinu_picture}`;
  const coinsImageUrl = `${directusUrl}/assets/${homePage.coins_image}`;
  const coinsBackgroundUrl = `${directusUrl}/assets/${homePage.coins_background}`;
  const daoPictureUrl = `${directusUrl}/assets/${homePage.dao_picture}`;
  const farmBackgroundUrl = `${directusUrl}/assets/${homePage.farm_background}`;
  const blogBackgroundUrl = `${directusUrl}/assets/${homePage.blog_background}`;

  // Split the title into two parts: first 3 words and the rest
  const titleWords = homePage.title.split(' ');
  const firstLine = titleWords.slice(0, 3).join(' ');
  const secondLine = titleWords.slice(3).join(' ');

  // Prepare description HTML
  const descriptionHTML = { __html: homePage.description };
  const description2HTML = { __html: homePage.description2 };
  const description3HTML = { __html: homePage.description3 };
  const daoDescriptionHTML = { __html: homePage.dao_description };
  const farmDescriptionHTML = { __html: homePage.farm_description };
  const blogDescriptionHTML = { __html: homePage.blog_description };

  // Fetch the blog posts
  const posts = await getAllBlogPosts();

  // Sort and filter to get the latest three posts
  const latestPosts = posts
    .sort((a, b) => new Date(b.date_published).getTime() - new Date(a.date_published).getTime())
    .slice(0, 3);

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
      {/* Coins Section */}
      <div 
        className={styles.coinsSection}
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
      {/* DAO Section */}
      <div className={styles.daoSection}>
        <div className={styles.daoContent}>
          <h2 className={styles.daoTitle}>{homePage.dao_title}</h2>
          <div
            className={styles.daoDescription}
            dangerouslySetInnerHTML={daoDescriptionHTML} 
          ></div>
          <a href={homePage.dao_link} className={styles.daoButton}>
            {homePage.dao_button}
          </a>
        </div>
        <img
          src={daoPictureUrl}
          alt="DAO Picture"
          className={styles.daoPicture}
        />
      </div>
      {/* Farm Section */}
      <div 
        className={styles.farmSection}
        style={{ backgroundImage: `url(${farmBackgroundUrl})` }}
      >
        <div className={styles.farmContent}>
          <div className={styles.farmTextWrapper}>
            <h2 className={styles.farmTitle}>{homePage.farm_title}</h2>
            <div
              className={styles.farmDescription}
              dangerouslySetInnerHTML={farmDescriptionHTML}
            ></div>
          </div>
        </div>  
      </div>
      {/* Social Media Cards Section */}
      <div className={styles.socialMediaSection}>
        <div className={styles.cardsContainer}>
          {socialMediaCards.length > 0 ? (
            socialMediaCards.map((card) => (
              <div
                key={card.id}
                className={styles.card}
                style={{ backgroundImage: `url(${directusUrl}/assets/${card.background})` }}
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
                      style={{ width: '16px', height: '16px' }}
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
      {/* Blog Section */}
      <div 
        className={styles.blogSection}
        style={{ backgroundImage: `url(${blogBackgroundUrl})` }}
      >
        <div className={styles.blogContentContainer}>
          <h2 className={styles.blogTitle}>{homePage.blog_title}</h2>
          <div
            className={styles.blogDescription}
            dangerouslySetInnerHTML={blogDescriptionHTML}
          ></div>
          
          <div className={blogStyles.blogsGrid}>
            {latestPosts.map(post => (
              <div key={post.id} className={blogStyles.card}>
                <Link href={`/blog/${post.slug}`} className={blogStyles.cardLink}>
                  <img src={`${directusUrl}/assets/${post.image}?width=600`} alt={post.title} className={blogStyles.image} />
                  <div className={blogStyles.content}>
                    <p className={blogStyles.date}>{new Date(post.date_published).toLocaleDateString()}</p>
                    <h3 className={blogStyles.cardTitle}>{post.title}</h3>
                    <p className={blogStyles.summary}>{post.summary}</p>
                    <p className={blogStyles.readMore}>READ FULL ARTICLE →</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <Link href={homePage.blog_link} passHref className={styles.blogButton}>
            {homePage.blog_button}
          </Link>
        </div>
      </div>
    </div>
  );
}