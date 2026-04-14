"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";

const inputClass =
  "w-full h-12 bg-black/20 border border-white/10 px-4 text-white placeholder:text-white/40 font-body font-light focus:outline-none focus:border-synaptix-cyan transition-colors";
const selectClass =
  "w-full h-12 bg-synaptix-bg border border-white/10 px-4 text-white font-body font-light focus:outline-none focus:border-synaptix-cyan transition-colors appearance-none";
const labelClass = "block font-body text-xs text-white/60 uppercase tracking-widest mb-1.5";
const errorClass = "text-red-400 text-xs mt-1";

const CASE_TYPES = [
  "Personal injury",
  "Workers' compensation",
  "No-fault / auto",
  "Mixed",
];

const CASE_VOLUMES = [
  "1–5 concussion cases / year",
  "5–20 / year",
  "20–50 / year",
  "50+ / year",
];

interface FieldErrors {
  attorney_name?: string;
  firm_name?: string;
  phone?: string;
  email?: string;
}

export function AttorneyReferralForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function validate(fd: FormData): FieldErrors {
    const errors: FieldErrors = {};
    if (!String(fd.get("attorney_name") ?? "").trim()) errors.attorney_name = "Attorney name is required";
    if (!String(fd.get("firm_name") ?? "").trim()) errors.firm_name = "Firm name is required";
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
          form_type: "attorney_referral",
          attorney_name: fd.get("attorney_name"),
          firm_name: fd.get("firm_name"),
          phone: fd.get("phone"),
          email: fd.get("email"),
          case_type: fd.get("case_type") || undefined,
          case_volume: fd.get("case_volume") || undefined,
          state: fd.get("state") || undefined,
          notes: fd.get("notes") || undefined,
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
        <h3 className="font-heading text-2xl text-white mb-2">Referral Received</h3>
        <p className="font-body text-white/60 text-sm font-light">
          Thank you. We will be in touch to discuss your cases and set up a referral pathway.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="ar-attorney" className={labelClass}>Attorney name <span className="text-synaptix-cyan">*</span></label>
          <input
            type="text" id="ar-attorney" name="attorney_name" required
            autoComplete="name" inputMode="text" style={{ fontSize: "16px" }}
            aria-invalid={!!fieldErrors.attorney_name}
            className={`${inputClass} ${fieldErrors.attorney_name ? "border-red-400" : ""}`}
          />
          {fieldErrors.attorney_name && <p className={errorClass} role="alert">{fieldErrors.attorney_name}</p>}
        </div>
        <div>
          <label htmlFor="ar-firm" className={labelClass}>Firm name <span className="text-synaptix-cyan">*</span></label>
          <input
            type="text" id="ar-firm" name="firm_name" required
            autoComplete="organization" inputMode="text" style={{ fontSize: "16px" }}
            aria-invalid={!!fieldErrors.firm_name}
            className={`${inputClass} ${fieldErrors.firm_name ? "border-red-400" : ""}`}
          />
          {fieldErrors.firm_name && <p className={errorClass} role="alert">{fieldErrors.firm_name}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="ar-phone" className={labelClass}>Phone <span className="text-synaptix-cyan">*</span></label>
          <input
            type="tel" id="ar-phone" name="phone" required
            autoComplete="tel" inputMode="tel" style={{ fontSize: "16px" }}
            aria-invalid={!!fieldErrors.phone}
            className={`${inputClass} ${fieldErrors.phone ? "border-red-400" : ""}`}
          />
          {fieldErrors.phone && <p className={errorClass} role="alert">{fieldErrors.phone}</p>}
        </div>
        <div>
          <label htmlFor="ar-email" className={labelClass}>Work email <span className="text-synaptix-cyan">*</span></label>
          <input
            type="email" id="ar-email" name="email" required
            autoComplete="email" inputMode="email" style={{ fontSize: "16px" }}
            aria-invalid={!!fieldErrors.email}
            className={`${inputClass} ${fieldErrors.email ? "border-red-400" : ""}`}
          />
          {fieldErrors.email && <p className={errorClass} role="alert">{fieldErrors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="ar-case-type" className={labelClass}>Primary case type</label>
          <div className="relative">
            <select id="ar-case-type" name="case_type" className={selectClass} defaultValue="">
              <option value="">Select type</option>
              {CASE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="ar-volume" className={labelClass}>Concussion case volume</label>
          <div className="relative">
            <select id="ar-volume" name="case_volume" className={selectClass} defaultValue="">
              <option value="">Select range</option>
              {CASE_VOLUMES.map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="ar-state" className={labelClass}>State(s) of practice</label>
        <input
          type="text" id="ar-state" name="state"
          placeholder="e.g. NY, NJ, CT"
          inputMode="text" style={{ fontSize: "16px" }}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="ar-notes" className={labelClass}>Notes (optional — no client PHI)</label>
        <textarea
          id="ar-notes" name="notes" rows={3}
          placeholder="General questions only — no client names or case details."
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
          <>Set Up a Referral Pathway<ArrowRight className="w-3 h-3" aria-hidden="true" /></>
        )}
      </button>

      <p className="font-body text-xs text-white/30 font-light text-center">
        By submitting you agree to our{" "}
        <a href="/privacy" className="underline hover:text-white/60 transition-colors">Privacy Policy</a>.
        Do not submit client PHI in this form.
      </p>
    </form>
  );
}
