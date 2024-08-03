// components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation'; // Import usePathname
import { fetchNavigation } from '@/lib/fetchNavigation'; // Import fetchNavigation
import styles from '@/styles/Navbar.module.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [underlineStyle, setUnderlineStyle] = useState({});
  const [logoUrl, setLogoUrl] = useState(''); // State to store logo URL
  const navLinksRef = useRef(null);
  const pathname = usePathname(); // Initialize the router

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
    // Fetch navigation data
    const fetchNavData = async () => {
      const navData = await fetchNavigation();
      if (navData.length > 0) {
        setLogoUrl(navData[0].logo);
      }
    };
    fetchNavData();

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

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.logo}>
        {logoUrl && <img src={logoUrl} alt="UNIT Logo" className={styles.logoImage} />}
        <Link href="/">UNIT</Link>
      </div>
      <div ref={navLinksRef} className={`${styles.navLinks} ${isMenuOpen ? styles.open : ''}`}>
        <Link href="/about" className={`${styles.navLink} ${pathname === '/about' ? styles.active : ''}`}>About</Link>
        <Link href="/devs" className={`${styles.navLink} ${pathname === '/devs' ? styles.active : ''}`}>Devs</Link>
        <Link href="/unit_dao" className={`${styles.navLink} ${pathname === '/unit_dao' ? styles.active : ''}`}>DAO</Link>
        <Link href="/blog" className={`${styles.navLink} ${pathname === '/blog' ? styles.active : ''}`}>Blog</Link>
        <div className={styles.launchAppMobile}>
          <Link href="https://app.unitindex.org">Launch App</Link>
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