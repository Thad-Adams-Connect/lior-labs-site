import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { sendInquiryEmail } from "@/lib/sendInquiryEmail";
import type { QuotePayload } from "@/components/quote/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  // ── Parse body ──────────────────────────────────────────────────────────
  let data: unknown;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return NextResponse.json(
      { success: false, error: "Expected a JSON object" },
      { status: 400 },
    );
  }

  const payload = data as QuotePayload;

  // ── Validate required contact fields ────────────────────────────────────
  const { name, email, businessName } = payload.contact ?? {};

  if (!name?.trim() || !email?.trim() || !businessName?.trim()) {
    return NextResponse.json(
      {
        success: false,
        error: "Missing required contact fields: name, email, and businessName.",
      },
      { status: 422 },
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { success: false, error: "Invalid email address." },
      { status: 422 },
    );
  }

  // ── Enrich & send ────────────────────────────────────────────────────────
  if (!payload.submittedAt) {
    payload.submittedAt = new Date().toISOString();
  }

  const submissionId = randomUUID();

  try {
    await sendInquiryEmail({ payload, submissionId });
  } catch (err) {
    console.error("[contact] sendInquiryEmail failed:", err);
    return NextResponse.json(
      {
        success: false,
        error:
          err instanceof Error ? err.message : "Failed to send email. Please try again.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true, submissionId }, { status: 200 });
}
