import getBlogPost from '@/lib/fetchBlogPost';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import styles from '@/styles/BlogPostPage.module.css';

interface BlogPostPageProps {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <Link href="/blog" className={styles.backLink}>
        ← Back
      </Link>
      <h1 className={styles.title}>{post.title}</h1>
      <p className={styles.date}>
        {new Date(post.date_published).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
      </p>
      <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.content }} />
      <p className={styles.author}>Written by {post.author}</p>
    </div>
  );
}