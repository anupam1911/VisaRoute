"use client";

import { useRef } from "react";
import type { ApplicationData } from "../ApplyFlow";
import { StepFooter, TipBox } from "../StepFooter";

export function Step2Passport({
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
  const inputRef = useRef<HTMLInputElement>(null);
  const hasFile = !!data.passportFile;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) updateData({ passportFile: { file, name: file.name } });
  };

  return (
    <>
      <TipBox icon="📄">
        Ensure your passport is valid for at least 3 months beyond your return date. Expired passports are the #1 rejection reason.
      </TipBox>

      <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Step 2 of 13</p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        Upload your passport.
      </h1>
      <p className="mt-2 text-slate-600">
        We&apos;ll extract all 8 fields automatically — no manual typing required.
      </p>

      <div className="mt-8">
        <input ref={inputRef} type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={handleChange} className="hidden" />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={`flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 transition ${
            hasFile ? "border-emerald-300 bg-emerald-50/50" : "border-slate-300 bg-white hover:border-primary-300 hover:bg-primary-50/30"
          }`}
        >
          {hasFile ? (
            <>
              <span className="text-4xl text-emerald-600">✓</span>
              <p className="mt-2 font-semibold text-emerald-800">{data.passportFile!.name}</p>
              <p className="mt-1 text-sm text-emerald-600">Click to replace</p>
            </>
          ) : (
            <>
              <div className="rounded-xl bg-primary-100 p-4">
                <svg className="h-12 w-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <p className="mt-4 font-semibold text-slate-700">Drag & drop or click to upload</p>
              <p className="mt-1 text-sm text-slate-500">Passport photo page – JPG, PNG or PDF</p>
              <p className="mt-2 text-xs font-medium text-primary-600">We automatically extract all 8 fields – zero typing needed</p>
            </>
          )}
        </button>

        <div className="mt-4 flex items-center gap-3 rounded-xl border border-primary-200 bg-primary-50/50 p-4">
          <span className="text-primary-600">🔒</span>
          <p className="text-sm text-slate-700">
            Documents processed securely and never stored after extraction.
          </p>
        </div>
      </div>

      <StepFooter step={2} total={13} onBack={onBack} onNext={onNext} />
    </>
  );
}
