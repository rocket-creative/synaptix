import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

// ---------------------------------------------------------------------------
// Schemas
// ---------------------------------------------------------------------------

const PatientIntakeSchema = z.object({
  form_type: z.literal("patient_intake").optional(),
  name: z.string().min(1).max(100),
  phone: z.string().min(7).max(30),
  email: z.string().email().max(254),
  injury_type: z.enum(["work", "auto", "sports", "other"]).optional(),
  injury_date: z.string().max(20).optional(),
  visit_type: z.enum(["telehealth", "in_person", "no_preference"]).optional(),
  referred_by: z.string().max(100).optional(),
  note: z.string().max(2000).optional(),
});

const WorkersCompSchema = z.object({
  form_type: z.literal("workers_comp_auto"),
  name: z.string().min(1).max(100),
  phone: z.string().min(7).max(30),
  email: z.string().email().max(254),
  claim_type: z.enum(["workers_comp", "no_fault", "both"]),
  date_of_injury: z.string().max(20).optional(),
  carrier: z.string().max(200).optional(),
  claim_number: z.string().max(100).optional(),
  attorney_name: z.string().max(100).optional(),
  note: z.string().max(2000).optional(),
});

const AttorneyReferralSchema = z.object({
  form_type: z.literal("attorney_referral"),
  attorney_name: z.string().min(1).max(100),
  firm_name: z.string().min(1).max(200),
  phone: z.string().min(7).max(30),
  email: z.string().email().max(254),
  case_type: z.string().max(100).optional(),
  case_volume: z.string().max(50).optional(),
  state: z.string().max(100).optional(),
  notes: z.string().max(2000).optional(),
});

const SoftwareLicenseSchema = z.object({
  form_type: z.literal("software_license"),
  contact_name: z.string().min(1).max(100),
  title: z.string().max(100).optional(),
  practice_name: z.string().min(1).max(200),
  phone: z.string().min(7).max(30),
  email: z.string().email().max(254),
  specialty: z.string().min(1).max(100),
  practice_size: z.string().max(50).optional(),
  concussion_volume: z.string().max(50).optional(),
  billing_support: z.enum(["kronos_revenue", "self", "undecided"]).optional(),
  message: z.string().max(2000).optional(),
});

const HospitalInsurerSchema = z.object({
  form_type: z.literal("hospital_insurer_license"),
  contact_name: z.string().min(1).max(100),
  title: z.string().max(100).optional(),
  organization: z.string().min(1).max(200),
  phone: z.string().min(7).max(30),
  email: z.string().email().max(254),
  organization_type: z.enum(["hospital", "insurer", "asc", "other"]).optional(),
  facility_count: z.string().max(50).optional(),
  current_program: z.enum(["none", "informal", "formal"]).optional(),
  message: z.string().max(2000).optional(),
});

// Legacy DemoRequestForm schema (kept intact)
const LegacyDemoSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(254),
  practice: z.string().min(1).max(200),
  specialty: z.string().min(1).max(100),
  message: z.string().max(2000).optional(),
  product: z.string().max(100).optional(),
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function ts(): string {
  return (
    new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
      dateStyle: "full",
      timeStyle: "short",
    }) + " ET"
  );
}

const DIV = "--------------------------------------------------------------------------------";
const HDR = "================================================================================";

function header(label: string) {
  return `${HDR}\nSYNAPTIX — ${label.toUpperCase()}\n${HDR}`;
}

// ---------------------------------------------------------------------------
// Email builders
// ---------------------------------------------------------------------------

function buildPatientIntakeEmail(d: z.infer<typeof PatientIntakeSchema>) {
  const injuryLabels: Record<string, string> = {
    work: "Work-related / workers' comp",
    auto: "Auto accident / no-fault",
    sports: "Sports or athletic",
    other: "Other / general",
  };
  const visitLabels: Record<string, string> = {
    telehealth: "Telehealth",
    in_person: "In-person NY",
    no_preference: "No preference",
  };
  return {
    subject: `[Synaptix] Patient Intake — ${injuryLabels[d.injury_type ?? ""] ?? d.injury_type ?? "General"} — ${d.name}`,
    text: [
      header("Patient Intake — Concussion Evaluation Request"),
      `\nSUBMITTED:  ${ts()}\n`,
      DIV, "PATIENT DETAILS", DIV,
      `Name:         ${d.name}`,
      `Phone:        ${d.phone}`,
      `Email:        ${d.email}`,
      `\n${DIV}\nINJURY & VISIT\n${DIV}`,
      `Injury type:    ${injuryLabels[d.injury_type ?? ""] ?? d.injury_type ?? "—"}`,
      `Injury date:    ${d.injury_date ?? "—"}`,
      `Visit type:     ${visitLabels[d.visit_type ?? ""] ?? d.visit_type ?? "—"}`,
      `Referred by:    ${d.referred_by ?? "—"}`,
      d.note?.trim() ? `\n${DIV}\nNOTES\n${DIV}\n\n${d.note.trim()}` : null,
      `\n${HDR}`,
    ].filter(Boolean).join("\n"),
  };
}

