'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Search } from 'lucide-react';
import { categories, topics } from '@/content';
import { EmptyState } from '@/components/ui/empty-state';
import { PageFrame } from '@/components/common/page-frame';

export default function TopicsPage() {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const filtered = topics.filter((topic) => (category === 'All' || topic.category === category) && `${topic.name} ${topic.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <PageFrame eyebrow="Encyclopedia / Index" title="Topics" intro="The objects behind the headlines. Each entry starts with a definition, then follows the evidence into implications, risks, and what to watch.">
      <div className="flex flex-col gap-3 border-y border-border py-4 sm:flex-row sm:items-center">
        <div className="relative flex-1"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filter topics…" className="h-9 w-full border border-border bg-card pl-9 text-xs outline-none focus:border-primary" data-testid="input-topic-filter" /></div>
        <div className="flex flex-wrap gap-1.5"><button onClick={() => setCategory('All')} className={`px-3 py-2 text-[10px] uppercase tracking-[.12em] ${category === 'All' ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground hover:text-foreground'}`} data-testid="button-filter-all">All</button>{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`px-3 py-2 text-[10px] uppercase tracking-[.12em] ${category === item ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground hover:text-foreground'}`} data-testid={`button-filter-${item.toLowerCase()}`}>{item}</button>)}</div>
      </div>
      <div className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2">{filtered.map((topic, index) => <Link href={`/topics/${topic.slug}`} key={topic.slug} className="group bg-card p-6 hover:bg-muted/40" data-testid={`card-topic-index-${topic.slug}`}><div className="flex items-center justify-between"><span className="mono text-[10px] text-muted-foreground">0{index + 1} / {topic.category}</span><span className="h-2 w-2 rounded-full bg-primary/70" /></div><h2 className="serif mt-8 text-3xl group-hover:text-primary">{topic.name}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{topic.definition}</p><div className="mt-7 flex items-center justify-between border-t border-border pt-4 text-[10px] uppercase tracking-[.14em] text-muted-foreground"><span>Updated {topic.updated}</span><span className="flex items-center gap-1 text-primary">Open entry <ChevronRight size={13} /></span></div></Link>)}</div>
      {filtered.length === 0 && <EmptyState title="No matching topics" body="Try a different category or search term." />}
    </PageFrame>
  );
}
