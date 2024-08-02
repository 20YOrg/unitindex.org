// components/Footer.tsx
'use client';

import Link from 'next/link';
import styles from '@/styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <Link href="/">UNIT</Link>
      </div>
      <div className={styles.footerLinks}>
        <Link href="/about">About</Link>
        <Link href="/devs">Devs</Link>
        <Link href="/unit_dao">DAO</Link>
        <Link href="/blog">Blog</Link>
        <div className={styles.launchApp}>
          <Link href="https://app.unitindex.org">Launch App</Link>
        </div>
      </div>
      <div className={styles.copyright}>
        &copy; 2024 UNIT.
      </div>
    </footer>
  );
}