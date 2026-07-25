"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Cpu,
  ShieldAlert,
  FileText,
  Activity,
  Zap,
  Sliders,
  Send,
  RefreshCw,
  Sparkles,
  BarChart3,
  Layers,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import {
  sentimentPresets,
  deepfakeSamples,
  medicalPresets,
  imageClassificationSamples,
  textGenPresets,
  chatbotPresets,
  SentimentSample,
  DeepfakeSample,
  MedicalSample,
  ImageClassificationSample,
} from "../data/playgroundData";

export type PlaygroundTab =
  | "sentiment"
  | "deepfake"
  | "medical"
  | "classification"
  | "generation"
  | "chatbot";

export default function PlaygroundClient(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<PlaygroundTab>("sentiment");

  // DEMO 1: Sentiment Analysis State
  const [sentimentInput, setSentimentInput] = useState(sentimentPresets[0].text);
  const [currentSentimentResult, setCurrentSentimentResult] = useState<SentimentSample>(sentimentPresets[0]);
  const [isAnalyzingSentiment, setIsAnalyzingSentiment] = useState(false);

  // DEMO 2: Deepfake Detection State
  const [selectedDeepfake, setSelectedDeepfake] = useState<DeepfakeSample>(deepfakeSamples[0]);
  const [showSpectralHeatmap, setShowSpectralHeatmap] = useState(false);

  // DEMO 3: Medical Prescription State
  const [medicalInput, setMedicalInput] = useState(medicalPresets[0].clinicalNote);
  const [currentMedicalResult, setCurrentMedicalResult] = useState<MedicalSample>(medicalPresets[0]);
  const [isGeneratingPrescription, setIsGeneratingPrescription] = useState(false);

  // DEMO 4: Image Classification State
  const [selectedImageSample, setSelectedImageSample] = useState<ImageClassificationSample>(imageClassificationSamples[0]);
  const [showGradCam, setShowGradCam] = useState(true);

  // DEMO 5: LLM Text Gen State
  const [textGenPrompt, setTextGenPrompt] = useState(textGenPresets[0].prompt);
  const [generatedText, setGeneratedText] = useState(textGenPresets[0].output);
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(256);
  const [isStreamingText, setIsStreamingText] = useState(false);

  // DEMO 6: Chatbot State
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "bot"; text: string }>>([
    {
      sender: "bot",
      text: "Hello! I am Param Pandya's AI Research Assistant. Ask me anything about Param's IEEE 2024 Deepfake paper, IIT internships, PyTorch architectures, or Generative AI research!",
    },
  ]);
  const [chatInput, setChatInput] = useState("");

  // Handler: Analyze Sentiment
  const handleAnalyzeSentiment = (textToAnalyze: string) => {
    setIsAnalyzingSentiment(true);
    setSentimentInput(textToAnalyze);
    setTimeout(() => {
      const matched = sentimentPresets.find((p) => p.text === textToAnalyze);
      if (matched) {
        setCurrentSentimentResult(matched);
      } else {
        const isNeg = textToAnalyze.toLowerCase().includes("threat") || textToAnalyze.toLowerCase().includes("fail");
        setCurrentSentimentResult({
          text: textToAnalyze,
          label: isNeg ? "NEGATIVE" : "POSITIVE",
          score: 0.94,
          emotions: { joy: isNeg ? 10 : 85, confidence: 92, concern: isNeg ? 88 : 12, urgency: isNeg ? 75 : 10 },
        });
      }
      setIsAnalyzingSentiment(false);
    }, 400);
  };

  // Handler: Generate Medical Prescription
  const handleGeneratePrescription = (note: string) => {
    setIsGeneratingPrescription(true);
    setMedicalInput(note);
    setTimeout(() => {
      const matched = medicalPresets.find((m) => m.clinicalNote === note);
      if (matched) {
        setCurrentMedicalResult(matched);
      } else {
        setCurrentMedicalResult({
          id: "custom",
          clinicalNote: note,
          diagnosis: "Clinical Assessment In Progress",
          medication: "Empirical Broad-Spectrum Therapy",
          dosage: "1 dose daily under medical supervision",
          snomedCode: "SNOMED CT: 410605003",
          fdaSafetyCheck: "Passed (0 Conflicts)",
        });
      }
      setIsGeneratingPrescription(false);
    }, 500);
  };

  // Handler: Stream Text Generation
  const handleGenerateText = (prompt: string) => {
    setIsStreamingText(true);
    setTextGenPrompt(prompt);
    const preset = textGenPresets.find((p) => p.prompt === prompt);
    const fullText = preset ? preset.output : `Generating output for prompt: "${prompt}"... Vision Transformers and Deep Learning models optimize stochastic gradients via backpropagation.`;
    setGeneratedText("");

    let i = 0;
    const interval = setInterval(() => {
      setGeneratedText((prev) => prev + fullText.charAt(i));
      i++;
      if (i >= fullText.length) {
        clearInterval(interval);
        setIsStreamingText(false);
      }
    }, 15);
  };

  // Handler: Send Chat Message
  const handleSendChat = (messageText: string) => {
    if (!messageText.trim()) return;

    const newMessages = [...chatMessages, { sender: "user" as const, text: messageText }];
    setChatMessages(newMessages);
    setChatInput("");

    setTimeout(() => {
      let botResponse = "Param specializes in Artificial Intelligence, Machine Learning, Generative AI, LLM Applications, and Computer Vision. His paper on Deepfake Detection was published in IEEE Xplore 2024!";
      const q = messageText.toLowerCase();

      if (q.includes("ieee") || q.includes("deepfake") || q.includes("paper")) {
        botResponse = "Param's research paper 'Efficient Deepfake Detection using AI' was published in IEEE Xplore (2024). It uses a dual-stream spatial-frequency neural network combining spatial ResNet features with Discrete Cosine Transform (DCT) maps!";
      } else if (q.includes("iit") || q.includes("internship")) {
        botResponse = "Param completed two competitive academic research internships at IIT Jammu (2023) and IIT Indore (2022), focusing on PyTorch deep learning architectures, OpenCV image processing, and statistical feature engineering.";
      } else if (q.includes("biogpt") || q.includes("medical")) {
        botResponse = "Param's BioGPT system fine-tunes Microsoft BioGPT for automated clinical prescription generation, enforcing SNOMED CT terminology and zero FDA contraindication hallucination rates.";
      } else if (q.includes("stack") || q.includes("technology") || q.includes("tech")) {
        botResponse = "Param's technical stack includes Python, PyTorch, TensorFlow, OpenCV, BioGPT, LangChain/LangGraph, FastAPI, Docker, TensorRT, Pinecone, and Neo4j.";
      }

      setChatMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
    }, 400);
  };

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-blue-500/30 selection:text-blue-200">
      <Header />

      {/* Hero Header Section */}
      <section className="pt-34 pb-10 px-4 sm:px-6 relative bg-radial-glow">
        <div className="container mx-auto max-w-6xl relative z-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-4">
            <Cpu className="w-3.5 h-3.5" /> INTERACTIVE MODEL PLAYGROUND & DASHBOARD
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            AI Model Inference Playground
          </h1>

          <p className="text-slate-300 text-sm sm:text-lg max-w-2xl leading-relaxed mb-6">
            Interact with lightweight live demonstrations of Param&apos;s AI research models: Deepfake Forensics, BioGPT Medical AI, Sentiment NLP, Vision Classification, and LLM Agents.
          </p>

          {/* System Telemetry Status Bar */}
          <div className="glass-card rounded-2xl p-4 border border-white/10 w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <div>
                <div className="text-slate-500 text-[10px]">MODEL ENGINE</div>
                <div className="font-semibold text-white">Online (TensorRT)</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-400" />
              <div>
                <div className="text-slate-500 text-[10px]">AVG LATENCY</div>
                <div className="font-semibold text-white">14.2 ms / request</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <div>
                <div className="text-slate-500 text-[10px]">GPU HARDWARE</div>
                <div className="font-semibold text-white">NVIDIA A10G (FP16)</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <div>
                <div className="text-slate-500 text-[10px]">SAFETY GUARDRAILS</div>
                <div className="font-semibold text-white">Active (FDA Rules)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Playground Dashboard Area */}
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 pb-28 space-y-8">
        {/* Dashboard Tab Navigation Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-2 rounded-2xl bg-white/[0.03] border border-white/10">
          <button
            onClick={() => setActiveTab("sentiment")}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 ${
              activeTab === "sentiment"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 font-semibold"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-cyan-300" />
            <span>1. Sentiment Analysis</span>
          </button>

          <button
            onClick={() => setActiveTab("deepfake")}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 ${
              activeTab === "deepfake"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 font-semibold"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            <span>2. Deepfake Forensics</span>
          </button>

          <button
            onClick={() => setActiveTab("medical")}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 ${
              activeTab === "medical"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 font-semibold"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span>3. BioGPT Medical AI</span>
          </button>

          <button
            onClick={() => setActiveTab("classification")}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 ${
              activeTab === "classification"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 font-semibold"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-violet-400" />
            <span>4. Image Classification</span>
          </button>

          <button
            onClick={() => setActiveTab("generation")}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 ${
              activeTab === "generation"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 font-semibold"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>5. LLM Text Generation</span>
          </button>

          <button
            onClick={() => setActiveTab("chatbot")}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 ${
              activeTab === "chatbot"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 font-semibold"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-indigo-300" />
            <span>6. AI Research Chatbot</span>
          </button>
        </div>

        {/* DEMO CONTAINER AREA */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-white/15 bg-slate-950/90 shadow-2xl relative min-h-[500px]">
          {/* DEMO 1: SENTIMENT ANALYSIS */}
          {activeTab === "sentiment" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="border-b border-white/10 pb-4">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                  NLP Inference Console
                </span>
                <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
                  Sentiment Analysis & Emotion Breakdown
                </h2>
              </div>

              {/* Sample Presets */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-slate-400">Select Preset Sample:</span>
                <div className="flex flex-wrap gap-2">
                  {sentimentPresets.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnalyzeSentiment(preset.text)}
                      className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10 text-xs text-slate-300 transition-all cursor-pointer"
                    >
                      Sample #{idx + 1} ({preset.label})
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="space-y-3">
                <textarea
                  rows={3}
                  value={sentimentInput}
                  onChange={(e) => setSentimentInput(e.target.value)}
                  placeholder="Enter custom text for real-time NLP sentiment analysis..."
                  className="w-full p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                />

                <button
                  onClick={() => handleAnalyzeSentiment(sentimentInput)}
                  disabled={isAnalyzingSentiment}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  {isAnalyzingSentiment ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                  <span>Run Sentiment Inference</span>
                </button>
              </div>

              {/* Inference Output Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                    Classification Result
                  </span>
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-4 py-1.5 rounded-full font-mono text-sm font-bold ${
                        currentSentimentResult.label === "POSITIVE"
                          ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
                          : currentSentimentResult.label === "NEGATIVE"
                          ? "bg-rose-500/10 text-rose-300 border border-rose-500/30"
                          : "bg-amber-500/10 text-amber-300 border border-amber-500/30"
                      }`}
                    >
                      {currentSentimentResult.label}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Confidence: {(currentSentimentResult.score * 100).toFixed(1)}%
                    </span>
                  </div>

                  <div className="space-y-1 pt-2">
                    <div className="text-xs font-mono text-slate-400 flex justify-between">
                      <span>Model Confidence Score</span>
                      <span>{(currentSentimentResult.score * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-white/10">
                      <div
                        className="h-full bg-indigo-500 rounded-full"
                        style={{ width: `${currentSentimentResult.score * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                    Emotion Vector Breakdown
                  </span>

                  <div className="space-y-2 text-xs font-mono">
                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Joy / Satisfaction</span>
                        <span>{currentSentimentResult.emotions.joy}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-400"
                          style={{ width: `${currentSentimentResult.emotions.joy}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Certainty / Confidence</span>
                        <span>{currentSentimentResult.emotions.confidence}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-400"
                          style={{ width: `${currentSentimentResult.emotions.confidence}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Concern / Risk</span>
                        <span>{currentSentimentResult.emotions.concern}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-rose-400"
                          style={{ width: `${currentSentimentResult.emotions.concern}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* DEMO 2: DEEPFAKE DETECTION */}
          {activeTab === "deepfake" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="border-b border-white/10 pb-4 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-rose-400 uppercase tracking-widest">
                    IEEE 2024 Research Model
                  </span>
                  <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
                    Spatial-Frequency Deepfake Forensics
                  </h2>
                </div>
                <button
                  onClick={() => setShowSpectralHeatmap(!showSpectralHeatmap)}
                  className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-indigo-300 hover:bg-white/15 transition-all cursor-pointer"
                >
                  {showSpectralHeatmap ? "Hide Spectral DCT Overlay" : "Show Spectral DCT Overlay"}
                </button>
              </div>

              {/* Sample Media Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {deepfakeSamples.map((sample) => (
                  <div
                    key={sample.id}
                    onClick={() => setSelectedDeepfake(sample)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-4 ${
                      selectedDeepfake.id === sample.id
                        ? "bg-indigo-950/40 border-indigo-500 shadow-lg"
                        : "bg-white/[0.02] border-white/10 hover:bg-white/[0.05]"
                    }`}
                  >
                    <div className="relative w-20 h-16 rounded-xl overflow-hidden border border-white/10 bg-slate-900">
                      <Image src={sample.thumbnail} alt={sample.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{sample.name}</h4>
                      <p className="text-xs font-mono text-slate-400">{sample.compressionLevel}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Forensic Result Console */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4 border-t border-white/10">
                <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl">
                  <Image
                    src={selectedDeepfake.thumbnail}
                    alt={selectedDeepfake.name}
                    fill
                    className={`object-cover ${showSpectralHeatmap ? "hue-rotate-90 saturate-200" : ""}`}
                  />
                  {showSpectralHeatmap && (
                    <div className="absolute inset-0 bg-indigo-500/20 backdrop-invert pointer-events-none flex items-center justify-center">
                      <span className="px-3 py-1 rounded-full bg-slate-950/90 text-cyan-300 text-xs font-mono">
                        [DCT Spectral Anomaly Matrix Active]
                      </span>
                    </div>
                  )}
                </div>

                <div className="lg:col-span-6 space-y-4">
                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                    <span className="text-xs font-mono text-slate-400">AUTHENTICITY EVALUATION</span>
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-4 py-1.5 rounded-full font-mono text-sm font-bold ${
                          selectedDeepfake.isDeepfake
                            ? "bg-rose-500/10 text-rose-300 border border-rose-500/30"
                            : "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
                        }`}
                      >
                        {selectedDeepfake.isDeepfake ? "⚠️ MANIPULATED DEEPFAKE" : "✓ AUTHENTIC MEDIA"}
                      </span>
                      <span className="text-xl font-bold font-mono text-white">
                        {selectedDeepfake.deepfakeProbability}%
                      </span>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                    <span className="text-xs font-mono text-slate-400">DETECTED FORENSIC ARTIFACTS</span>
                    <ul className="space-y-1.5 text-xs font-mono text-slate-300">
                      {selectedDeepfake.spatialArtifacts.map((art, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-rose-400">▸</span>
                          <span>{art}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* DEMO 3: MEDICAL PRESCRIPTION GENERATOR */}
          {activeTab === "medical" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="border-b border-white/10 pb-4">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                  Clinical NLP Model (BioGPT Fine-Tuned)
                </span>
                <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
                  BioGPT Prescription Generator & Safety Validation
                </h2>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono text-slate-400">Select Preset Clinical Note:</span>
                <div className="flex flex-wrap gap-2">
                  {medicalPresets.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleGeneratePrescription(preset.clinicalNote)}
                      className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10 text-xs text-slate-300 transition-all cursor-pointer"
                    >
                      Clinical Note #{idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <textarea
                  rows={3}
                  value={medicalInput}
                  onChange={(e) => setMedicalInput(e.target.value)}
                  placeholder="Enter physician clinical notes..."
                  className="w-full p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                />

                <button
                  onClick={() => handleGeneratePrescription(medicalInput)}
                  disabled={isGeneratingPrescription}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-semibold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  {isGeneratingPrescription ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <FileText className="w-4 h-4" />
                  )}
                  <span>Generate Prescription & Safety Verification</span>
                </button>
              </div>

              {/* BioGPT Result Card */}
              <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-4">
                <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
                  <span className="text-xs font-mono text-emerald-300 font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    BioGPT Output Verified
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold">
                    {currentMedicalResult.fdaSafetyCheck}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div>
                    <span className="text-slate-400">Diagnosis:</span>
                    <p className="text-white font-bold mt-0.5">{currentMedicalResult.diagnosis}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Prescribed Medication:</span>
                    <p className="text-emerald-300 font-bold mt-0.5">{currentMedicalResult.medication}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Dosage Instructions:</span>
                    <p className="text-slate-200 mt-0.5">{currentMedicalResult.dosage}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">SNOMED CT Taxonomy:</span>
                    <p className="text-indigo-300 mt-0.5">{currentMedicalResult.snomedCode}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* DEMO 4: IMAGE CLASSIFICATION */}
          {activeTab === "classification" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="border-b border-white/10 pb-4 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-violet-400 uppercase tracking-widest">
                    Vision Transformer & CNN Pipeline
                  </span>
                  <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
                    Diagnostic Image Classification & Grad-CAM
                  </h2>
                </div>
                <button
                  onClick={() => setShowGradCam(!showGradCam)}
                  className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-violet-300 hover:bg-white/15 transition-all cursor-pointer"
                >
                  {showGradCam ? "Hide Grad-CAM Attention" : "Show Grad-CAM Attention"}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {imageClassificationSamples.map((sample) => (
                  <div
                    key={sample.id}
                    onClick={() => setSelectedImageSample(sample)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-4 ${
                      selectedImageSample.id === sample.id
                        ? "bg-violet-950/40 border-violet-500 shadow-lg"
                        : "bg-white/[0.02] border-white/10 hover:bg-white/[0.05]"
                    }`}
                  >
                    <div className="relative w-20 h-16 rounded-xl overflow-hidden border border-white/10 bg-slate-900">
                      <Image src={sample.image} alt={sample.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{sample.name}</h4>
                      <p className="text-xs font-mono text-indigo-300">Top: {sample.topClass}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4 border-t border-white/10">
                <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl">
                  <Image src={selectedImageSample.image} alt={selectedImageSample.name} fill className="object-cover" />
                  {showGradCam && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/30 via-indigo-500/20 to-transparent backdrop-contrast-125 pointer-events-none flex items-end p-3">
                      <span className="px-3 py-1 rounded-full bg-slate-950/90 text-rose-300 text-[11px] font-mono">
                        🔥 Grad-CAM Attention Overlay Active
                      </span>
                    </div>
                  )}
                </div>

                <div className="lg:col-span-6 space-y-4">
                  <span className="text-xs font-mono text-slate-400">PROBABILITY DISTRIBUTION</span>
                  <div className="space-y-3">
                    {selectedImageSample.classes.map((c, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-white font-bold">{c.label}</span>
                          <span className="text-indigo-300">{c.probability}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-white/10">
                          <div className="h-full bg-violet-500 rounded-full" style={{ width: `${c.probability}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-slate-300">
                    <span className="text-indigo-400 font-bold uppercase">Attention Focus:</span> {selectedImageSample.gradCamFocus}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* DEMO 5: LLM TEXT GENERATION */}
          {activeTab === "generation" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="border-b border-white/10 pb-4">
                <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
                  Large Language Model Token Stream
                </span>
                <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
                  Interactive Text Generation & Hyperparameter Tuning
                </h2>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono text-slate-400">Select Preset Prompt:</span>
                <div className="flex flex-wrap gap-2">
                  {textGenPresets.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleGenerateText(preset.prompt)}
                      className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10 text-xs text-slate-300 transition-all cursor-pointer"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 space-y-3">
                  <textarea
                    rows={3}
                    value={textGenPrompt}
                    onChange={(e) => setTextGenPrompt(e.target.value)}
                    placeholder="Enter prompt..."
                    className="w-full p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                  />

                  <button
                    onClick={() => handleGenerateText(textGenPrompt)}
                    disabled={isStreamingText}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-semibold text-white bg-amber-600 hover:bg-amber-500 shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-50"
                  >
                    {isStreamingText ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    <span>Stream Token Generation</span>
                  </button>
                </div>

                {/* Hyperparameter Controls */}
                <div className="lg:col-span-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4 text-xs font-mono">
                  <span className="text-slate-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-amber-400" /> Hyperparameters
                  </span>

                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>Temperature:</span>
                      <span>{temperature}</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="1.5"
                      step="0.1"
                      value={temperature}
                      onChange={(e) => setTemperature(parseFloat(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>Max Tokens:</span>
                      <span>{maxTokens}</span>
                    </div>
                    <input
                      type="range"
                      min="64"
                      max="512"
                      step="32"
                      value={maxTokens}
                      onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Streamed Output Display */}
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-white/10 space-y-2 font-mono text-xs text-amber-200 min-h-[120px] relative">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest">GENERATED STREAM</span>
                <p className="whitespace-pre-wrap leading-relaxed">{generatedText}</p>
              </div>
            </div>
          )}

          {/* DEMO 6: CHATBOT */}
          {activeTab === "chatbot" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-white/10 pb-4 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">
                    Conversational AI Agent
                  </span>
                  <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
                    Param AI Research Assistant
                  </h2>
                </div>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Agent Ready
                </span>
              </div>

              {/* Chat Thread */}
              <div className="space-y-3 max-h-[340px] overflow-y-auto p-4 rounded-2xl bg-white/[0.02] border border-white/5 font-sans">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-indigo-600 text-white rounded-br-none"
                          : "bg-white/[0.06] text-slate-200 rounded-bl-none border border-white/10"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Prompt Chips */}
              <div className="flex flex-wrap gap-2">
                {chatbotPresets.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendChat(chip)}
                    className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10 text-xs text-indigo-300 transition-all cursor-pointer font-mono"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Input Form */}
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendChat(chatInput)}
                  placeholder="Ask a question about Param's research, papers, or projects..."
                  className="flex-1 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={() => handleSendChat(chatInput)}
                  className="p-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
