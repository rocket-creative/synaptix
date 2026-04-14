"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";

const inputClass =
  "w-full h-12 bg-black/20 border border-white/10 px-4 text-white placeholder:text-white/40 font-body font-light focus:outline-none focus:border-synaptix-cyan transition-colors";
const selectClass =
  "w-full h-12 bg-synaptix-bg border border-white/10 px-4 text-white font-body font-light focus:outline-none focus:border-synaptix-cyan transition-colors appearance-none";
const labelClass = "block font-body text-xs text-white/60 uppercase tracking-widest mb-1.5";
const errorClass = "text-red-400 text-xs mt-1";

const INJURY_TYPES = [
  { value: "work", label: "Work-related / workers' comp" },
  { value: "auto", label: "Auto accident / no-fault" },
  { value: "sports", label: "Sports or athletic" },
  { value: "other", label: "Other / general" },
];

const VISIT_TYPES = [
  { value: "telehealth", label: "Telehealth" },
  { value: "in_person", label: "In-person NY" },
  { value: "no_preference", label: "No preference" },
];

const REFERRED_BY = [
  "Attorney",
  "Primary care / provider",
  "Employer",
  "Self-referred",
  "Family or friend",
  "Other",
];

interface FieldErrors {
  name?: string;
  phone?: string;
  email?: string;
}

export function PatientIntakeForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function validate(fd: FormData): FieldErrors {
    const errors: FieldErrors = {};
    if (!String(fd.get("name") ?? "").trim()) errors.name = "Name is required";
    if (!String(fd.get("phone") ?? "").trim()) errors.phone = "Phone number is required";
    const email = String(fd.get("email") ?? "").trim();
    if (!email) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email address";
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
          form_type: "patient_intake",
          name: fd.get("name"),
          phone: fd.get("phone"),
          email: fd.get("email"),
          injury_type: fd.get("injury_type") || undefined,
          injury_date: fd.get("injury_date") || undefined,
          visit_type: fd.get("visit_type") || undefined,
          referred_by: fd.get("referred_by") || undefined,
          note: fd.get("note") || undefined,
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
        <h3 className="font-heading text-2xl text-white mb-2">Request Received</h3>
        <p className="font-body text-white/60 text-sm font-light">
          Thank you. Our team will reach out within one business day to schedule your evaluation.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="pi-name" className={labelClass}>Full name <span className="text-synaptix-cyan">*</span></label>
          <input
            type="text" id="pi-name" name="name" required
            autoComplete="name" inputMode="text" style={{ fontSize: "16px" }}
            aria-invalid={!!fieldErrors.name}
            className={`${inputClass} ${fieldErrors.name ? "border-red-400" : ""}`}
          />
          {fieldErrors.name && <p className={errorClass} role="alert">{fieldErrors.name}</p>}
        </div>
        <div>
          <label htmlFor="pi-phone" className={labelClass}>Phone <span className="text-synaptix-cyan">*</span></label>
          <input
            type="tel" id="pi-phone" name="phone" required
            autoComplete="tel" inputMode="tel" style={{ fontSize: "16px" }}
            aria-invalid={!!fieldErrors.phone}
            className={`${inputClass} ${fieldErrors.phone ? "border-red-400" : ""}`}
          />
          {fieldErrors.phone && <p className={errorClass} role="alert">{fieldErrors.phone}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="pi-email" className={labelClass}>Email <span className="text-synaptix-cyan">*</span></label>
        <input
          type="email" id="pi-email" name="email" required
          autoComplete="email" inputMode="email" style={{ fontSize: "16px" }}
          aria-invalid={!!fieldErrors.email}
          className={`${inputClass} ${fieldErrors.email ? "border-red-400" : ""}`}
        />
        {fieldErrors.email && <p className={errorClass} role="alert">{fieldErrors.email}</p>}
      </div>

      <div>
        <p className={labelClass}>Type of injury</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-1">
          {INJURY_TYPES.map((opt) => (
            <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
              <input type="radio" name="injury_type" value={opt.value} className="accent-[#0FBDD5]" />
              <span className="font-body text-sm text-white/70 group-hover:text-white transition-colors">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="pi-date" className={labelClass}>Approximate injury date</label>
          <input
            type="date" id="pi-date" name="injury_date"
            style={{ fontSize: "16px", colorScheme: "dark" }}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="pi-referred" className={labelClass}>How did you hear about us?</label>
          <div className="relative">
            <select id="pi-referred" name="referred_by" className={selectClass} defaultValue="">
              <option value="">Select one</option>
              {REFERRED_BY.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </div>
      </div>

      <div>
        <p className={labelClass}>Visit preference</p>
        <div className="flex flex-wrap gap-4 mt-1">
          {VISIT_TYPES.map((opt) => (
            <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
              <input type="radio" name="visit_type" value={opt.value} className="accent-[#0FBDD5]" />
              <span className="font-body text-sm text-white/70 group-hover:text-white transition-colors">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="pi-note" className={labelClass}>Symptoms, questions, or best time to call (optional)</label>
        <textarea
          id="pi-note" name="note" rows={3}
          placeholder="Do not include sensitive personal health information."
          style={{ fontSize: "16px" }}
          className="w-full bg-black/20 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 font-body font-light focus:outline-none focus:border-synaptix-cyan transition-colors resize-none"
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
          <>Request Evaluation<ArrowRight className="w-3 h-3" aria-hidden="true" /></>
        )}
      </button>

      <p className="font-body text-xs text-white/30 font-light text-center">
        By submitting you agree to our{" "}
        <a href="/privacy" className="underline hover:text-white/60 transition-colors">Privacy Policy</a>.
        Do not submit sensitive PHI in this form.
      </p>
    </form>
  );
}
