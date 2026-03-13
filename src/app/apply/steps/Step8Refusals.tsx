"use client";

import type { ApplicationData } from "../ApplyFlow";
import { StepFooter, TipBox } from "../StepFooter";

const COUNTRIES = ["France", "Germany", "Spain", "Italy", "Netherlands", "Other"];
const YEARS = ["2024", "2023", "2022", "2021", "2020", "2019", "Earlier"];
const VISA_TYPES = ["Tourist", "Business", "Transit", "Other"];

export function Step8Refusals({
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
  const addRefusal = () => {
    updateData({
      refusalDetails: [...data.refusalDetails, { country: "", year: "", visaType: "", reason: "" }],
    });
  };

  const updateRefusal = (index: number, field: keyof typeof data.refusalDetails[0], value: string) => {
    const next = [...data.refusalDetails];
    next[index] = { ...next[index], [field]: value };
    updateData({ refusalDetails: next });
  };

  const removeRefusal = (index: number) => {
    updateData({ refusalDetails: data.refusalDetails.filter((_, i) => i !== index) });
  };

  return (
    <>
      <TipBox icon="💡">
        A previous refusal is not disqualifying — but it must be declared. We&apos;ll address it directly in your cover letter.
      </TipBox>

      <div className="mt-4 rounded-xl bg-amber-50 p-4">
        <p className="flex items-start gap-2 text-sm text-amber-800">
          <span>⚠</span> Embassies ask this question directly on the application form. Always declare honestly — we&apos;ll handle it in your cover letter.
        </p>
      </div>

      <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Step 8 of 13</p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        Any previous visa refusals?
      </h1>
      <p className="mt-2 text-slate-600">
        Embassies ask about previous refusals. Be honest — we&apos;ll address it in your letter.
      </p>

      <div className="mt-8">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
          Have you ever been refused a visa to any country?
        </label>
        <div className="mt-3 flex gap-4">
          <button
            type="button"
            onClick={() => updateData({
              previousVisaRejections: "yes",
              refusalDetails: data.refusalDetails.length ? data.refusalDetails : [{ country: "", year: "", visaType: "", reason: "" }],
            })}
            className={`flex items-center gap-2 rounded-xl border-2 px-6 py-4 transition ${
              data.previousVisaRejections === "yes" ? "border-emerald-500 bg-emerald-50" : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <span className="text-xl">✓</span>
            <span className="font-semibold text-slate-900">Yes</span>
          </button>
          <button
            type="button"
            onClick={() => updateData({ previousVisaRejections: "no", refusalDetails: [] })}
            className={`flex items-center gap-2 rounded-xl border-2 px-6 py-4 transition ${
              data.previousVisaRejections === "no" ? "border-emerald-500 bg-emerald-50" : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <span className="text-xl">✗</span>
            <span className="font-semibold text-slate-900">No</span>
          </button>
        </div>

        {data.previousVisaRejections === "yes" && (
          <div className="mt-6 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">Tell us about the refusal(s):</p>
            {data.refusalDetails.map((r, i) => (
              <div key={i} className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-500">Which country refused you?</label>
                    <select
                      value={r.country}
                      onChange={(e) => updateRefusal(i, "country", e.target.value)}
                      className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    >
                      <option value="">Select...</option>
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500">Year of refusal</label>
                    <select
                      value={r.year}
                      onChange={(e) => updateRefusal(i, "year", e.target.value)}
                      className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    >
                      <option value="">Select...</option>
                      {YEARS.map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-500">Visa type refused</label>
                  <select
                    value={r.visaType}
                    onChange={(e) => updateRefusal(i, "visaType", e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  >
                    <option value="">Select...</option>
                    {VISA_TYPES.map((v) => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-500">Reason given (optional)</label>
                  <textarea
                    value={r.reason}
                    onChange={(e) => updateRefusal(i, "reason", e.target.value)}
                    placeholder="e.g. Insufficient bank balance, incomplete documents..."
                    rows={2}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  />
                </div>
                <button type="button" onClick={() => removeRefusal(i)} className="text-sm text-slate-500 hover:text-red-600">Remove</button>
              </div>
            ))}
            <button
              type="button"
              onClick={addRefusal}
              className="w-full rounded-xl border-2 border-dashed border-slate-300 py-4 text-sm font-medium text-primary-600 hover:border-primary-300 hover:bg-primary-50/50"
            >
              + Add another refusal
            </button>
          </div>
        )}
      </div>

      <StepFooter step={8} total={13} onBack={onBack} onNext={onNext} />
    </>
  );
}
