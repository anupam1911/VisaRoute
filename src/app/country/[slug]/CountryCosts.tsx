import type { SchengenCountry } from "@/data/countries";

export function CountryCosts({ country }: { country: SchengenCountry }) {
  const total = country.visaFeeEur + country.ourServiceFeeEur;
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm mb-10">
      <h2 className="text-xl font-semibold text-slate-900 mb-4">Visa costs & our charges</h2>
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Official visa fee</p>
          <p className="text-2xl font-semibold text-slate-900">€{country.visaFeeEur}</p>
          <p className="text-xs text-slate-500 mt-1">Paid to consulate/embassy</p>
        </div>
        <div className="rounded-xl bg-primary-50 p-4">
          <p className="text-sm text-primary-700">VisaRoute service fee</p>
          <p className="text-2xl font-semibold text-primary-800">€{country.ourServiceFeeEur}</p>
          <p className="text-xs text-primary-600 mt-1">Guidance, checklist, support</p>
        </div>
        <div className="rounded-xl bg-slate-100 p-4">
          <p className="text-sm text-slate-600">Total (indicative)</p>
          <p className="text-2xl font-semibold text-slate-900">€{total}</p>
          <p className="text-xs text-slate-500 mt-1">Visa + service</p>
        </div>
      </div>
      <p className="text-sm text-slate-500 mt-4">
        Fees may vary for children, certain nationalities, or long-stay visas. We’ll show the exact
        amount when you start your application.
      </p>
    </section>
  );
}
