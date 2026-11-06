import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PageFrame } from '@/components/common/page-frame';
import { companyIndex } from '@/content/companies';
import { SectionLabel } from '@/components/ui/section-label';

export const metadata: Metadata = { title: 'Company Dossiers — NEXUS' };

export default function CompaniesPage() {
  return (
    <PageFrame eyebrow="Research / Companies" title="Company Dossiers"
      intro="Read the thesis, trace the evidence to original filings, and see how the stock moved around a company event.">
      <SectionLabel>Coverage</SectionLabel>
      <div className="divide-y divide-border">
        {companyIndex.map((company, index) => (
          <Link className="group grid gap-5 py-8 first:pt-0 sm:grid-cols-[55px_1fr_180px]"
            key={company.slug} href={'/companies/' + company.slug}>
            <span className="mono text-xs text-muted-foreground">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <p className="text-[10px] uppercase tracking-[.15em] text-primary">{company.exchange} / {company.ticker}</p>
              <h2 className="serif mt-3 text-3xl group-hover:text-primary">{company.name}</h2>
              <p className="mt-3 max-w-[690px] text-sm leading-6 text-muted-foreground">{company.summary}</p>
            </div>
            <div className="flex items-start justify-between text-[11px] text-muted-foreground sm:block sm:text-right">
              <span>Read dossier</span><ArrowUpRight size={16} className="inline sm:ml-3" />
            </div>
          </Link>
        ))}
      </div>
    </PageFrame>
  );
}
