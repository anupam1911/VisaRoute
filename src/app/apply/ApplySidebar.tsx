"use client";

import { useState } from "react";
import Link from "next/link";
import { STEPS } from "./ApplyFlow";

interface ApplySidebarProps {
  countryName: string;
  countrySlug: string;
  currentStep: number;
  visaFeeEur: number;
  serviceFeeEur: number;
  purpose?: string;
  applicantName?: string;
  companionsCount?: number;
}

export function ApplySidebar({
  countryName,
  countrySlug,
  currentStep,
  visaFeeEur,
  serviceFeeEur,
  purpose,
  applicantName,
  companionsCount = 0,
}: ApplySidebarProps) {
  const [showFactors, setShowFactors] = useState(false);
  const total = visaFeeEur + serviceFeeEur;
  const successEstimate = 30; // Demo value - could be computed from application completeness

  return (
    <aside className="hidden w-72 shrink-0 flex-col border-r border-slate-800 bg-slate-900 lg:flex">
      <div className="flex flex-col p-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-bold text-white">VisaRoute</span>
          <span className="rounded-full bg-slate-700 px-2 py-0.5 text-xs font-medium text-slate-300">
            SCHENGEN
          </span>
        </Link>

        <div className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Applying for
          </p>
          <div className="mt-2 flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700 text-xs font-bold text-slate-300">
              {countryName.slice(0, 2).toUpperCase()}
            </span>
            <div>
              <p className="font-semibold text-white">{countryName}</p>
              <p className="text-sm text-slate-400">Schengen Visa</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Visa success probability
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-2xl font-bold text-white">{successEstimate}%</span>
            <span className="rounded-full bg-rose-500/20 px-2.5 py-0.5 text-xs font-medium text-rose-400">
              Needs work
            </span>
          </div>
          <p className="mt-0.5 text-xs text-slate-500">estimate</p>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-700">
            <div
              className="h-full rounded-full bg-primary-500 transition-all"
              style={{ width: `${successEstimate}%` }}
            />
          </div>
          <button
            type="button"
            onClick={() => setShowFactors(!showFactors)}
            className="mt-2 text-xs text-primary-400 hover:text-primary-300"
          >
            {showFactors ? "▲ Hide factors" : "▼ Show factors"}
          </button>
          {showFactors && (
            <div className="mt-2 rounded-lg bg-slate-800 p-3 text-xs text-slate-400">
              <p>• Complete all required documents</p>
              <p>• Prior Schengen visits boost approval</p>
              <p>• Declare any refusals honestly</p>
            </div>
          )}
        </div>

        <div className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Application progress
          </p>
          <nav className="mt-3 space-y-0.5">
            {STEPS.map((s) => (
              <div
                key={s.id}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                  s.id === currentStep ? "bg-slate-800" : "text-slate-400"
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    s.id < currentStep
                      ? "bg-primary-500 text-white"
                      : s.id === currentStep
                      ? "bg-white text-slate-900"
                      : "bg-slate-700 text-slate-500"
                  }`}
                >
                  {s.id < currentStep ? (
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    s.id
                  )}
                </span>
                <span className={s.id <= currentStep ? "font-medium text-white" : ""}>
                  {s.id} {s.label}
                </span>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-auto pt-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Summary
          </p>
          <div className="mt-3 space-y-2 rounded-lg bg-slate-800 p-4 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Country</span>
              <span className="font-medium text-white">{countryName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Purpose</span>
              <span className="font-medium text-white">{purpose || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Applicant</span>
              <span className="font-medium text-white">{applicantName || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Companions</span>
              <span className="font-medium text-white">
                {companionsCount > 0 ? `${companionsCount} people` : "Solo"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Visa fee</span>
              <span className="font-medium text-white">€{visaFeeEur}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Service</span>
              <span className="font-medium text-white">€{serviceFeeEur}</span>
            </div>
            <div className="border-t border-slate-700 pt-3">
              <div className="flex justify-between">
                <span className="font-semibold text-white">Total</span>
                <span className="text-lg font-bold text-white">€{total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
