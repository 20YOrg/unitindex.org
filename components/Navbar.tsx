'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import styles from '@/styles/Navbar.module.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown
  const [underlineStyle, setUnderlineStyle] = useState({});
  const navLinksRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const baseUrl = process.env.NEXT_PUBLIC_DIRECTUS_API_URL;
  const logoUrl = `${baseUrl}/assets/0e4bdd6e-ab4f-4f5a-9f89-7f8d37740063`;

  // Check if the user is on a product page or a subpage of Products
  const isProductPage = pathname.startsWith('/products');

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
    // Don't show underline on product pages
    if (isProductPage) {
      setUnderlineStyle({ width: 0, left: 0 });
      return;
    }

    const activeLink = document.querySelector(`.${styles.navLink}.${styles.active}`);

    if (activeLink && navLinksRef.current) {
      const navLinksRect = navLinksRef.current.getBoundingClientRect();
      const activeLinkRect = activeLink.getBoundingClientRect();

      // Update the underline based on the active link position
      setUnderlineStyle({
        width: activeLinkRect.width,
        left: activeLinkRect.left - navLinksRect.left,
      });
    } else if (pathname === '/') {
      // Reset underline if on homepage (i.e., no active link)
      setUnderlineStyle({ width: 0, left: 0 });
    }
  }, [pathname, isProductPage]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false); // Close the menu when a link is clicked
    setIsDropdownOpen(false); // Close the dropdown menu
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown menu
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.logo}>
        <Link href="/" onClick={handleLinkClick}>
          <img src={logoUrl} alt="UNIT Logo" className={styles.logoImage} />
        </Link>
      </div>
      <div ref={navLinksRef} className={`${styles.navLinks} ${isMenuOpen ? styles.open : ''}`}>
        
        {/* Dropdown Menu (Product) */}
        <div className={styles.navLink} onClick={toggleDropdown}>
          Products
          <span className={styles.dropdownArrow}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-chevron-down"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              <Link href="/products/index" className={styles.dropdownItem} onClick={handleLinkClick}>Index</Link>
              <Link href="/products/unit-of-account" className={styles.dropdownItem} onClick={handleLinkClick}>Unit of Account</Link>
            </div>
          )}
        </div>

        {/* Other Links */}
        <Link href="/about" className={`${styles.navLink} ${pathname === '/about' ? styles.active : ''}`} onClick={handleLinkClick}>About</Link>
        <Link href="/devs" className={`${styles.navLink} ${pathname === '/devs' ? styles.active : ''}`} onClick={handleLinkClick}>Devs</Link>
        <Link href="/dao" className={`${styles.navLink} ${pathname === '/dao' ? styles.active : ''}`} onClick={handleLinkClick}>DAO</Link>
        <Link href="/blog" className={`${styles.navLink} ${pathname.startsWith('/blog') ? styles.active : ''}`} onClick={handleLinkClick}>Blog</Link>

        <div className={styles.launchAppMobile}>
          <Link href="https://app.unitindex.org" onClick={handleLinkClick}>Launch App</Link>
        </div>

        {/* The underline will be hidden on product pages */}
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

