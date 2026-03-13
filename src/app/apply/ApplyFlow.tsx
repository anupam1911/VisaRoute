"use client";

import { useState } from "react";
import Link from "next/link";
import { ApplySidebar } from "./ApplySidebar";
import { Step1Intro } from "./steps/Step1Intro";
import { Step2Passport } from "./steps/Step2Passport";
import { Step3Residence } from "./steps/Step3Residence";
import { Step4Travel } from "./steps/Step4Travel";
import { Step5Companions } from "./steps/Step5Companions";
import { Step6Employment } from "./steps/Step6Employment";
import { Step7VisaHistory } from "./steps/Step7VisaHistory";
import { Step8Refusals } from "./steps/Step8Refusals";
import { Step9Documents } from "./steps/Step9Documents";
import { Step10Checks } from "./steps/Step10Checks";
import { Step11Review } from "./steps/Step11Review";
import { Step12Pack } from "./steps/Step12Pack";
import { Step13Appointment } from "./steps/Step13Appointment";

export interface ApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  countryOfResidence: string;
  purposeOfTravel: string;
  travelStartDate: string;
  travelEndDate: string;
  travellingWithCompanions: string; // "yes" | "no"
  companionsCount: number;
  visitedSchengenBefore: string; // "yes" | "no"
  previousTravelVisits: { country: string; year: string }[];
  previousVisaRejections: string; // "yes" | "no"
  refusalDetails: { country: string; year: string; visaType: string; reason: string }[];
  passportFile: { file: File; name: string } | null;
  residenceFile: { file: File; name: string } | null;
  accommodation: string;
  entryCity: string;
  multiCountry: string;
  employmentStatus: string;
  documents: Record<string, { file: File; name: string }>;
}

export const STEPS = [
  { id: 1, slug: "intro", label: "Introduction" },
  { id: 2, slug: "passport", label: "Passport" },
  { id: 3, slug: "residence", label: "Residence" },
  { id: 4, slug: "travel", label: "Travel Plan" },
  { id: 5, slug: "companions", label: "Companions" },
  { id: 6, slug: "employment", label: "Employment" },
  { id: 7, slug: "visa-history", label: "Visa History" },
  { id: 8, slug: "refusals", label: "Refusals" },
  { id: 9, slug: "documents", label: "Documents" },
  { id: 10, slug: "checks", label: "Doc Checks" },
  { id: 11, slug: "review", label: "Review" },
  { id: 12, slug: "pack", label: "Visa Pack" },
  { id: 13, slug: "appt", label: "Appointment" },
];

const TOTAL_STEPS = 13;

interface ApplyFlowProps {
  countryName: string;
  countrySlug: string;
  visaFeeEur: number;
  serviceFeeEur: number;
}

export function ApplyFlow({ countryName, countrySlug, visaFeeEur, serviceFeeEur }: ApplyFlowProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<ApplicationData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    countryOfResidence: "gb",
    purposeOfTravel: "",
    travelStartDate: "",
    travelEndDate: "",
    travellingWithCompanions: "",
    companionsCount: 0,
    visitedSchengenBefore: "",
    previousTravelVisits: [],
    previousVisaRejections: "",
    refusalDetails: [],
    passportFile: null,
    residenceFile: null,
    accommodation: "",
    entryCity: "",
    multiCountry: "",
    employmentStatus: "",
    documents: {},
  });

  const updateData = (updates: Partial<ApplicationData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const currentStepInfo = STEPS.find((s) => s.id === step)!;
  const progressPercent = Math.round((step / TOTAL_STEPS) * 100);

  return (
    <div className="flex min-h-screen">
      <ApplySidebar
        countryName={countryName}
        countrySlug={countrySlug}
        currentStep={step}
        visaFeeEur={visaFeeEur}
        serviceFeeEur={serviceFeeEur}
        purpose={data.purposeOfTravel}
        applicantName={[data.firstName, data.lastName].filter(Boolean).join(" ") || undefined}
        companionsCount={data.travellingWithCompanions === "yes" ? data.companionsCount : 0}
      />

      <div className="flex flex-1 flex-col bg-slate-50/90">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
          <nav className="text-sm text-slate-600">
            <Link href="/" className="hover:text-primary-600">VisaRoute</Link>
            <span className="mx-2">›</span>
            <Link href={`/country/${countrySlug}`} className="hover:text-primary-600">{countryName}</Link>
            <span className="mx-2">›</span>
            <span className="font-medium text-slate-900">{currentStepInfo.label}</span>
          </nav>
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-violet-600 hover:bg-violet-50"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            Save progress
          </button>
        </header>

        <main className="flex-1 overflow-auto p-6 lg:p-10">
          <div className="mx-auto max-w-2xl">
            <div className="mb-6 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Application complete {progressPercent}%
                </p>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-primary-500 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {step === 1 && <Step1Intro data={data} updateData={updateData} countryName={countryName} onNext={handleNext} onBack={handleBack} />}
            {step === 2 && <Step2Passport data={data} updateData={updateData} countryName={countryName} onNext={handleNext} onBack={handleBack} />}
            {step === 3 && <Step3Residence data={data} updateData={updateData} countryName={countryName} onNext={handleNext} onBack={handleBack} />}
            {step === 4 && <Step4Travel data={data} updateData={updateData} countryName={countryName} onNext={handleNext} onBack={handleBack} />}
            {step === 5 && <Step5Companions data={data} updateData={updateData} countryName={countryName} onNext={handleNext} onBack={handleBack} />}
            {step === 6 && <Step6Employment data={data} updateData={updateData} countryName={countryName} onNext={handleNext} onBack={handleBack} />}
            {step === 7 && <Step7VisaHistory data={data} updateData={updateData} countryName={countryName} onNext={handleNext} onBack={handleBack} />}
            {step === 8 && <Step8Refusals data={data} updateData={updateData} countryName={countryName} onNext={handleNext} onBack={handleBack} />}
            {step === 9 && <Step9Documents data={data} updateData={updateData} countryName={countryName} onNext={handleNext} onBack={handleBack} />}
            {step === 10 && <Step10Checks data={data} countryName={countryName} onNext={handleNext} onBack={handleBack} />}
            {step === 11 && <Step11Review data={data} countryName={countryName} onNext={handleNext} onBack={handleBack} />}
            {step === 12 && <Step12Pack data={data} countryName={countryName} onNext={handleNext} onBack={handleBack} />}
            {step === 13 && (
              <Step13Appointment
                data={data}
                countryName={countryName}
                countrySlug={countrySlug}
                visaFeeEur={visaFeeEur}
                serviceFeeEur={serviceFeeEur}
                onBack={handleBack}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
