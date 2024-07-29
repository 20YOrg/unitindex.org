// components/BlogPostsList.tsx
'use client';

import styles from '@/styles/blog.module.css';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  image: string;
  date_published: string;
  author: string;
  slug: string;
}

interface BlogPostsListProps {
  posts: BlogPost[];
}

const BlogPostsList = ({ posts }: BlogPostsListProps) => {
  if (!posts || posts.length === 0) {
    return <div>No blog posts found.</div>;
  }

  return (
    <div>
      <h1>All Blogs</h1>
      <div className={styles.blogsGrid}>
        {posts.map((post) => (
          <div key={post.id} className={styles.blogCard}>
            <img src={`http://directus-ucc0sco.77.37.54.98.sslip.io/assets/${post.image}`} alt={post.title} className={styles.blogImage} />
            <h2>{post.title}</h2>
            <p>{post.summary}</p>
            <p>Published on: {new Date(post.date_published).toLocaleDateString()}</p>
            <p>Author: {post.author}</p>
            <Link href={`/blog/${post.slug}`}>Read more</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPostsList;