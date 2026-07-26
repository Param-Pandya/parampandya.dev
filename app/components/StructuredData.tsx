import Script from "next/script";

export default function StructuredData(): React.JSX.Element {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Param Pandya",
    url: "https://parampandya.dev",
    image: "https://github.com/Param-Pandya.png",
    jobTitle: "Senior AI & ML Research Engineer",
    worksFor: {
      "@type": "Organization",
      name: "AI Research & Engineering",
    },
    almaMater: [
      {
        "@type": "EducationalOrganization",
        name: "IIT Jammu (Research Intern)",
      },
      {
        "@type": "EducationalOrganization",
        name: "IIT Indore (Research Intern)",
      },
    ],
    sameAs: [
      "https://github.com/Param-Pandya",
      "https://www.linkedin.com/in/parampandya/",
      "https://www.instagram.com/p.aaraam/",
      "https://ieeexplore.ieee.org/document/10872263",
    ],
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Generative AI",
      "LLM Applications",
      "Computer Vision",
      "Deepfake Detection",
      "BioGPT Medical AI",
      "PyTorch",
      "TensorFlow",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Param Pandya Portfolio",
    url: "https://parampandya.dev",
  };

  return (
    <>
      <Script
        id="person-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Script
        id="website-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
