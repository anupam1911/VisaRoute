"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { SchengenCountry } from "@/data/countries";
import {
  getDocumentsForVisaType,
  VISA_TYPE_LABELS,
  type VisaType,
} from "@/data/documents";
import { SCHENGEN_REJECTION_REASONS } from "@/data/rejectionReasons";
import { VISA_PROCESS_STEPS } from "@/data/processSteps";
import { getCountryHeroImageUrl } from "@/data/countries";
import { ApplyingFrom } from "@/components/ApplyingFrom";

const DOCUMENT_ICONS: Record<string, string> = {
  passport: "🛂",
  "application-form": "📋",
  photo: "📷",
  "travel-insurance": "🛡️",
  itinerary: "✈️",
  accommodation: "🏨",
  financial: "💰",
  employment: "💼",
  invitation: "✉️",
  "transit-visa": "🔄",
};

const NATIONALITY_OPTIONS = [
  { value: "in", label: "Indian passport (visa required)" },
  { value: "pk", label: "Pakistani passport (visa required)" },
  { value: "bd", label: "Bangladeshi passport (visa required)" },
  { value: "ng", label: "Nigerian passport (visa required)" },
  { value: "other", label: "Other visa-required nationality" },
  { value: "gb", label: "UK passport (visa exempt)" },
  { value: "us", label: "US passport (visa exempt)" },
  { value: "other-exempt", label: "Other visa-exempt nationality" },
];

