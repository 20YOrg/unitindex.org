// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from '@/components/Navbar'; // Import Navbar
import Footer from '@/components/Footer'; // Import Footer
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UNIT",
  description: "Crypto Unit of Account",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const backgroundUrl = process.env.NEXT_PUBLIC_BACKGROUND_URL;

  return (
    <html lang="en">
      <body className={inter.className}>
        <div
          className="fullscreenBackground"
          style={{
            backgroundImage: `url(${backgroundUrl})`,
          }}
        ></div>
        <Navbar /> {/* Add Navbar */}
        <main className="relative z-10 pt-[80px] p-4 bg-transparent">{children}</main>
        <div className="separatorLine"></div> {/* Add the separator line */}
        <Footer /> {/* Add Footer */}
      </body>
    </html>
  );
}