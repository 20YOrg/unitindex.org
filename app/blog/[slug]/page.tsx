import getBlogPost from '@/lib/fetchBlogPost';

interface BlogPostPageProps {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;
  const post = await getBlogPost(slug);

  if (!post) {
    console.log('Blog post not found for slug:', slug);
    return <div>Blog post not found</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
      <p>Published on: {new Date(post.date_published).toLocaleDateString()}</p>
      <p>Author: {post.author}</p>
    </div>
  );
}