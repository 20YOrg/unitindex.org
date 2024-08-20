'use client';

import React from 'react';
import Link from 'next/link';
import styles from '@/styles/BlogPage.module.css';

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  date_published: string;
  author: string;
  slug: string;
  category: string;
  categoryTitle?: string;
}

interface BlogPostsListProps {
  posts: BlogPost[];
  readFullArticleText: string;
}

const BlogPostsList: React.FC<BlogPostsListProps> = ({ posts, readFullArticleText }) => {
  return (
    <div className={styles.blogsGrid}>
      {posts.map((post) => {
        const imageUrl = `${process.env.NEXT_PUBLIC_DIRECTUS_API_URL}/assets/${post.image}?width=600`;

        return (
          <div key={post.id} className={styles.card}>
            <Link href={`/blog/${post.slug}`} legacyBehavior>
              <a className={styles.cardLink}>
                <img src={imageUrl} alt={post.title} className={styles.image} />
                <div className={styles.content}>
                <p className={styles.date}>
                  {new Date(post.date_published).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  }).replace(/(\d{1,2}) (\w+) (\d{4})/, '$1 $2, $3')}
                </p>
                  <h2 className={styles.cardTitle}>{post.title}</h2>
                  <p className={styles.summary}>{post.summary}</p>
                  <p className={styles.readMore}>{readFullArticleText} →</p>
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