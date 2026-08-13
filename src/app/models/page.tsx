'use client';

import { useState } from 'react';
import { ShieldAlert, Zap } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { topics } from '@/content';
import { Metric } from '@/components/ui/metric';
import { PageFrame } from '@/components/common/page-frame';
import { SectionLabel } from '@/components/ui/section-label';

const scenarioData: Record<string, { probability: number; growth: string; risk: string }> = {
  Bull: { probability: 25, growth: '+28%', risk: 'Low' },
  Base: { probability: 55, growth: '+14%', risk: 'Moderate' },
  Bear: { probability: 20, growth: '-11%', risk: 'High' },
};

export default function ModelsPage() {
  const [scenario, setScenario] = useState<'Bull' | 'Base' | 'Bear'>('Base');
  const [topicSlug, setTopicSlug] = useState('artificial-intelligence');
  const topic = topics.find((item) => item.slug === topicSlug) ?? topics[0];
  return (
    <PageFrame eyebrow="Models / Decision frames" title="Models" intro="Scenarios are not predictions. They are structured ways to make assumptions visible, compare outcomes, and know what evidence would change the view.">
      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="flex items-center justify-between border-y border-border py-4">
            <span className="text-[11px] text-muted-foreground">Model / demand sensitivity</span>
            <select value={topicSlug} onChange={(event) => setTopicSlug(event.target.value)} className="border border-border bg-card px-3 py-2 text-xs outline-none" data-testid="select-model-topic">{topics.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select>
          </div>
          <div className="mt-8 border border-border bg-card p-5 sm:p-7">
            <div className="flex items-start justify-between"><div><div className="mono text-[10px] uppercase tracking-[.16em] text-primary">Scenario engine / v0.4</div><h2 className="serif mt-3 text-2xl">{topic.name} demand sensitivity</h2></div><Zap size={18} className="text-accent" /></div>
            <div className="mt-8 grid grid-cols-3 gap-2">{(['Bull', 'Base', 'Bear'] as const).map((item) => <button key={item} onClick={() => setScenario(item)} className={`border p-3 text-left ${scenario === item ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`} data-testid={`button-model-${item.toLowerCase()}`}><div className="text-xs font-semibold">{item}</div><div className="mono mt-2 text-lg">{scenarioData[item].probability}%</div></button>)}</div>
            <div className="mt-8 grid gap-4 border-y border-border py-5 sm:grid-cols-3"><Metric label="Revenue delta" value={scenarioData[scenario].growth} /><Metric label="Downside risk" value={scenarioData[scenario].risk} /><Metric label="Horizon" value="24 mo" /></div>
            <div className="mt-7 h-[240px]"><ResponsiveContainer width="100%" height="100%"><AreaChart data={topic.chart} margin={{ top: 10, right: 5, bottom: 0, left: -20 }}><CartesianGrid className="chart-grid" vertical={false} /><XAxis dataKey="period" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} axisLine={false} tickLine={false} /><YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} axisLine={false} tickLine={false} /><Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / .12)" strokeWidth={2} /><Area type="monotone" dataKey="secondary" stroke="hsl(var(--accent))" fill="transparent" strokeWidth={1.5} /></AreaChart></ResponsiveContainer></div>
            <div className="mt-6 text-sm leading-6 text-muted-foreground">Current view: <span className="font-semibold text-foreground">{scenario} case.</span> The model tracks a small set of observable inputs; it does not capture reflexivity, regime change, or black-swan events.</div>
          </div>
        </div>
        <aside>
          <SectionLabel>Assumptions</SectionLabel>
          <div className="space-y-4 text-sm leading-6 text-muted-foreground">{['Demand grows faster than installed capacity', 'Pricing declines with utilization, not instantly', 'Capital returns are measured over a full cycle'].map((item, index) => <div key={item} className="flex gap-3 border-b border-border pb-4"><span className="mono text-[10px] text-primary">0{index + 1}</span>{item}</div>)}</div>
          <div className="mt-8 border-l-2 border-accent bg-accent/5 p-4 text-xs leading-5 text-muted-foreground"><ShieldAlert size={15} className="mb-2 text-accent" />A model is useful when it tells you what to watch next. It is weak when it only explains what already happened.</div>
        </aside>
      </div>
    </PageFrame>
  );
}
