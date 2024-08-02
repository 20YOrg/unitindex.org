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
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar /> {/* Add Navbar */}
        <main className="relative z-10 pt-[80px] p-4 bg-white bg-opacity-80 backdrop-blur">{children}</main>
        <Footer /> {/* Add Footer */}
      </body>
    </html>
  );
}