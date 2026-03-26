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
  title: "3D ELECTRONICS WORKBENCH",
  description: "Explore hardware components in 3D with FluxLabs",
  icons: {
    icon: [
      { url: "/images/favicon.png", sizes: "any", type: "image/png" },
      { url: "/images/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
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