// components/Footer.tsx
'use client';

import Link from 'next/link';
import styles from '@/styles/Footer.module.css';

export default function Footer() {
  const baseUrl = process.env.NEXT_PUBLIC_DIRECTUS_API_URL;
  const logoUrl = `${baseUrl}/assets/0e4bdd6e-ab4f-4f5a-9f89-7f8d37740063`;

  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <Link href="/">
          <img src={logoUrl} alt="UNIT Logo" className={styles.logoImage} />
        </Link>
      </div>
      <div className={styles.footerLinks}>
        <Link href="/about">About</Link>
        <Link href="/devs">Devs</Link>
        <Link href="/dao">DAO</Link>
        <Link href="/blog">Blog</Link>
      </div>
      <div className={styles.separatorLine}></div> {/* Separator line in footer */}
      <div className={styles.copyright}>
        &copy; 2024 UNIT.
      </div>
    </footer>
  );
}