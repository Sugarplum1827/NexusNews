'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ChevronRight, Search } from 'lucide-react';
import { reports, topics } from '@/content';
import { EmptyState } from '@/components/ui/empty-state';
import { PageFrame } from '@/components/common/page-frame';

export function SearchPageClient() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const normalized = query.toLowerCase();
  const topicResults = topics.filter((item) => `${item.name} ${item.category} ${item.tags.join(' ')} ${item.definition}`.toLowerCase().includes(normalized));
  const reportResults = reports.filter((item) => `${item.title} ${item.category} ${item.deck}`.toLowerCase().includes(normalized));
  return (
    <PageFrame eyebrow="Search / All knowledge" title="Search" intro="Find topics, reports, categories, tags, companies, countries, and industries across the NEXUS index.">
      <div className="relative"><Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try “AI”, “rates”, or “Taiwan”" className="h-12 w-full border border-border bg-card pl-11 pr-4 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" data-testid="input-search-page" /></div>
      {query && <div className="mt-10 text-[11px] text-muted-foreground"><span className="mono text-foreground">{topicResults.length + reportResults.length}</span> results for “{query}”</div>}
      <div className="mt-5 divide-y divide-border">
        {topicResults.map((item) => <Link key={item.slug} href={`/topics/${item.slug}`} className="group flex items-center justify-between py-5" data-testid={`result-topic-${item.slug}`}><div><div className="text-[10px] uppercase tracking-[.15em] text-primary">Topic / {item.category}</div><h2 className="serif mt-2 text-2xl group-hover:text-primary">{item.name}</h2><p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{item.definition}</p></div><ChevronRight size={17} className="text-muted-foreground group-hover:text-primary" /></Link>)}
        {reportResults.map((item) => <Link key={item.slug} href={`/reports/${item.slug}`} className="group flex items-center justify-between py-5" data-testid={`result-report-${item.slug}`}><div><div className="text-[10px] uppercase tracking-[.15em] text-primary">Report / {item.category}</div><h2 className="serif mt-2 text-2xl group-hover:text-primary">{item.title}</h2><p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{item.deck}</p></div><ChevronRight size={17} className="text-muted-foreground group-hover:text-primary" /></Link>)}
      </div>
      {query && topicResults.length === 0 && reportResults.length === 0 && <EmptyState title="Nothing indexed for that query" body="Try a broader concept, category, or tag." />}
    </PageFrame>
  );
}