function buildWorkersCompEmail(d: z.infer<typeof WorkersCompSchema>) {
  const claimLabels: Record<string, string> = {
    workers_comp: "Workers' compensation",
    no_fault: "No-fault / auto",
    both: "Both",
  };
  return {
    subject: `[Synaptix] WC / No-Fault Referral — ${claimLabels[d.claim_type]} — ${d.name}`,
    text: [
      header("Workers' Comp / No-Fault Patient Referral"),
      `\nSUBMITTED:  ${ts()}\n`,
      DIV, "PATIENT DETAILS", DIV,
      `Name:          ${d.name}`,
      `Phone:         ${d.phone}`,
      `Email:         ${d.email}`,
      `\n${DIV}\nCLAIM DETAILS\n${DIV}`,
      `Claim type:    ${claimLabels[d.claim_type]}`,
      `Date of injury: ${d.date_of_injury ?? "—"}`,
      `Carrier:       ${d.carrier ?? "—"}`,
      `Claim number:  ${d.claim_number ?? "—"}`,
      `Attorney:      ${d.attorney_name ?? "—"}`,
      d.note?.trim() ? `\n${DIV}\nNOTES\n${DIV}\n\n${d.note.trim()}` : null,
      `\n${HDR}`,
    ].filter(Boolean).join("\n"),
  };
}

function buildAttorneyReferralEmail(d: z.infer<typeof AttorneyReferralSchema>) {
  return {
    subject: `[Synaptix] Attorney Referral — ${d.firm_name} — ${d.attorney_name}`,
    text: [
      header("PI / Workers' Comp Attorney Referral"),
      `\nSUBMITTED:  ${ts()}\n`,
      DIV, "ATTORNEY DETAILS", DIV,
      `Attorney:     ${d.attorney_name}`,
      `Firm:         ${d.firm_name}`,
      `Phone:        ${d.phone}`,
      `Email:        ${d.email}`,
      d.state ? `State(s):     ${d.state}` : null,
      `\n${DIV}\nCASE DETAILS\n${DIV}`,
      `Case type:    ${d.case_type ?? "—"}`,
      `Case volume:  ${d.case_volume ?? "—"}`,
      d.notes?.trim() ? `\n${DIV}\nNOTES\n${DIV}\n\n${d.notes.trim()}` : null,
      `\n${HDR}`,
    ].filter(Boolean).join("\n"),
  };
}

function buildSoftwareLicenseEmail(d: z.infer<typeof SoftwareLicenseSchema>) {
  const billingLabels: Record<string, string> = {
    kronos_revenue: "Yes, interested in Kronos Revenue billing",
    self: "Will handle billing ourselves",
    undecided: "Undecided",
  };
  return {
    subject: `[Synaptix] Software License Inquiry — ${d.practice_name} — ${d.contact_name}`,
    text: [
      header("Software Licensing — Specialist Practice"),
      `\nSUBMITTED:  ${ts()}\n`,
      DIV, "CONTACT", DIV,
      `Name:         ${d.contact_name}`,
      d.title ? `Title:        ${d.title}` : null,
      `Practice:     ${d.practice_name}`,
      `Phone:        ${d.phone}`,
      `Email:        ${d.email}`,
      `\n${DIV}\nPRACTICE DETAILS\n${DIV}`,
      `Specialty:             ${d.specialty}`,
      `Practice size:         ${d.practice_size ?? "—"}`,
      `Concussion volume/mo:  ${d.concussion_volume ?? "—"}`,
      `Billing support:       ${billingLabels[d.billing_support ?? ""] ?? d.billing_support ?? "—"}`,
      d.message?.trim() ? `\n${DIV}\nNOTES\n${DIV}\n\n${d.message.trim()}` : null,
      `\n${HDR}`,
    ].filter(Boolean).join("\n"),
  };
}

