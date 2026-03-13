"use client";

import type { ApplicationData } from "../ApplyFlow";
import { StepFooter, TipBox } from "../StepFooter";

const PURPOSE_LABELS: Record<string, string> = {
  tourism: "Tourism", business: "Business", visiting: "Visiting family",
  study: "Study", medical: "Medical", transit: "Transit",
};
const ACCOMMODATION_LABELS: Record<string, string> = {
  hotel: "Hotel", airbnb: "Airbnb", friends: "With friends/family", hostel: "Hostel",
};

function formatDate(s: string) {
  if (!s) return "—";
  return new Date(s).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export function Step11Review({
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
  return (
    <>
      <TipBox icon="✈️">
        Double-check your travel dates match exactly across your flight booking, hotel, and application form.
      </TipBox>

      <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Step 11 of 13</p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        Review your application.
      </h1>
      <p className="mt-2 text-slate-600">
        Check everything before we build your application pack.
      </p>

      <div className="mt-8 space-y-6">
        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-semibold text-slate-900">
              <span>👤</span> Personal details
            </h2>
            <span className="text-sm font-medium text-primary-600 hover:underline">Edit</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-3">
              <p className="text-xs font-medium uppercase text-slate-500">Full name</p>
              <p className="mt-1 font-medium text-slate-900">{[data.firstName, data.lastName].filter(Boolean).join(" ") || "—"}</p>
            </div>
            <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-3">
              <p className="text-xs font-medium uppercase text-slate-500">Email</p>
              <p className="mt-1 font-medium text-slate-900">{data.email || "—"}</p>
            </div>
            <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-3">
              <p className="text-xs font-medium uppercase text-slate-500">Phone</p>
              <p className="mt-1 font-medium text-slate-900">{data.phoneNumber || "—"}</p>
            </div>
            <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-3">
              <p className="text-xs font-medium uppercase text-slate-500">Residence</p>
              <p className="mt-1 font-medium text-slate-900">{data.countryOfResidence === "gb" ? "United Kingdom" : data.countryOfResidence || "—"}</p>
            </div>
            <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-3">
              <p className="text-xs font-medium uppercase text-slate-500">Purpose</p>
              <p className="mt-1 font-medium text-slate-900">{PURPOSE_LABELS[data.purposeOfTravel] || data.purposeOfTravel || "—"}</p>
            </div>
            <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-3">
              <p className="text-xs font-medium uppercase text-slate-500">Travel dates</p>
              <p className="mt-1 font-medium text-slate-900">{formatDate(data.travelStartDate)} – {formatDate(data.travelEndDate)}</p>
            </div>
            <div className="col-span-2 rounded-lg border border-slate-100 bg-slate-50/50 p-3">
              <p className="text-xs font-medium uppercase text-slate-500">Companions</p>
              <p className="mt-1 font-medium text-slate-900">
                {data.travellingWithCompanions === "yes" ? `${data.companionsCount || 0} companion(s)` : data.travellingWithCompanions === "no" ? "Solo" : "—"}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-semibold text-slate-900">
              <span>🛂</span> Passport details
            </h2>
            <span className="text-sm font-medium text-primary-600 hover:underline">Edit</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-3">
              <p className="text-xs font-medium uppercase text-slate-500">Name</p>
              <p className="mt-1 font-medium text-slate-900">{[data.firstName, data.lastName].filter(Boolean).join(" ") || "—"}</p>
            </div>
            <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-3">
              <p className="text-xs font-medium uppercase text-slate-500">Passport</p>
              <p className="mt-1 font-medium text-slate-900">{data.passportFile?.name || "—"}</p>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-semibold text-slate-900">
              <span>✈️</span> Travel plan
            </h2>
            <span className="text-sm font-medium text-primary-600 hover:underline">Edit</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-3">
              <p className="text-xs font-medium uppercase text-slate-500">Entry city</p>
              <p className="mt-1 font-medium text-slate-900">{data.entryCity || "—"}</p>
            </div>
            <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-3">
              <p className="text-xs font-medium uppercase text-slate-500">Accommodation</p>
              <p className="mt-1 font-medium text-slate-900">{ACCOMMODATION_LABELS[data.accommodation] || data.accommodation || "—"}</p>
            </div>
            <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-3">
              <p className="text-xs font-medium uppercase text-slate-500">Multi-country</p>
              <p className="mt-1 font-medium text-slate-900">{data.multiCountry === "yes" ? "Yes" : data.multiCountry === "no" ? `No - ${countryName} only` : "—"}</p>
            </div>
            <div className="col-span-2 rounded-lg border border-slate-100 bg-slate-50/50 p-3">
              <p className="text-xs font-medium uppercase text-slate-500">Visa history</p>
              <p className="mt-1 font-medium text-slate-900">
                {data.visitedSchengenBefore === "yes"
                  ? data.previousTravelVisits.length > 0
                    ? data.previousTravelVisits.map((v) => `${v.country || "?"} (${v.year || "?"})`).join(", ") || "—"
                    : "Yes"
                  : data.visitedSchengenBefore === "no"
                  ? "No prior visits"
                  : "—"}
              </p>
            </div>
            <div className="col-span-2 rounded-lg border border-slate-100 bg-slate-50/50 p-3">
              <p className="text-xs font-medium uppercase text-slate-500">Previous refusals</p>
              <p className="mt-1 font-medium text-slate-900">
                {data.previousVisaRejections === "yes"
                  ? data.refusalDetails.length > 0
                    ? data.refusalDetails.map((r) => `${r.country} (${r.year})`).join(", ") || "Yes"
                    : "Yes"
                  : data.previousVisaRejections === "no"
                  ? "No"
                  : "—"}
              </p>
            </div>
          </div>
        </section>
      </div>

      <StepFooter step={11} total={13} onBack={onBack} onNext={onNext} />
    </>
  );
}
