// app/blog/page.tsx
import getAllBlogPosts from '@/lib/fetchAllBlogPosts';
import BlogPostsList from '@/components/BlogPostsList';

export default async function BlogLandingPage() {
  const posts = await getAllBlogPosts();

  if (!posts || posts.length === 0) {
    console.log('No posts found');
  } else {
    console.log('Fetched posts:', posts);
  }

  return (
    <div>
      <BlogPostsList posts={posts} />
    </div>
  );
}