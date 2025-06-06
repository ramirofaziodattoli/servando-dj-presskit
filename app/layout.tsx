import type { Metadata } from "next";
import { Bebas_Neue, Unbounded } from "next/font/google";
import "./globals.css";
import ExternalTags from "@/components/ExternalTags";
import Providers from "@/components/Providers";
import NavBar from "@/components/Nav/Navbar";
import Preloader from "@/components/Preloader";
import Footer from "@/components/Footer/Footer";
import { DJ_INFO } from "@/DATA";

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
  title: "DJ Presskit - " + DJ_INFO.name,
  description: DJ_INFO.shortBio,
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
      </head>
      <body
        className={`${bebasNeue.variable} ${unbounded.variable} antialiased`}
      >
        <Providers>
          <NavBar />
          <Preloader />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
