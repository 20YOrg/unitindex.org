// app/blog/page.tsx
import getAllBlogPosts from '@/lib/fetchAllBlogPosts';
import BlogPostsList from '@/components/BlogPostsList';
import styles from '../../styles/BlogPage.module.css'; // Corrected path

export default async function BlogLandingPage() {
  const posts = await getAllBlogPosts();

  if (!posts || posts.length === 0) {
    console.log('No posts found');
  } else {
    console.log('Fetched posts:', posts);
  }

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1>Blog</h1>
        <p>Latest updates, educational articles, and stories made for UNIT enthusiasts.</p>
        <div className={styles.filters}>
          <button>All</button>
          <button>Updates</button>
          <button>Edu Articles</button>
          <button>Stories</button>
        </div>
        <div className={styles.search}>
          <input type="text" placeholder="Search" />
        </div>
      </header>
      <BlogPostsList posts={posts} />
    </div>
  );
}