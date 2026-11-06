import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PageFrame } from '@/components/common/page-frame';
import { companyIndex } from '@/content/companies';
import { SectionLabel } from '@/components/ui/section-label';

export const metadata: Metadata = { title: 'Company Research — NEXUS' };

export default function CompaniesPage() {
  return (
    <PageFrame eyebrow="Research desk / Company coverage" title="Company Research"
      intro="Start with the story. Follow the evidence into filings, risk scenarios, and the editable diligence model.">
      <SectionLabel>Latest research</SectionLabel>
      <div className="divide-y divide-border">
        {companyIndex.map((company, index) => (
          <Link className="group grid gap-4 py-7 first:pt-0 sm:grid-cols-[44px_minmax(0,1fr)_120px] sm:gap-6"
            key={company.slug} href={'/companies/' + company.slug}>
            <span className="mono text-xs text-muted-foreground">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <p className="mono text-[10px] uppercase tracking-[.15em] text-primary">{company.name} / {company.status}</p>
              <h2 className="serif mt-3 max-w-[720px] text-2xl leading-snug sm:text-3xl">{company.headline}</h2>
              <p className="mt-3 max-w-[690px] text-sm leading-6 text-muted-foreground">{company.summary}</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground sm:justify-end sm:self-start">
              Read article <ArrowUpRight size={15} aria-hidden />
            </div>
          </Link>
        ))}
      </div>
    </PageFrame>
  );
}
