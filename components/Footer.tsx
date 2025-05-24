'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '@/styles/Footer.module.css';

export default function Footer() {
  const baseUrl = process.env.NEXT_PUBLIC_DIRECTUS_API_URL;

  // Image URLs from Directus
  const logoUrl = `${baseUrl}/assets/5d9c40a5-445f-4c02-a4fe-20a1778bbacc.png`;
  const xLogoUrl = `${baseUrl}/assets/702225d8-7ab6-4881-91ca-c4203b2cff72.png`;
  const githubLogoUrl = `${baseUrl}/assets/b2a1ae75-c0eb-4042-a3be-b4b60cb99ce6.png`;
  const xCommunityLogoUrl = `${baseUrl}/assets/ad6aa3a7-34f6-4e61-8b61-94151941af03.png`;

  // State to track the screen size
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Set to mobile layout if screen width <= 768px
    };

    // Initial check
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Mobile version of the footer (for small screens)
  const mobileFooter = (
    <footer className={styles.footer}>
      {/* Logo at the top */}
      <div className={styles.logoSection}>
        <img src={logoUrl} alt="UNIT Logo" className={styles.logoImage} />
      </div>

      {/* Social Icons below the logo */}
      <div className={styles.socialIcons}>
        <Link href="https://x.com/unitindex" target="_blank" rel="noopener noreferrer">
          <img src={xLogoUrl} alt="X Logo" className={styles.socialIcon} />
        </Link>
        <Link href="https://github.com/20YOrg" target="_blank" rel="noopener noreferrer">
          <img src={githubLogoUrl} alt="GitHub Logo" className={styles.socialIcon} />
        </Link>
        <Link href="https://community.x.com/unit" target="_blank" rel="noopener noreferrer">
          <img src={xCommunityLogoUrl} alt="X Community Logo" className={styles.socialIcon} />
        </Link>
      </div>

      {/* Footer links in 3 rows and 2 columns */}
      <div className={styles.footerLinksContainer}>
        <div className={styles.footerColumn}>
          <h4>PRODUCTS</h4>
          <Link href="/products/index">Index</Link>
          <Link href="/products/unit-of-account">Unit of Account</Link>
        </div>

        <div className={styles.footerColumn}>
          <h4>ABOUT</h4>
          <Link href="/about">Why UNIT</Link>
          <Link href="/about#faq">FAQ</Link>
        </div>

        <div className={styles.footerColumn}>
          <h4>DEVS</h4>
          <Link href="https://github.com/20YOrg" target="_blank">GitHub</Link>
          <Link href="https://docs.unitindex.org/theunit" target="_blank">Doc</Link>
          <Link href="https://github.com/20YOrg/the-unit-paper/blob/main/the_unit_paper.pdf" target="_blank">White Paper V2</Link>
        </div>

        <div className={styles.footerColumn}>
          <h4>DAO</h4>
          <Link href="/dao#brand-assets">Brand Assets</Link>
        </div>

        <div className={styles.footerColumn}>
          <h4>STAY CONNECTED</h4>
          <Link href="/blog">Blog</Link>
        </div>
      </div>

      {/* Divider */}
      <div className={styles.footerDivider}></div>

      {/* Copyright at the bottom */}
      <div className={styles.copyright}>
        &copy; 2024 UNIT DAO. All rights reserved.
      </div>
    </footer>
  );

  // Desktop version of the footer (for larger screens)
  const desktopFooter = (
    <footer className={styles.footer}>
      {/* Top Section: Logo, Social Icons, and Footer Links */}
      <div className={styles.footerContent}>
        {/* Left Section: Logo, Social Icons, and Copyright */}
        <div className={styles.leftSection}>
          <img src={logoUrl} alt="UNIT Logo" className={styles.logoImage} />
          <div className={styles.socialIcons}>
            <Link href="https://x.com/unit_index" target="_blank" rel="noopener noreferrer">
              <img src={xLogoUrl} alt="X Logo" className={styles.socialIcon} />
            </Link>
            <Link href="https://github.com/20YOrg" target="_blank" rel="noopener noreferrer">
              <img src={githubLogoUrl} alt="GitHub Logo" className={styles.socialIcon} />
            </Link>
            <Link href="https://community.x.com/unit" target="_blank" rel="noopener noreferrer">
              <img src={xCommunityLogoUrl} alt="X Community Logo" className={styles.socialIcon} />
            </Link>
          </div>

          <div className={styles.copyright}>
            &copy; 2024 UNIT DAO. All rights reserved.
          </div>
        </div>

        {/* Right Section: Footer Links */}
        <div className={styles.footerLinksContainer}>
          <div className={styles.footerColumn}>
            <h4>PRODUCTS</h4>
            <Link href="/products/index">Index</Link>
            <Link href="/products/unit-of-account">Unit of Account</Link>
          </div>

          <div className={styles.footerColumn}>
            <h4>ABOUT</h4>
            <Link href="/about">Why UNIT</Link>
            <Link href="/about#faq">FAQ</Link>
          </div>

          <div className={styles.footerColumn}>
            <h4>DEVS</h4>
            <Link href="https://github.com/20YOrg" target="_blank">GitHub</Link>
            <Link href="https://docs.unitindex.org/theunit" target="_blank">Doc</Link>
            <Link href="https://github.com/20YOrg/the-unit-paper/blob/main/the_unit_paper.pdf" target="_blank">White Paper V2</Link>
          </div>

          <div className={styles.footerColumn}>
            <h4>DAO</h4>
            <Link href="/dao#brand-assets">Brand Assets</Link>
          </div>

          <div className={styles.footerColumn}>
            <h4>STAY CONNECTED</h4>
            <Link href="/blog">Blog</Link>
          </div>
        </div>
      </div>

      {/* Divider (hidden on large screens) */}
      <div className={styles.footerDivider}></div>
    </footer>
  );

  return isMobile ? mobileFooter : desktopFooter;
}
