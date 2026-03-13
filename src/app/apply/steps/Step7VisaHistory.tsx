"use client";

import type { ApplicationData } from "../ApplyFlow";
import { StepFooter, TipBox } from "../StepFooter";

export function Step7VisaHistory({
  data,
  updateData,
  countryName,
  onNext,
  onBack,
}: {
  data: ApplicationData;
  updateData: (u: Partial<ApplicationData>) => void;
  countryName: string;
  onNext: () => void;
  onBack: () => void;
}) {
  const hasVisited = data.visitedSchengenBefore === "yes";

  const addVisit = () => {
    updateData({
      previousTravelVisits: [...data.previousTravelVisits, { country: "", year: "" }],
    });
  };

  const updateVisit = (index: number, field: "country" | "year", value: string) => {
    const next = [...data.previousTravelVisits];
    next[index] = { ...next[index], [field]: value };
    updateData({ previousTravelVisits: next });
  };

  const removeVisit = (index: number) => {
    updateData({
      previousTravelVisits: data.previousTravelVisits.filter((_, i) => i !== index),
    });
  };

  return (
    <>
      <TipBox icon="✓">
        Prior Schengen visits boost your approval rate significantly. Even tourist stamps strengthen your application.
      </TipBox>

      <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Step 7 of 13</p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        Your Schengen visa history.
      </h1>
      <p className="mt-2 text-slate-600">
        Schengen embassies ask about prior visits — this strengthens your cover letter.
      </p>

      <div className="mt-8">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
          Have you visited the Schengen area before?
        </label>
        <div className="mt-3 flex gap-4">
          <button
            type="button"
            onClick={() => updateData({
              visitedSchengenBefore: "yes",
              previousTravelVisits: data.previousTravelVisits.length ? data.previousTravelVisits : [{ country: "", year: "" }],
            })}
            className={`flex items-center gap-2 rounded-xl border-2 px-6 py-4 transition ${
              hasVisited ? "border-emerald-500 bg-emerald-50" : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <span className="text-xl">✓</span>
            <span className="font-semibold text-slate-900">Yes</span>
          </button>
          <button
            type="button"
            onClick={() => updateData({ visitedSchengenBefore: "no", previousTravelVisits: [] })}
            className={`flex items-center gap-2 rounded-xl border-2 px-6 py-4 transition ${
              data.visitedSchengenBefore === "no" ? "border-emerald-500 bg-emerald-50" : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <span className="text-xl">✗</span>
            <span className="font-semibold text-slate-900">No</span>
          </button>
        </div>

        {hasVisited && (
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">Tell us about each visit:</p>
            <div className="mt-3 space-y-3">
              {data.previousTravelVisits.map((visit, i) => (
                <div key={i} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4">
                  <input
                    type="text"
                    value={visit.country}
                    onChange={(e) => updateVisit(i, "country", e.target.value)}
                    placeholder="Country"
                    className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                  <input
                    type="text"
                    value={visit.year}
                    onChange={(e) => updateVisit(i, "year", e.target.value)}
                    placeholder="Year"
                    className="w-24 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeVisit(i)}
                    className="text-slate-500 hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addVisit}
                className="w-full rounded-xl border-2 border-dashed border-slate-300 py-4 text-sm font-medium text-primary-600 hover:border-primary-300 hover:bg-primary-50/50"
              >
                + Add another visit
              </button>
            </div>
          </div>
        )}
      </div>

      <StepFooter step={7} total={13} onBack={onBack} onNext={onNext} />
    </>
  );
}
