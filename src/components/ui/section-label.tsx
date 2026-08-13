import type { ReactNode } from 'react';

export function SectionLabel({ children, right }: { children: ReactNode; right?: ReactNode }) {
  return (
    <div className="mb-5 flex items-center justify-between border-b border-border pb-2 text-[10px] font-semibold uppercase tracking-[.2em] text-muted-foreground">
      <span>{children}</span>
      {right}
    </div>
  );
}
