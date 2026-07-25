import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, opportunity, message } = body;

    // Simple validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 }
      );
    }

    console.log("================= CONTACT FORM SUBMISSION =================");
    console.log(`From Name:   ${name}`);
    console.log(`From Email:  ${email}`);
    console.log(`Opportunity: ${opportunity}`);
    console.log(`Message:     ${message}`);
    console.log("==========================================================");

    const WEB3FORMS_KEY = process.env.WEB3FORMS_KEY;

    if (WEB3FORMS_KEY) {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name,
          email,
          subject: `Portfolio Contact: ${opportunity} - ${name}`,
          message: `Opportunity Focus: ${opportunity}\n\nMessage:\n${message}`,
        }),
      });

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        console.error("Web3Forms API Error:", resData);
        throw new Error(resData.message || "Web3Forms submission failed.");
      }
    } else {
      console.log("[Simulation Mode] WEB3FORMS_KEY is not defined. Message logged to console.");
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message processed successfully. Param will get back to you soon!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API contact error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing your message. Please try again.",
      },
      { status: 500 }
    );
  }
}
