import Image from "next/image";
import Link from "next/link";

interface ExperienceItem {
  id: number;
  role: string;
  organization: string;
  duration: string;
  description: string;
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    role: "Research Intern",
    organization: "IIT Jammu",
    duration: "May - 2023 To July - 2023",
    description:
      "Worked on machine learning and deep learning models with a focus on research-oriented problem solving and experimentation.",
  },
  {
    id: 2,
    role: "Research Intern",
    organization: "IIT Indore",
    duration: "May - 2022 to July - 2022",
    description:
      "Conducted research in AI/ML with emphasis on data analysis, model evaluation, and academic research workflows.",
  },
  {
    id: 3,
    role: "Data Analyst (Machine Learning) Intern",
    organization: "upskillz.in",
    duration: "Aug - 2022 to Oct - 2022",
    description:
      "Applied machine learning techniques for data analysis, preprocessing, and predictive modeling on real-world datasets.",
  },
  {
    id: 4,
    role: "Research Author",
    organization: "IEEE Conference",
    duration: "2024",
    description:
      "Published a research paper on efficient deepfake detection using AI, focusing on model robustness and performance evaluation.",
  },
];

export default function Experience(): React.JSX.Element {
  return (
    <section id="experience" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-12 text-center">
          Experience
        </h2>

        <div className="space-y-6">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-gradient-to-r from-slate-950 via-purple-950 to-slate-950 rounded-xl p-6 border-l-4 border-purple-600"
            >
              <h3 className="text-xl font-semibold text-white">
                {exp.role}
              </h3>
              <p className="text-purple-400 font-medium">
                {exp.organization} • {exp.duration}
              </p>
              <p className="text-white/70 mt-2">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

