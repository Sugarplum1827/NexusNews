'use client';

import { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BookOpen, ChevronDown, ChevronRight } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getTopic, topics } from '@/content';
import { Metric } from '@/components/ui/metric';
import { SectionLabel } from '@/components/ui/section-label';
import { TopicChip } from '@/components/ui/topic-chip';

function TopicSection({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  const id = title.includes('happening') ? 'what-happening' : title.includes('matter') ? 'why' : 'risks';
  return <section id={id} className="mt-14 scroll-mt-24"><div className="flex items-center gap-3"><span className="mono text-[10px] text-primary">{number}</span><h2 className="serif text-2xl">{title}</h2></div><div className="mt-5 text-[15px] leading-7 text-muted-foreground">{children}</div></section>;
}

export function TopicPageClient({ slug }: { slug: string }) {
  const topic = getTopic(slug);
  const [tocOpen, setTocOpen] = useState(false);
  if (!topic) {
    notFound();
  }
  return (
    <div className="mx-auto max-w-[1180px] px-5 py-10 sm:px-10 sm:py-14">
      <div className="mb-7 border-y border-border lg:hidden">
        <button onClick={() => setTocOpen((value) => !value)} className="flex w-full items-center justify-between py-4 text-[10px] font-semibold uppercase tracking-[.18em] text-muted-foreground" aria-expanded={tocOpen} data-testid="button-topic-toc"><span className="flex items-center gap-2"><BookOpen size={14} /> On this page</span><ChevronDown size={15} className={`transition-transform ${tocOpen ? 'rotate-180' : ''}`} /></button>
        {tocOpen && <nav className="grid gap-3 border-t border-border pb-4 pt-4 text-xs text-muted-foreground"><a href="#what-happening" className="hover:text-primary">What is happening?</a><a href="#why" className="hover:text-primary">Why does it matter?</a><a href="#risks" className="hover:text-primary">What can go wrong?</a><a href="#monitor" className="hover:text-primary">What to monitor</a><a href="#sources" className="hover:text-primary">Sources & limitations</a></nav>}
      </div>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,760px)_250px]">
        <article>
          <div className="text-[10px] font-semibold uppercase tracking-[.22em] text-primary">{topic.eyebrow}</div>
          <h1 className="serif mt-4 text-5xl leading-[1.06] tracking-[-.04em] sm:text-6xl">{topic.name}</h1>
          <div className="mt-6 flex flex-wrap gap-1.5">{topic.tags.map((tag) => <TopicChip key={tag}>{tag}</TopicChip>)}</div>
          <p className="serif mt-10 text-xl leading-8 text-foreground/85">{topic.definition}</p>
          <div className="mt-12 grid gap-4 border-y border-border py-6 sm:grid-cols-2"><Metric label="Key figure" value={topic.keyFigure} /><div className="pl-4 text-sm leading-6 text-muted-foreground"><span className="mono text-[10px] uppercase tracking-[.15em] text-primary">Context</span><p className="mt-1">{topic.figureLabel}</p></div></div>
          <TopicSection number="01" title="What is happening?"><p>{topic.happening}</p></TopicSection>
          <TopicSection number="02" title="Why does it matter?"><p>{topic.why}</p></TopicSection>
          <div className="mt-14">
            <SectionLabel right={<span className="normal-case tracking-normal">Indexed series / illustrative</span>}>Evidence in motion</SectionLabel>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={topic.chart} margin={{ top: 12, right: 5, bottom: 0, left: -20 }}>
                  <defs><linearGradient id={`fill-${topic.slug}`} x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={.22} /><stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} /></linearGradient></defs>
                  <CartesianGrid className="chart-grid" vertical={false} />
                  <XAxis dataKey="period" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', color: 'hsl(var(--foreground))', fontSize: 11 }} />
                  <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fill={`url(#fill-${topic.slug})`} strokeWidth={2} />
                  <Line type="monotone" dataKey="secondary" stroke="hsl(var(--accent))" strokeWidth={1.5} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-5 text-[10px] text-muted-foreground"><span><i className="mr-1 inline-block h-2 w-2 rounded-full bg-primary" />Primary signal</span><span><i className="mr-1 inline-block h-2 w-2 rounded-full bg-accent" />Secondary signal</span></div>
          </div>
          <TopicSection number="03" title="What can go wrong?"><div className="border-l-2 border-accent bg-accent/5 px-5 py-4 text-base leading-7">{topic.risk}</div></TopicSection>
          <div id="monitor" className="mt-14 scroll-mt-24"><SectionLabel>What to monitor</SectionLabel><div className="grid gap-0 border-y border-border sm:grid-cols-2">{topic.monitor.map((item, index) => <div key={item} className="flex gap-3 border-b border-border py-4 text-sm last:border-0"><span className="mono text-[10px] text-primary">0{index + 1}</span><span>{item}</span></div>)}</div></div>
          <div className="mt-14"><SectionLabel>Timeline</SectionLabel><div className="relative ml-2 border-l border-border">{topic.timeline.map((item) => <div key={item.year} className="relative pb-7 pl-7 last:pb-0"><span className="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-primary" /><span className="mono text-[10px] text-primary">{item.year}</span><p className="mt-1 text-sm">{item.event}</p></div>)}</div></div>
          <div id="sources" className="mt-14 scroll-mt-24 border-t border-border pt-6"><SectionLabel>Sources & limitations</SectionLabel><ul className="space-y-2 text-sm text-muted-foreground">{topic.sources.map((source) => <li key={source} className="flex gap-2"><span className="text-primary">—</span>{source}</li>)}</ul><p className="mt-5 text-xs leading-5 text-muted-foreground">This entry is a structured synthesis, not investment advice. Figures are selected to show direction and context; see the methodology for source treatment and limitations.</p></div>
        </article>
        <aside className="hidden lg:block">
          <div className="sticky top-24 border-l border-border pl-5">
            <div className="text-[10px] uppercase tracking-[.18em] text-muted-foreground">On this page</div>
            <nav className="mt-4 space-y-3 text-xs text-muted-foreground"><a href="#what-happening" className="block hover:text-primary">What is happening?</a><a href="#why" className="block hover:text-primary">Why does it matter?</a><a href="#risks" className="block hover:text-primary">What can go wrong?</a><a href="#monitor" className="block hover:text-primary">What to monitor</a><a href="#sources" className="block hover:text-primary">Sources & limitations</a></nav>
            <div className="mt-10 border-t border-border pt-4"><div className="text-[10px] uppercase tracking-[.16em] text-muted-foreground">Related</div>{topic.related.map((item) => { const related = topics.find((entry) => entry.slug === item); return related ? <Link key={item} href={`/topics/${item}`} className="mt-3 flex items-center justify-between text-xs hover:text-primary" data-testid={`link-related-${item}`}>{related.name}<ChevronRight size={13} /></Link> : null; })}</div>
          </div>
        </aside>
      </div>
    </div>
  );
}
