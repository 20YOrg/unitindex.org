// app/blog/page.tsx
import getAllBlogPosts from '@/lib/fetchAllBlogPosts';
import getCategories from '@/lib/fetchCategories';
import BlogPageClient from '@/components/BlogPageClient';
import getBlogPage from '@/lib/fetchBlogPage';
import styles from '@/styles/BlogLandingPage.module.css'; // Import styles

export default async function BlogLandingPage() {
  const posts = await getAllBlogPosts();
  const categories = await getCategories();
  const blogPage = await getBlogPage();

  if (!posts || posts.length === 0) {
    console.log('No posts found');
  }

  if (!categories || categories.length === 0) {
    console.log('No categories found');
  }

  if (!blogPage) {
    console.log('No blog page data found');
  }

  const baseUrl = process.env.NEXT_PUBLIC_DIRECTUS_API_URL;

  // Map categories with posts
  const postsWithCategoryTitles = posts.map(post => {
    const category = categories.find(cat => cat.id === post.category);
    return {
      ...post,
      categoryTitle: category ? category.title : 'Uncategorized',
    };
  });

  // Extract unique categories from the posts
  const uniqueCategories = Array.from(new Set(categories.map(cat => cat.title)));

  return (
    <>
      <div
        className={styles.fullscreenBackground}
        style={{
          backgroundImage: `url(${baseUrl}/assets/${blogPage?.background})`,
        }}
      ></div>
      <div className={styles.pageContainer}>
        <BlogPageClient
          posts={postsWithCategoryTitles}
          categories={uniqueCategories}
          readFullArticleText={blogPage?.read_full_article}
          baseUrl={baseUrl}
          title={blogPage?.title || 'Blog'}
          headline={blogPage?.headline || 'Latest updates, educational articles, and stories made for UNIT enthusiasts.'}
        />
      </div>
    </>
  );
}