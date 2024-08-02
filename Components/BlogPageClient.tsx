'use client';

import React, { useState, useEffect } from 'react';
import BlogPostsList from '@/components/BlogPostsList';
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
  categoryTitle?: string; // Added optional categoryTitle
}

interface BlogPageClientProps {
  posts: BlogPost[];
  categories: string[];
  readFullArticleText: string;
  baseUrl: string;
  title: string;
  headline: string;
}

const BlogPageClient: React.FC<BlogPageClientProps> = ({
  posts,
  categories,
  readFullArticleText,
  baseUrl,
  title,
  headline
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const sortedPosts = [...posts].sort((a, b) => new Date(b.date_published).getTime() - new Date(a.date_published).getTime());

    const filtered = sortedPosts.filter((post) => {
      const matchesSearch = post.title.toLowerCase().includes(searchInput.toLowerCase()) ||
                            post.summary.toLowerCase().includes(searchInput.toLowerCase()) ||
                            post.content.toLowerCase().includes(searchInput.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || post.categoryTitle === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    setFilteredPosts(filtered);
  }, [searchInput, selectedCategory, posts]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle} dangerouslySetInnerHTML={{ __html: headline }}></p>
        <div className={styles.separator}></div>
      </header>
      <div className={styles.filtersSearchContainer}>
        <div className={styles.filters}>
          <button onClick={() => handleCategoryChange('All')} className={`${styles.filterButton} ${selectedCategory === 'All' ? styles.activeFilter : ''}`}>
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`${styles.filterButton} ${selectedCategory === category ? styles.activeFilter : ''}`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className={styles.search}>
          <div className={styles.searchContainer}>
            <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#5F7179" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 21L16.65 16.65" stroke="#5F7179" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search"
              value={searchInput}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
          </div>
        </div>
      </div>
      <BlogPostsList posts={filteredPosts} readFullArticleText={readFullArticleText} />
    </div>
  );
};

export default BlogPageClient;