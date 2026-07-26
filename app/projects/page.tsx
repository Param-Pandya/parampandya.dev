import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "AI & ML Engineering Projects | Param Pandya",
  description:
    "Explore a showcase of AI engineering projects by Param Pandya, detailing real-world problems, neural architectures, benchmark results, and key technical learnings.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "AI & ML Engineering Projects | Param Pandya",
    description:
      "Detailed engineering showcases detailing real-world problems, neural architectures, benchmark results, system challenges, and key technical learnings.",
    type: "website",
    url: "https://parampandya.dev/projects",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI & ML Engineering Projects | Param Pandya",
    description:
      "Detailed engineering showcases detailing real-world problems, neural architectures, benchmark results, system challenges, and key technical learnings.",
  },
};

export default function ProjectsPage(): React.JSX.Element {
  const projectsPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "AI & ML Engineering Projects | Param Pandya",
    "description": "Explore a showcase of AI engineering projects by Param Pandya, detailing real-world problems, neural architectures, benchmark results, and key technical learnings.",
    "url": "https://parampandya.dev/projects"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsPageSchema) }}
      />
      <ProjectsClient />
    </>
  );
}
