"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";

const inputClass =
  "w-full h-12 bg-black/20 border border-white/10 px-4 text-white placeholder:text-white/40 font-body font-light focus:outline-none focus:border-synaptix-cyan transition-colors";
const selectClass =
  "w-full h-12 bg-synaptix-bg border border-white/10 px-4 text-white font-body font-light focus:outline-none focus:border-synaptix-cyan transition-colors appearance-none";
const labelClass = "block font-body text-xs text-white/60 uppercase tracking-widest mb-1.5";
const errorClass = "text-red-400 text-xs mt-1";

const ORG_TYPES = [
  { value: "hospital", label: "Hospital / health system" },
  { value: "insurer", label: "Insurer / payer" },
  { value: "asc", label: "ASC / surgical center" },
  { value: "other", label: "Other" },
];

const FACILITY_COUNTS = ["1", "2–5", "6–20", "21–50", "Over 50"];

const CURRENT_PROGRAMS = [
  { value: "none", label: "No concussion program" },
  { value: "informal", label: "Informal / referral only" },
  { value: "formal", label: "Formal program exists" },
];

interface FieldErrors {
  contact_name?: string;
  organization?: string;
  phone?: string;
  email?: string;
  organization_type?: string;
}

export function HospitalInsurerForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function validate(fd: FormData): FieldErrors {
    const errors: FieldErrors = {};
    if (!String(fd.get("contact_name") ?? "").trim()) errors.contact_name = "Name is required";
    if (!String(fd.get("organization") ?? "").trim()) errors.organization = "Organization name is required";
    if (!String(fd.get("phone") ?? "").trim()) errors.phone = "Phone number is required";
    const email = String(fd.get("email") ?? "").trim();
    if (!email) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email address";
    if (!String(fd.get("organization_type") ?? "").trim()) errors.organization_type = "Organization type is required";
    return errors;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const errors = validate(fd);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form_type: "hospital_insurer_license",
          contact_name: fd.get("contact_name"),
          title: fd.get("title") || undefined,
          organization: fd.get("organization"),
          phone: fd.get("phone"),
          email: fd.get("email"),
          organization_type: fd.get("organization_type") || undefined,
          facility_count: fd.get("facility_count") || undefined,
          current_program: fd.get("current_program") || undefined,
          message: fd.get("message") || undefined,
        }),
      });
      if (!res.ok) throw new Error();
      setIsSubmitted(true);
      form.reset();
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-black/20 p-8 text-center">
        <CheckCircle className="w-12 h-12 text-synaptix-cyan mx-auto mb-4" aria-hidden="true" />
        <h3 className="font-heading text-2xl text-white mb-2">Inquiry Received</h3>
        <p className="font-body text-white/60 text-sm font-light">
          Thank you. We will reach out to discuss deploying Synaptix across your organization.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="hi-name" className={labelClass}>Your name <span className="text-synaptix-cyan">*</span></label>
          <input
            type="text" id="hi-name" name="contact_name" required
            autoComplete="name" inputMode="text" style={{ fontSize: "16px" }}
            aria-invalid={!!fieldErrors.contact_name}
            className={`${inputClass} ${fieldErrors.contact_name ? "border-red-400" : ""}`}
          />
          {fieldErrors.contact_name && <p className={errorClass} role="alert">{fieldErrors.contact_name}</p>}
        </div>
        <div>
          <label htmlFor="hi-title" className={labelClass}>Title</label>
          <input
            type="text" id="hi-title" name="title"
            placeholder="CMO, VP Clinical, Director…"
            autoComplete="organization-title" inputMode="text" style={{ fontSize: "16px" }}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="hi-org" className={labelClass}>Organization name <span className="text-synaptix-cyan">*</span></label>
        <input
          type="text" id="hi-org" name="organization" required
          autoComplete="organization" inputMode="text" style={{ fontSize: "16px" }}
          aria-invalid={!!fieldErrors.organization}
          className={`${inputClass} ${fieldErrors.organization ? "border-red-400" : ""}`}
        />
        {fieldErrors.organization && <p className={errorClass} role="alert">{fieldErrors.organization}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="hi-phone" className={labelClass}>Phone <span className="text-synaptix-cyan">*</span></label>
          <input
            type="tel" id="hi-phone" name="phone" required
            autoComplete="tel" inputMode="tel" style={{ fontSize: "16px" }}
            aria-invalid={!!fieldErrors.phone}
            className={`${inputClass} ${fieldErrors.phone ? "border-red-400" : ""}`}
          />
          {fieldErrors.phone && <p className={errorClass} role="alert">{fieldErrors.phone}</p>}
        </div>
        <div>
          <label htmlFor="hi-email" className={labelClass}>Work email <span className="text-synaptix-cyan">*</span></label>
          <input
            type="email" id="hi-email" name="email" required
            autoComplete="email" inputMode="email" style={{ fontSize: "16px" }}
            aria-invalid={!!fieldErrors.email}
            className={`${inputClass} ${fieldErrors.email ? "border-red-400" : ""}`}
          />
          {fieldErrors.email && <p className={errorClass} role="alert">{fieldErrors.email}</p>}
        </div>
      </div>

      <div>
        <p className={`${labelClass} ${fieldErrors.organization_type ? "text-red-400" : ""}`}>
          Organization type <span className="text-synaptix-cyan">*</span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-1">
          {ORG_TYPES.map((opt) => (
            <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio" name="organization_type" value={opt.value}
                className="accent-[#0FBDD5]"
                aria-invalid={!!fieldErrors.organization_type}
              />
              <span className="font-body text-sm text-white/70 group-hover:text-white transition-colors">{opt.label}</span>
            </label>
          ))}
        </div>
        {fieldErrors.organization_type && <p className={errorClass} role="alert">{fieldErrors.organization_type}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="hi-facilities" className={labelClass}>Number of facilities</label>
          <div className="relative">
            <select id="hi-facilities" name="facility_count" className={selectClass} defaultValue="">
              <option value="">Select range</option>
              {FACILITY_COUNTS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </div>
      </div>

      <div>
        <p className={labelClass}>Current concussion program</p>
        <div className="space-y-2.5 mt-1">
          {CURRENT_PROGRAMS.map((opt) => (
            <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
              <input type="radio" name="current_program" value={opt.value} className="accent-[#0FBDD5]" />
              <span className="font-body text-sm text-white/70 group-hover:text-white transition-colors">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="hi-message" className={labelClass}>Message (optional)</label>
        <textarea
          id="hi-message" name="message" rows={3}
          style={{ fontSize: "16px" }}
          className="w-full bg-black/20 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 font-body font-light focus:outline-none focus:border-synaptix-cyan transition-colors resize-none"
        />
      </div>

      {error && <p className="text-red-400 text-sm font-body" role="alert">{error}</p>}

      <button
        type="submit" disabled={isSubmitting}
        className="w-full min-h-[48px] bg-synaptix-cyan text-synaptix-bg font-body font-bold py-3 px-6 uppercase tracking-widest text-xs hover:bg-synaptix-cyan/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        {isSubmitting ? (
          <><Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />Submitting…</>
        ) : (
          <>Request a Deployment Discussion<ArrowRight className="w-3 h-3" aria-hidden="true" /></>
        )}
      </button>
    </form>
  );
}
