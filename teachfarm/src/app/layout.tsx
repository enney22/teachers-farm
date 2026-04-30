// src/app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from 'sonner';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://teachersfarm.vercel.app'), // Update to your custom domain once live
  title: {
    default: "Teacher's Farm | Empowering Educators for Liberia's Future",
    template: "%s | Teacher's Farm"
  },
  description: "Teacher's Farm is a premier hub developing high-performing teachers in Liberia through training, support, and sustainable resources.",
  keywords: ["Liberia Education", "Teacher Training", "Sustainable Farming", "African Education Reform", "Teacher Support"],
  authors: [{ name: "Teacher's Farm" }],
  creator: "Teacher's Farm",
  publisher: "Teacher's Farm",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Teacher's Farm | Cultivating Excellence in Education",
    description: "Developing 700 high-performing teachers in Liberia. Join our mission to transform education.",
    url: 'https://teachersfarm.vercel.app',
    siteName: "Teacher's Farm",
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/teachers_farm_og_image.png', // Ensure this is moved to public
        width: 1200,
        height: 630,
        alt: "Teacher's Farm Professional Education Hub",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Teacher's Farm | Developing Future Leaders",
    description: "Join us in transforming Liberia's education system through teacher empowerment and training.",
    images: ['/teachers_farm_og_image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import ReactQueryProvider from "@/providers/ReactQueryProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon for different sizes */}
        <link rel="icon" href="/favicon-16x16.ico" sizes="16x16" type="image/x-icon" />
        <link rel="icon" href="/favicon-32x32.ico" sizes="32x32" type="image/x-icon" />
        <link rel="icon" href="/android-chrome-192x192.ico" sizes="192x192" type="image/png" />
        <link rel="icon" href="/android-chrome-512x512.ico" sizes="512x512" type="image/png" />

        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.ico" sizes="180x180" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          {children}
          <Toaster richColors position="top-right" />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
