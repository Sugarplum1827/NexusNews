import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { SectionLabel } from '@/components/ui/section-label';
import { companies, getCompany } from '@/content/companies';
import MarketReaction from './market-reaction';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return companies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const company = getCompany((await params).slug);
  return company ? { title: company.name + ' Dossier — NEXUS', description: company.summary } : {};
}

const format = new Intl.NumberFormat('en-US');
const section = 'mt-14';
const source = 'text-primary underline underline-offset-2';

export default async function CompanyPage({ params }: Props) {
  const company = getCompany((await params).slug);
  if (!company) notFound();

  return (
    <div className="mx-auto max-w-[1180px] px-5 py-10 sm:px-10 sm:py-14">
      <article className="max-w-[880px]">
        <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[.2em] text-primary">
          <span>Companies desk</span>
          <span className="text-muted-foreground">/ {company.period}</span>
        </div>
        <h1 className="serif mt-5 text-5xl leading-[1.06] tracking-[-.04em] sm:text-7xl">{company.name}</h1>
        <p className="mt-7 max-w-[720px] text-xl leading-8 text-muted-foreground">{company.summary}</p>
        <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-y border-border py-4 text-xs text-muted-foreground">
          <span className="mono">{company.exchange} / {company.ticker}</span>
          <Link href="/companies" className="inline-flex items-center gap-2 font-semibold text-primary hover:underline">
            <ArrowLeft size={14} /> All company dossiers
          </Link>
        </div>
        <section className="mt-12">
          <div className="border-l-2 border-primary bg-primary/5 px-6 py-5">
            <h2 className="text-[10px] font-semibold uppercase tracking-[.18em] text-primary">Research thesis</h2>
            <p className="serif mt-3 text-xl leading-8">{company.thesis}</p>
          </div>
          <p className="mt-5 text-[15px] leading-7 text-muted-foreground"><strong className="text-foreground">Counterargument</strong> {company.counterargument}</p>
          <h3 className="mt-4 font-semibold">What to watch next</h3>
          <ul className="mt-2 list-disc pl-5 text-sm leading-6 text-muted-foreground">{company.watch.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>

        <section className={section}>
          <SectionLabel><h2>Evidence behind the thesis</h2></SectionLabel>
          <div className="space-y-8">
            {company.claims.map((claim, index) => (
              <article key={claim.title} className="flex gap-4">
                <span className="mono pt-1 text-[10px] text-primary">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="serif text-2xl">{claim.title}</h3>
                  <p className="mt-3 text-[15px] leading-7 text-muted-foreground">{claim.detail}</p>
                  <a className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-primary hover:underline" href={claim.url}>
                    {claim.section} <ArrowUpRight size={13} className="shrink-0" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={section}>
          <SectionLabel><h2>Reported financials</h2></SectionLabel>
          <p className="mb-3 text-sm text-muted-foreground">Annual values in USD millions.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead><tr className="border-b border-border"><th className="py-2 pr-4">Metric</th><th>{company.financialPeriods.prior}</th><th>{company.financialPeriods.current}</th><th>YoY</th></tr></thead>
              <tbody>{company.financials.map((row) => (
                <tr key={row.label} className="border-b border-border">
                  <th scope="row" className="py-3 pr-4"><a className={source} href={row.url}>{row.label}</a></th>
                  <td className="pr-4 tabular-nums">{format.format(row.prior)}</td>
                  <td className="pr-4 tabular-nums">{format.format(row.current)}</td>
                  <td className="tabular-nums">{row.prior === 0 ? '—' : ((row.current / row.prior - 1) * 100).toFixed(1) + '%'}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </section>

        <section className={section}>
          <SectionLabel><h2>Filings and news</h2></SectionLabel>
          <ol className="space-y-3">
            {company.timeline.map((entry) => <li key={entry.url} className="flex flex-wrap gap-x-4 gap-y-1">
              <time className="mono text-sm" dateTime={entry.date}>{entry.date}</time>
              <span className="text-sm text-muted-foreground">{entry.kind}</span>
              <a className={source} href={entry.url}>{entry.title}</a>
            </li>)}
          </ol>
        </section>

        <section className={section}>
          <SectionLabel><h2>Market reaction</h2></SectionLabel>
          <MarketReaction event={company.event} ticker={company.ticker} />
        </section>

        <section className={section}>
          <SectionLabel><h2>Scenario range</h2></SectionLabel>
          <dl className="grid gap-px border border-border bg-border md:grid-cols-3">
            {company.scenarios.map((scenario) => <div key={scenario.name} className="bg-card p-5">
              <dt className="text-xs font-semibold">{scenario.name}</dt>
              <dd className="mt-3 text-sm leading-6 text-muted-foreground">{scenario.detail}</dd>
            </div>)}
          </dl>
        </section>

        <section className={section}>
          <SectionLabel><h2>Thesis history</h2></SectionLabel>
          <p className="mb-4 text-sm text-muted-foreground">Retrospective notes organized by disclosure date.</p>
          <ol className="space-y-4">
            {company.revisions.map((entry) => <li key={entry.date} className="border-l-2 border-border pl-4">
              <h3 className="font-semibold">{entry.title} · <time dateTime={entry.date}>{entry.date}</time></h3>
              <p className="my-1 text-sm">{entry.detail}</p><a className={source} href={entry.url}>View disclosure</a>
            </li>)}
          </ol>
        </section>
      </article>
    </div>
  );
}
