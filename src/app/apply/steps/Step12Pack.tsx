"use client";

import type { ApplicationData } from "../ApplyFlow";
import { StepFooter, TipBox } from "../StepFooter";

const PACK_ITEMS = [
  { id: "form", label: "Schengen application form", desc: "Pre-filled from your data", icon: "📄" },
  { id: "letter", label: "Personalised cover letter", desc: "Purpose, dates, history & refusals handled", icon: "✉️" },
  { id: "itinerary", label: "Day-by-day itinerary", desc: "Based on your trip + companions", icon: "🗓️" },
  { id: "checklist", label: "Document checklist", desc: "Your specific requirements", icon: "✅" },
];

export function Step12Pack({
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
      <TipBox icon="📎">
        Submit your documents in the order shown in the checklist – consulates process ordered packets faster.
      </TipBox>

      <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Step 12 of 13</p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        Generate your visa application pack.
      </h1>
      <p className="mt-2 text-slate-600">
        We&apos;ll produce a complete, ready-to-submit document pack in seconds.
      </p>

      <div className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-600">What will be generated</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {PACK_ITEMS.map((item) => (
            <div key={item.id} className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5">
              <span className="text-3xl">{item.icon}</span>
              <div>
                <p className="font-semibold text-slate-900">{item.label}</p>
                <p className="mt-0.5 text-sm text-slate-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-xl border border-primary-200 bg-primary-50/50 p-4">
          <p className="flex items-start gap-2 text-sm text-slate-700">
            <span className="text-primary-600">!</span>
            Your visa pack will reference prior Schengen visits and address any refusal history directly — increasing approval probability.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {}}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-4 text-base font-semibold text-white hover:bg-slate-800"
        >
          <span>✨</span> Generate my visa pack
        </button>
      </div>

      <StepFooter step={12} total={13} onBack={onBack} onNext={onNext} />
    </>
  );
}
