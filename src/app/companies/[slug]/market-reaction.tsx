'use client';

import { useState } from 'react';
import type { MarketEvent } from '@/content/companies';

const percent = new Intl.NumberFormat('en-US', {
  style: 'percent', signDisplay: 'exceptZero', maximumFractionDigits: 2,
});

export default function MarketReaction({ event, ticker }: { event: MarketEvent; ticker: string }) {
  const [baseline, setBaseline] = useState(event.baseline);
  const initial = event.closes.find((point) => point.date === baseline) ?? event.closes[0];
  const points = event.closes.map((point) => ({
    date: point.date,
    company: point.company / initial.company - 1,
    benchmark: point.benchmark / initial.benchmark - 1,
  }));
  const values = points.flatMap((point) => [point.company, point.benchmark]);
  const min = Math.min(0, ...values);
  const max = Math.max(0, ...values);
  const x = (index: number) => 52 + (index * 450) / (points.length - 1);
  const y = (value: number) => 110 - ((value - min) / (max - min || 1)) * 88;
  const line = (key: 'company' | 'benchmark') =>
    points.map((point, index) => x(index) + ',' + y(point[key])).join(' ');

  return (
    <div>
      <h3 className="font-semibold">{event.title} · {event.date}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{event.context}</p>
      <label className="my-4 flex flex-wrap items-center gap-2 text-sm">
        Compare from close on
        <select value={baseline} onChange={(event) => setBaseline(event.target.value)}
          className="border border-border bg-card p-2">
          {event.closes.map((point) => <option key={point.date}>{point.date}</option>)}
        </select>
      </label>
      <div className="max-w-2xl border border-border bg-card p-3">
        <svg role="img" aria-label={ticker + ' and ' + event.benchmark + ' close-to-close price returns'}
          className="w-full" viewBox="0 0 560 150">
          <line x1="52" x2="502" y1={y(0)} y2={y(0)} stroke="currentColor" opacity="0.28" />
          <text x="16" y={y(0) + 4} fill="currentColor" fontSize="11">0%</text>
          <polyline points={line('company')} fill="none" stroke="hsl(var(--primary))" strokeWidth="3" />
          <polyline points={line('benchmark')} fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
          {points.map((point, index) => (
            <text key={point.date} x={x(index)} y="137" textAnchor="middle" fill="currentColor" fontSize="11">{point.date}</text>
          ))}
        </svg>
        <p className="text-xs text-muted-foreground">Solid {ticker} · Dashed {event.benchmark} · Price returns exclude dividends</p>
      </div>
      <div className="mt-3 overflow-x-auto">
        <table className="max-w-2xl w-full text-left text-sm">
          <thead><tr className="border-b border-border"><th className="pr-3 py-2">Trading date</th><th>{ticker}</th><th>{event.benchmark}</th><th>Difference</th></tr></thead>
          <tbody>{points.map((point) => (
            <tr key={point.date} className="border-b border-border">
              <th scope="row" className="pr-3 py-2">{point.date}</th>
              <td>{percent.format(point.company)}</td><td>{percent.format(point.benchmark)}</td>
              <td>{((point.company - point.benchmark) * 100).toFixed(2)} pp</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <p className="mt-3 text-sm"><a className="text-primary underline" href={event.companySource}>{ticker} closing prices</a>
        {' · '}<a className="text-primary underline" href={event.benchmarkSource}>Benchmark closing values</a></p>
    </div>
  );
}
