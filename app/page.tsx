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
  const tinuGifUrl = `${directusUrl}/assets/${homePage.tinu_gif.filename_disk}`;
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
      {/* Section where the Tinu GIF is displayed */}
      <div className={styles.newSection}>
        {/* Render WebM video without fallback to image */}
        <video 
          className={styles.tinuGif} 
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src={tinuGifUrl} type="video/webm" />
          Your browser does not support the video tag.
        </video>

        <div className={styles.content}>
          <h2 className={styles.title2}>{homePage.title2}</h2>
          <div 
            className={styles.description2} 
            dangerouslySetInnerHTML={{ __html: homePage.description2 }}
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
                    <p className={blogStyles.date}>{new Date(post.date_published).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      }).replace(/(\d{1,2}) (\w+) (\d{4})/, '$1 $2, $3')}
                    </p>
                    <h3 className={blogStyles.cardTitle}>{post.title}</h3>
                    <p className={blogStyles.summary}>{post.summary}</p>
                    <p className={blogStyles.readMore}>
  <span className={blogStyles.readMoreText}>READ FULL ARTICLE</span>
  <span className={blogStyles.arrow}>
    <svg width="12" height="13" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.14314 6.36709L9.61456 6.36709L7.02171 9.57972C6.90047 9.73019 6.84214 9.92419 6.85955 10.119C6.87696 10.3139 6.9687 10.4936 7.11456 10.6187C7.26043 10.7437 7.44849 10.8039 7.63737 10.7859C7.82624 10.768 8.00047 10.6734 8.12171 10.5229L11.6931 6.10182C11.7172 6.06666 11.7387 6.02972 11.7574 5.9913C11.7574 5.95446 11.7574 5.93235 11.8074 5.89551C11.8398 5.81102 11.8567 5.72109 11.8574 5.63025C11.8567 5.5394 11.8398 5.44947 11.8074 5.36498C11.8074 5.32814 11.8074 5.30604 11.7574 5.26919C11.7387 5.23077 11.7172 5.19383 11.6931 5.15867L8.12171 0.737614C8.05455 0.654437 7.97045 0.587546 7.87539 0.541699C7.78033 0.495852 7.67664 0.472175 7.57171 0.47235C7.40481 0.472014 7.24307 0.531975 7.11456 0.641824C7.04224 0.703681 6.98245 0.779651 6.93863 0.86538C6.8948 0.95111 6.86781 1.04491 6.85918 1.14142C6.85056 1.23793 6.86047 1.33525 6.88836 1.4278C6.91625 1.52035 6.96156 1.60631 7.02171 1.68077L9.61456 4.8934L1.14314 4.8934C0.953695 4.8934 0.772014 4.97103 0.638059 5.10922C0.504105 5.2474 0.42885 5.43482 0.42885 5.63025C0.42885 5.82567 0.504105 6.01309 0.638059 6.15127C0.772014 6.28946 0.953695 6.36709 1.14314 6.36709Z" fill="#101729"/>
    </svg>
  </span>
</p>

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