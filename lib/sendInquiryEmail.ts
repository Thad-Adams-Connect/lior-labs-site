import nodemailer from "nodemailer";
import type { QuotePayload } from "@/components/quote/types";

export interface SendInquiryEmailOptions {
  payload: QuotePayload;
  submissionId: string;
}

// ---------------------------------------------------------------------------
// SMTP transport
// ---------------------------------------------------------------------------

function getTransport() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT ?? "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error(
      "Missing SMTP configuration. Ensure SMTP_HOST, SMTP_USER, and SMTP_PASS are set in .env.local.",
    );
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

// ---------------------------------------------------------------------------
// Email HTML template — dark, premium, Apple-like aesthetic
// ---------------------------------------------------------------------------

function formatProjectType(raw: string): string {
  return raw.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function buildEmailHtml(payload: QuotePayload, submissionId: string): string {
  const { contact, projectOverview, budgetAndTimeline, goals, scope } = payload;

  const submittedDate = new Date(payload.submittedAt).toLocaleString("en-US", {
    timeZone: "UTC",
    dateStyle: "long",
    timeStyle: "short",
  });

  const rows: { label: string; value: string }[] = [
    { label: "Client Name", value: contact.name },
    { label: "Business Name", value: contact.businessName },
    { label: "Email", value: contact.email },
    { label: "Project Type", value: formatProjectType(projectOverview.projectType) },
    { label: "Budget", value: budgetAndTimeline.budgetRange },
    { label: "Timeline", value: budgetAndTimeline.timeline },
    { label: "Readiness to Start", value: budgetAndTimeline.readinessToStart },
    { label: "Complexity", value: scope.complexity },
    { label: "Main Goal", value: goals.mainGoal },
    ...(contact.notes.trim() ? [{ label: "Additional Notes", value: contact.notes }] : []),
    ...(projectOverview.businessDescription.trim()
      ? [{ label: "Business Description", value: projectOverview.businessDescription }]
      : []),
  ];

  const rowsHtml = rows
    .map(
      ({ label, value }) => `
      <tr>
        <td style="padding: 13px 0; border-bottom: 1px solid #1c1c1c; color: #6b7280; font-size: 12.5px; font-weight: 500; letter-spacing: 0.2px; width: 160px; vertical-align: top; white-space: nowrap;">${label}</td>
        <td style="padding: 13px 0 13px 16px; border-bottom: 1px solid #1c1c1c; color: #e5e7eb; font-size: 14px; line-height: 1.55; vertical-align: top;">${value}</td>
      </tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Lior Labs Project Inquiry</title>
</head>
<body style="margin: 0; padding: 0; background-color: #080808; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #080808; padding: 48px 20px 56px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%;">

          <!-- ── Brand header ── -->
          <tr>
            <td style="padding-bottom: 28px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <span style="color: #ffffff; font-size: 17px; font-weight: 700; letter-spacing: -0.4px; display: inline-block;">
                      Lior<span style="color: #7c5cdb;">Labs</span>
                    </span>
                  </td>
                  <td align="right">
                    <span style="display: inline-block; background-color: #18102e; color: #a78bfa; font-size: 10.5px; font-weight: 600; padding: 5px 12px; border-radius: 99px; letter-spacing: 0.8px; text-transform: uppercase; border: 1px solid #2e1f5e;">
                      New Inquiry
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── Main card ── -->
          <tr>
            <td style="background-color: #0d0d0d; border: 1px solid #1c1c1c; border-radius: 20px; overflow: hidden;">

              <!-- Card top accent bar -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background: linear-gradient(90deg, #3b1f8a 0%, #6134c1 50%, #9b59d6 100%); height: 3px; font-size: 0; line-height: 0;">&nbsp;</td>
                </tr>
              </table>

              <!-- Card header -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding: 32px 36px 28px;">
                    <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 11px; font-weight: 600; letter-spacing: 1.2px; text-transform: uppercase;">Project Inquiry</p>
                    <h1 style="margin: 0 0 6px; color: #f9fafb; font-size: 26px; font-weight: 700; letter-spacing: -0.6px; line-height: 1.2;">${contact.name}</h1>
                    <p style="margin: 0; color: #9ca3af; font-size: 14px; line-height: 1.5;">
                      ${contact.businessName}
                      <span style="color: #374151;">&nbsp;·&nbsp;</span>
                      <a href="mailto:${contact.email}" style="color: #a78bfa; text-decoration: none;">${contact.email}</a>
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="border-top: 1px solid #1c1c1c; font-size: 0; line-height: 0;">&nbsp;</td>
                </tr>
              </table>

              <!-- Details table -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding: 24px 36px 8px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      ${rowsHtml}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Attachment note -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding: 20px 36px 32px;">
                    <p style="margin: 0; color: #4b5563; font-size: 12px; line-height: 1.6;">
                      Full submission data is attached as
                      <span style="color: #6b7280; font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', 'Courier New', monospace; background: #161616; padding: 2px 6px; border-radius: 4px; border: 1px solid #1c1c1c;">submission.json</span>
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ── Footer ── -->
          <tr>
            <td style="padding-top: 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <p style="margin: 0; color: #374151; font-size: 11.5px;">
                      ID&nbsp;
                      <span style="color: #4b5563; font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', 'Courier New', monospace;">${submissionId}</span>
                    </p>
                  </td>
                  <td align="right">
                    <p style="margin: 0; color: #374151; font-size: 11.5px;">${submittedDate} UTC</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Public export
// ---------------------------------------------------------------------------

export async function sendInquiryEmail({
  payload,
  submissionId,
}: SendInquiryEmailOptions): Promise<void> {
  const contactEmail = process.env.CONTACT_EMAIL;
  if (!contactEmail) {
    throw new Error(
      "Missing CONTACT_EMAIL environment variable. Set it in .env.local.",
    );
  }

  const transporter = getTransport();

  const senderEmail = process.env.SENDER_EMAIL;
  if (!senderEmail) {
    throw new Error(
      "Missing SENDER_EMAIL environment variable. Set it in .env.local.",
    );
  }

  const jsonAttachment = JSON.stringify(
    { submissionId, ...payload },
    null,
    2,
  );

  await transporter.sendMail({
    from: `"Lior Labs" <${senderEmail}>`,
    to: contactEmail,
    subject: `New Lior Labs Project Inquiry — ${payload.contact.name}`,
    html: buildEmailHtml(payload, submissionId),
    attachments: [
      {
        filename: "submission.json",
        content: jsonAttachment,
        contentType: "application/json",
      },
    ],
  });
}
