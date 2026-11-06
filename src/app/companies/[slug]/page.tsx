import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Download } from 'lucide-react';
import { SectionLabel } from '@/components/ui/section-label';
import { companies, getCompany, microsoftMarketEvent } from '@/content/companies';
import MarketReaction from './market-reaction';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return companies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const company = getCompany((await params).slug);
  return company ? { title: company.headline + ' — NEXUS', description: company.summary } : {};
}

const number = new Intl.NumberFormat('en-US');
const dateLabel = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
const source = 'text-primary underline underline-offset-4';
const labels = ['Revenue', 'Operating income (loss)', 'Operating cash flow', 'Cash capital expenditure'];

function FinancialTable({ periods, rows }: {
  periods: (number | string)[];
  rows: [string, ...(number | null)[]][];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead><tr className="border-b border-border">
          <th scope="col" className="py-2 pr-4">USD millions</th>
          {periods.map((period) => <th scope="col" className="py-2 pl-3 text-right" key={period}>{period}</th>)}
        </tr></thead>
        <tbody>{rows.map(([label, ...values]) => (
          <tr key={label} className="border-b border-border">
            <th scope="row" className="py-3 pr-4 font-medium">{label}</th>
            {values.map((value, index) => <td key={periods[index]} className="whitespace-nowrap py-3 pl-3 text-right tabular-nums">
              {value === null ? '—' : number.format(value)}
            </td>)}
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}

export default async function CompanyPage({ params }: Props) {
  const company = getCompany((await params).slug);
  if (!company) notFound();
  const files = '/company-research/' + company.slug + '-due-diligence';
  const rows = labels.map((label, index): [string, ...(number | null)[]] =>
    [label, ...company.history.map((period) => period[index + 1])]);

  return (
    <div className="mx-auto max-w-[1180px] px-5 py-10 sm:px-10 sm:py-14">
      <Link href="/companies" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary">
        <ArrowLeft size={14} aria-hidden /> Company research
      </Link>
      <header className="mt-6 max-w-[910px]">
        <p className="mono text-[10px] uppercase tracking-[.2em] text-primary">{company.name} / {company.status}</p>
        <h1 className="serif mt-4 text-4xl leading-[1.12] tracking-[-.04em] sm:text-6xl">{company.headline}</h1>
        <p className="mt-5 max-w-[740px] text-lg leading-8 text-muted-foreground">{company.summary}</p>
      </header>

      <div className="mt-7 border-y border-border py-4 text-xs text-muted-foreground">
        <span className="mono">{company.ticker}</span> · Nexus Research Desk · Research as of <time dateTime={company.asOf}>{dateLabel.format(new Date(company.asOf))}</time>
      </div>

      <div className="mt-9 grid min-w-0 gap-9 lg:grid-cols-[minmax(0,1fr)_230px]">
        <article className="min-w-0 space-y-12">
          <section id="thesis" className="scroll-mt-24">
            <div className="border-l-2 border-primary bg-primary/5 px-5 py-5 sm:px-6">
              <h2 className="mono text-[10px] uppercase tracking-[.18em]">Research thesis</h2>
              <p className="serif mt-3 text-xl leading-8">{company.thesis}</p>
            </div>
            <p className="mt-5 text-[15px] leading-7 text-muted-foreground"><strong className="text-foreground">Counterargument.</strong> {company.counterargument}</p>
          </section>
          <section id="evidence" className="scroll-mt-24">
            <SectionLabel><h2>What the evidence says</h2></SectionLabel>
            <div className="space-y-7">{company.claims.map((claim) => (
              <div key={claim.title}>
                <h3 className="serif text-xl leading-7">{claim.title}</h3>
                <p className="mt-2 text-[15px] leading-7 text-muted-foreground">{claim.detail}</p>
                <a className="mt-2 inline-flex items-center gap-2 text-xs font-semibold hover:underline" href={claim.url}>
                  {claim.section} <ArrowUpRight size={13} className="shrink-0" aria-hidden />
                </a>
              </div>
            ))}</div>
          </section>
          <section id="financials" className="scroll-mt-24">
            <SectionLabel><h2>Financial record</h2></SectionLabel>
            <p className="mb-4 text-sm leading-6 text-muted-foreground">{company.basis}</p>
            {company.history.length > 0 && <FinancialTable periods={company.history.map(([year]) => year)} rows={rows} />}
            {company.interim && <div className="mt-6">
              <h3 className="mb-3 text-sm font-semibold">Unaudited interim comparison</h3>
              <FinancialTable periods={company.interim.periods} rows={company.interim.rows} />
            </div>}
          </section>
          <section id="risk" className="scroll-mt-24">
            <SectionLabel><h2>Scenarios and decision gates</h2></SectionLabel>
            <dl className="grid gap-px border border-border bg-border sm:grid-cols-3">
              {company.scenarios.map((scenario) => <div key={scenario.name} className="bg-card p-4">
                <dt className="text-xs font-semibold">{scenario.name}</dt>
                <dd className="mt-2 text-sm leading-6 text-muted-foreground">{scenario.detail}</dd>
              </div>)}
            </dl>
            <p className="mt-5 text-sm leading-6"><strong>Key risk.</strong> {company.risk}.</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground"><strong className="text-foreground">Diligence gate.</strong> {company.gate}</p>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-muted-foreground">{company.watch.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
          <section id="sources" className="scroll-mt-24">
            <SectionLabel><h2>Disclosure timeline</h2></SectionLabel>
            <ol className="space-y-3 text-sm">{company.timeline.map((entry) => (
              <li key={entry.url} className="flex flex-wrap gap-x-4 gap-y-1">
                <time dateTime={entry.date} className="mono text-muted-foreground">{entry.date}</time>
                <span className="text-muted-foreground">{entry.kind}</span>
                <a className={source} href={entry.url}>{entry.title}</a>
              </li>
            ))}</ol>
          </section>
          {company.slug === 'microsoft' && <section>
            <SectionLabel><h2>Market reaction archive</h2></SectionLabel>
            <MarketReaction event={microsoftMarketEvent} ticker={company.ticker} />
          </section>}
        </article>
        <aside className="row-start-1 lg:col-start-2 lg:row-start-auto">
          <div className="border border-border bg-card p-5 lg:sticky lg:top-24">
            <h2 className="mono text-[10px] uppercase tracking-[.18em]">Research files</h2>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              The extended report includes filing checks, hypotheses, charts, and a workstream risk register.
            </p>
            <div className="mt-3 grid divide-y divide-border text-sm">
              <a className="flex items-center justify-between gap-2 py-3 hover:underline" href={files + '.pdf'} target="_blank" rel="noopener noreferrer">View report PDF <ArrowUpRight size={14} aria-hidden /></a>
              <a className="flex items-center justify-between gap-2 py-3 hover:underline" href={files + '.pdf'} download>Download PDF <Download size={14} aria-hidden /></a>
              <a className="flex items-center justify-between gap-2 py-3 hover:underline" href={files + '.docx'} download>Download Word <Download size={14} aria-hidden /></a>
              <a className="flex items-center justify-between gap-2 py-3 hover:underline" href={files + '.xlsx'} download>Download Excel <Download size={14} aria-hidden /></a>
            </div>
            <nav className="mt-3 hidden border-t border-border pt-4 text-xs text-muted-foreground lg:grid lg:gap-2" aria-label="In this article">
              <a href="#thesis" className="hover:text-primary">Thesis</a>
              <a href="#evidence" className="hover:text-primary">Evidence</a>
              <a href="#financials" className="hover:text-primary">Financial record</a>
              <a href="#risk" className="hover:text-primary">Scenarios and risks</a>
              <a href="#sources" className="hover:text-primary">Disclosures</a>
            </nav>
          </div>
        </aside>
      </div>
    </div>
  );
}
