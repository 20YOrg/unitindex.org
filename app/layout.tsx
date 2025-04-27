'use client'; // Ensure this is a client component

import { useState, useEffect } from 'react';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar'; // Import Navbar
import Footer from '@/components/Footer'; // Import Footer
import Spinner from '@/components/Spinner'; // Import Spinner
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const backgroundUrl = process.env.NEXT_PUBLIC_BACKGROUND_URL;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate page load process. Adjust this delay for your actual loading logic
    const timeout = setTimeout(() => {
      setLoading(false); // Stop the spinner when page resources are loaded
    }, 2000); // Set a delay for demonstration (2 seconds)

    return () => clearTimeout(timeout); // Clear timeout if component unmounts
  }, []);

  return (
    <html lang="en">
      <head>
        {/* Page title */}
        <title>UNIT</title>
        {/* Apple Touch Icon (precomposed to avoid rounded corners) */}
        <link rel="apple-touch-icon-precomposed" href="/apple-touch-icon.png?v=1" />
        {/* Set app title for home screen */}
        <meta name="apple-mobile-web-app-title" content="UNIT" />
        {/* Regular favicon */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <div className="pageContainer">
          <div
            className="fullscreenBackground"
            style={{
              backgroundImage: `url(${backgroundUrl})`,
            }}
          ></div>

          <Navbar /> {/* Include Navbar */}

          {/* Render content, but overlay with spinner */}
          <div style={{ display: loading ? 'none' : 'block' }}>
            <main className="content">{children}</main>
            <Footer /> {/* Include Footer */}
          </div>

          {/* Show spinner while loading */}
          {loading && <Spinner />}
        </div>
      </body>
    </html>
  );
}