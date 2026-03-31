import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ModelProvider } from '@/contexts/ModelContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { preloadAllModels } from '@/lib/3d/ModelLibrary';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "3D Electronics Workbench",
  description: "Explore 52 electronic components in interactive 3D. Learn about each part, how it works, and how to use it — built for students from elementary to high school.",
  icons: {
    icon: [
      { url: "/images/favicon.png", sizes: "any", type: "image/png" },
      { url: "/images/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
  },

  // Open Graph - Facebook, Discord, Slack, WhatsApp, iMessage
  openGraph: {
    title: "3D Electronics Workbench",
    description: "Explore 52 electronic components in interactive 3D. Learn about each part, how it works, and how to use it — built for students from elementary to high school.",
    url: "https://flux-theta-blush.vercel.app/",
    siteName: "3D Electronics Workbench",
    images: [
      {
        url: "https://flux-theta-blush.vercel.app/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "3D Electronics Workbench - Interactive Component Explorer",
      },
    ],
    type: "website",
  },

  // Twitter / X
  twitter: {
    card: "summary_large_image",
    title: "3D Electronics Workbench",
    description: "Explore 52 electronic components in interactive 3D. Built for students from elementary to high school.",
    images: ["https://flux-theta-blush.vercel.app/images/og-image.png"],
  },
};

// Preload models (this runs once)
if (typeof window !== 'undefined') {
  preloadAllModels();
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider>
          <ModelProvider>
            {children}
          </ModelProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}