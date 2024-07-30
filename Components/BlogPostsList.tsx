// components/BlogPostsList.tsx
import React from 'react';
import Link from 'next/link';
import styles from '../styles/BlogPostCard.module.css';

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

const BlogPostsList: React.FC<BlogPostsListProps> = ({ posts }) => {
  return (
    <div className={styles.blogsGrid}>
      {posts.map((post) => {
        const imageUrl = `${process.env.NEXT_PUBLIC_DIRECTUS_API_URL}/assets/${post.image}?width=600`;

        console.log(`Image URL for post "${post.title}":`, imageUrl);

        return (
          <div key={post.id} className={styles.card}>
            <Link href={`/blog/${post.slug}`} legacyBehavior>
              <a>
                <img src={imageUrl} alt={post.title} className={styles.image} />
                <div className={styles.content}>
                  <p>{new Date(post.date_published).toLocaleDateString()}</p>
                  <h2>{post.title}</h2>
                  <p>{post.summary}</p>
                  <p>Read Full Article →</p>
                </div>
              </a>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default BlogPostsList;