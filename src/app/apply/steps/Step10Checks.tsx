"use client";

import type { ApplicationData } from "../ApplyFlow";
import { StepFooter, TipBox } from "../StepFooter";

const CHECKS = [
  { id: "bank", label: "Bank statements", status: "ok" as const, detail: "Balance: €4,850 detected", sub: "Minimum recommended: €1,200" },
  { id: "insurance", label: "Travel insurance", status: "warn" as const, detail: "Coverage: €20,000 detected", sub: "Minimum required: €30,000" },
  { id: "flight", label: "Flight reservation", status: "ok" as const, detail: "LHR – CDG – 12 Jun 2026", sub: "Return: CDG – LHR – 18 Jun confirmed" },
  { id: "hotel", label: "Hotel booking", status: "ok" as const, detail: "Hôtel Le Marais, Paris", sub: "6 nights - Check-in 12 Jun" },
  { id: "employment", label: "Employment letter", status: "ok" as const, detail: "Issuer: Acme Corp Ltd", sub: "Signed · Dated within 3 mths" },
];

export function Step10Checks({
  data,
  countryName,
  onNext,
  onBack,
}: {
  data: ApplicationData;
  countryName: string;
  onNext: () => void;
  onBack: () => void;
}) {
  const hasIssue = CHECKS.some((c) => c.status === "warn");

  return (
    <>
      <TipBox icon="🔍">
        Our checks flag issues before the embassy sees them — fixing them now saves weeks of delays.
      </TipBox>

      <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Step 10 of 13</p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        Automated document checks.
      </h1>
      <p className="mt-2 text-slate-600">
        Our system analyses each document for completeness and minimum requirements.
      </p>

      {hasIssue && (
        <div className="mt-6 rounded-xl bg-amber-100 p-4">
          <p className="flex items-center gap-2 font-medium text-amber-800">
            <span>▲</span> 1 issue found — fix before submitting your application pack.
          </p>
        </div>
      )}

      <div className="mt-8 space-y-4">
        {CHECKS.map((c) => (
          <div
            key={c.id}
            className={`overflow-hidden rounded-xl border-2 ${
              c.status === "ok" ? "border-emerald-200 bg-emerald-50/50" : "border-amber-200 bg-amber-50/50"
            }`}
          >
            <div className="flex items-start justify-between p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{c.id === "bank" ? "🏦" : c.id === "insurance" ? "🛡️" : c.id === "flight" ? "✈️" : c.id === "hotel" ? "🏨" : "📄"}</span>
                <div>
                  <p className="font-semibold text-slate-900">{c.detail}</p>
                  {c.sub && <p className="text-sm text-slate-600">{c.sub}</p>}
                </div>
              </div>
              <span className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium ${
                c.status === "ok" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
              }`}>
                {c.status === "ok" ? "✓ Sufficient funds" : "▲ Coverage too low"}
              </span>
            </div>
            <div className={`h-1 ${c.status === "ok" ? "bg-emerald-400" : "bg-amber-400"}`} style={{ width: c.status === "ok" ? "100%" : "66%" }} />
          </div>
        ))}
      </div>

      <StepFooter step={10} total={13} onBack={onBack} onNext={onNext} />
    </>
  );
}
