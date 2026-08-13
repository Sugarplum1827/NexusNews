import type { ReactNode } from 'react';

export function TopicChip({ children }: { children: ReactNode }) {
  return (
    <span className="border border-border bg-muted/50 px-2 py-1 text-[10px] uppercase tracking-[.08em] text-muted-foreground">
      {children}
    </span>
  );
}
