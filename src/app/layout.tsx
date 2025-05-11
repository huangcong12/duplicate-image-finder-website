import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OH - Duplicate Image Scanner | Shopify App",
  description: "Easily find and manage duplicate images in your Shopify store with OH - Duplicate Image Scanner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white`}
      >
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <a href="/" className="flex items-center font-bold text-xl">
              <span>OH - Duplicate Image Scanner</span>
            </a>
            <nav className="flex items-center gap-6">
              <a href="/" className="text-sm font-medium hover:text-blue-600">Home</a>
              <a href="/blog" className="text-sm font-medium hover:text-blue-600">Blog</a>
              <a href="https://apps.shopify.com/duplicate-image-scanner" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700" target="_blank" rel="noopener noreferrer">
                Get the App
              </a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t py-8 mt-12">
          <div className="container mx-auto px-4 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} OH - Duplicate Image Scanner. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
