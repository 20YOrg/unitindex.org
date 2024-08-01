'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/BlogPage.module.css';

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  date_published: string;
  author: string;
  slug: string;
}

interface BlogPostsListProps {
  posts: BlogPost[];
}

const BlogPostsList: React.FC<BlogPostsListProps> = ({ posts }) => {
  const [searchInput, setSearchInput] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const sortedPosts = [...posts].sort((a, b) => new Date(b.date_published).getTime() - new Date(a.date_published).getTime());

    const filtered = sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchInput.toLowerCase()) ||
      post.content.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchInput, posts]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={searchInput}
        onChange={handleSearchChange}
        className={styles.search}
      />
      <div className={styles.blogsGrid}>
        {filteredPosts.map((post) => {
          const imageUrl = `${process.env.NEXT_PUBLIC_DIRECTUS_API_URL}/assets/${post.image}?width=600`;

          return (
            <div key={post.id} className={styles.card}>
              <Link href={`/blog/${post.slug}`} legacyBehavior>
                <a className={styles.cardLink}>
                  <img src={imageUrl} alt={post.title} className={styles.image} />
                  <div className={styles.content}>
                    <p className={styles.date}>
                      {new Date(post.date_published).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </p>
                    <h2 className={styles.cardTitle}>{post.title}</h2>
                    <p className={styles.summary}>{post.summary}</p>
                    <p className={styles.readMore}>Read Full Article →</p>
                  </div>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlogPostsList;