/**
 * Visa document requirements by visa type and nationality category.
 * Simplified for MVP; can be expanded with real rules later.
 */

export type VisaType = "short-stay-tourism" | "short-stay-business" | "airport-transit" | "long-stay";

export type NationalityCategory = "visa-required" | "visa-exempt" | "all";

export interface DocumentRequirement {
  id: string;
  name: string;
  description: string;
  required: boolean;
  visaTypes: VisaType[];
  nationalityCategory: NationalityCategory; // "all" = everyone, "visa-required" = only if they need a visa
}

export const DOCUMENT_TEMPLATES: DocumentRequirement[] = [
  {
    id: "passport",
    name: "Valid passport",
    description: "Valid for at least 3 months beyond your intended departure from the Schengen area, issued in the last 10 years, with at least 2 blank pages.",
    required: true,
    visaTypes: ["short-stay-tourism", "short-stay-business", "airport-transit", "long-stay"],
    nationalityCategory: "all",
  },
  {
    id: "application-form",
    name: "Visa application form",
    description: "Fully completed and signed Schengen visa application form.",
    required: true,
    visaTypes: ["short-stay-tourism", "short-stay-business", "airport-transit", "long-stay"],
    nationalityCategory: "visa-required",
  },
  {
    id: "photo",
    name: "Passport-size photo",
    description: "Recent colour photo (35x45 mm) meeting ICAO standards.",
    required: true,
    visaTypes: ["short-stay-tourism", "short-stay-business", "airport-transit", "long-stay"],
    nationalityCategory: "visa-required",
  },
  {
    id: "travel-insurance",
    name: "Travel health insurance",
    description: "Coverage of at least €30,000 for medical emergencies and repatriation, valid for the entire stay in the Schengen area.",
    required: true,
    visaTypes: ["short-stay-tourism", "short-stay-business", "long-stay"],
    nationalityCategory: "visa-required",
  },
  {
    id: "itinerary",
    name: "Travel itinerary",
    description: "Round-trip or multi-destination booking (flights, trains) or detailed plan with dates.",
    required: true,
    visaTypes: ["short-stay-tourism", "short-stay-business"],
    nationalityCategory: "visa-required",
  },
  {
    id: "accommodation",
    name: "Proof of accommodation",
    description: "Hotel reservations, rental agreement, or invitation letter covering the full stay.",
    required: true,
    visaTypes: ["short-stay-tourism", "short-stay-business", "long-stay"],
    nationalityCategory: "visa-required",
  },
  {
    id: "financial",
    name: "Proof of sufficient means",
    description: "Bank statements (last 3 months), sponsorship letter, or proof of employment/income demonstrating you can cover the trip.",
    required: true,
    visaTypes: ["short-stay-tourism", "short-stay-business", "long-stay"],
    nationalityCategory: "visa-required",
  },
  {
    id: "employment",
    name: "Employment proof",
    description: "Employment letter, leave approval, or if self-employed: business registration and tax returns.",
    required: false,
    visaTypes: ["short-stay-tourism", "short-stay-business"],
    nationalityCategory: "visa-required",
  },
  {
    id: "invitation",
    name: "Invitation letter (if applicable)",
    description: "For business or family visits: signed invitation from host with their ID and address.",
    required: false,
    visaTypes: ["short-stay-business"],
    nationalityCategory: "visa-required",
  },
  {
    id: "transit-visa",
    name: "Destination country visa (for transit)",
    description: "If applying for airport transit visa: visa or residence permit for your final destination country.",
    required: true,
    visaTypes: ["airport-transit"],
    nationalityCategory: "visa-required",
  },
];

export function getDocumentsForVisaType(
  visaType: VisaType,
  nationalityCategory: NationalityCategory = "visa-required"
): DocumentRequirement[] {
  return DOCUMENT_TEMPLATES.filter(
    (d) =>
      d.visaTypes.includes(visaType) &&
      (d.nationalityCategory === "all" || d.nationalityCategory === nationalityCategory)
  );
}

export const VISA_TYPE_LABELS: Record<VisaType, string> = {
  "short-stay-tourism": "Short-stay (Tourism)",
  "short-stay-business": "Short-stay (Business)",
  "airport-transit": "Airport transit",
  "long-stay": "Long-stay / National visa",
};
