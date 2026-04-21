import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    console.log("Incoming form data:", data);

    const webhookUrl = process.env.WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("Missing WEBHOOK_URL env var");
      return NextResponse.json({ success: false }, { status: 500 });
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
      console.error("Webhook forward failed", res.status, await res.text());
      return NextResponse.json({ success: false }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
