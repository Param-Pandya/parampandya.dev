import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import ScrollProgress from "./components/ScrollProgress";
import CustomCursor from "./components/CustomCursor";
import StructuredData from "./components/StructuredData";
import { ThemeProvider } from "./components/ThemeProvider";

import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  });

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://parampandya.vercel.app"),
  alternates: {
    canonical: "./",
  },
  title: {
    default: "Param Pandya | Senior AI & ML Research Engineer",
    template: "%s | Param Pandya",
  },
  description:
    "AI/ML Researcher & Engineer specializing in Deep Learning, NLP, Generative AI, LLM Applications, Computer Vision, and Trustworthy Medical AI.",
  keywords: [
    "Param Pandya",
    "AI Research Engineer",
    "Machine Learning Specialist",
    "Generative AI",
    "LLM Applications",
    "Computer Vision",
    "Deep Learning",
    "Healthcare AI",
    "BioGPT",
    "PneuSTACK",
    "Deepfake Detection",
    "IEEE Research",
    "Theme Switcher",
  ],
  authors: [{ name: "Param Pandya" }],
  creator: "Param Pandya",
  publisher: "Param Pandya",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://parampandya.vercel.app",
    title: "Param Pandya | Senior AI & ML Research Engineer",
    description:
      "Research portfolio of Param Pandya — AI/ML Engineer specializing in Generative AI, LLMs, Computer Vision, and Healthcare AI.",
    siteName: "Param Pandya | AI Research & Engineering",
  },

  twitter: {
    card: "summary_large_image",
    title: "Param Pandya | AI & ML Research Engineer",
    description:
      "AI/ML Engineer specializing in Deep Learning, Generative AI, Computer Vision, and Trustworthy Medical AI.",
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var theme = saved || 'dark';
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${plusJakartaSans.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground selection:bg-blue-500/30 selection:text-blue-200`}
      >
        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6BBHD9K0L0"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-6BBHD9K0L0');
          `}
        </Script>
        <ThemeProvider>
          <ScrollProgress />
          <CustomCursor />
          <StructuredData />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
