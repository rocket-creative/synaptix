import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  practice: z.string().min(1, "Practice name is required"),
  specialty: z.string().min(1, "Specialty is required"),
  message: z.string().optional(),
  product: z.string().optional(),
});

const SPECIALTY_LABELS: Record<string, string> = {
  orthopedic: "Orthopedic Surgery",
  neurosurgery: "Neurosurgery",
  "sports-medicine": "Sports Medicine",
  neurology: "Neurology",
  "concussion-program": "Concussion Program",
  other: "Other",
};

function formatSpecialty(specialty: string): string {
  return SPECIALTY_LABELS[specialty] ?? specialty;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    const { name, email, practice, specialty, message, product } = validatedData;
    const specialtyLabel = formatSpecialty(specialty);
    const serviceLabel = product ?? "Synaptix";

    const subject = `[Synaptix] Beta Access Request — ${specialtyLabel} — ${name}`;

    const emailBody = `
================================================================================
SYNAPTIX — DEMO REQUEST
================================================================================

SITE:       synaptix.com
FORM:       Beta Access Request
SERVICE:    ${serviceLabel}

SUBMITTED:  ${new Date().toLocaleString("en-US", { timeZone: "America/New_York", dateStyle: "full", timeStyle: "short" })} ET

--------------------------------------------------------------------------------
CONTACT DETAILS
--------------------------------------------------------------------------------

Name:         ${name}
Email:        ${email}
Practice:     ${practice}
Specialty:    ${specialtyLabel}

--------------------------------------------------------------------------------
MESSAGE
--------------------------------------------------------------------------------

${message?.trim() ? message.trim() : "(No message provided)"}

================================================================================
    `.trim();

    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: "Synaptix <noreply@kronoshealth.co>",
        to: ["info@kronoshealth.co"],
        replyTo: email,
        subject,
        text: emailBody,
      });
    } else {
      console.log("Email would be sent (no RESEND_API_KEY configured):", { subject, body: emailBody });
    }

    return NextResponse.json(
      { success: true, message: "Demo request submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      );
    }

    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred" },
      { status: 500 }
    );
  }
}
