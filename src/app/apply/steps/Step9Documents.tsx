"use client";

import { useRef } from "react";
import type { ApplicationData } from "../ApplyFlow";
import { StepFooter, TipBox } from "../StepFooter";

const DOCUMENT_TYPES = [
  { id: "passport", label: "Passport", desc: "Photo page – valid 3+ months after travel", autoCaptured: true },
  { id: "residence", label: "Residence permit", desc: "BRP or UK visa endorsement", autoCaptured: true },
  { id: "bank", label: "Bank statements", desc: "Last 3 months – min. €50-100/day of travel", autoCaptured: false },
  { id: "insurance", label: "Travel insurance", desc: "Min. €30,000 coverage across all Schengen", autoCaptured: false },
  { id: "flight", label: "Flight reservation", desc: "Confirmed or dummy booking", autoCaptured: false },
  { id: "hotel", label: "Hotel / accommodation", desc: "Booking for all nights of stay", autoCaptured: false },
  { id: "employment", label: "Employment letter", desc: "Signed by employer", autoCaptured: false },
];

export function Step9Documents({
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
  const refs = useRef<Record<string, HTMLInputElement | null>>({});
  const autoCaptured = (data.passportFile ? 1 : 0) + (data.residenceFile ? 1 : 0);
  const manualUploaded = Object.keys(data.documents).length;
  const complete = autoCaptured + manualUploaded;

  const handleUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (id === "passport") updateData({ passportFile: { file, name: file.name } });
    else if (id === "residence") updateData({ residenceFile: { file, name: file.name } });
    else updateData({ documents: { ...data.documents, [id]: { file, name: file.name } } });
  };

  const removeDoc = (id: string) => {
    if (id === "passport") updateData({ passportFile: null });
    else if (id === "residence") updateData({ residenceFile: null });
    else {
      const next = { ...data.documents };
      delete next[id];
      updateData({ documents: next });
    }
  };

  const isUploaded = (doc: { id: string }) => {
    if (doc.id === "passport") return !!data.passportFile;
    if (doc.id === "residence") return !!data.residenceFile;
    return !!data.documents[doc.id];
  };

  const getFileName = (doc: { id: string }) => {
    if (doc.id === "passport") return data.passportFile?.name;
    if (doc.id === "residence") return data.residenceFile?.name;
    return data.documents[doc.id]?.name;
  };

  return (
    <>
      <TipBox icon="📄">
        Upload clear, colour scans. Blurry or black-and-white documents are a common reason for delays.
      </TipBox>

      <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Step 9 of 13</p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        Upload your supporting documents.
      </h1>
      <p className="mt-2 text-slate-600">
        Smart checklist generated from your profile – only what you actually need.
      </p>

      <div className="mt-6 rounded-xl bg-emerald-50 p-4">
        <p className="flex items-center gap-2 text-sm font-medium text-emerald-800">
          <span>✓</span> Passport and residence permit already captured. Only {DOCUMENT_TYPES.length - 2} documents left to upload.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-600">Your personalised checklist</h2>
        <p className="mt-1 text-sm text-slate-500">{complete} / {DOCUMENT_TYPES.length} complete</p>
        <div className="mt-4 space-y-3">
          {DOCUMENT_TYPES.map((doc) => {
            const uploaded = isUploaded(doc);
            const fileName = getFileName(doc);
            return (
              <div key={doc.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{doc.id === "passport" ? "🛂" : doc.id === "residence" ? "🏠" : doc.id === "bank" ? "🏦" : doc.id === "insurance" ? "🛡️" : doc.id === "flight" ? "✈️" : doc.id === "hotel" ? "🛏️" : "📄"}</span>
                  <div>
                    <p className="font-semibold text-slate-900">{doc.label}</p>
                    <p className="text-sm text-slate-500">{doc.desc}</p>
                  </div>
                  {uploaded && doc.autoCaptured && (
                    <span className="ml-2 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">Auto-captured</span>
                  )}
                </div>
                <div>
                  {uploaded ? (
                    <div className="flex items-center gap-2">
                      <span className="max-w-[120px] truncate text-sm font-medium text-emerald-700">{fileName}</span>
                      {!doc.autoCaptured && (
                        <button onClick={() => removeDoc(doc.id)} className="text-sm text-slate-500 hover:text-red-600">Remove</button>
                      )}
                    </div>
                  ) : (
                    <>
                      <input ref={(el) => { refs.current[doc.id] = el; }} type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={(e) => handleUpload(doc.id, e)} className="hidden" />
                      <button onClick={() => refs.current[doc.id]?.click()} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">+ Upload</button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-amber-50 p-4">
        <p className="flex items-start gap-2 text-sm text-amber-800">
          <span>!</span> After upload, our system validates each document for completeness and minimum requirements.
        </p>
      </div>

      <StepFooter step={9} total={13} onBack={onBack} onNext={onNext} />
    </>
  );
}
