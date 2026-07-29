import type { Metadata } from "next";
import PlaygroundClient from "./PlaygroundClient";

export const metadata: Metadata = {
  title: "Interactive AI Demo Playground | Param Pandya",
  description:
    "Test live demonstrations of Param Pandya's AI models, including Spatial-Frequency Deepfake Detection, BioGPT Medical AI, Sentiment Analysis NLP, and Vision Transformers.",
  alternates: {
    canonical: "/playground",
  },
  openGraph: {
    title: "Interactive AI Demo Playground | Param Pandya",
    description:
      "Interact with lightweight live demonstrations of Param's AI research models: Deepfake Forensics, BioGPT Medical AI, Sentiment NLP, Vision Classification, and LLM Agents.",
    type: "website",
    url: "https://parampandya.dev/playground",
    siteName: "Param Pandya | AI Research & Engineering",
    locale: "en_US",
    images: [
      {
        url: "/assets/me-about.jpg",
        width: 1200,
        height: 1200,
        alt: "Param Pandya AI Playground",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Interactive AI Demo Playground | Param Pandya",
    description:
      "Interact with lightweight live demonstrations of Param's AI research models: Deepfake Forensics, BioGPT Medical AI, Sentiment NLP, Vision Classification, and LLM Agents.",
    creator: "@parampandya",
    images: ["/assets/me-about.jpg"],
  },
};

export default function PlaygroundPage(): React.JSX.Element {
  const playgroundPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Interactive AI Demo Playground | Param Pandya",
    "description": "Test live demonstrations of Param Pandya's AI models, including Spatial-Frequency Deepfake Detection, BioGPT Medical AI, Sentiment Analysis NLP, and Vision Transformers.",
    "url": "https://parampandya.dev/playground"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(playgroundPageSchema) }}
      />
      <PlaygroundClient />
    </>
  );
}
