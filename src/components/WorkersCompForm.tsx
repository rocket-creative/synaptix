"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";

const inputClass =
  "w-full h-12 bg-black/20 border border-white/10 px-4 text-white placeholder:text-white/40 font-body font-light focus:outline-none focus:border-synaptix-cyan transition-colors";
const labelClass = "block font-body text-xs text-white/60 uppercase tracking-widest mb-1.5";
const errorClass = "text-red-400 text-xs mt-1";

const CLAIM_TYPES = [
  { value: "workers_comp", label: "Workers' compensation" },
  { value: "no_fault", label: "No-fault / auto" },
  { value: "both", label: "Both" },
];

interface FieldErrors {
  name?: string;
  phone?: string;
  email?: string;
  claim_type?: string;
}

export function WorkersCompForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function validate(fd: FormData): FieldErrors {
    const errors: FieldErrors = {};
    if (!String(fd.get("name") ?? "").trim()) errors.name = "Patient name is required";
    if (!String(fd.get("phone") ?? "").trim()) errors.phone = "Phone number is required";
    const email = String(fd.get("email") ?? "").trim();
    if (!email) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email address";
    if (!String(fd.get("claim_type") ?? "").trim()) errors.claim_type = "Please select a claim type";
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
          form_type: "workers_comp_auto",
          name: fd.get("name"),
          phone: fd.get("phone"),
          email: fd.get("email"),
          claim_type: fd.get("claim_type"),
          date_of_injury: fd.get("date_of_injury") || undefined,
          carrier: fd.get("carrier") || undefined,
          claim_number: fd.get("claim_number") || undefined,
          attorney_name: fd.get("attorney_name") || undefined,
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
        <h3 className="font-heading text-2xl text-white mb-2">Referral Received</h3>
        <p className="font-body text-white/60 text-sm font-light">
          Thank you. Our team will contact you within one business day to schedule a concussion evaluation.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="wc-name" className={labelClass}>Patient name <span className="text-synaptix-cyan">*</span></label>
          <input
            type="text" id="wc-name" name="name" required
            autoComplete="name" inputMode="text" style={{ fontSize: "16px" }}
            aria-invalid={!!fieldErrors.name}
            className={`${inputClass} ${fieldErrors.name ? "border-red-400" : ""}`}
          />
          {fieldErrors.name && <p className={errorClass} role="alert">{fieldErrors.name}</p>}
        </div>
        <div>
          <label htmlFor="wc-phone" className={labelClass}>Phone <span className="text-synaptix-cyan">*</span></label>
          <input
            type="tel" id="wc-phone" name="phone" required
            autoComplete="tel" inputMode="tel" style={{ fontSize: "16px" }}
            aria-invalid={!!fieldErrors.phone}
            className={`${inputClass} ${fieldErrors.phone ? "border-red-400" : ""}`}
          />
          {fieldErrors.phone && <p className={errorClass} role="alert">{fieldErrors.phone}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="wc-email" className={labelClass}>Email <span className="text-synaptix-cyan">*</span></label>
        <input
          type="email" id="wc-email" name="email" required
          autoComplete="email" inputMode="email" style={{ fontSize: "16px" }}
          aria-invalid={!!fieldErrors.email}
          className={`${inputClass} ${fieldErrors.email ? "border-red-400" : ""}`}
        />
        {fieldErrors.email && <p className={errorClass} role="alert">{fieldErrors.email}</p>}
      </div>

      <div>
        <p className={`${labelClass} ${fieldErrors.claim_type ? "text-red-400" : ""}`}>
          Claim type <span className="text-synaptix-cyan">*</span>
        </p>
        <div className="space-y-2.5 mt-1">
          {CLAIM_TYPES.map((opt) => (
            <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio" name="claim_type" value={opt.value}
                className="accent-[#0FBDD5]"
                aria-invalid={!!fieldErrors.claim_type}
              />
              <span className="font-body text-sm text-white/70 group-hover:text-white transition-colors">{opt.label}</span>
            </label>
          ))}
        </div>
        {fieldErrors.claim_type && <p className={errorClass} role="alert">{fieldErrors.claim_type}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="wc-doi" className={labelClass}>Date of injury</label>
          <input
            type="date" id="wc-doi" name="date_of_injury"
            style={{ fontSize: "16px", colorScheme: "dark" }}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="wc-carrier" className={labelClass}>Insurance carrier</label>
          <input
            type="text" id="wc-carrier" name="carrier"
            placeholder="Optional"
            inputMode="text" style={{ fontSize: "16px" }}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="wc-claim" className={labelClass}>Claim number</label>
          <input
            type="text" id="wc-claim" name="claim_number"
            placeholder="If available"
            inputMode="text" style={{ fontSize: "16px" }}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="wc-attorney" className={labelClass}>Attorney name</label>
          <input
            type="text" id="wc-attorney" name="attorney_name"
            placeholder="If represented"
            inputMode="text" style={{ fontSize: "16px" }}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="wc-note" className={labelClass}>Notes (optional)</label>
        <textarea
          id="wc-note" name="note" rows={3}
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
          <>Submit Referral<ArrowRight className="w-3 h-3" aria-hidden="true" /></>
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
