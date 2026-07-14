import { ICompany } from "@/types/company.types";
import { getSiteUrl } from "@/lib/siteUrl";

interface OrganizationJsonLdProps {
  company: ICompany;
  locale: string;
}

export default function OrganizationJsonLd({
  company,
  locale,
}: OrganizationJsonLdProps) {
  const base = getSiteUrl();
  const url = `${base}/${locale}/companies/${company.userId}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    description: company.description,
    url,
    logo: company.profileImage?.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: company.location,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
