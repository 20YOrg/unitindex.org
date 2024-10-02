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
                  <p className={styles.readMore}>
  <span className={styles.readMoreText}>{readFullArticleText}</span>
  <span className={styles.arrow}>
    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.14314 6.36709L9.61456 6.36709L7.02171 9.57972C6.90047 9.73019 6.84214 9.92419 6.85955 10.119C6.87696 10.3139 6.9687 10.4936 7.11456 10.6187C7.26043 10.7437 7.44849 10.8039 7.63737 10.7859C7.82624 10.768 8.00047 10.6734 8.12171 10.5229L11.6931 6.10182C11.7172 6.06666 11.7387 6.02972 11.7574 5.9913C11.7574 5.95446 11.7574 5.93235 11.8074 5.89551C11.8398 5.81102 11.8567 5.72109 11.8574 5.63025C11.8567 5.5394 11.8398 5.44947 11.8074 5.36498C11.8074 5.32814 11.8074 5.30604 11.7574 5.26919C11.7387 5.23077 11.7172 5.19383 11.6931 5.15867L8.12171 0.737614C8.05455 0.654437 7.97045 0.587546 7.87539 0.541699C7.78033 0.495852 7.67664 0.472175 7.57171 0.47235C7.40481 0.472014 7.24307 0.531975 7.11456 0.641824C7.04224 0.703681 6.98245 0.779651 6.93863 0.86538C6.8948 0.95111 6.86781 1.04491 6.85918 1.14142C6.85056 1.23793 6.86047 1.33525 6.88836 1.4278C6.91625 1.52035 6.96156 1.60631 7.02171 1.68077L9.61456 4.8934L1.14314 4.8934C0.953695 4.8934 0.772014 4.97103 0.638059 5.10922C0.504105 5.2474 0.42885 5.43482 0.42885 5.63025C0.42885 5.82567 0.504105 6.01309 0.638059 6.15127C0.772014 6.28946 0.953695 6.36709 1.14314 6.36709Z" fill="#101729"/>
    </svg>
  </span>
</p>


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