import { BrandMark } from "@/components/ui/brand-mark";
import { OtpLoginForm } from "@/components/auth/otp-login-form";

export default function LoginPage() {
  return (
    <main className="liquid-page grid min-h-screen place-items-center px-4 py-8">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-lg border border-white/70 bg-white/45 shadow-2xl lg:grid-cols-[0.95fr_1.05fr]">
        <div className="midnight-panel p-8 text-white">
          <BrandMark />
          <div className="mt-16">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d8b56a]">Trusted care infrastructure</p>
            <h1 className="mt-4 text-5xl font-semibold leading-tight">
              Healthcare coordination with complete visibility.
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-white/72">
              Authenticate once, then route care teams to the right dashboard with auditable access and family-safe privacy controls.
            </p>
          </div>
        </div>
        <div className="p-6 sm:p-8">
          <OtpLoginForm />
        </div>
      </section>
    </main>
  );
}
