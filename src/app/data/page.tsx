'use client';

import { useState } from 'react';
import { SlidersHorizontal, Table2 } from 'lucide-react';
import { Line, LineChart, ResponsiveContainer } from 'recharts';
import { dataSeries } from '@/content';
import { PageFrame } from '@/components/common/page-frame';
import { SectionLabel } from '@/components/ui/section-label';

const referenceRows = [
  ['US policy rate', '4.33%', '4.33%', 'Restrictive', 'Federal Reserve'],
  ['Core PCE inflation', '2.66%', '2.78%', 'Cooling', 'BEA'],
  ['Global chip sales', '$57.0B', '$54.4B', 'Expanding', 'WSTS'],
  ['China export growth', '6.8%', '7.1%', 'Uneven', 'NBS China'],
  ['US 10Y term premium', '0.42%', '0.38%', 'Rising', 'NY Fed'],
];

export default function DataPage() {
  const [windowSize, setWindowSize] = useState('6M');
  return (
    <PageFrame eyebrow="Observatory / Series" title="Data" intro="A compact view of the series that anchor the NEXUS research desk. Values are illustrative in this frontend edition and structured to be replaced by live feeds.">
      <div className="flex flex-wrap items-center justify-between gap-3 border-y border-border py-4">
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground"><SlidersHorizontal size={14} /> Market & economic series</div>
        <div className="flex gap-1">{['1M', '6M', '1Y', '5Y'].map((item) => <button key={item} onClick={() => setWindowSize(item)} className={`px-3 py-1.5 mono text-[10px] ${windowSize === item ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground'}`} data-testid={`button-window-${item}`}>{item}</button>)}</div>
      </div>
      <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{dataSeries.map((item, index) => <div key={item.label} className="border border-border bg-card p-5"><div className="text-[10px] uppercase tracking-[.14em] text-muted-foreground">{item.label}</div><div className="mt-3 flex items-end justify-between"><span className="mono text-2xl">{item.value}</span><span className={`mono text-[10px] ${index === 1 || index === 3 ? 'text-orange-600' : 'text-teal-700 dark:text-teal-300'}`}>{item.change}%</span></div><div className="mt-5 h-12"><ResponsiveContainer width="100%" height="100%"><LineChart data={item.series.map((value, point) => ({ point, value }))}><Line type="monotone" dataKey="value" stroke={index === 1 || index === 3 ? 'hsl(var(--accent))' : 'hsl(var(--primary))'} strokeWidth={2} dot={false} /></LineChart></ResponsiveContainer></div><div className="mt-4 flex justify-between border-t border-border pt-3 text-[10px] text-muted-foreground"><span>Latest</span><span className="mono">{windowSize} window</span></div></div>)}</div>
      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div>
          <SectionLabel>Reference table / selected indicators</SectionLabel>
          <div className="overflow-x-auto border border-border"><table className="w-full min-w-[570px] border-collapse text-left text-xs"><thead className="bg-muted/50 text-[10px] uppercase tracking-[.12em] text-muted-foreground"><tr><th className="p-4 font-medium">Indicator</th><th className="p-4 font-medium">Latest</th><th className="p-4 font-medium">Prior</th><th className="p-4 font-medium">Signal</th><th className="p-4 font-medium">Source</th></tr></thead><tbody>{referenceRows.map((row) => <tr key={row[0]} className="border-t border-border"><td className="p-4 font-medium">{row[0]}</td><td className="p-4 mono">{row[1]}</td><td className="p-4 mono text-muted-foreground">{row[2]}</td><td className="p-4"><span className="border border-primary/30 bg-primary/5 px-2 py-1 text-[10px] text-primary">{row[3]}</span></td><td className="p-4 text-muted-foreground">{row[4]}</td></tr>)}</tbody></table></div>
        </div>
        <aside><SectionLabel>Data notes</SectionLabel><p className="text-sm leading-6 text-muted-foreground">NEXUS uses data as evidence, not decoration. Every series should answer a question, carry a timestamp, and state its source.</p><div className="mt-6 flex gap-3 border-t border-border pt-4 text-xs text-muted-foreground"><Table2 size={15} className="shrink-0 text-primary" />Frequency and revision policy are documented in methodology.</div></aside>
      </div>
    </PageFrame>
  );
}
