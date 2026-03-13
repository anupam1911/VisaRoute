import { notFound } from "next/navigation";
import { getCountryBySlug, SCHENGEN_COUNTRIES } from "@/data/countries";
import {
  getDocumentsForVisaType,
  VISA_TYPE_LABELS,
  type VisaType,
} from "@/data/documents";
import { CountryPageClient } from "./CountryPageClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SCHENGEN_COUNTRIES.map((c) => ({ slug: c.slug }));
}

export default async function CountryPage({ params }: PageProps) {
  const { slug } = await params;
  const country = getCountryBySlug(slug);
  if (!country) notFound();

  const visaTypes = Object.keys(VISA_TYPE_LABELS) as VisaType[];
  const documentsByType = Object.fromEntries(
    visaTypes.map((type) => [type, getDocumentsForVisaType(type)])
  ) as Record<VisaType, ReturnType<typeof getDocumentsForVisaType>>;

  return (
    <CountryPageClient country={country} documentsByType={documentsByType} />
  );
}
