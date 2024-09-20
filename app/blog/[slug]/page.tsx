// app/blog/[slug]/page.tsx
import getBlogPost from '@/lib/fetchBlogPost';
import getIcons, { Icon as IconType } from '@/lib/fetchIcons';
import getTeamMember from '@/lib/fetchTeam';
import getBlogPage from '@/lib/fetchPostPage';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import styles from '@/styles/BlogPostPage.module.css';

type IconNames = 'Blog Share' | 'Blog X Community' | 'Blog X';

const iconClasses: Record<IconNames, string> = {
  'Blog Share': 'icon-Blog-Share',
  'Blog X Community': 'icon-Blog-X-Community',
  'Blog X': 'icon-Blog-X',
};

interface BlogPostPageProps {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;
  const post = await getBlogPost(slug);
  const icons = await getIcons();
  const blogPage = await getBlogPage();

  if (!post) {
    notFound();
  }

  const author = await getTeamMember(post.author);

  const filteredIcons = icons.filter(
    (icon): icon is IconType & { name: IconNames } =>
      ['Blog Share', 'Blog X Community', 'Blog X'].includes(icon.name) && icon.effect === 'normal'
  );

  const baseUrl = process.env.NEXT_PUBLIC_DIRECTUS_API_URL;
  const unitUrl = "https://unitindex.org";
  const shareUrl = `https://x.com/compose/post?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${unitUrl}/blog/${post.slug}`)}`;

  return (
    <>
      <div
        className={styles.fullscreenBackground}
        style={{
          backgroundImage: `url(${baseUrl}/assets/${blogPage.background})`,
        }}
      ></div>
      <div className={styles.container}>
        <Link href="/blog" className={styles.backLink}>
          ← {blogPage.back}
        </Link>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.meta}>
          <div className={styles.icons}>
            {filteredIcons.map((icon) => (
              <a
                key={icon.id}
                href={icon.name === 'Blog Share' ? shareUrl : icon.linkURL || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.iconLink} ${styles[iconClasses[icon.name]]}`}
                title={icon.description || ''} // Using native tooltip
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
            {new Date(post.date_published).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            }).replace(/(\d{1,2}) (\w+) (\d{4})/, '$1 $2, $3')}
          </p>
          <div className={styles.separator}></div>
        </div>
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.content }} />
        <div className={styles.authorContainer}>
          {author?.image && (
            <img
              src={`${baseUrl}/assets/${author.image}`}
              alt={author.name}
              className={styles.authorImage}
            />
          )}
          <p className={styles.author}>{blogPage.written_by} {author?.name}</p>
        </div>
      </div>
    </>
  );
}