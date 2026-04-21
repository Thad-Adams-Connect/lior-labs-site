import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    console.log("Incoming form data:", data);

    const webhookUrl = process.env.WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("Missing WEBHOOK_URL env var");
      return NextResponse.json(
        {
          success: false,
          error: "Server is missing WEBHOOK_URL. Add it to .env.local and restart the dev server.",
        },
        { status: 500 },
      );
    }

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Webhook forward failed", res.status, text);
      return NextResponse.json(
        {
          success: false,
          error: "Webhook forward failed",
          status: res.status,
          details: text,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown server error",
      },
      { status: 500 },
    );
  }
}
