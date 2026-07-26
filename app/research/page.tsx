import type { Metadata } from "next";
import ResearchClient from "./ResearchClient";

export const metadata: Metadata = {
  title: "AI Research & Publications | Param Pandya",
  description:
    "Empirical AI research across media forensics, clinical NLP, and computer vision. Peer-reviewed IEEE publications and research internships at IIT Indore and IIT Jammu.",
  alternates: {
    canonical: "/research",
  },
  openGraph: {
    title: "AI Research & Publications | Param Pandya",
    description:
      "Advancing empirical AI research across media forensics, clinical NLP, and computer vision—bridging academic research across IITs with production safety.",
    type: "website",
    url: "https://parampandya.dev/research",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Research & Publications | Param Pandya",
    description:
      "Advancing empirical AI research across media forensics, clinical NLP, and computer vision—bridging academic research across IITs with production safety.",
  },
};

export default function ResearchPage(): React.JSX.Element {
  const researchPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "AI Research & Publications | Param Pandya",
    "description": "Empirical AI research across media forensics, clinical NLP, and computer vision. Peer-reviewed IEEE publications and research internships at IIT Indore and IIT Jammu.",
    "url": "https://parampandya.dev/research"
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    "headline": "Efficient Deepfake Detection using AI",
    "author": {
      "@type": "Person",
      "name": "Param Pandya"
    },
    "publisher": {
      "@type": "Organization",
      "name": "IEEE Xplore"
    },
    "datePublished": "2024",
    "url": "https://ieeexplore.ieee.org/document/10872263",
    "description": "IEEE published spatial-frequency dual-stream neural architecture for facial manipulation detection in lossy video streams."
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(researchPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <ResearchClient />
    </>
  );
}
