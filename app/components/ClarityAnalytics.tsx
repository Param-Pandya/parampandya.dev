"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

export default function ClarityAnalytics(): null {
  useEffect(() => {
    const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || "xs5dqv1mjw";
    
    // Only initialize Clarity in production and when the Project ID is provided
    if (process.env.NODE_ENV === "production" && clarityId) {
      console.log("Initializing Microsoft Clarity with Project ID...");
      Clarity.init(clarityId);
    } else {
      console.log("Microsoft Clarity initialization skipped (non-production environment or missing Project ID).");
    }
  }, []);

  return null;
}
