export interface LanguageDistribution {
  name: string;
  percentage: number;
  color: string;
  bytesFormatted: string;
}

export interface PinnedRepo {
  id: string;
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  languageColor: string;
  url: string;
  updatedAt: string;
}

export interface CommitFeedItem {
  id: string;
  hash: string;
  message: string;
  repoName: string;
  timeAgo: string;
  url: string;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4; // 0 = none, 4 = heavy
}

export const githubProfile = {
  username: "Param-Pandya",
  name: "Param Pandya",
  profileUrl: "https://github.com/Param-Pandya",
  avatarUrl: "https://github.com/Param-Pandya.png",
  bio: "AI Engineer • Machine Learning Engineer • Generative AI Developer",
  followers: 48,
  following: 32,
  totalRepos: 24,
  totalStars: 52,
  totalForks: 18,
  totalContributionsThisYear: 1248,
  currentStreakDays: 14,
  longestStreakDays: 42,
};

export const languageDistribution: LanguageDistribution[] = [
  { name: "Python", percentage: 58, color: "#3776AB", bytesFormatted: "1.4 MB" },
  { name: "TypeScript", percentage: 18, color: "#3178C6", bytesFormatted: "450 KB" },
  { name: "C++", percentage: 12, color: "#00599C", bytesFormatted: "310 KB" },
  { name: "SQL", percentage: 8, color: "#336791", bytesFormatted: "190 KB" },
  { name: "HTML/CSS", percentage: 4, color: "#E34F26", bytesFormatted: "100 KB" },
];

export const pinnedRepos: PinnedRepo[] = [
  {
    id: "deepfake-ai",
    name: "Deepfake-Detection-AI",
    description:
      "IEEE 2024 published spatial-frequency dual-stream neural architecture for facial manipulation detection in lossy video streams.",
    stars: 28,
    forks: 9,
    language: "Python",
    languageColor: "#3776AB",
    url: "https://github.com/Param-Pandya/Deepfake-Detection-AI",
    updatedAt: "2 days ago",
  },
  {
    id: "biogpt-clinical",
    name: "BioGPT-Clinical-Prescription",
    description:
      "Domain-adapted Microsoft BioGPT fine-tuning for clinical prescription synthesis with SNOMED CT & FDA safety verification.",
    stars: 16,
    forks: 5,
    language: "Python",
    languageColor: "#3776AB",
    url: "https://github.com/Param-Pandya",
    updatedAt: "1 week ago",
  },
  {
    id: "pneustack-vit",
    name: "PneuSTACK-Vision-Transformer",
    description:
      "Multi-class pneumonia diagnosis combining CNN base models, Vision Transformers (ViT), and XGBoost stacking meta-learners.",
    stars: 12,
    forks: 3,
    language: "Python",
    languageColor: "#3776AB",
    url: "https://github.com/Param-Pandya",
    updatedAt: "2 weeks ago",
  },
  {
    id: "ai-portfolio",
    name: "AI-Research-Portfolio",
    description:
      "Senior AI Engineer portfolio featuring interactive model playgrounds, canvas neural graphs, and peer-reviewed case study showcases.",
    stars: 8,
    forks: 2,
    language: "TypeScript",
    languageColor: "#3178C6",
    url: "https://github.com/Param-Pandya",
    updatedAt: "Just now",
  },
];

export const recentCommits: CommitFeedItem[] = [
  {
    id: "c-1",
    hash: "f8a91b2",
    message: "feat(deepfake): add Discrete Cosine Transform 2D spectral energy map calculation",
    repoName: "Deepfake-Detection-AI",
    timeAgo: "2 hours ago",
    url: "https://github.com/Param-Pandya",
  },
  {
    id: "c-2",
    hash: "c3d4e5f",
    message: "refactor(biogpt): enforce SNOMED CT ontology constraint validation",
    repoName: "BioGPT-Clinical-Prescription",
    timeAgo: "1 day ago",
    url: "https://github.com/Param-Pandya",
  },
  {
    id: "c-3",
    hash: "a7b8c9d",
    message: "docs(pneustack): update Vision Transformer diagnostic benchmark results",
    repoName: "PneuSTACK-Vision-Transformer",
    timeAgo: "3 days ago",
    url: "https://github.com/Param-Pandya",
  },
  {
    id: "c-4",
    hash: "e1f2a3b",
    message: "perf(vllm): enable 8-bit quantization for TensorRT inference server",
    repoName: "Deepfake-Detection-AI",
    timeAgo: "5 days ago",
    url: "https://github.com/Param-Pandya",
  },
  {
    id: "c-5",
    hash: "9b8a7c6",
    message: "feat(canvas): add synaptic network visualization graph for tech ecosystem",
    repoName: "AI-Research-Portfolio",
    timeAgo: "1 week ago",
    url: "https://github.com/Param-Pandya",
  },
];

// Generate 52 weeks x 7 days = 364 contribution cells with realistic density
export function generateContributionMatrix(): ContributionDay[][] {
  const matrix: ContributionDay[][] = [];
  const today = new Date("2024-07-21");

  for (let week = 51; week >= 0; week--) {
    const weekDays: ContributionDay[] = [];
    for (let day = 0; day < 7; day++) {
      const d = new Date(today);
      d.setDate(d.getDate() - (week * 7 + (6 - day)));
      const dateStr = d.toISOString().split("T")[0];

      // Simulated commit frequency pattern
      const pseudoRand = (week * 7 + day * 13) % 17;
      let count = 0;
      let level: 0 | 1 | 2 | 3 | 4 = 0;

      if (pseudoRand > 4) {
        count = (pseudoRand % 8) + 1;
        if (count > 6) level = 4;
        else if (count > 4) level = 3;
        else if (count > 2) level = 2;
        else level = 1;
      }

      weekDays.push({ date: dateStr, count, level });
    }
    matrix.push(weekDays);
  }

  return matrix;
}
