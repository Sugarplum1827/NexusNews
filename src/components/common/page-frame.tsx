import type { ReactNode } from 'react';

export function PageFrame({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-[1180px] px-5 py-12 sm:px-10 sm:py-16">
      <div className="max-w-[760px]">
        <div className="text-[10px] font-semibold uppercase tracking-[.22em] text-primary">{eyebrow}</div>
        <h1 className="serif mt-4 text-5xl tracking-[-.04em] sm:text-6xl">{title}</h1>
        <p className="mt-5 text-base leading-7 text-muted-foreground">{intro}</p>
      </div>
      <div className="mt-12">{children}</div>
    </div>
  );
}
