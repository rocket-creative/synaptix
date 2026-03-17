import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-dvh bg-[#0A0A0A] flex flex-col items-center justify-center px-4">
      <h1 className="font-heading text-2xl sm:text-3xl text-white mb-4">
        Page Not Found
      </h1>
      <p className="font-body text-sm text-white/60 font-light mb-8 text-center max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center bg-[#0FBDD5] text-[#0A0A0A] py-3 px-6 uppercase tracking-widest text-xs font-light hover:bg-[#0FBDD5]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0FBDD5] focus:ring-offset-2 focus:ring-offset-[#0A0A0A]"
      >
        Back to Home
      </Link>
    </div>
  );
}
