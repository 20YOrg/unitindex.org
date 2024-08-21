'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import styles from '@/styles/Navbar.module.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [underlineStyle, setUnderlineStyle] = useState({});
  const navLinksRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const baseUrl = process.env.NEXT_PUBLIC_DIRECTUS_API_URL;
  const logoUrl = `${baseUrl}/assets/0e4bdd6e-ab4f-4f5a-9f89-7f8d37740063`;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (pathname === '/') {
      setUnderlineStyle({ width: 0, left: 0 });
      return;
    }

    const activeLink = document.querySelector(`.${styles.navLink}.${styles.active}`);
    if (activeLink && navLinksRef.current) {
      const navLinksRect = navLinksRef.current.getBoundingClientRect();
      const activeLinkRect = activeLink.getBoundingClientRect();
      setUnderlineStyle({
        width: activeLinkRect.width,
        left: activeLinkRect.left - navLinksRect.left,
      });
    }
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false); // Close the menu when a link is clicked
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.logo}>
        <Link href="/" onClick={handleLinkClick}>
          <img src={logoUrl} alt="UNIT Logo" className={styles.logoImage} />
        </Link>
      </div>
      <div ref={navLinksRef} className={`${styles.navLinks} ${isMenuOpen ? styles.open : ''}`}>
        <Link href="/about" className={`${styles.navLink} ${pathname === '/about' ? styles.active : ''}`} onClick={handleLinkClick}>About</Link>
        <Link href="/devs" className={`${styles.navLink} ${pathname === '/devs' ? styles.active : ''}`} onClick={handleLinkClick}>Devs</Link>
        <Link href="/dao" className={`${styles.navLink} ${pathname === '/dao' ? styles.active : ''}`} onClick={handleLinkClick}>DAO</Link>
        <Link href="/blog" className={`${styles.navLink} ${pathname === '/blog' ? styles.active : ''}`} onClick={handleLinkClick}>Blog</Link>
        <div className={styles.launchAppMobile}>
          <Link href="https://app.unitindex.org" onClick={handleLinkClick}>Launch App</Link>
        </div>
        <div className={styles.underline} style={underlineStyle}></div>
      </div>
      <button className={styles.hamburger} onClick={toggleMenu}>
        <span className={styles.hamburgerIcon}></span>
        <span className={styles.hamburgerIcon}></span>
        <span className={styles.hamburgerIcon}></span>
      </button>
      <div className={styles.launchAppDesktop}>
        <Link href="https://app.unitindex.org">Launch App</Link>
      </div>
    </nav>
  );
}