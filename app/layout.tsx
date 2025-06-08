import type { Metadata } from "next";
import { Bebas_Neue, Unbounded } from "next/font/google";
import "./globals.css";
import ExternalTags from "@/components/ExternalTags";
import Providers from "@/components/Providers";
import NavBar from "@/components/Nav/Navbar";
import Preloader from "@/components/Preloader";
import Footer from "@/components/Footer/Footer";
import { DJ_INFO, PAGE_URL } from "@/DATA";
import { Analytics } from "@/components/Analytics";

const bebasNeue = Bebas_Neue({
  weight: ["400"],
  variable: "--font-primary",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const unbounded = Unbounded({
  variable: "--font-secondary",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(PAGE_URL),
  title: "DJ Presskit - " + DJ_INFO.name,
  description: DJ_INFO.shortBio,
  keywords:
    "DJ presskit, sitio web DJ, landing page DJ, promoción DJ, portfolio DJ, presskit digital, presskit, press kit, media kit" +
    DJ_INFO.eventTypes,
  authors: [{ name: "DJ Presskit - " + DJ_INFO.name }],
  creator: "DJ Presskit",
  publisher: "DJ Presskit",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: PAGE_URL,
    siteName: "DJ Presskit - " + DJ_INFO.name,
    title: "DJ Presskit - " + DJ_INFO.name,
    description: DJ_INFO.shortBio,
    images: [
      {
        url: "og-image.png",
        secureUrl: "og-image.png",
        width: 1200,
        height: 630,
        alt: DJ_INFO.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DJ Presskit - " + DJ_INFO.name,
    description: DJ_INFO.shortBio,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ExternalTags />
        <link rel="canonical" href={PAGE_URL} />
      </head>
      <body
        className={`${bebasNeue.variable} ${unbounded.variable} antialiased`}
      >
        <Providers>
          <NavBar />
          <Preloader />
          {children}
          <Footer />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
