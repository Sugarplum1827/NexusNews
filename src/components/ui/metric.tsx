import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

export function Metric({
  label,
  value,
  delta,
  negative,
}: {
  label: string;
  value: string;
  delta?: string;
  negative?: boolean;
}) {
  return (
    <div className="border-l border-border pl-4">
      <div className="text-[10px] uppercase tracking-[.14em] text-muted-foreground">{label}</div>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="mono text-xl font-medium">{value}</span>
        {delta && (
          <span className={`mono text-[10px] ${negative ? 'text-orange-600' : 'text-teal-700 dark:text-teal-300'}`}>
            {negative ? <ArrowDownRight size={12} className="mr-0.5 inline" /> : <ArrowUpRight size={12} className="mr-0.5 inline" />}
            {delta}
          </span>
        )}
      </div>
    </div>
  );
}
