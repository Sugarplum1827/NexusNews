import type { Metadata } from 'next';
import { Metric } from '@/components/ui/metric';
import { PageFrame } from '@/components/common/page-frame';
import { SectionLabel } from '@/components/ui/section-label';

export const metadata: Metadata = { title: 'About NEXUS' };

export default function AboutPage() {
  return (
    <PageFrame eyebrow="About / Intent" title="A tool for thinking in systems." intro="NEXUS exists for the moment after the headline — when the useful question is how a thing works, what it touches, and what would make the view wrong.">
      <div className="grid gap-12 lg:grid-cols-[1.15fr_.85fr]">
        <div className="serif text-2xl leading-9">
          <p>Research is often split between the encyclopedia and the terminal: one gives you language, the other gives you numbers. NEXUS puts them in the same room.</p>
          <p className="mt-7">We build durable context around the forces that shape markets and economies, then connect that context to evidence, risks, and scenarios.</p>
          <p className="mt-7 text-primary">The goal is not more information. It is better orientation.</p>
        </div>
        <div className="border-l border-border pl-6">
          <SectionLabel>The NEXUS test</SectionLabel>
          <div className="space-y-5 text-sm leading-6 text-muted-foreground">
            <p><span className="font-semibold text-foreground">Can it be defined?</span><br />If the object has no stable edges, the analysis will drift.</p>
            <p><span className="font-semibold text-foreground">Can it be observed?</span><br />Claims need a source, a time frame, and a way to be challenged.</p>
            <p><span className="font-semibold text-foreground">Can it be stressed?</span><br />Every thesis should make room for a different outcome.</p>
          </div>
        </div>
      </div>
      <div className="mt-16 border-y border-border py-8">
        <div className="grid gap-8 sm:grid-cols-3"><Metric label="Knowledge objects" value="04" /><Metric label="Research reports" value="03" /><Metric label="Analytical lens" value="01" /></div>
      </div>
    </PageFrame>
  );
}
