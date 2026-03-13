export interface RejectionReason {
  id: string;
  title: string;
  description: string;
}

export const SCHENGEN_REJECTION_REASONS: RejectionReason[] = [
  {
    id: "expired-passport",
    title: "Expired passport",
    description: "Applying with a passport that expires within 6 months of travel.",
  },
  {
    id: "insufficient-funds",
    title: "Insufficient funds",
    description: "Failing to demonstrate enough financial resources for the stay.",
  },
  {
    id: "criminal-record",
    title: "Criminal record",
    description: "A criminal history that disqualifies you from a Schengen visa.",
  },
  {
    id: "visa-violations",
    title: "Previous visa violations",
    description: "Having overstayed or violated terms of a previous visa.",
  },
  {
    id: "invalid-insurance",
    title: "Invalid travel insurance",
    description: "Failing to present valid insurance with minimum €30,000 coverage.",
  },
];
