import { fetchBlogPost } from '@/lib/fetchBlogPost';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  console.log('Fetching post for slug:', params.slug);
  const post = await fetchBlogPost(params.slug);
  console.log('Blog post in component:', post);

  if (!post) {
    console.log('Post not found for slug:', params.slug);
    return <div>Post not found</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.description }} />
    </div>
  );
}