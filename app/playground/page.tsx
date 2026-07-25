import type { Metadata } from "next";
import PlaygroundClient from "./PlaygroundClient";

export const metadata: Metadata = {
  title: "Interactive AI Demo Playground | Param Pandya",
  description:
    "Test live demonstrations of Param Pandya's AI models, including Spatial-Frequency Deepfake Detection, BioGPT Medical AI, Sentiment Analysis NLP, and Vision Transformers.",
  openGraph: {
    title: "Interactive AI Demo Playground | Param Pandya",
    description:
      "Interact with lightweight live demonstrations of Param's AI research models: Deepfake Forensics, BioGPT Medical AI, Sentiment NLP, Vision Classification, and LLM Agents.",
    type: "website",
    url: "https://parampandya.vercel.app/playground",
  },
  twitter: {
    card: "summary_large_image",
    title: "Interactive AI Demo Playground | Param Pandya",
    description:
      "Interact with lightweight live demonstrations of Param's AI research models: Deepfake Forensics, BioGPT Medical AI, Sentiment NLP, Vision Classification, and LLM Agents.",
  },
};

export default function PlaygroundPage(): React.JSX.Element {
  return <PlaygroundClient />;
}
