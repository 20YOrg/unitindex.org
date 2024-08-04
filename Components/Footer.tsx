// components/Footer.tsx
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
          <Link href="https://app.unitindex.org" target="_blank" rel="noopener noreferrer">Launch App</Link>
        </div>
      </div>
      <div className={styles.separatorLine}></div> {/* Separator line in footer */}
      <div className={styles.copyright}>
        &copy; 2024 UNIT.
      </div>
    </footer>
  );
}