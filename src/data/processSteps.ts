export interface ProcessStep {
  id: string;
  title: string;
  description: string;
}

export const VISA_PROCESS_STEPS: ProcessStep[] = [
  {
    id: "initiate",
    title: "Process initiation",
    description: "Our team contacts you within 2 hours.",
  },
  {
    id: "review",
    title: "Application review",
    description: "Documents checked and any gaps flagged.",
  },
  {
    id: "appointment",
    title: "Appointment picked",
    description: "Earliest available slot confirmed.",
  },
  {
    id: "biometric",
    title: "Day of biometric",
    description: "You attend VFS/consulate with your document pack.",
  },
  {
    id: "decision",
    title: "Visa decision",
    description: "Passport returned with visa sticker.",
  },
];
