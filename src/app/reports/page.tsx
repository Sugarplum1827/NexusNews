'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Filter } from 'lucide-react';
import { categories, reports } from '@/content';
import { PageFrame } from '@/components/common/page-frame';

export default function ReportsPage() {
  const [category, setCategory] = useState('All');
  const visible = reports.filter((report) => category === 'All' || report.category === category);
  return (
    <PageFrame eyebrow="Research / Briefings" title="Reports" intro="Long-form analysis for decisions with a time horizon. Each report makes the assumptions, evidence, and uncertainty visible.">
      <div className="flex items-center justify-between border-y border-border py-4">
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground"><Filter size={14} /> Filter by desk</div>
        <select value={category} onChange={(event) => setCategory(event.target.value)} className="border border-border bg-card px-3 py-2 text-xs outline-none focus:border-primary" data-testid="select-report-category"><option>All</option>{categories.map((item) => <option key={item}>{item}</option>)}</select>
      </div>
      <div className="mt-10 divide-y divide-border">{visible.map((report, index) => <Link href={`/reports/${report.slug}`} key={report.slug} className="group grid gap-5 py-8 first:pt-0 sm:grid-cols-[55px_1fr_180px]" data-testid={`card-report-${report.slug}`}><div className="mono text-xs text-muted-foreground">0{index + 1}</div><div><div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[.15em] text-primary"><span>{report.category}</span><span className="text-muted-foreground">/</span><span className="text-muted-foreground">{report.date}</span></div><h2 className="serif mt-3 text-3xl group-hover:text-primary">{report.title}</h2><p className="mt-3 max-w-[690px] text-sm leading-6 text-muted-foreground">{report.deck}</p></div><div className="flex items-start justify-between text-[11px] text-muted-foreground sm:block sm:text-right"><span>{report.read} read</span><ArrowUpRight size={16} className="inline sm:ml-3" /></div></Link>)}</div>
    </PageFrame>
  );
}