function buildHospitalInsurerEmail(d: z.infer<typeof HospitalInsurerSchema>) {
  const orgLabels: Record<string, string> = {
    hospital: "Hospital / health system",
    insurer: "Insurer / payer",
    asc: "ASC / surgical center",
    other: "Other",
  };
  const programLabels: Record<string, string> = {
    none: "No concussion program",
    informal: "Informal / referral only",
    formal: "Formal program exists",
  };
  return {
    subject: `[Synaptix] System / Insurer License — ${d.organization} — ${d.contact_name}`,
    text: [
      header("Hospital / Health-System or Insurer License Inquiry"),
      `\nSUBMITTED:  ${ts()}\n`,
      DIV, "CONTACT", DIV,
      `Name:           ${d.contact_name}`,
      d.title ? `Title:          ${d.title}` : null,
      `Organization:   ${d.organization}`,
      `Phone:          ${d.phone}`,
      `Email:          ${d.email}`,
      `\n${DIV}\nORGANIZATION DETAILS\n${DIV}`,
      `Type:               ${orgLabels[d.organization_type ?? ""] ?? d.organization_type ?? "—"}`,
      `Facility count:     ${d.facility_count ?? "—"}`,
      `Current program:    ${programLabels[d.current_program ?? ""] ?? d.current_program ?? "—"}`,
      d.message?.trim() ? `\n${DIV}\nNOTES\n${DIV}\n\n${d.message.trim()}` : null,
      `\n${HDR}`,
    ].filter(Boolean).join("\n"),
  };
}

function buildLegacyDemoEmail(d: z.infer<typeof LegacyDemoSchema>) {
  const SPECIALTY_LABELS: Record<string, string> = {
    orthopedic: "Orthopedic Surgery",
    neurosurgery: "Neurosurgery",
    "sports-medicine": "Sports Medicine",
    neurology: "Neurology",
    "concussion-program": "Concussion Program",
    other: "Other",
  };
  const specialtyLabel = SPECIALTY_LABELS[d.specialty] ?? d.specialty;
  return {
    subject: `[Synaptix] Beta Access Request — ${specialtyLabel} — ${d.name}`,
    text: [
      header("Demo / Beta Access Request"),
      `\nSITE:       www.synaptix.health`,
      `SUBMITTED:  ${ts()}\n`,
      DIV, "CONTACT DETAILS", DIV,
      `Name:         ${d.name}`,
      `Email:        ${d.email}`,
      `Practice:     ${d.practice}`,
      `Specialty:    ${specialtyLabel}`,
      d.message?.trim() ? `\n${DIV}\nMESSAGE\n${DIV}\n\n${d.message.trim()}` : null,
      `\n${HDR}`,
    ].filter(Boolean).join("\n"),
  };
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const raw = body as Record<string, unknown>;

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }

    const formType = typeof raw.form_type === "string" ? raw.form_type : null;

    let emailPayload: { subject: string; text: string };
    let replyTo: string;

    if (formType === "workers_comp_auto") {
      const p = WorkersCompSchema.safeParse(body);
      if (!p.success) return NextResponse.json({ error: "Invalid form data", details: p.error.flatten() }, { status: 400 });
      emailPayload = buildWorkersCompEmail(p.data);
      replyTo = p.data.email;
    } else if (formType === "attorney_referral") {
      const p = AttorneyReferralSchema.safeParse(body);
      if (!p.success) return NextResponse.json({ error: "Invalid form data", details: p.error.flatten() }, { status: 400 });
      emailPayload = buildAttorneyReferralEmail(p.data);
      replyTo = p.data.email;
    } else if (formType === "software_license") {
      const p = SoftwareLicenseSchema.safeParse(body);
      if (!p.success) return NextResponse.json({ error: "Invalid form data", details: p.error.flatten() }, { status: 400 });
      emailPayload = buildSoftwareLicenseEmail(p.data);
      replyTo = p.data.email;
    } else if (formType === "hospital_insurer_license") {
      const p = HospitalInsurerSchema.safeParse(body);
      if (!p.success) return NextResponse.json({ error: "Invalid form data", details: p.error.flatten() }, { status: 400 });
      emailPayload = buildHospitalInsurerEmail(p.data);
      replyTo = p.data.email;
    } else if (formType === "patient_intake" || raw.injury_type !== undefined || raw.visit_type !== undefined) {
      const p = PatientIntakeSchema.safeParse(body);
      if (!p.success) return NextResponse.json({ error: "Invalid form data", details: p.error.flatten() }, { status: 400 });
      emailPayload = buildPatientIntakeEmail(p.data);
      replyTo = p.data.email;
    } else {
      // Legacy DemoRequestForm (has `practice` and `specialty` fields, no form_type)
      const p = LegacyDemoSchema.safeParse(body);
      if (!p.success) return NextResponse.json({ error: "Invalid form data", details: p.error.flatten() }, { status: 400 });
      emailPayload = buildLegacyDemoEmail(p.data);
      replyTo = p.data.email;
    }

    const toEmail = process.env.CONTACT_EMAIL ?? "info@kronoshealth.co";
    const resend = new Resend(apiKey);
    const { error: sendError } = await resend.emails.send({
      from: "Synaptix <noreply@synaptix.health>",
      to: [toEmail],
      replyTo,
      subject: emailPayload.subject,
      text: emailPayload.text,
    });

    if (sendError) {
      return NextResponse.json({ error: "Email send failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
