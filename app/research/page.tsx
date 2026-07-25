import type { Metadata } from "next";
import ResearchClient from "./ResearchClient";

export const metadata: Metadata = {
  title: "AI Research & Publications | Param Pandya",
  description:
    "Empirical AI research across media forensics, clinical NLP, and computer vision. Peer-reviewed IEEE publications and research internships at IIT Indore and IIT Jammu.",
  openGraph: {
    title: "AI Research & Publications | Param Pandya",
    description:
      "Advancing empirical AI research across media forensics, clinical NLP, and computer vision—bridging academic research across IITs with production safety.",
    type: "website",
    url: "https://parampandya.vercel.app/research",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Research & Publications | Param Pandya",
    description:
      "Advancing empirical AI research across media forensics, clinical NLP, and computer vision—bridging academic research across IITs with production safety.",
  },
};

export default function ResearchPage(): React.JSX.Element {
  return <ResearchClient />;
}
