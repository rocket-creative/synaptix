"use client";

import { useState } from "react";
import { ArrowRight, Loader2, CheckCircle } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  practice: string;
  specialty: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  practice?: string;
  specialty?: string;
}

export function DemoRequestForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    practice: "",
    specialty: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.practice.trim()) {
      newErrors.practice = "Practice name is required";
    }

    if (!formData.specialty) {
      newErrors.specialty = "Please select a specialty";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, product: "Synaptix" }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({
          name: "",
          email: "",
          practice: "",
          specialty: "",
          message: "",
        });
      }
    } catch {
      setSubmitError("Something went wrong. Please try again or call (914) 705 6830.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <CheckCircle
          className="w-12 h-12 text-[#0FBDD5] mx-auto mb-4"
          aria-hidden="true"
        />
        <h3 className="font-heading text-xl text-[#0A0A0A] mb-2">
          Thank You
        </h3>
        <p className="font-body text-sm text-[#0A0A0A]/70 font-light">
          We&apos;ll be in touch within one business day to schedule your demo.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <h3 className="font-heading text-lg text-[#0A0A0A] mb-4">
        Request a Demo
      </h3>

      <div>
        <label htmlFor="name" className="block font-body text-[10px] sm:text-xs text-[#0A0A0A]/70 font-light mb-1">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className={`w-full bg-[#0A0A0A]/20 border ${
            errors.name ? "border-red-400" : "border-[#0A0A0A]/30"
          } px-4 py-3 text-[#0A0A0A] placeholder:text-[#0A0A0A]/50 text-sm font-body font-light focus:outline-none focus:border-[#0A0A0A]/60 transition-colors`}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className="text-red-700 text-xs mt-1">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block font-body text-[10px] sm:text-xs text-[#0A0A0A]/70 font-light mb-1">
          Work Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Work Email"
          className={`w-full bg-[#0A0A0A]/20 border ${
            errors.email ? "border-red-400" : "border-[#0A0A0A]/30"
          } px-4 py-3 text-[#0A0A0A] placeholder:text-[#0A0A0A]/50 text-sm font-body font-light focus:outline-none focus:border-[#0A0A0A]/60 transition-colors`}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="text-red-700 text-xs mt-1">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="practice" className="block font-body text-[10px] sm:text-xs text-[#0A0A0A]/70 font-light mb-1">
          Practice Name
        </label>
        <input
          type="text"
          id="practice"
          name="practice"
          value={formData.practice}
          onChange={handleChange}
          placeholder="Practice Name"
          className={`w-full bg-[#0A0A0A]/20 border ${
            errors.practice ? "border-red-400" : "border-[#0A0A0A]/30"
          } px-4 py-3 text-[#0A0A0A] placeholder:text-[#0A0A0A]/50 text-sm font-body font-light focus:outline-none focus:border-[#0A0A0A]/60 transition-colors`}
          aria-invalid={!!errors.practice}
          aria-describedby={errors.practice ? "practice-error" : undefined}
        />
        {errors.practice && (
          <p id="practice-error" className="text-red-700 text-xs mt-1">
            {errors.practice}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="specialty" className="block font-body text-[10px] sm:text-xs text-[#0A0A0A]/70 font-light mb-1">
          Specialty
        </label>
        <select
          id="specialty"
          name="specialty"
          value={formData.specialty}
          onChange={handleChange}
          className={`w-full bg-[#0A0A0A]/20 border ${
            errors.specialty ? "border-red-400" : "border-[#0A0A0A]/30"
          } px-4 py-3 text-[#0A0A0A] text-sm font-body font-light focus:outline-none focus:border-[#0A0A0A]/60 transition-colors appearance-none cursor-pointer ${
            !formData.specialty ? "text-[#0A0A0A]/50" : ""
          }`}
          aria-invalid={!!errors.specialty}
          aria-describedby={errors.specialty ? "specialty-error" : undefined}
        >
          <option value="" disabled>
            Select Specialty
          </option>
          <option value="orthopedic">Orthopedic Surgery</option>
          <option value="neurosurgery">Neurosurgery</option>
          <option value="sports-medicine">Sports Medicine</option>
          <option value="neurology">Neurology</option>
          <option value="concussion-program">Concussion Program</option>
          <option value="other">Other</option>
        </select>
        {errors.specialty && (
          <p id="specialty-error" className="text-red-700 text-xs mt-1">
            {errors.specialty}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block font-body text-[10px] sm:text-xs text-[#0A0A0A]/70 font-light mb-1">
          Message (Optional)
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your practice (optional)"
          rows={3}
          className="w-full bg-[#0A0A0A]/20 border border-[#0A0A0A]/30 px-4 py-3 text-[#0A0A0A] placeholder:text-[#0A0A0A]/50 text-sm font-body font-light focus:outline-none focus:border-[#0A0A0A]/60 transition-colors resize-none"
        />
      </div>

      {submitError && (
        <p className="text-red-700 text-xs" role="alert">
          {submitError}
        </p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#0A0A0A] text-white py-4 px-8 text-[11px] tracking-widest uppercase font-light hover:bg-[#0A0A0A]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            Submitting...
          </>
        ) : (
          <>
            Request Demo
            <ArrowRight className="w-3 h-3" aria-hidden="true" />
          </>
        )}
      </button>

      <p className="text-[10px] text-[#0A0A0A]/60 text-center">
        By submitting, you agree to our{" "}
        <a href="/privacy" className="underline hover:text-[#0A0A0A]/80">
          Privacy Policy
        </a>
      </p>
    </form>
  );
}
