'use client';

import { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { getReport } from '@/content';
import { SectionLabel } from '@/components/ui/section-label';

export function ReportPageClient({ slug }: { slug: string }) {
  const report = getReport(slug);
  const [scenario, setScenario] = useState<'Bull' | 'Base' | 'Bear'>('Base');
  if (!report) {
    notFound();
  }
  const selected = report.scenarios.find((item) => item.name === scenario) ?? report.scenarios[1];
  return (
    <div className="mx-auto max-w-[1180px] px-5 py-10 sm:px-10 sm:py-14">
      <article className="max-w-[880px]">
        <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[.2em] text-primary"><span>{report.category} desk</span><span className="text-muted-foreground">/</span><span className="text-muted-foreground">{report.date} · {report.read}</span></div>
        <h1 className="serif mt-5 text-5xl leading-[1.06] tracking-[-.04em] sm:text-7xl">{report.title}</h1>
        <p className="mt-7 max-w-[720px] text-xl leading-8 text-muted-foreground">{report.deck}</p>
        <div className="mt-7 flex items-center gap-3 border-y border-border py-4 text-xs text-muted-foreground"><span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">NR</span><span>By {report.author}</span><span>·</span><span>Published {report.date}</span></div>
        <div className="mt-12 border-l-2 border-primary bg-primary/5 px-6 py-5"><div className="text-[10px] font-semibold uppercase tracking-[.18em] text-primary">The takeaway</div><p className="serif mt-3 text-xl leading-8">{report.takeaway}</p></div>
        {report.sections.map((section, index) => <section key={section.title} className="mt-12"><div className="flex gap-4"><span className="mono pt-1 text-[10px] text-primary">0{index + 1}</span><div><h2 className="serif text-2xl">{section.title}</h2><p className="mt-4 text-[15px] leading-7 text-muted-foreground">{section.body}</p></div></div></section>)}
        <section className="mt-14">
          <SectionLabel right={<span className="normal-case tracking-normal">Select a view to stress-test the thesis</span>}>Scenario range</SectionLabel>
          <div className="grid gap-px border border-border bg-border md:grid-cols-3">{report.scenarios.map((item) => <button key={item.name} onClick={() => setScenario(item.name)} className={`p-5 text-left transition-colors ${scenario === item.name ? 'bg-primary text-primary-foreground' : 'bg-card hover:bg-muted/50'}`} data-testid={`button-scenario-${item.name.toLowerCase()}`}><div className="flex items-center justify-between"><span className="text-xs font-semibold">{item.name}</span><span className="mono text-lg">{item.probability}%</span></div><div className="mt-5 h-1 bg-current/15"><div className="h-1 bg-current" style={{ width: `${item.probability}%` }} /></div><div className="mt-4 text-[11px] font-medium uppercase tracking-[.12em] opacity-75">{item.impact}</div><p className="mt-2 text-sm leading-6 opacity-85">{item.summary}</p></button>)}</div>
          <div className="border-x border-b border-border p-5 text-sm leading-6 text-muted-foreground"><span className="font-semibold text-foreground">Selected: {selected.name} case.</span> {selected.summary} Probability is a judgmental estimate, not a forecast.</div>
        </section>
        <section className="mt-14 border-t border-border pt-6"><SectionLabel>Sources & method</SectionLabel><ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">{report.sources.map((source) => <li key={source} className="flex gap-2"><span className="text-primary">—</span>{source}</li>)}</ul><Link href="/methodology" className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-primary hover:underline" data-testid="link-report-methodology">Read methodology <ChevronRight size={14} /></Link></section>
      </article>
    </div>
  );
}
