// app/blog/page.tsx
import getAllBlogPosts from '@/lib/fetchAllBlogPosts';
import BlogPostsList from '@/components/BlogPostsList';
import getBlogPage from '@/lib/fetchBlogPage';
import styles from '../../styles/BlogPage.module.css';

export default async function BlogLandingPage() {
  const posts = await getAllBlogPosts();
  const blogPage = await getBlogPage();

  if (!posts || posts.length === 0) {
    console.log('No posts found');
  } else {
    console.log('Fetched posts:', posts);
  }

  if (!blogPage) {
    console.log('No blog page data found');
  } else {
    console.log('Fetched blog page data:', blogPage);
  }

  const baseUrl = process.env.NEXT_PUBLIC_DIRECTUS_API_URL;

  return (
    <>
      <div
        className={styles.fullscreenBackground}
        style={{
          backgroundImage: `url(${baseUrl}/assets/${blogPage?.background})`,
        }}
      ></div>
      <div className={styles.pageContainer}>
        <header className={styles.header}>
          <h1>{blogPage?.title || 'Blog'}</h1>
          <p>{blogPage?.headline || 'Latest updates, educational articles, and stories made for UNIT enthusiasts.'}</p>
          <div className={styles.filters}>
            <button>All</button>
            <button>Updates</button>
            <button>Edu Articles</button>
            <button>Stories</button>
          </div>
        </header>
        <BlogPostsList posts={posts} />
      </div>
    </>
  );
}