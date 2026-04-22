import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    let data: unknown;
    try {
      data = await req.json();
    } catch (error) {
      console.error("Invalid JSON:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Invalid JSON body",
        },
        { status: 400 },
      );
    }

    if (!data || typeof data !== "object" || Array.isArray(data)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid JSON body (expected an object)",
        },
        { status: 400 },
      );
    }

    const payload = data as Record<string, unknown>;

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

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12_000);

    let res: Response;
    try {
      res = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...payload,
          submittedAt: new Date().toISOString(),
        }),
        signal: controller.signal,
      });
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return NextResponse.json(
          {
            success: false,
            error: "Webhook request timed out",
          },
          { status: 504 },
        );
      }

      console.error("Webhook request failed:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Webhook request failed",
        },
        { status: 502 },
      );
    } finally {
      clearTimeout(timeout);
    }

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
