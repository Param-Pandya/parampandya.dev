import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Param Pandya | Senior AI & ML Research Engineer",
    short_name: "Param Pandya",
    description:
      "AI/ML Researcher & Engineer specializing in Deep Learning, NLP, Generative AI, LLM Applications, Computer Vision, and Trustworthy Medical AI.",
    start_url: "/",
    display: "standalone",
    background_color: "#090d16",
    theme_color: "#6366f1",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
