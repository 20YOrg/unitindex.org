import React from 'react';
import Link from 'next/link';
import styles from '../styles/BlogPostsList.module.css';

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
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_API_URL;

  return (
    <div>
      <h1>All Blogs</h1>
      <div className={styles.blogsGrid}>
        {posts.map((post) => {
          const imageUrl = `${directusUrl}/assets/${post.image}?width=600`;

          console.log(`Image URL for post "${post.title}":`, imageUrl);

          return (
            <div key={post.id} className={styles.blogCard}>
              <Link href={`/blog/${post.slug}`} legacyBehavior>
                <a>
                  <img src={imageUrl} alt={post.title} className={styles.blogImage} />
                  <h2 className={styles.blogTitle}>{post.title}</h2>
                  <p className={styles.blogSummary}>{post.summary}</p>
                  <p>Published on: {new Date(post.date_published).toLocaleDateString()}</p>
                  <p>Author: {post.author}</p>
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