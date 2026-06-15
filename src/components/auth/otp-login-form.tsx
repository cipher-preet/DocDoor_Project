"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

export function OtpLoginForm() {
  const [step, setStep] = useState<"phone" | "otp">("phone");

  return (
    <div className="glass-panel rounded-lg p-5">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#fff5df] text-[#b88a2c]">
          <ShieldCheck size={22} aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-[#06162d]">Secure OTP sign in</h2>
          <p className="text-sm text-[#5f6b7a]">Role-based access for care teams and partners.</p>
        </div>
      </div>

      <form className="grid gap-4" onSubmit={(event) => event.preventDefault()}>
        <label className="grid gap-2 text-sm font-semibold text-[#06162d]">
          Phone number
          <input className="focus-ring h-12 rounded-lg border border-slate-200 bg-white px-3 text-base" placeholder="+91 98765 43210" />
        </label>
        {step === "otp" && (
          <label className="grid gap-2 text-sm font-semibold text-[#06162d]">
            OTP code
            <input className="focus-ring h-12 rounded-lg border border-slate-200 bg-white px-3 text-base" placeholder="6 digit code" />
          </label>
        )}
        {step === "phone" ? (
          <button
            className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#06162d] px-4 font-semibold text-white"
            onClick={() => setStep("otp")}
            type="button"
          >
            Request OTP
            <ArrowRight size={17} aria-hidden="true" />
          </button>
        ) : (
          <div className="grid gap-2 sm:grid-cols-2">
            <Link className="focus-ring inline-flex h-12 items-center justify-center rounded-lg bg-[#06162d] px-4 font-semibold text-white" href="/admin">
              Admin dashboard
            </Link>
            <Link className="focus-ring inline-flex h-12 items-center justify-center rounded-lg border border-[#d8b56a] bg-[#fff5df] px-4 font-semibold text-[#06162d]" href="/hospital">
              Hospital dashboard
            </Link>
          </div>
        )}
      </form>
    </div>
  );
}
