"use client";

import type { ApplicationData } from "../ApplyFlow";
import { TipBox } from "../StepFooter";

const APPOINTMENT_OPTIONS = [
  { id: "self", label: "Book appointment yourself", desc: "We redirect you to VFS Global, TLScontact or BLS International — free.", price: "Free", priceType: "free" as const },
  { id: "monitor", label: "Let us monitor appointments", desc: "We check availability every 15 minutes and notify you via email + WhatsApp.", price: "€7 / 30 days", priceType: "paid" as const },
  { id: "concierge", label: "Concierge booking service", desc: "Our team books and confirms your appointment — guaranteed within 3 days.", price: "€29", priceType: "paid" as const },
];

export function Step13Appointment({
  data,
  countryName,
  countrySlug,
  visaFeeEur,
  serviceFeeEur,
  onBack,
}: {
  data: ApplicationData;
  countryName: string;
  countrySlug: string;
  visaFeeEur: number;
  serviceFeeEur: number;
  onBack: () => void;
}) {
  const total = visaFeeEur + serviceFeeEur;

  return (
    <>
      <TipBox icon="📅">
        Apply at least 3–4 weeks before travel. Peak summer months (Jun–Aug) see the slowest appointment availability.
      </TipBox>

      <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Step 13 of 13</p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        Secure your appointment.
      </h1>
      <p className="mt-2 text-slate-600">
        Choose how you&apos;d like to book or monitor your visa appointment.
      </p>

      <div className="mt-8 space-y-4">
        {APPOINTMENT_OPTIONS.map((opt) => (
          <div
            key={opt.id}
            className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 transition hover:shadow-sm"
          >
            <span className="text-3xl">{opt.id === "self" ? "🖥️" : opt.id === "monitor" ? "🔔" : "🛡️"}</span>
            <div className="flex-1">
              <p className="font-semibold text-slate-900">{opt.label}</p>
              <p className="mt-1 text-sm text-slate-600">{opt.desc}</p>
            </div>
            <span className={`shrink-0 rounded-full px-3 py-1 text-sm font-medium ${
              opt.priceType === "free" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
            }`}>
              {opt.price}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-primary-200 bg-primary-50/50 p-4">
        <p className="text-sm text-slate-700">
          Next available {countryName} appointment at VFS Global London: <strong>7 Apr 2026</strong> (29 days away).
        </p>
      </div>

      <div className="mt-10 flex items-center justify-between border-t border-slate-200 pt-8">
        <button onClick={onBack} className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">← Back</button>
        <span className="text-sm font-medium text-slate-700">13 / 13</span>
        <button
          type="button"
          onClick={() => alert("Application complete! Payment integration would go here.")}
          className="flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Complete application
        </button>
      </div>
    </>
  );
}
