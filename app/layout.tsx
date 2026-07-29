import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import ClarityAnalytics from "./components/ClarityAnalytics";
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
  metadataBase: new URL("https://parampandya.dev"),
  alternates: {
    canonical: "/",
  },
  applicationName: "Param Pandya Portfolio",
  title: {
    default: "Param Pandya | Senior AI & ML Research Engineer",
    template: "%s | Param Pandya",
  },
  description:
    "AI/ML Researcher & Engineer specializing in Deep Learning, NLP, Generative AI, LLM Applications, Computer Vision, and Trustworthy Medical AI. Portfolio of Param Pandya, AI Engineer & Machine Learning Engineer based in India.",
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
    "Param",
    "Param P.",
    "P. Pandya",
    "Param Pandya Portfolio",
    "Param Pandya AI Engineer",
    "Param Pandya Machine Learning Engineer",
    "Param Pandya Software Engineer",
    "AI Engineer",
    "Machine Learning Engineer",
    "Artificial Intelligence",
    "Machine Learning",
    "Large Language Models",
    "LLM",
    "LLM Engineer",
    "AI Developer",
    "AI Research",
    "AI Portfolio",
    "AI Systems",
    "AI Applications",
    "AI Infrastructure",
    "Prompt Engineering",
    "Retrieval Augmented Generation",
    "RAG",
    "NLP",
    "Natural Language Processing",
    "Medical AI",
    "Sentiment Analysis",
    "Recommendation Systems",
    "Neural Networks",
    "Transformer Models",
    "AI Chatbot",
    "Vector Database",
    "Data Science",
    "MLOps",
    "Python",
    "Python Developer",
    "Backend Developer",
    "FastAPI",
    "Django",
    "PyTorch",
    "TensorFlow",
    "Hugging Face",
    "LangChain",
    "Docker",
    "CUDA",
    "ONNX",
    "TensorRT",
    "Linux",
    "Git",
    "GitHub",
    "India",
    "Gujarat",
    "Ahmedabad",
    "Bengaluru",
    "Benglore",
    "Hyderabad",
    "Delhi",
    "Noida",
    "Gurugram",
  ],
  authors: [{ name: "Param Pandya", url: "https://parampandya.dev" }],
  creator: "Param Pandya",
  publisher: "Param Pandya",
  category: "technology",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://parampandya.dev",
    title: "Param Pandya | Senior AI & ML Research Engineer",
    description:
      "Research portfolio of Param Pandya — AI/ML Engineer specializing in Generative AI, LLMs, Computer Vision, and Healthcare AI.",
    siteName: "Param Pandya | AI Research & Engineering",
    images: [
      {
        url: "/assets/me-about.jpg",
        width: 1200,
        height: 1200,
        alt: "Param Pandya - Senior AI & ML Research Engineer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Param Pandya | AI & ML Research Engineer",
    description:
      "AI/ML Engineer specializing in Deep Learning, Generative AI, Computer Vision, and Trustworthy Medical AI.",
    creator: "@parampandya",
    site: "@parampandya",
    images: ["/assets/me-about.jpg"],
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
        <ClarityAnalytics />
        <GoogleAnalytics gaId="G-6BBHD9K0L0" />
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