export function CountryPageClient({
  country,
  documentsByType,
}: {
  country: SchengenCountry;
  documentsByType: Record<VisaType, ReturnType<typeof getDocumentsForVisaType>>;
}) {
  const [activeTab, setActiveTab] = useState<"overview" | "documents" | "process">("overview");
  const [visaType, setVisaType] = useState<VisaType>("short-stay-tourism");
  const [nationalityKey, setNationalityKey] = useState("in");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const nationalityCategory = ["gb", "us", "other-exempt"].includes(nationalityKey) ? "visa-exempt" : "visa-required";
  const total = country.visaFeeEur + country.ourServiceFeeEur;
  const allDocs = documentsByType[visaType] ?? [];
  const documents = nationalityCategory === "visa-exempt"
    ? allDocs.filter((d) => d.nationalityCategory === "all")
    : allDocs.filter((d) => d.nationalityCategory === "all" || d.nationalityCategory === "visa-required");

  const visaByDate = "17 May 2026";

  const tabs: { id: "overview" | "documents" | "process"; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "documents", label: "Documents" },
    { id: "process", label: "Process" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white sticky top-0 z-20">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-primary-700 flex items-center gap-2">
            <span className="text-xl">✈</span> VisaRoute
          </Link>
          <div className="flex items-center gap-6">
            <ApplyingFrom />
            <Link href="/" className="text-sm text-slate-600 hover:text-slate-900">
              ← All countries
            </Link>
            <Link
              href={`/apply?country=${country.slug}`}
              className="rounded-lg bg-amber-cta px-4 py-2 text-sm font-semibold text-white hover:bg-amber-cta-hover transition"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="relative w-full h-[380px] sm:h-[420px] bg-slate-800">
        <Image
          src={getCountryHeroImageUrl(country)}
          alt={country.name}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-90"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            {country.name} Schengen Visa
          </h1>
          <p className="text-white/95 text-lg sm:text-xl mt-2 max-w-xl">
            Easily get your {country.name} Schengen visa from the UK
          </p>
        </div>
      </div>

      {/* Info card below hero */}
      <div className="mx-auto max-w-7xl px-4 -mt-8 relative z-10">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-xl p-4 sm:p-6 flex flex-wrap items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500">Visa Type</span>
            <select
              value={visaType}
              onChange={(e) => setVisaType(e.target.value as VisaType)}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-900"
            >
              {(Object.keys(VISA_TYPE_LABELS) as VisaType[]).map((t) => (
                <option key={t} value={t}>{VISA_TYPE_LABELS[t]}</option>
              ))}
            </select>
          </div>
          <div>
            <span className="text-sm text-slate-500">Processing</span>
            <p className="font-semibold text-slate-900">{country.processingDaysMin}–{country.processingDaysMax} days</p>
          </div>
          <div>
            <span className="text-sm text-slate-500">Visa Fee</span>
            <p className="font-semibold text-slate-900">€{country.visaFeeEur}</p>
          </div>
          <div>
            <span className="text-sm text-slate-500">Service Fee</span>
            <p className="font-semibold text-emerald-600 flex items-center gap-1">
              €{country.ourServiceFeeEur} <span className="text-emerald-500">✓</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main content + Sidebar */}
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left: Main content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Tab navigation */}
            <div className="flex gap-1 border-b border-slate-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg transition ${
                    activeTab === tab.id
                      ? "bg-white border border-slate-200 border-b-white -mb-px text-primary-600"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === "overview" && (
              <div className="space-y-8">
                <section>
                  <h2 className="text-xl font-semibold text-slate-900 mb-4 border-b-2 border-primary-500 pb-2 w-fit">
                    {country.name} Visa Information
                  </h2>
                  <p className="text-slate-600 mb-4">
                    Everything you need to know about the Schengen visa for {country.name} — costs,
                    duration, entry type and processing time.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    <div className="rounded-lg bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">VISA TYPE</p>
                      <p className="font-medium text-slate-900">Short-term</p>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">LENGTH OF STAY</p>
                      <p className="font-medium text-slate-900">90 Days</p>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">ENTRY</p>
                      <p className="font-medium text-slate-900">Multiple</p>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">APPROVAL RATE</p>
                      <p className="font-medium text-emerald-600">~89%</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-slate-900 mb-4 border-b-2 border-primary-500 pb-2 w-fit">
                    {country.name} Visa Insights
                  </h2>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">
                      <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-2">
                        <span className="text-2xl font-bold text-emerald-600">89%</span>
                      </div>
                      <p className="font-medium text-slate-900">Approval Rate</p>
                      <p className="text-sm text-slate-500">With complete documents</p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-6">
                      <p className="text-sm text-slate-500 mb-1">Processing Time</p>
                      <p className="text-xl font-semibold text-slate-900">
                        {country.processingDaysMin}–{country.processingDaysMax} days
                      </p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-6">
                      <p className="text-sm text-slate-500 mb-1">Appointment Lead</p>
                      <p className="text-xl font-semibold text-slate-900">
                        ~{country.appointmentLeadWeeks} weeks
                      </p>
                    </div>
                  </div>
                </section>

                <section id="appointments" className="scroll-mt-24">
                  <h2 className="text-xl font-semibold text-slate-900 mb-4 border-b-2 border-primary-500 pb-2 w-fit">
                    Check Appointment Availability
                  </h2>
                  <p className="text-slate-600 mb-4">
                    Real-time slot data for {country.name} visa appointments. We check every 15
                    minutes. Subscribe to get instant alerts.
                  </p>
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
                      Medium demand
                    </span>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800">
                      Slots available
                    </span>
                  </div>
                  {subscribed ? (
                    <p className="text-sm text-emerald-700 bg-emerald-50 rounded-lg p-3">
                      We&apos;ll email you at <strong>{email}</strong> when new slots open.
                    </p>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (email.trim()) setSubscribed(true);
                      }}
                      className="flex flex-wrap gap-2"
                    >
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm min-w-[200px]"
                      />
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
                      >
                        <span>🔔</span> Subscribe to Slot Alerts
                      </button>
                    </form>
                  )}
                </section>
              </div>
            )}

            {activeTab === "documents" && (
              <section>
                <h2 className="text-xl font-semibold text-slate-900 mb-2 border-b-2 border-primary-500 pb-2 w-fit">
                  Documents Required
                </h2>
                <p className="text-slate-600 mb-4">
                  Select your nationality to see your personalised checklist.
                </p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Nationality</label>
                    <select
                      value={nationalityKey}
                      onChange={(e) => setNationalityKey(e.target.value)}
                      className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 min-w-[240px]"
                    >
                      {NATIONALITY_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {nationalityCategory === "visa-exempt" ? (
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <p className="text-slate-700">
                      If you hold a visa-exempt passport (e.g. UK, US), you generally don&apos;t need a Schengen visa for short stays (90 days in 180). From mid-2025, visa-exempt travellers may need ETIAS authorisation.
                    </p>
                    <p className="text-sm text-slate-600 mt-2">
                      Documents shown below apply if you still need to apply (e.g. long-stay or specific cases).
                    </p>
                  </div>
                ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="rounded-xl border border-slate-200 bg-white p-4 hover:border-primary-200 hover:shadow-md transition"
                    >
                      <span className="text-2xl mb-2 block">
                        {DOCUMENT_ICONS[doc.id] ?? "📄"}
                      </span>
                      <p className="font-medium text-slate-900">{doc.name}</p>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{doc.description}</p>
                    </div>
                  ))}
                </div>
                )}
              </section>
            )}

            {activeTab === "process" && (
              <section>
                <h2 className="text-xl font-semibold text-slate-900 mb-2 border-b-2 border-primary-500 pb-2 w-fit">
                  Visa Application Process
                </h2>
                <p className="text-slate-600 mb-6">
                  From the moment you start to receiving your passport back — here&apos;s what to expect.
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                  {VISA_PROCESS_STEPS.map((step, i) => (
                    <div
                      key={step.id}
                      className="rounded-xl border border-slate-200 bg-white p-5"
                    >
                      <span className="inline-flex w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-semibold items-center justify-center text-sm mb-3">
                        {i + 1}
                      </span>
                      <p className="font-medium text-slate-900">{step.title}</p>
                      <p className="text-sm text-slate-600 mt-1">{step.description}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
                  <h3 className="font-medium text-slate-900 mb-2">Common rejection reasons</h3>
                  <ul className="space-y-1 text-sm text-slate-600">
                    {SCHENGEN_REJECTION_REASONS.slice(0, 3).map((r) => (
                      <li key={r.id}>• {r.title}</li>
                    ))}
                  </ul>
                </div>
              </section>
            )}
          </div>

          {/* Right: Sticky sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 p-6 text-white shadow-xl">
                <h3 className="text-lg font-semibold mb-2">Get your visa by</h3>
                <p className="text-2xl font-bold mb-4">{visaByDate}</p>
                <div className="space-y-2 text-sm text-white/90">
                  <p>Visa Fee (Approx €{country.visaFeeEur})</p>
                  <p>Service Fee €{country.ourServiceFeeEur}</p>
                </div>
                <p className="text-xl font-bold mt-4 pt-4 border-t border-white/30">
                  Total €{total}
                </p>
                <p className="text-xs text-white/80 mt-2">
                  Pay only when you get your appointment
                </p>
                <Link
                  href={`/apply?country=${country.slug}`}
                  className="mt-4 block w-full rounded-lg bg-amber-cta py-3 text-center font-semibold text-white hover:bg-amber-cta-hover transition"
                >
                  Start Application
                </Link>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <h4 className="font-medium text-slate-900 mb-2">Have Queries?</h4>
                <p className="text-sm text-slate-600">Documents, process, price, etc.</p>
                <Link href="/" className="text-sm text-primary-600 font-medium mt-2 inline-block">
                  Contact support →
                </Link>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <h4 className="font-medium text-slate-900 mb-2 flex items-center gap-2">
                  <span>🔔</span> Slot Alert
                </h4>
                <p className="text-sm text-slate-600">Next slot: ~{country.appointmentLeadWeeks} weeks</p>
                <p className="text-xs text-slate-500">We check every 15 minutes.</p>
                <Link
                  href={`/country/${country.slug}#appointments`}
                  className="mt-2 block text-center rounded-lg border border-primary-600 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50"
                >
                  Subscribe to alerts
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
