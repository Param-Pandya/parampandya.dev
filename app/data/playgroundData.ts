export interface SentimentSample {
  text: string;
  label: "POSITIVE" | "NEUTRAL" | "NEGATIVE";
  score: number; // 0 to 1
  emotions: { joy: number; confidence: number; concern: number; urgency: number };
}

export interface DeepfakeSample {
  id: string;
  name: string;
  thumbnail: string;
  isDeepfake: boolean;
  deepfakeProbability: number; // 0 to 100
  compressionLevel: string;
  spatialArtifacts: string[];
  spectralDCTEnergy: string;
}

export interface MedicalSample {
  id: string;
  clinicalNote: string;
  diagnosis: string;
  medication: string;
  dosage: string;
  snomedCode: string;
  fdaSafetyCheck: "Passed (0 Conflicts)" | "Warning (Check Liver Function)";
}

export interface ImageClassificationSample {
  id: string;
  name: string;
  image: string;
  classes: Array<{ label: string; probability: number }>;
  topClass: string;
  gradCamFocus: string;
}

export const sentimentPresets: SentimentSample[] = [
  {
    text: "The new spatial-frequency deepfake detection model achieved an astounding 96.4% precision on compressed video streams!",
    label: "POSITIVE",
    score: 0.984,
    emotions: { joy: 92, confidence: 96, concern: 4, urgency: 10 },
  },
  {
    text: "Initial baseline loss curves fluctuated due to learning rate decay issues, but post-ablation tuning stabilized gradient flow.",
    label: "NEUTRAL",
    score: 0.72,
    emotions: { joy: 45, confidence: 82, concern: 30, urgency: 15 },
  },
  {
    text: "Generative deepfake media manipulations present an alarming threat to public media verification and digital identity safety.",
    label: "NEGATIVE",
    score: 0.91,
    emotions: { joy: 5, confidence: 90, concern: 94, urgency: 88 },
  },
];

export const deepfakeSamples: DeepfakeSample[] = [
  {
    id: "sample-1",
    name: "Synthetic Facial Swap Frame #142",
    thumbnail: "/projects/deepfake.png",
    isDeepfake: true,
    deepfakeProbability: 94.8,
    compressionLevel: "H.264 High Compression",
    spatialArtifacts: [
      "Unnatural eye-blink frequency disparity",
      "Frequency DCT spectral boundary discontinuity",
      "Facial boundary blending blur detected",
    ],
    spectralDCTEnergy: "High-frequency Energy Anomaly in DCT 8x8 block",
  },
  {
    id: "sample-2",
    name: "Authentic Unedited Video Frame #089",
    thumbnail: "/projects/biogpt.png",
    isDeepfake: false,
    deepfakeProbability: 2.1,
    compressionLevel: "Uncompressed Lossless PNG",
    spatialArtifacts: ["Natural skin pore texture continuity", "Normal specular reflection pupil highlights"],
    spectralDCTEnergy: "Standard Natural Frequency Falloff Profile",
  },
];

export const medicalPresets: MedicalSample[] = [
  {
    id: "med-1",
    clinicalNote:
      "28-year-old patient presents with acute productive cough, high fever (102°F), and right-sided pleuritic chest pain for 3 days. Chest X-ray shows right lower lobe consolidation.",
    diagnosis: "Community-Acquired Bacterial Pneumonia",
    medication: "Amoxicillin-Clavulanate 875/125 mg",
    dosage: "1 tablet orally twice daily for 7 days",
    snomedCode: "SNOMED CT: 385093006 (Bacterial Pneumonia)",
    fdaSafetyCheck: "Passed (0 Conflicts)",
  },
  {
    id: "med-2",
    clinicalNote:
      "45-year-old patient reporting persistent allergic rhinitis, nasal congestion, and mild seasonal bronchial spasm.",
    diagnosis: "Allergic Rhinitis & Mild Asthma",
    medication: "Cetirizine HCI 10 mg & Fluticasone Propionate Nasal Spray",
    dosage: "10 mg tablet daily at bedtime; 2 sprays per nostril daily",
    snomedCode: "SNOMED CT: 61582004 (Allergic Rhinitis)",
    fdaSafetyCheck: "Passed (0 Conflicts)",
  },
];

export const imageClassificationSamples: ImageClassificationSample[] = [
  {
    id: "img-1",
    name: "Chest X-Ray Diagnostic Scan",
    image: "/projects/pneustack.png",
    topClass: "Viral Pneumonia",
    classes: [
      { label: "Viral Pneumonia", probability: 94.2 },
      { label: "Bacterial Pneumonia", probability: 4.1 },
      { label: "Normal Lung Radiograph", probability: 1.7 },
    ],
    gradCamFocus: "Right lower lobe interstitial infiltrates and peribronchial thickening highlighted.",
  },
  {
    id: "img-2",
    name: "Facial Landmark Forensic Crop",
    image: "/projects/deepfake.png",
    topClass: "Manipulated Deepfake",
    classes: [
      { label: "Manipulated Deepfake", probability: 96.4 },
      { label: "Authentic Live Media", probability: 3.6 },
    ],
    gradCamFocus: "Periorbital spatial boundary blur and color space mismatch attention head focus.",
  },
];

export const textGenPresets = [
  {
    label: "Explain Vision Transformers (ViT)",
    prompt: "Explain how Vision Transformers (ViT) divide images into non-overlapping patches for self-attention computation.",
    output:
      "Vision Transformers (ViT) revolutionize computer vision by discarding convolution operators. An image X ∈ R^(H×W×C) is flattened into a sequence of 2D patches x_p ∈ R^(N×(P^2·C)), where (P,P) is the patch resolution and N = (HW)/P^2 is the effective sequence length. These patches pass through linear projection layers, receive learnable 1D positional embeddings, and feed directly into standard Transformer encoder self-attention heads.",
  },
  {
    label: "Explain Parameter-Efficient Fine-Tuning (LoRA)",
    prompt: "Summarize how Low-Rank Adaptation (LoRA) accelerates LLM fine-tuning while reducing VRAM memory requirements.",
    output:
      "Low-Rank Adaptation (LoRA) freezes the base model weights W₀ and injects low-rank trainable decomposition matrices A and B. Instead of updating 70B parameters, LoRA only updates W = W₀ + (α/r)·(B × A) where rank r « d. This reduces trainable parameters by 99.9% and allows fine-tuning large models on single 24GB GPUs without performance degradation.",
  },
];

export const chatbotPresets = [
  "What is Param's research background?",
  "Tell me about the IEEE 2024 Deepfake paper.",
  "What technologies are in Param's AI stack?",
  "How does the BioGPT Medical AI system work?",
];
