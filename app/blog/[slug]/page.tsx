// app/blog/[slug]/page.tsx
import getBlogPost from '@/lib/fetchBlogPost';
import getIcons, { Icon as IconType } from '@/lib/fetchIcons';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import styles from '@/styles/BlogPostPage.module.css';

interface BlogPostPageProps {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;
  const post = await getBlogPost(slug);
  const icons = await getIcons();

  if (!post) {
    notFound();
  }

  const filteredIcons = icons.filter(icon =>
    ['Blog Share', 'Blog X Community', 'Blog X'].includes(icon.name) && icon.effect === 'normal'
  );

  const iconClasses = {
    'Blog Share': 'icon-Blog-Share',
    'Blog X Community': 'icon-Blog-X-Community',
    'Blog X': 'icon-Blog-X',
  };

  const baseUrl = process.env.NEXT_PUBLIC_DIRECTUS_API_URL;

  return (
    <div className={styles.container}>
      <Link href="/blog" className={styles.backLink}>
        ← Back
      </Link>
      <h1 className={styles.title}>{post.title}</h1>
      <div className={styles.meta}>
        <div className={styles.icons}>
          {filteredIcons.map((icon, index) => (
            <a
              key={icon.id}
              href={icon.linkURL || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.iconLink} ${styles[iconClasses[icon.name]]}`}
            >
              <img
                src={`${baseUrl}/assets/${icon.icon}`}
                alt={icon.name}
                className={`${styles.icon} ${styles.normal}`}
              />
              <img
                src={`${baseUrl}/assets/${icon.hoverIcon}`}
                alt={icon.name}
                className={`${styles.icon} ${styles.hover}`}
              />
              <img
                src={`${baseUrl}/assets/${icon.activeIcon}`}
                alt={icon.name}
                className={`${styles.icon} ${styles.active}`}
              />
            </a>
          ))}
        </div>
        <p className={styles.date}>
          {new Date(post.date_published).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
        </p>
      </div>
      <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.content }} />
      <p className={styles.author}>Written by {post.author}</p>
    </div>
  );
}