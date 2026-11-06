import type { Metadata } from 'next';
import Link from 'next/link';
import { PageFrame } from '@/components/common/page-frame';
import { companyIndex } from '@/content/companies';

export const metadata: Metadata = { title: 'Company Dossiers — NEXUS' };

export default function CompaniesPage() {
  return (
    <PageFrame eyebrow="Research desk / Companies" title="Company Dossiers"
      intro="Read the thesis, trace the evidence to original filings, and see how the stock moved around a company event.">
      <div className="grid gap-5 sm:grid-cols-2">
        {companyIndex.map((company) => (
          <Link className="block border border-border bg-card p-6 hover:border-primary"
            key={company.slug} href={'/companies/' + company.slug}>
            <p className="mono text-xs uppercase text-primary">{company.exchange} · {company.ticker}</p>
            <h2 className="serif mt-3 text-3xl">{company.name}</h2>
            <p className="mt-3 text-sm text-muted-foreground">{company.summary}</p>
            <p className="mt-4 text-sm font-semibold text-primary">Read dossier →</p>
          </Link>
        ))}
      </div>
    </PageFrame>
  );
}
