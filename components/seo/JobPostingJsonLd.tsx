import { IJob } from "@/types/job.types";
import { getSiteUrl } from "@/lib/siteUrl";

interface JobPostingJsonLdProps {
  job: IJob;
  locale: string;
}

export default function JobPostingJsonLd({ job, locale }: JobPostingJsonLdProps) {
  const base = getSiteUrl();
  const url = `${base}/${locale}/jobs/${job.jobId}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.createdAt,
    validThrough: job.updatedAt,
    employmentType: job.jobType?.toUpperCase(),
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location,
      },
    },
    hiringOrganization: {
      "@type": "Organization",
      name: job.company?.name ?? "Company",
      sameAs: job.company?.userId
        ? `${base}/${locale}/companies/${job.company.userId}`
        : undefined,
    },
    baseSalary: job.salary
      ? {
          "@type": "MonetaryAmount",
          currency: job.salary.currency ?? "USD",
          value: {
            "@type": "QuantitativeValue",
            minValue: job.salary.min,
            maxValue: job.salary.max,
            unitText: job.salary.salaryPeriod === "month" ? "MONTH" : "YEAR",
          },
        }
      : undefined,
    url,
    directApply: true,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
