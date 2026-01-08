import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"

import "./globals.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Param Pandya | AI/ML Researcher & Software Engineer",
    template: "%s | Param Pandya",
  },
  description:
    "AI/ML Researcher and Software Engineer working on deep learning, NLP, healthcare AI, and trustworthy machine learning systems. Author of research papers on pneumonia detection, BioGPT-based healthcare AI, and deepfake detection.",
  keywords: [
    "Param Pandya",
    "AI ML Researcher",
    "Machine Learning Researcher",
    "Deep Learning",
    "Healthcare AI",
    "Medical Image Analysis",
    "NLP",
    "Generative AI",
    "BioGPT",
    "Pneumonia Detection",
    "Deepfake Detection",
    "AI Research Portfolio",
    "PhD AI Research",
  ],
  authors: [{ name: "Param Pandya" }],
  creator: "Param Pandya",
  publisher: "Param Pandya",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://parampandya.com", // change when you deploy
    title: "Param Pandya | AI/ML Researcher & Software Engineer",
    description:
      "Research portfolio of Param Pandya, focusing on deep learning, NLP, healthcare AI, BioGPT-based systems, and trustworthy AI research.",
    siteName: "Param Pandya | AI Research Portfolio",
  },

  twitter: {
    card: "summary_large_image",
    title: "Param Pandya | AI/ML Researcher",
    description:
      "AI/ML Researcher working on deep learning, NLP, healthcare AI, and generative models. Research portfolio and publications.",
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


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://ibiimemon.com" />
      </head>
      <body
        suppressHydrationWarning
        className={`${poppins.variable} font-sans antialiased`}
      >

        {children}
        <Analytics />
      </body>
    </html>
  );
}
