import type { Metadata } from "next";
import AnalyticsClient from "./AnalyticsClient";

export const metadata: Metadata = {
  title: "GitHub Contribution Analytics | Param Pandya",
  description:
    "Live statistics, language distribution breakdown, and contribution metrics for Param Pandya's GitHub profile.",
  alternates: {
    canonical: "/analytics",
  },
  openGraph: {
    title: "GitHub Contribution Analytics | Param Pandya",
    description:
      "Live statistics, language distribution breakdown, and contribution metrics for Param Pandya's GitHub profile.",
    type: "website",
    url: "https://parampandya.dev/analytics",
  },
  twitter: {
    card: "summary_large_image",
    title: "GitHub Contribution Analytics | Param Pandya",
    description:
      "Live statistics, language distribution breakdown, and contribution metrics for Param Pandya's GitHub profile.",
  },
};

export default function AnalyticsPage(): React.JSX.Element {
  const analyticsPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "GitHub Contribution Analytics | Param Pandya",
    "description": "Live statistics, language distribution breakdown, and contribution metrics for Param Pandya's GitHub profile.",
    "url": "https://parampandya.dev/analytics"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(analyticsPageSchema) }}
      />
      <AnalyticsClient />
    </>
  );
}
