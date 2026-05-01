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
  metadataBase: new URL('https://www.teachersfarm.com'),
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
    url: 'https://www.teachersfarm.com',
    siteName: "Teacher's Farm",
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/teachers_farm_og_image.png',
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
  verification: {
    google: 'google56c96dae71c12d0e',
  },
};

import ReactQueryProvider from "@/providers/ReactQueryProvider";
import Script from "next/script";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Teacher's Farm",
  "url": "https://www.teachersfarm.com",
  "logo": "https://www.teachersfarm.com/logo.png",
  "description": "Teacher's Farm is a premier hub developing high-performing teachers in Liberia through training, support, and sustainable resources.",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "LR",
    "addressLocality": "Monrovia"
  },
  "sameAs": [
    "https://www.facebook.com/share/1C5M236gW2/",
    "https://www.instagram.com/teachers_farmedu?igsh=MXdqbWNldDRxa2tsYg==",
    "https://www.linkedin.com/posts/teacher-s-farm_teachersfarm-wethink-plant-activity-7427362995917197312-4cdv?utm_source=share&utm_medium=member_android&rcm=ACoAACM8hUgBB2oBflcL6yhibpG6zcraSWj8TZQ",
    "https://whatsapp.com/channel/0029VakNREI0QeanSK9CvT42",
    "https://www.instagram.com/teachersfarm"
  ]
};

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

        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Google Analytics GA4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KLX1XTXXZM"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KLX1XTXXZM');
          `}
        </Script>
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
