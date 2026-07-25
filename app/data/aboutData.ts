export interface EducationItem {
  fieldOfStudy: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  details: string[];
}

export interface WhoIAmCard {
  title: string;
  role: string;
  tagline: string;
  keySpecializations: string[];
  location: string;
}

export interface JourneyMilestone {
  step: string;
  title: string;
  period: string;
  institution: string;
  description: string;
  highlight: string;
}

export const educationData: EducationItem[] = [
  {
    fieldOfStudy: "Computer Science & Engineering",
    degree: "Master of Technology (M.Tech)",
    institution: "Vellore Institute of Technology (VIT)",
    location: "Vellore, Tamil Nadu",
    period: "2024 – 2026",
    details: [
      "CGPA: 8.06",
      "Focus: Machine Learning, Computer Vision, Generative AI",
    ],
  },
  {
    fieldOfStudy: "Information & Communication Technology",
    degree: "Bachelor of Technology (B.Tech)",
    institution: "Pandit Deendayal Energy University (PDEU)",
    location: "Gandhinagar, Gujarat",
    period: "2021 – 2024",
    details: [
      "CGPA: 7.72",
      "Focus: Software Engineering, Machine Learning, Data Structures",
    ],
  },
  {
    fieldOfStudy: "Information Technology",
    degree: "Diploma in Engineering",
    institution: "Gujarat Technological University (GTU)",
    location: "Bhavnagar, Gujarat",
    period: "2018 – 2021",
    details: [
      "CGPA: 8.06",
      "Focus: Programming Fundamentals, Database Systems",
    ],
  },
];

export const whoIAmData: WhoIAmCard = {
  title: "Param Pandya",
  role: "AI Engineer • Machine Learning Engineer",
  tagline:
    "Specializing in Machine Learning, RAG applications, AI Agents, and Computer Vision.",
  keySpecializations: [
    "Machine Learning & Data Pipelines",
    "RAG & Multi-Agent AI Workflows",
    "Deepfake Detection & Computer Vision",
    "Adversarial Robustness & Evaluation",
  ],
  location: "India • Open to AI Engineering Roles",
};

export const journeyData: JourneyMilestone[] = [
  {
    step: "01",
    title: "Software Development Instructor",
    period: "Apr 2026 – Jun 2026",
    institution: "NxtWave Disruptive Technologies Private Limited",
    description:
      "Mentored learners in Python, Machine Learning, SQL, and Generative AI while building and debugging AI applications.",
    highlight: "Generative AI & Agent Workflows",
  },
  {
    step: "02",
    title: "Research Intern",
    period: "May 2023 – July 2023",
    institution: "Indian Institute of Technology Jammu",
    description:
      "Developed TensorFlow biometric models, reducing adversarial attack success rate by 40% via automated FGSM/PGD benchmarking.",
    highlight: "Adversarial Robustness Benchmarking",
  },
  {
    step: "03",
    title: "ML Intern",
    period: "Aug 2022 – Oct 2022",
    institution: "Upskillz.in",
    description:
      "Developed a personalized recommender system using Python and Apache Mahout, improving user engagement by 16%.",
    highlight: "Recommender Systems & EDA",
  },
  {
    step: "04",
    title: "Research Intern",
    period: "May 2022 – July 2022",
    institution: "Indian Institute of Technology Indore",
    description:
      "Designed FGSM and PGD defense pipelines, improving neural model robustness against adversarial attacks by 25–30%.",
    highlight: "Adversarial Training & Attack Simulation",
  },
];

export const personalStoryData = {
  heading: "Background & Journey",
  storyParagraphs: [
    "My interest in artificial intelligence started with a fairly basic question: how do you get software to move past just following instructions and actually make decisions on its own? Programming came first, and the pull toward machine learning, deep learning, and building systems that could handle real problems grew out of that. Since then I've picked up hands-on experience across computer vision, natural language processing, large language models, healthcare AI, and the software engineering that ties all of it together.",
    "The research internships I did at IIT Indore and IIT Jammu were where I first got exposed to research-driven problem solving and current deep learning techniques. What stuck with me most was learning that training a model well is only part of the job. The harder part is the experimentation, reproducibility, and critical analysis that has to happen around it. Those internships shaped how I still approach engineering problems: understand what's actually being asked, test ideas before trusting them, and aim for something practical rather than something that only works on paper.",
    "That research work eventually led to an IEEE conference paper on deepfake detection, which pushed me further into applied AI research. Working on a published project meant designing experiments, evaluating models, analyzing what the results actually showed, and writing all of it up in a way that someone else could reproduce. It also convinced me that good AI work needs both a solid research foundation and engineering that's been thought through, not just one or the other.",
    "Outside of research, most of my energy goes into building AI applications that solve actual problems rather than staying theoretical. I've worked on projects in healthcare AI, computer vision, multilingual NLP, recommendation systems, and large language model applications, and through those I've gotten better at designing end-to-end workflows, working with current AI frameworks, and building software with usability, scalability, and maintainability in mind from the start.",
    "Right now I'm mostly focused on retrieval-augmented generation, AI agents, and multi-agent systems — how these systems retrieve knowledge, reason through multi-step tasks, coordinate with each other, and fit into real software rather than staying as standalone demos. As the field keeps shifting, my aim is to keep building AI systems that are practical and reliable enough for production, while staying involved in the AI community and continuing to grow as an engineer.",
  ],
};
