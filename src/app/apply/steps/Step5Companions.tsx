"use client";

import type { ApplicationData } from "../ApplyFlow";
import { StepFooter, TipBox } from "../StepFooter";

export function Step5Companions({
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
  return (
    <>
      <TipBox icon="👨‍👩‍👧">
        If travelling with children, you&apos;ll need consent letters from both parents if only one is travelling with them.
      </TipBox>

      <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Step 5 of 13</p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        Are you travelling with anyone?
      </h1>
      <p className="mt-2 text-slate-600">
        Group applications can share a single itinerary and cover letter.
      </p>

      <div className="mt-8">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
          Are you travelling with family or friends?
        </label>
        <div className="mt-3 flex gap-4">
          <button
            type="button"
            onClick={() => updateData({ travellingWithCompanions: "yes", companionsCount: data.companionsCount || 1 })}
            className={`flex items-center gap-2 rounded-xl border-2 px-6 py-4 transition ${
              data.travellingWithCompanions === "yes" ? "border-emerald-500 bg-emerald-50" : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <span className="text-xl">✓</span>
            <span className="font-semibold text-slate-900">Yes</span>
          </button>
          <button
            type="button"
            onClick={() => updateData({ travellingWithCompanions: "no", companionsCount: 0 })}
            className={`flex items-center gap-2 rounded-xl border-2 px-6 py-4 transition ${
              data.travellingWithCompanions === "no" ? "border-emerald-500 bg-emerald-50" : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <span className="text-xl">✗</span>
            <span className="font-semibold text-slate-900">No</span>
          </button>
        </div>

        {data.travellingWithCompanions === "yes" && (
          <div className="mt-6">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">Number of companions</label>
            <select
              value={data.companionsCount || 1}
              onChange={(e) => updateData({ companionsCount: parseInt(e.target.value, 10) })}
              className="mt-2 w-full max-w-xs rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>{n} {n === 1 ? "person" : "people"}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      <StepFooter step={5} total={13} onBack={onBack} onNext={onNext} />
    </>
  );
}
