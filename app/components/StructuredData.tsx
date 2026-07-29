import Script from "next/script";

export default function StructuredData(): React.JSX.Element {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Param Pandya",
    alternateName: ["Param", "Param P.", "P. Pandya"],
    url: "https://parampandya.dev",
    image: "https://github.com/Param-Pandya.png",
    jobTitle: "Senior AI & ML Research Engineer",
    description: "AI/ML Researcher & Engineer specializing in Deep Learning, NLP, Generative AI, LLM Applications, Computer Vision, and Trustworthy Medical AI.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "India",
    },
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
      {
        "@type": "EducationalOrganization",
        name: "Vellore Institute of Technology (VIT)",
      },
      {
        "@type": "EducationalOrganization",
        name: "Pandit Deendayal Energy University (PDEU)",
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
      "Retrieval Augmented Generation (RAG)",
      "Natural Language Processing (NLP)",
      "MLOps",
      "FastAPI",
      "Hugging Face",
      "LangChain",
      "CUDA",
      "Vector Database",
      "Python",
      "Deep Learning",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Param Pandya Portfolio",
    url: "https://parampandya.dev",
    author: {
      "@type": "Person",
      name: "Param Pandya",
    },
    inLanguage: "en-US",
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
