import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageFrame } from '@/components/common/page-frame';
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
const section = 'border-t border-border pt-6';
const heading = 'serif text-3xl mb-4';
const source = 'text-primary underline underline-offset-2';

export default async function CompanyPage({ params }: Props) {
  const company = getCompany((await params).slug);
  if (!company) notFound();

  return (
    <PageFrame eyebrow={company.exchange + ' / ' + company.ticker + ' / ' + company.period}
      title={company.name} intro={company.summary}>
      <div className="space-y-9">
        <Link href="/companies" className={source}>All company dossiers</Link>
        <section className={section}>
          <h2 className={heading}>Research thesis</h2>
          <p>{company.thesis}</p>
          <p className="mt-4"><strong>Counterargument</strong> {company.counterargument}</p>
          <h3 className="mt-4 font-semibold">What to watch next</h3>
          <ul className="list-disc pl-5 mt-2">{company.watch.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>

        <section className={section}>
          <h2 className={heading}>Evidence behind the thesis</h2>
          <div className="grid gap-4 lg:grid-cols-3">
            {company.claims.map((claim) => (
              <article key={claim.title} className="border border-border bg-card p-4">
                <h3 className="font-semibold">{claim.title}</h3>
                <p className="mt-2 text-sm">{claim.detail}</p>
                <a className={source + ' mt-3 block text-sm'} href={claim.url}>{claim.section}</a>
              </article>
            ))}
          </div>
        </section>

        <section className={section}>
          <h2 className={heading}>Reported financials</h2>
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
          <h2 className={heading}>Filings and news</h2>
          <ol className="space-y-3">
            {company.timeline.map((entry) => <li key={entry.url} className="flex flex-wrap gap-x-4 gap-y-1">
              <time className="mono text-sm" dateTime={entry.date}>{entry.date}</time>
              <span className="text-sm text-muted-foreground">{entry.kind}</span>
              <a className={source} href={entry.url}>{entry.title}</a>
            </li>)}
          </ol>
        </section>

        <section className={section}>
          <h2 className={heading}>Market reaction</h2>
          <MarketReaction event={company.event} ticker={company.ticker} />
        </section>

        <section className={section}>
          <h2 className={heading}>Bull, base, and bear cases</h2>
          <dl className="grid gap-4 sm:grid-cols-3">
            {company.scenarios.map((scenario) => <div key={scenario.name} className="border border-border bg-card p-4">
              <dt className="font-semibold">{scenario.name}</dt><dd className="mt-2 text-sm">{scenario.detail}</dd>
            </div>)}
          </dl>
        </section>

        <section className={section}>
          <h2 className={heading}>Thesis history</h2>
          <p className="mb-4 text-sm text-muted-foreground">Retrospective notes organized by disclosure date.</p>
          <ol className="space-y-4">
            {company.revisions.map((entry) => <li key={entry.date} className="border-l-2 border-border pl-4">
              <h3 className="font-semibold">{entry.title} · <time dateTime={entry.date}>{entry.date}</time></h3>
              <p className="my-1 text-sm">{entry.detail}</p><a className={source} href={entry.url}>View disclosure</a>
            </li>)}
          </ol>
        </section>
      </div>
    </PageFrame>
  );
}
