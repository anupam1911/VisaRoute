"use client";

export function StepFooter({
  step,
  total,
  onBack,
  onNext,
}: {
  step: number;
  total: number;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="mt-10 flex items-center justify-between border-t border-slate-200 pt-8">
      <button
        onClick={onBack}
        className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
      >
        ← Back
      </button>
      <div className="flex flex-col items-center gap-1">
        <span className="text-sm font-medium text-slate-700">{step}/{total}</span>
        <div className="h-1 w-24 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-primary-500 transition-all duration-300"
            style={{ width: `${(step / total) * 100}%` }}
          />
        </div>
      </div>
      <button
        onClick={onNext}
        className="flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
      >
        Continue
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

export function TipBox({ children, icon = "💡" }: { children: React.ReactNode; icon?: string }) {
  return (
    <div className="rounded-xl border-l-4 border-amber-400 bg-amber-50/80 p-4">
      <div className="flex gap-3">
        <span className="text-lg">{icon}</span>
        <p className="text-sm text-slate-700">{children}</p>
      </div>
    </div>
  );
}
