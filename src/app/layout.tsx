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
  title: "Rowan Arora - Backend Developer & AI Enthusiast",
  description: "Backend developer & AI enthusiast with 5+ years of programming experience. Currently building the future of legal tech at ContractPodAI.",
  keywords: ["Rowan Arora", "Backend Developer", "AI", "Python", "JavaScript", "React", "Next.js", "Portfolio"],
  authors: [{ name: "Rowan Arora" }],
  creator: "Rowan Arora",
  metadataBase: new URL('https://rowanaurora.dev'),
  
  // Open Graph
  openGraph: {
    title: "Rowan Arora - Backend Developer & AI Enthusiast",
    description: "Backend developer & AI enthusiast with 5+ years of programming experience. Currently building scalable systems at ContractPodAI.",
    url: 'https://rowanaurora.dev',
    siteName: 'Rowan Arora Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Rowan Arora - Backend Developer & AI Enthusiast',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  
  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'Rowan Arora - Backend Developer & AI Enthusiast',
    description: 'Backend developer & AI enthusiast with 5+ years of programming experience. Currently building scalable systems at ContractPodAI.',
    images: ['/og-image.png'],
    creator: '@rowanarora',
  },
  
  // Additional meta tags
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
  
  // Verification (add your actual verification codes if you have them)
  verification: {
    google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
