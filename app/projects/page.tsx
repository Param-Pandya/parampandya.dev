import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "AI & ML Engineering Projects | Param Pandya",
  description:
    "Explore a showcase of AI engineering projects by Param Pandya, detailing real-world problems, neural architectures, benchmark results, and key technical learnings.",
  openGraph: {
    title: "AI & ML Engineering Projects | Param Pandya",
    description:
      "Detailed engineering showcases detailing real-world problems, neural architectures, benchmark results, system challenges, and key technical learnings.",
    type: "website",
    url: "https://parampandya.vercel.app/projects",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI & ML Engineering Projects | Param Pandya",
    description:
      "Detailed engineering showcases detailing real-world problems, neural architectures, benchmark results, system challenges, and key technical learnings.",
  },
};

export default function ProjectsPage(): React.JSX.Element {
  return <ProjectsClient />;
}
