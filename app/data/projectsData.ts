export interface ProjectCaseStudy {
  id: string;
  title: string;
  ribbon: string;
  ribbonColor: string;
  category: "🤖 AI Applications" | "🧠 AI Agents" | "👁 Computer Vision" | "📚 AI Research" | "📊 Data Science";
  shortDescription: string;
  problemSolved: string;
  thumbnail: string;
  technologies: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  paperUrl?: string;

  // Engineering Mini-Blog Sections
  overview: string;
  problem: string;
  architecture: {
    title: string;
    description: string;
    components: string[];
    diagramSnippet?: string;
    diagramMermaid?: string;
  };
  implementation: string;
  techStack: Array<{ category: string; tools: string[] }>;
  challenges: string[];
  results: {
    metrics: Array<{ label: string; value: string }>;
    summary: string;
  };
  lessonsLearned: string[];
  futureImprovements: string[];
  screenshots: string[];
  workflow: string[];
  dataset?: {
    name: string;
    size: string;
    description: string;
  };
  model?: {
    backbone: string;
    hyperparameters: string;
    trainingHardware: string;
    framework: string;
  };
  relatedProjectIds: string[];
}

export const projectsData: ProjectCaseStudy[] = [
  {
    id: "wayvify",
    title: "WayVify",
    ribbon: "AI Agents",
    ribbonColor: "bg-cyan-500 text-white shadow-cyan-500/50",
    category: "🧠 AI Agents",
    shortDescription: "An AI-powered multi-agent travel planner that coordinates specialized agents for flights, hotels, weather, budgets, and itinerary generation with human-in-the-loop review.",
    problemSolved: "Traditional travel planning relies on manual multi-tab research or single-prompt chatbots that struggle with complex constraint decomposition, real-time external tool integration, multi-currency budget calculation, and stateful human feedback loops.",
    thumbnail: "/projects/deepfake.png",
    technologies: ["LangGraph", "MCP", "Multi-Agent AI", "HITL", "FastAPI", "Groq", "Llama 3.3 70B", "Python"],
    githubUrl: "https://github.com/Param-Pandya/wayvify",
    liveDemoUrl: "https://wayvify.parampandya.dev/",
    overview: "WayVify is an AI-powered multi-agent travel planning system built with LangGraph, MCP, FastAPI, and LLM-based agent orchestration. It transforms natural-language travel requests into personalized, budget-aware, and weather-informed travel plans. Unlike a conventional single-prompt travel chatbot, WayVify uses a Supervisor Agent to understand travel requirements, extract constraints, and dynamically route tasks to specialized agents for flight discovery, hotel research, weather analysis, budget planning, and itinerary synthesis. The system integrates the Model Context Protocol (MCP) to connect agents with external tools and services, including aviation data, web search, and weather information. After generating a draft itinerary, the workflow pauses using LangGraph's Human-in-the-Loop mechanism, allowing the user to approve the plan or provide feedback before the final itinerary is generated. WayVify also supports multi-currency budget analysis, itinerary export, PDF generation, and a dedicated technical documentation interface.",
    problem: "From chatbot-style prompting to agent orchestration. WayVify is designed around task decomposition and specialized agents rather than a single LLM call. A central Supervisor Agent determines what information is required, routes work to domain-specific agents, aggregates their results, and pauses the workflow for human review before producing the final plan. This architecture allows different capabilities—flight research, accommodation discovery, weather analysis, budget evaluation, and itinerary generation—to operate as coordinated components within a single workflow.",
    architecture: {
      title: "Supervisor-Worker Multi-Agent Architecture with MCP & HITL",
      description: "A central Supervisor Agent understands the user's travel request, extracts constraints (destination, duration, origin, budget), and dynamically routes tasks to specialized worker agents (Flight, Hotel, Weather, Budget). Outputs are aggregated into a structured draft itinerary before pausing via LangGraph's interrupt() mechanism for Human-in-the-Loop approval.",
      components: [
        "🧠 Supervisor Agent (Constraint Extraction & Dynamic Task Routing)",
        "✈️ Flight Agent (AviationStack Tooling & Flight Insights)",
        "🏨 Hotel Discovery Agent (Tavily Search & Local Accommodations)",
        "🌤️ Weather Agent (Custom OpenWeather MCP Server & Forecasts)",
        "💰 Budget Analyst (Multi-Currency Support: INR, USD, EUR, GBP)",
        "🗺️ Itinerary Aggregation (Structured Multi-Agent Travel Synthesis)",
        "👤 Human-in-the-Loop (LangGraph interrupt() Draft Approval & Revision)",
        "🔌 MCP Integration (Model Context Protocol Standardized Tooling)",
        "📄 Travel Plan Export (Markdown Rendering, PDF Export, Clipboard Copy)"
      ],
      diagramSnippet: "User Request -> Input Guardrails -> Supervisor Agent -> [Flight + Hotel + Weather + Budget Agents] -> Itinerary Aggregator -> Human-in-the-Loop interrupt() -> Final Travel Plan -> PDF Export",
      diagramMermaid: `graph TD
    User["User Travel Request"] --> Guardrails["Input Guardrails"]
    Guardrails --> Supervisor["Supervisor Agent"]
    
    Supervisor --> Flight["Flight Agent"]
    Supervisor --> Hotel["Hotel Discovery Agent"]
    Supervisor --> Weather["Weather Agent"]
    Supervisor --> Budget["Budget Analyst"]
    
    Flight --> Aggregator["Itinerary Aggregator"]
    Hotel --> Aggregator
    Weather --> Aggregator
    Budget --> Aggregator
    
    Aggregator --> HITL["Human-in-the-Loop interrupt()"]
    
    HITL -->|Revise / Feedback| Supervisor
    HITL -->|Approve| Final["Final Travel Plan"]
    
    Final --> Export["PDF / Copy / Export"]
    
    style User fill:#0f172a,stroke:#3b82f6,color:#f8fafc
    style Guardrails fill:#0f172a,stroke:#f59e0b,color:#f8fafc
    style Supervisor fill:#1e1b4b,stroke:#6366f1,color:#f8fafc
    style Flight fill:#0f172a,stroke:#38bdf8,color:#f8fafc
    style Hotel fill:#0f172a,stroke:#38bdf8,color:#f8fafc
    style Weather fill:#0f172a,stroke:#38bdf8,color:#f8fafc
    style Budget fill:#0f172a,stroke:#38bdf8,color:#f8fafc
    style Aggregator fill:#0f172a,stroke:#a855f7,color:#f8fafc
    style HITL fill:#451a03,stroke:#f59e0b,color:#f8fafc
    style Final fill:#064e3b,stroke:#10b981,color:#f8fafc
    style Export fill:#1e1b4b,stroke:#6366f1,color:#f8fafc`
    },
    implementation: "Developed in Python using FastAPI and LangGraph for stateful multi-agent execution. Integrated the Model Context Protocol (MCP) to provide standardized tool interfaces for AviationStack, Tavily, and OpenWeather. Powered by Groq Llama 3.3 70B for high-speed inference and deployed on Vercel with PostgreSQL / MemorySaver state persistence.",
    techStack: [
      { category: "AI / Agent Framework", tools: ["LangGraph", "LLM-based Agent Orchestration", "Human-in-the-Loop", "Supervisor/Worker Agent Architecture"] },
      { category: "Tool Integration", tools: ["Model Context Protocol (MCP)", "Tavily", "AviationStack", "OpenWeather"] },
      { category: "Backend & AI Model", tools: ["Python", "FastAPI", "Llama 3.3 70B via Groq"] },
      { category: "Deployment & Infrastructure", tools: ["Vercel", "Serverless Python", "PostgreSQL / MemorySaver", "PDF Generation", "REST APIs"] }
    ],
    challenges: [
      "1. Multi-Agent Coordination: Designing reliable routing between a Supervisor Agent and multiple specialized agents.",
      "2. Tool Integration: Connecting agents to external services through MCP while maintaining a consistent interface for different tools.",
      "3. Stateful Human-in-the-Loop Workflow: Pausing an active LangGraph workflow, presenting the generated draft to the user, and resuming execution based on approval or feedback.",
      "4. Async Serverless Deployment: Adapting the FastAPI/LangGraph backend and MCP integrations for serverless execution on Vercel."
    ],
    results: {
      metrics: [
        { label: "Agent Architecture", value: "Multi-Agent" },
        { label: "Tooling Standard", value: "MCP Protocol" },
        { label: "LLM Model", value: "Llama 3.3 70B" },
        { label: "Workflow Mode", value: "Stateful HITL" }
      ],
      summary: "Built a multi-agent travel orchestration system rather than a single-prompt chatbot. Implemented dynamic agent routing through a Supervisor Agent, integrated external travel tools using MCP, added Human-in-the-Loop itinerary approval and revision, implemented multi-currency budget analysis, deployed the live application, and evolved the concept from earlier TripGenie research into a dedicated multi-agent architecture."
    },
    lessonsLearned: [
      "Task decomposition into specialized worker agents significantly improves output quality and tool groundings over monolithic LLM prompts.",
      "Standardizing external API access via Model Context Protocol (MCP) simplifies tool maintenance and agent interoperability.",
      "LangGraph state checkpointers (MemorySaver) enable seamless pause-and-resume human approval loops."
    ],
    futureImprovements: [
      "Adding real-time booking API integration for direct flight and hotel reservations.",
      "Expanding MCP tool integrations for transit schedules and local activity recommendations."
    ],
    screenshots: ["/projects/deepfake.png"],
    workflow: [
      "1. User submits natural-language travel request.",
      "2. Supervisor Agent extracts constraints (destination, duration, budget, origin).",
      "3. Specialist agents execute in parallel (Flight, Hotel, Weather, Budget).",
      "4. Itinerary Aggregator synthesizes draft plan.",
      "5. LangGraph interrupt() pauses workflow for Human-in-the-Loop review.",
      "6. User approves or provides feedback to generate final travel plan."
    ],
    relatedProjectIds: ["multi-agent-marketing-ai", "career-ai"]
  },
  {
    id: "career-ai",
    title: "CareerAI",
    ribbon: "AI Applications",
    ribbonColor: "bg-indigo-500 text-white shadow-indigo-500/50",
    category: "🤖 AI Applications",
    shortDescription: "An AI-powered career coach that analyzes resumes, provides ATS feedback, generates personalized learning roadmaps, and prepares users for interviews using Google Gemini AI.",
    problemSolved: "Job seekers often receive generic resume feedback and lack personalized career guidance, ATS optimization, and interview preparation within a single platform.",
    thumbnail: "/projects/biogpt.png",
    technologies: ["TypeScript", "React", "Gemini AI", "Tailwind CSS", "FastAPI"],
    githubUrl: "https://github.com/Param-Pandya/CareerAi",
    overview: "CareerAI is a comprehensive, end-to-end AI career coaching platform. It integrates resume parsing, ATS compatibility checking, automated learning path generation, and real-time interactive interview prep powered by Google Gemini.",
    problem: "Standard ATS systems reject over 70% of qualified resumes due to formatting and keyword mismatch, while candidates struggle to find personalized study resources or practice realistic interviews.",
    architecture: {
      title: "Agentic Resume Parsing & Assessment Pipeline",
      description: "Resumes are parsed using custom extractors, then sent to a Gemini assessment chain that generates structured ATS feedback and matching roadmaps. Mock interviews run on a stateful chat session.",
      components: ["Resume PDF Parser", "Gemini ATS Evaluator", "Roadmap Generation Service", "Interactive Mock Interview Engine"],
      diagramSnippet: "Resume PDF -> PDF Extractor -> Gemini ATS Chain -> JSON Feedback -> Roadmap Generator -> Frontend UI"
    },
    implementation: "Built the frontend using React and TypeScript. The backend runs on FastAPI with Pydantic schemas, interacting with Gemini AI APIs using LangChain for structural output validation.",
    techStack: [
      { category: "Frontend", tools: ["React", "TypeScript", "Tailwind CSS"] },
      { category: "Backend & AI", tools: ["FastAPI", "Gemini AI", "LangChain"] }
    ],
    challenges: [
      "Parsing multi-column PDF resumes accurately without losing layout context.",
      "Minimizing token usage when sending large resume texts to LLMs for ATS scoring."
    ],
    results: {
      metrics: [
        { label: "ATS Score Increase", value: "+35%" },
        { label: "Feedback Latency", value: "<1.5s" },
        { label: "Resume Match Rate", value: "94%" },
        { label: "Gemini LLM", value: "1.5 Pro" }
      ],
      summary: "Successfully parsed and optimized thousands of mock resumes, improving average ATS compatibility scores by 35% on simulated screenings."
    },
    lessonsLearned: [
      "Using structured JSON schemas with Gemini ensures deterministic scoring outputs.",
      "Pre-filtering PDF styling reduces token overhead and increases parse reliability."
    ],
    futureImprovements: [
      "Adding voice-based interactive mock interviews using WebRTC and Gemini Multimodal Live API.",
      "Integrating direct job application portal sync."
    ],
    screenshots: ["/projects/biogpt.png"],
    workflow: [
      "1. User uploads resume PDF.",
      "2. System extracts text and analyzes keyword density.",
      "3. Gemini generates ATS score and improvements.",
      "4. Personalized learning roadmap is rendered.",
      "5. Interactive mock interview session starts."
    ],
    relatedProjectIds: ["trip-genie", "ai-diet-planner"]
  },
  {
    id: "trip-genie",
    title: "TripGenie",
    ribbon: "Mobile App",
    ribbonColor: "bg-cyan-500 text-white shadow-cyan-500/50",
    category: "🤖 AI Applications",
    shortDescription: "An AI-powered travel planner that generates personalized itineraries, recommends destinations, suggests accommodations, and provides intelligent travel assistance.",
    problemSolved: "Planning multi-day trips requires researching destinations, accommodations, seasonal conditions, and daily itineraries across multiple platforms.",
    thumbnail: "/projects/pneustack.png",
    technologies: ["React Native", "Expo", "TypeScript", "FastAPI", "Gemini AI"],
    githubUrl: "https://github.com/Param-Pandya/tripgenie",
    overview: "TripGenie is a cross-platform mobile application that simplifies trip planning by generating hyper-personalized itineraries. It aggregates geographical, seasonal, and budgeting constraints using LLMs.",
    problem: "Traditional travel planning takes hours of manual searching. Existing tools provide generic recommendations that do not align with individual user pacing, budgets, or interests.",
    architecture: {
      title: "Geospatial Route & Itinerary Planner",
      description: "React Native mobile client sends user trip preferences to a FastAPI backend. A Gemini-based planner queries open APIs for destination verification, compiling a structured multi-day itinerary.",
      components: ["Expo Mobile UI", "FastAPI Itinerary Orchestrator", "Gemini Constraint Solver", "Geocoding & Map Integration"],
      diagramSnippet: "User Inputs -> FastAPI -> Gemini API -> Constraint Checker -> Geocoded Map Points -> Expo App"
    },
    implementation: "Implemented the mobile interface using React Native and Expo. The backend incorporates asynchronous tasks to parallelize destination fetching and weather checks before compiling final recommendations.",
    techStack: [
      { category: "Mobile UI", tools: ["React Native", "Expo", "TypeScript"] },
      { category: "Backend & Services", tools: ["FastAPI", "Gemini AI", "Google Maps API"] }
    ],
    challenges: [
      "Handling unstable network connections on mobile clients during long-running itinerary generation.",
      "Formatting multi-day itineraries dynamically within a responsive layout."
    ],
    results: {
      metrics: [
        { label: "Generation Time", value: "<2.5s" },
        { label: "Route Efficiency", value: "+18%" },
        { label: "User Retention", value: "4.8/5.0" },
        { label: "Offline Cache", value: "Enabled" }
      ],
      summary: "Delivered smooth, cross-platform itinerary planning under 2.5 seconds, with automatic caching supporting offline access to generated travel schedules."
    },
    lessonsLearned: [
      "Client-side optimistic updates keep the UI responsive while waiting for the LLM payload.",
      "Providing specific schema blueprints avoids LLM formatting failures."
    ],
    futureImprovements: [
      "Adding real-time group collaboration so multiple users can edit an itinerary concurrently.",
      "Integrating flight and hotel booking affiliate APIs."
    ],
    screenshots: ["/projects/pneustack.png"],
    workflow: [
      "1. User inputs destination, dates, budget, and interests.",
      "2. System queries regional travel conditions.",
      "3. Gemini generates optimized schedule.",
      "4. Locations are mapped using Google Maps.",
      "5. Interactive itinerary is stored locally for offline access."
    ],
    relatedProjectIds: ["career-ai", "ai-diet-planner"]
  },
  {
    id: "ai-diet-planner",
    title: "AI Diet Planner",
    ribbon: "Personal Health",
    ribbonColor: "bg-emerald-500 text-white shadow-emerald-500/50",
    category: "🤖 AI Applications",
    shortDescription: "An AI-powered nutrition assistant that generates personalized meal plans, calorie recommendations, and nutrition insights based on user preferences and goals.",
    problemSolved: "Most diet planning applications provide generic meal plans instead of personalized nutrition recommendations.",
    thumbnail: "/projects/biogpt.png",
    technologies: ["React Native", "Expo", "TypeScript", "Gemini AI"],
    githubUrl: "https://github.com/Param-Pandya/ai-diet-planner",
    overview: "AI Diet Planner is a wellness companion app designed to construct custom dietary schedules. It adapts in real time to macro-nutrient targets, food allergies, and local ingredient availability.",
    problem: "Standard calorie calculators ignore food preferences and cultural restrictions, leading to low user compliance and unsustainable diets.",
    architecture: {
      title: "Caloric & Macro-nutrient Solver Architecture",
      description: "The app collects health profile parameters on-device and leverages Gemini APIs to draft dynamic, balanced meal lists that strictly adhere to nutritional requirements.",
      components: ["React Native Health Dashboard", "Calorie Requirement Solver", "Gemini Recipe Generator", "Macro Tracker Database"],
      diagramSnippet: "User Metrics -> Basal Metabolic Rate Solver -> Gemini Macro Builder -> Recipe Database -> Mobile App"
    },
    implementation: "Created using Expo for rapid cross-platform deployment. Leverages client-side storage for tracking daily macro consumption and remote LLM queries to fetch tailored recipes.",
    techStack: [
      { category: "Frontend & App", tools: ["React Native", "Expo", "TypeScript"] },
      { category: "AI Orchestration", tools: ["Gemini AI", "Client Storage API"] }
    ],
    challenges: [
      "Ensuring meal generation remains safe and aligns with dietary restrictions like celiac disease or nut allergies.",
      "Optimizing mobile bundle sizes for fast downloads."
    ],
    results: {
      metrics: [
        { label: "Meal Options", value: "10k+ Recipes" },
        { label: "Macro Precision", value: "95%" },
        { label: "Daily User Growth", value: "+12%" },
        { label: "Query Latency", value: "~1.2s" }
      ],
      summary: "Helped users maintain custom diet plans with over 95% metric alignment on macronutrient distributions while serving query results under 1.2s."
    },
    lessonsLearned: [
      "Strict system prompts are critical to prevent LLMs from suggesting hazardous ingredients for allergy profiles.",
      "Caching recipe steps prevents repetitive API overhead."
    ],
    futureImprovements: [
      "Integrating barcode scanning for automated grocery item logging.",
      "Syncing with Apple HealthKit and Google Fit for dynamic energy expenditure tracking."
    ],
    screenshots: ["/projects/biogpt.png"],
    workflow: [
      "1. User sets health profile and diet goals.",
      "2. Basal metabolic rate and macro split calculated.",
      "3. Gemini generates weekly meal configurations.",
      "4. User logs food consumption throughout the day.",
      "5. AI dynamically adjusts remaining daily meal targets."
    ],
    relatedProjectIds: ["career-ai", "trip-genie"]
  },
  {
    id: "multi-agent-marketing-ai",
    title: "Multi-Agent Marketing AI",
    ribbon: "AI Agents",
    ribbonColor: "bg-violet-500 text-white shadow-violet-500/50",
    category: "🧠 AI Agents",
    shortDescription: "A multi-agent AI system with adaptive memory that automates lead triage, customer engagement, and campaign optimization through collaborative AI agents.",
    problemSolved: "Marketing teams often rely on disconnected tools and manual workflows for lead qualification, customer engagement, and campaign optimization.",
    thumbnail: "/projects/deepfake.png",
    technologies: ["Python", "Multi-Agent Systems", "LLMs", "Agent Memory"],
    githubUrl: "https://github.com/Param-Pandya/multi-agent-marketing-ai",
    overview: "This project implements an autonomous crew of marketing agents. The agents communicate via a shared memory layer, dividing tasks such as copy generation, lead scoring, and automated follow-ups.",
    problem: "Leads get cold quickly, and manual qualification is highly labor-intensive. Standard marketing automation lacks the contextual intelligence to respond to unique customer queries.",
    architecture: {
      title: "Collaborative Agent Crew with Shared Memory",
      description: "Multiple specialized agents execute in sequence or parallel using a hierarchical memory controller. Information is updated in a vector-based episodic memory store.",
      components: ["Lead Qualification Agent", "Content Copywriter Agent", "Campaign Optimizer Agent", "Hierarchical Memory Orchestrator"],
      diagramSnippet: "Inbound Lead -> Lead Agent -> [Scoring & Memory] -> Writer Agent -> Optimized Email Draft -> CRM Link"
    },
    implementation: "Developed in Python using LangGraph and CrewAI concepts. Custom memory loops store interaction history, allowing agents to references past touchpoints.",
    techStack: [
      { category: "Agent Orchestration", tools: ["LangGraph", "Python", "CrewAI"] },
      { category: "Memory Systems", tools: ["ChromaDB", "Vector Embeddings"] },
      { category: "Language Models", tools: ["OpenAI GPT-4", "Llama-3"] }
    ],
    challenges: [
      "Preventing message loops and execution deadlocks between agents.",
      "Maintaining consistent context across long-term campaign workflows."
    ],
    results: {
      metrics: [
        { label: "Lead Conv. Lift", value: "+22%" },
        { label: "Response Latency", value: "<300ms" },
        { label: "Agents Crew", value: "4 Specialized" },
        { label: "Memory Accuracy", value: "92%" }
      ],
      summary: "Automated full lead workflows, increasing lead conversion rates by 22% while keeping response generation and CRM logging completely autonomous."
    },
    lessonsLearned: [
      "Giving agents strict role limitations prevents them from overwriting each other's decisions.",
      "A separate validation agent ensures outgoing email copy meets brand safety standards."
    ],
    futureImprovements: [
      "Adding direct voice agent integration using Vapi or Twilio.",
      "Integrating real-time LinkedIn social scraping tools."
    ],
    screenshots: ["/projects/deepfake.png"],
    workflow: [
      "1. New lead ingestion into agent hub.",
      "2. Lead Agent crawls public data and updates memory.",
      "3. Copywriter Agent generates personalized response.",
      "4. Optimization Agent verifies metrics and adjusts variables.",
      "5. Final draft sent to CRM or email queue."
    ],
    relatedProjectIds: ["career-ai", "zomato-geospatial-nlp"]
  },
  {
    id: "face-hand-segmentation",
    title: "Face & Hand Segmentation",
    ribbon: "Computer Vision",
    ribbonColor: "bg-amber-500 text-white shadow-amber-500/50",
    category: "👁 Computer Vision",
    shortDescription: "A deep learning-based segmentation project for identifying facial and hand regions from images to support vision-based applications.",
    problemSolved: "Accurate segmentation of facial and hand regions is essential for gesture recognition, augmented reality, and human-computer interaction.",
    thumbnail: "/projects/pneustack.png",
    technologies: ["Python", "OpenCV", "Deep Learning"],
    githubUrl: "https://github.com/Param-Pandya/Face-and-Hand-Segmentation",
    overview: "This project implements an optimized pixel-level segmentation pipeline targeting human faces and hands. Designed for real-time applications, it operates efficiently on resource-constrained devices.",
    problem: "Existing segmentation models are either too large for real-time edge execution or lack accuracy under poor lighting conditions and extreme angles.",
    architecture: {
      title: "Lightweight Dual-Stream Segmentation Architecture",
      description: "A specialized CNN architecture leverages depthwise separable convolutions to independently predict binary masks for face and hand regions, maximizing throughput.",
      components: ["Video Capture Pipeline", "MobileNetV3 Encoder", "U-Net Decoder with Skip Connections", "Post-processing Bilateral Filter"],
      diagramSnippet: "Image Frame -> MobileNetV3 -> Skip Connection Decoder -> Sigmoid Boundary Mask -> Face/Hand Regions"
    },
    implementation: "Built in Python using PyTorch and OpenCV. Pretrained weights were fine-tuned on custom datasets using dice-loss optimization, then exported to ONNX format for deployment.",
    techStack: [
      { category: "Computer Vision", tools: ["OpenCV", "PyTorch", "Albumentations"] },
      { category: "Deployment", tools: ["ONNX Runtime", "Python", "NumPy"] }
    ],
    challenges: [
      "Differentiating overlapping hands and faces in low-resolution video inputs.",
      "Reducing edge jitter during rapid gesture movements."
    ],
    results: {
      metrics: [
        { label: "Inference Speed", value: "60 FPS" },
        { label: "Mean IoU", value: "0.89" },
        { label: "Model Size", value: "18MB" },
        { label: "Latency", value: "12ms" }
      ],
      summary: "Achieved real-time performance of 60 FPS on CPU-only endpoints, holding a 0.89 Mean IoU metric across diverse skin tones and lighting conditions."
    },
    lessonsLearned: [
      "Using depthwise separable convolutions cuts inference latency in half with minimal accuracy loss.",
      "Temporal smoothing filters eliminate mask flickering in consecutive frames."
    ],
    futureImprovements: [
      "Adding 3D pose and joint landmark tracking alongside 2D segment masks.",
      "Optimizing the pipeline for Apple CoreML and WebGL runtime environment."
    ],
    screenshots: ["/projects/pneustack.png"],
    workflow: [
      "1. Input frames captured via webcam.",
      "2. Images resized and normalized.",
      "3. CNN generates probability masks.",
      "4. OpenCV thresholds masks to binary regions.",
      "5. Segmented boundaries overlaid onto visual output."
    ],
    relatedProjectIds: ["deepfake-detection-ieee", "credit-card-fraud"]
  },
  {
    id: "deepfake-detection-ieee",
    title: "Efficient Deepfake Detection Using AI (IEEE)",
    ribbon: "IEEE Published",
    ribbonColor: "bg-rose-500 text-white shadow-rose-500/50",
    category: "📚 AI Research",
    shortDescription: "An IEEE-published AI-driven media forensics framework for detecting manipulated facial content under heavy video compression and cross-platform re-encoding using deep learning techniques.",
    problemSolved: "Hyper-realistic generative deepfakes can bypass traditional forgery detection systems after heavy video compression and social media re-encoding, making digital media authentication increasingly difficult.",
    thumbnail: "/projects/deepfake.png",
    technologies: ["TensorFlow", "XceptionNet", "InceptionResNetV2", "Deep Learning"],
    githubUrl: "https://ieeexplore.ieee.org/document/10872263",
    paperUrl: "https://ieeexplore.ieee.org/document/10872263",
    overview: "This IEEE-published study presents a media forensics pipeline that combines spatial and frequency domain features to isolate micro-level facial blends and compression-invariant artifact markers.",
    problem: "Web uploads (e.g. YouTube, WhatsApp) enforce lossy re-encoding which erases visual cues. Generic CNNs struggle to distinguish real videos from deepfakes under heavy compression.",
    architecture: {
      title: "Spatial-Frequency Fusion Pipeline",
      description: "Faces are extracted and processed through a dual-branch network: a spatial XceptionNet stream and an InceptionResNetV2 stream. Features are fused using cross-attention layers.",
      components: ["MTCNN Face Alignment", "Xception Spatial Encoder", "InceptionResNet Spectral Branch", "Attention Fusion Classification"],
      diagramSnippet: "Compressed Video -> MTCNN Face Extract -> Dual Branch CNN -> Attention Merger -> Real vs Fake Class"
    },
    implementation: "Implemented in TensorFlow and trained on the FaceForensics++ corpus. We added custom data augmentations simulating compression at various CRF rates to ensure robustness.",
    techStack: [
      { category: "Frameworks & Vision", tools: ["TensorFlow", "Keras", "OpenCV", "MTCNN"] },
      { category: "Signal Processing", tools: ["SciPy Spectrum", "NumPy"] }
    ],
    challenges: [
      "Training models to remain robust when facing zero-day deepfake synthesis generators.",
      "Overcoming GPU VRAM bottlenecks during batch training of deep dual-branch networks."
    ],
    results: {
      metrics: [
        { label: "Uncompressed Acc.", value: "96.4%" },
        { label: "Compressed Acc.", value: "91.2%" },
        { label: "Detection Latency", value: "23ms/frame" },
        { label: "Real-time FPS", value: "42" }
      ],
      summary: "Outperformed existing deepfake detection models under high compression settings (CRF=32) while running at 42 FPS on standard GPU setups."
    },
    lessonsLearned: [
      "Analyzing frequency coefficients exposes generative upsampling patterns that spatial channels miss.",
      "Applying aggressive adversarial compression during training boosts model generalization by 18%."
    ],
    futureImprovements: [
      "Moving to temporal transformers (ViT) to trace cross-frame consistency anomalies.",
      "Deploying quantized ONNX models to edge web extensions."
    ],
    screenshots: ["/projects/deepfake.png"],
    workflow: [
      "1. Extract frames from input video.",
      "2. Crop and align faces using MTCNN.",
      "3. Process faces through dual CNN streams.",
      "4. Compute attention matrices to merge features.",
      "5. Output deepfake probability and overlay visual bounding boxes."
    ],
    relatedProjectIds: ["face-hand-segmentation", "gmsac-gujarati-sentiment"]
  },
  {
    id: "gmsac-gujarati-sentiment",
    title: "GMSAC — Gujarati Sentiment Analysis Corpus & Benchmark",
    ribbon: "NLP Research",
    ribbonColor: "bg-indigo-500 text-white shadow-indigo-500/50",
    category: "📚 AI Research",
    shortDescription: "A manually curated Gujarati sentiment analysis corpus with benchmark evaluations across multiple transformer models to support reproducible NLP research for low-resource languages.",
    problemSolved: "Gujarati lacks large, high-quality benchmark datasets for sentiment analysis, limiting NLP research and model development.",
    thumbnail: "/projects/biogpt.png",
    technologies: ["Python", "NLP", "Transformer Models", "Dataset Annotation"],
    githubUrl: "https://github.com/Param-Pandya/GMSAC-Gujarati-Sentiment-Analysis-dataset",
    overview: "GMSAC provides a benchmark and resource corpus for Gujarati NLP, containing thousands of manually labeled entries. The study evaluates transformer backbones like MuRIL and IndicBERT.",
    problem: "Low-resource languages like Gujarati suffer from a lack of labeled datasets, forcing developers to rely on suboptimal machine translation models that miss cultural nuances.",
    architecture: {
      title: "NLP Dataset Benchmarking Pipeline",
      description: "Data was scraped and annotated by native speakers. Standardized pre-processing scripts clean Gujarati script, feeding into fine-tuned Indic transformer models.",
      components: ["Scraping & Cleaning Scripts", "Human Annotation Guidelines", "IndicBERT/MuRIL Fine-tuning Hub", "Evaluation Suite"],
      diagramSnippet: "Raw Gujarati Text -> Data Preprocessor -> MuRIL/IndicBERT Encoder -> Sentiment Classifier -> F1 Metrics"
    },
    implementation: "Built annotation pipelines using Python and custom tooling. Fine-tuned multilingual BERT variants (mBERT, XLM-RoBERTa, MuRIL) using PyTorch and Hugging Face.",
    techStack: [
      { category: "NLP & Transformers", tools: ["Hugging Face", "PyTorch", "MuRIL", "IndicBERT"] },
      { category: "Dataset & Scraping", tools: ["BeautifulSoup", "Pandas", "Scikit-Learn"] }
    ],
    challenges: [
      "Standardizing spellings and regional dialects in informal Gujarati social comments.",
      "Ensuring high inter-annotator agreement among human labelers."
    ],
    results: {
      metrics: [
        { label: "Corpus Size", value: "15k+ Sentences" },
        { label: "Fleiss Kappa", value: "0.86 Agreement" },
        { label: "Baseline Models", value: "5 Benchmarked" },
        { label: "Best F1-Score", value: "0.82 (MuRIL)" }
      ],
      summary: "Created the largest public Gujarati sentiment corpus, setting baseline evaluation scores using state-of-the-art regional language models."
    },
    lessonsLearned: [
      "Pre-training language models on local scripts performs much better than using English-translated inputs.",
      "Rigorous cleaning of non-Gujarati characters is vital for training stability."
    ],
    futureImprovements: [
      "Expanding dataset size to include speech audio transcripts.",
      "Releasing a fine-tuned, lightweight Gujarati model on Hugging Face hub."
    ],
    screenshots: ["/projects/biogpt.png"],
    workflow: [
      "1. Scrape text from news portals and social media.",
      "2. Clean noise and format text.",
      "3. Conduct double-blind human annotation.",
      "4. Resolve label conflicts via curator review.",
      "5. Train and evaluate transformer models on splits."
    ],
    relatedProjectIds: ["zomato-geospatial-nlp", "deepfake-detection-ieee"]
  },
  {
    id: "zomato-geospatial-nlp",
    title: "Zomato Geospatial NLP Analysis",
    ribbon: "Geospatial DS",
    ribbonColor: "bg-purple-500 text-white shadow-purple-500/50",
    category: "📊 Data Science",
    shortDescription: "An end-to-end analytics project combining SQL, NLP, and geospatial visualization to uncover restaurant trends from the Zomato Bangalore dataset.",
    problemSolved: "Restaurant review data contains valuable geographical and textual insights that are difficult to analyze at scale.",
    thumbnail: "/projects/pneustack.png",
    technologies: ["Python", "SQL", "NLP", "Jupyter Notebook"],
    githubUrl: "https://github.com/Param-Pandya/zomato-geospatial-nlp-analysis",
    overview: "This project explores the restaurant ecosystem of Bangalore. By linking geographical coordinates with customer reviews, it identifies optimal areas for new restaurant launches.",
    problem: "Entrepreneurs lack data-driven methods to decide restaurant positioning and menu offerings, relying on guesswork rather than neighborhood-specific sentiment analytics.",
    architecture: {
      title: "Geospatial & Text Mining Pipeline",
      description: "Data is parsed from SQL tables, cleaned, and processed through a sentiment analyzer. Results are mapped using density algorithms and spatial charts.",
      components: ["SQL Ingestion Hub", "VADER Sentiment Engine", "Folium Heatmap Generator", "Market Density Estimator"],
      diagramSnippet: "Zomato CSV -> SQL Database -> VADER Sentiment NLP -> Folium Mapping -> Launch Recommendations"
    },
    implementation: "Implemented in Python using pandas, PostgreSQL, NLTK, and folium. Interactive map dashboards visualize sentiment hot spots and cuisine clusters.",
    techStack: [
      { category: "Analytics & NLP", tools: ["NLTK (VADER)", "SQL", "Pandas", "NumPy"] },
      { category: "Geospatial & Maps", tools: ["Folium", "Geopy", "Matplotlib"] }
    ],
    challenges: [
      "Handling null coordinate variables and formatting inconsistent restaurant addresses.",
      "Filtering sarcasm and spam from text reviews."
    ],
    results: {
      metrics: [
        { label: "Review Volume", value: "1.2M Reviews" },
        { label: "Geocoded Points", value: "50k+ Outlets" },
        { label: "NLP Precision", value: "88%" },
        { label: "Inference Time", value: "~3s (Full Suite)" }
      ],
      summary: "Analyzed over 1.2 million customer ratings, mapping restaurant performance spatial distributions to recommend high-opportunity food sectors."
    },
    lessonsLearned: [
      "Geospatial clustering (like DBSCAN) reveals business opportunities that simple averages hide.",
      "Text cleaning (lemmatization and stop-word removal) is essential for tokenizing local food reviews."
    ],
    futureImprovements: [
      "Integrating dynamic traffic and demographic APIs.",
      "Building a live Streamlit web application for interactive user queries."
    ],
    screenshots: ["/projects/pneustack.png"],
    workflow: [
      "1. Import raw Zomato database into SQL.",
      "2. Perform coordinate lookup and geocode locations.",
      "3. Conduct sentiment scoring on review columns.",
      "4. Run density clustering to identify saturated markets.",
      "5. Render geospatial heatmaps in Jupyter Notebook."
    ],
    relatedProjectIds: ["gmsac-gujarati-sentiment", "multi-agent-marketing-ai"]
  },
  {
    id: "credit-card-fraud",
    title: "Credit Card Fraud Detection",
    ribbon: "Financial ML",
    ribbonColor: "bg-rose-500 text-white shadow-rose-500/50",
    category: "📊 Data Science",
    shortDescription: "A machine learning pipeline for detecting fraudulent credit card transactions using feature engineering, model evaluation, and classification techniques.",
    problemSolved: "Financial institutions require accurate fraud detection while minimizing false positives in highly imbalanced transaction data.",
    thumbnail: "/projects/deepfake.png",
    technologies: ["Python", "Scikit-learn", "Machine Learning"],
    githubUrl: "https://github.com/Param-Pandya/End-to-End_Credit-card_Fraud_Detection",
    overview: "This project implements an end-to-end classification system for bank transactions. It utilizes resampling strategies and ensemble classifiers to identify fraudulent transactions with high precision.",
    problem: "Fraud makes up less than 0.2% of all credit card actions. Standard algorithms fail as they default to guessing the majority class, causing severe security gaps.",
    architecture: {
      title: "Imbalanced Classification Pipeline",
      description: "Data undergoes scaling and SMOTE resampling before training. Ensemble models (Random Forest, XGBoost) classify transactions, validated by recall metrics.",
      components: ["Data Scaling Engine", "SMOTE Resampler", "XGBoost Classifier Core", "Precision-Recall Evaluator"],
      diagramSnippet: "Imbalanced Data -> SMOTE Resampling -> XGBoost Classifier -> Precision-Recall Tuning -> Action Trigger"
    },
    implementation: "Written in Python using scikit-learn, XGBoost, and pandas. The pipeline evaluates models using strict Precision-Recall AUC rather than standard accuracy.",
    techStack: [
      { category: "ML & Math", tools: ["Scikit-learn", "XGBoost", "Imbalanced-learn"] },
      { category: "Data Processing", tools: ["Pandas", "NumPy", "Matplotlib"] }
    ],
    challenges: [
      "Reducing the false positive rate to prevent flagging valid customer transactions.",
      "Ensuring real-time execution speeds for transactional screening streams."
    ],
    results: {
      metrics: [
        { label: "Fraud Recall", value: "94%" },
        { label: "False Positive Rate", value: "<0.1%" },
        { label: "AUC-ROC Score", value: "0.97" },
        { label: "Model Size", value: "<5MB" }
      ],
      summary: "Built a detection system scoring 94% recall on fraudulent operations, while keeping false alarms to under 0.1% of all evaluated transactions."
    },
    lessonsLearned: [
      "Standard accuracy is an invalid metric for imbalanced fraud datasets; F1 and PR-AUC are far more descriptive.",
      "Feature scaling (RobustScaler) handles extreme transaction values without scaling anomalies."
    ],
    futureImprovements: [
      "Integrating deep learning Autoencoders for semi-supervised anomaly detection.",
      "Configuring the model inside a streaming Apache Kafka pipeline."
    ],
    screenshots: ["/projects/deepfake.png"],
    workflow: [
      "1. Load transaction records and apply robust scaling.",
      "2. Perform SMOTE to address class imbalance.",
      "3. Train random forest and XGBoost models.",
      "4. Tune classification thresholds using PR-curves.",
      "5. Save classification model for API integration."
    ],
    relatedProjectIds: ["algorithmic-trading", "face-hand-segmentation"]
  },
  {
    id: "algorithmic-trading",
    title: "Algorithmic Trading",
    ribbon: "Quantitative Finance",
    ribbonColor: "bg-emerald-500 text-white shadow-emerald-500/50",
    category: "📊 Data Science",
    shortDescription: "A quantitative trading project exploring algorithmic strategies, historical market analysis, and automated decision-making.",
    problemSolved: "Manual trading strategies struggle to react consistently to rapidly changing market conditions.",
    thumbnail: "/projects/biogpt.png",
    technologies: ["Python", "Pandas", "Financial Data Analysis"],
    githubUrl: "https://github.com/Param-Pandya/algo_trading_project",
    overview: "This project develops and backtests trading models. By analyzing historical daily and intraday stock datasets, it gauges the profitability of trend-following and mean-reversion rules.",
    problem: "Retail traders lack quantitative backtesting tools, exposing them to human bias and excessive market risk without statistical validation.",
    architecture: {
      title: "Historical Backtesting Engine",
      description: "Data is loaded, technical indicators (MACD, RSI) are computed, and a state engine executes buy/sell signals. Metrics like drawdown and Sharpe ratio are calculated.",
      components: ["Indicator Calculator", "Signal State Engine", "Portfolio Backtester", "Risk Metric Reporter"],
      diagramSnippet: "Market Data -> Indicator Calculator -> Signal Engine -> Portfolio Execution Simulator -> Performance Report"
    },
    implementation: "Implemented in Python using pandas, numpy, and backtrader. Interactive charts are generated using bokeh and matplotlib to view portfolio equity curves.",
    techStack: [
      { category: "Financial ML & Analytics", tools: ["Backtrader", "Pandas", "NumPy"] },
      { category: "Data Sources", tools: ["Yahoo Finance API", "Quantopian datasets"] }
    ],
    challenges: [
      "Avoiding look-ahead bias and overfitting when parameter-tuning strategies.",
      "Accounting for transaction commissions and slippage in backtest returns."
    ],
    results: {
      metrics: [
        { label: "Sharpe Ratio", value: "2.1" },
        { label: "Backtest Period", value: "5 Years" },
        { label: "Supported Strategies", value: "3" },
        { label: "Max Drawdown", value: "8.5%" }
      ],
      summary: "Simulated automated strategies across 5 years of historical stock data, achieving a Sharpe ratio of 2.1 with strict risk boundaries."
    },
    lessonsLearned: [
      "A strategy that works on paper often fails in production if execution slippage is not modeled.",
      "Diversifying signals across uncorrelated assets reduces overall maximum drawdown."
    ],
    futureImprovements: [
      "Implementing sentiment signals from financial news using fine-tuned FinBERT.",
      "Deploying the logic to interact with live paper-trading APIs (e.g. Alpaca)."
    ],
    screenshots: ["/projects/biogpt.png"],
    workflow: [
      "1. Retrieve historical OHLCV data.",
      "2. Calculate technical indicators (moving averages, RSI).",
      "3. Evaluate trading criteria to trigger buy/sell signals.",
      "4. Run portfolio simulation accounting for commission.",
      "5. Analyze risk metrics (Sharpe ratio, drawdown, ROI)."
    ],
    relatedProjectIds: ["credit-card-fraud", "zomato-geospatial-nlp"]
  }
];

export function getProjectById(id: string): ProjectCaseStudy | undefined {
  return projectsData.find((p) => p.id === id);
}
