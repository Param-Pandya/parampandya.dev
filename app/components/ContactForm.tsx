"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";

export default function ContactForm(): React.JSX.Element {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [opportunity, setOpportunity] = useState("Job Opportunity");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("error");
      setStatusMessage("Please fill in all required fields.");
      return;
    }

    setStatus("sending");
    setStatusMessage("");

    // Audit logs for debugging in production
    console.log("=== CONTACT FORM SUBMISSION AUDIT ===");
    const apiKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    console.log("NEXT_PUBLIC_WEB3FORMS_KEY check:", {
      exists: !!apiKey,
      length: apiKey ? apiKey.length : 0,
      type: typeof apiKey
    });

    if (!apiKey) {
      console.warn("WARNING: NEXT_PUBLIC_WEB3FORMS_KEY is undefined. Form submission will fail.");
      setStatus("error");
      setStatusMessage(
        "Form submission is misconfigured. NEXT_PUBLIC_WEB3FORMS_KEY is missing in production environment variables."
      );
      console.log("=== END CONTACT FORM SUBMISSION AUDIT ===");
      return;
    }

    try {
      console.log("Initiating fetch() request to Web3Forms...");
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          access_key: apiKey,
          name,
          email,
          subject: `Portfolio Contact: ${opportunity} - ${name}`,
          message: `Opportunity Focus: ${opportunity}\n\nMessage:\n${message}`,
        }),
      });

      console.log("Fetch executed. HTTP Status Code:", response.status);
      console.log("Response OK status:", response.ok);

      let data: any = null;
      try {
        data = await response.json();
        console.log("Decoded Web3Forms Response Body:", JSON.stringify(data));
      } catch (jsonParseErr) {
        console.error("Failed to parse response body as JSON:", jsonParseErr);
        try {
          const rawText = await response.text();
          console.log("Raw Response Text (first 500 chars):", rawText.substring(0, 500));
        } catch (textReadErr) {
          console.error("Failed to read raw response text:", textReadErr);
        }
      }

      // Explicitly check for data.success === true to render the success UI
      if (response.ok && data && data.success === true) {
        console.log("Success condition met: response.ok and data.success === true");
        setStatus("success");
        setName("");
        setEmail("");
        setOpportunity("Job Opportunity");
        setMessage("");
      } else {
        console.warn("Failure condition met. Success UI will NOT be shown.");
        setStatus("error");
        setStatusMessage(
          (data && data.message) || 
          `Form submission failed with status ${response.status}. Please try again.`
        );
      }
    } catch (err) {
      console.error("Form submission caught exception:", err);
      
      // Log detailed error properties to help developers inspect the error
      if (err instanceof Error) {
        console.error("Error Name:", err.name);
        console.error("Error Message:", err.message);
        console.error("Error Stack:", err.stack);
      } else {
        console.error("Non-Error Exception:", String(err));
      }

      setStatus("error");
      
      // Provide a helpful message if it looks like an ad-blocker / privacy extension block
      const isAdBlocker = err instanceof Error && (
        err.message.includes("Failed to fetch") || 
        err.name === "TypeError" ||
        err.message.includes("NetworkError") ||
        err.message.includes("Load failed")
      );

      if (isAdBlocker) {
        setStatusMessage(
          "Network request was blocked (likely by an ad-blocker or tracking protection extension). " +
          "Please temporarily disable it or email Param directly at pandyaparam7@gmail.com."
        );
      } else {
        setStatusMessage("An unexpected network error occurred. Please try again later.");
      }
    } finally {
      console.log("=== END CONTACT FORM SUBMISSION AUDIT ===");
    }
  };

  if (status === "success") {
    return (
      <div className="glass-card rounded-3xl p-8 sm:p-10 border border-emerald-500/30 bg-emerald-950/20 text-center space-y-6 animate-in fade-in duration-300">
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <CheckCircle2 className="w-10 h-10" />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white tracking-tight">Message Sent Successfully!</h3>
          <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
            Thank you for reaching out. Your message has been received by Param's system, and he will get back to you shortly.
          </p>
        </div>
        <button
          onClick={() => setStatus("idle")}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-mono font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all cursor-pointer"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-10 border border-white/15 bg-slate-950/90 shadow-2xl space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-white tracking-tight">Send a Direct Message</h2>
        <p className="text-slate-400 text-xs font-mono">
          Your message will be processed and sent directly to Param's inbox.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5 text-left">
            <label className="text-slate-300 font-bold">YOUR NAME *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Hiring Manager / Collaborator"
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-slate-200 focus:outline-none focus:border-indigo-500 text-xs font-mono placeholder:text-slate-600"
              required
              disabled={status === "sending"}
            />
          </div>

          <div className="space-y-1.5 text-left">
            <label className="text-slate-300 font-bold">YOUR EMAIL *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-slate-200 focus:outline-none focus:border-indigo-500 text-xs font-mono placeholder:text-slate-600"
              required
              disabled={status === "sending"}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5 text-left col-span-1 sm:col-span-2">
            <label className="text-slate-300 font-bold">OPPORTUNITY / REASON</label>
            <select
              value={opportunity}
              onChange={(e) => setOpportunity(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-slate-200 focus:outline-none focus:border-indigo-500 text-xs font-mono"
              disabled={status === "sending"}
            >
              <option value="Job Opportunity">Full-Time AI Engineering Role</option>
              <option value="Research Collaboration">IEEE / Research Collaboration</option>
              <option value="Freelance/Consulting">Technical AI Consulting</option>
              <option value="General Inquiry">General Technical Inquiry</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5 text-left">
          <label className="text-slate-300 font-bold">YOUR MESSAGE *</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder="Share role details, project scope, or research ideas..."
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-slate-200 focus:outline-none focus:border-indigo-500 text-xs font-mono placeholder:text-slate-600"
            required
            disabled={status === "sending"}
          ></textarea>
        </div>

        {status === "error" && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[11px] leading-relaxed">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-mono font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/25 disabled:opacity-50 cursor-pointer"
        >
          {status === "sending" ? (
            <>
              <span>Sending Message...</span>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            </>
          ) : (
            <>
              <span>Send Message to Param</span>
              <Send className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
