import type { Metadata } from 'next';
import { PageFrame } from '@/components/common/page-frame';
import { SectionLabel } from '@/components/ui/section-label';

export const metadata: Metadata = { title: 'Methodology — NEXUS' };

function MethodBlock({ number, title, body }: { number: string; title: string; body: string }) {
  return <div className="grid gap-4 sm:grid-cols-[45px_1fr]"><span className="mono text-[10px] text-primary">{number}</span><div><h2 className="serif text-2xl">{title}</h2><p className="mt-4 max-w-[650px] text-[15px] leading-7 text-muted-foreground">{body}</p></div></div>;
}

export default function MethodologyPage() {
  return (
    <PageFrame eyebrow="Reference / Standards" title="Methodology" intro="NEXUS is built to make analytical judgment inspectable. We separate what is observed, what is inferred, and what remains uncertain.">
      <div className="grid gap-12 lg:grid-cols-[1fr_330px]">
        <div className="space-y-12">
          <MethodBlock number="01" title="Objects before opinions" body="Each entry begins with a durable object — a concept, institution, country, industry, or company — rather than a news cycle. This keeps research addressable and lets evidence accumulate over time." />
          <MethodBlock number="02" title="Primary sources first" body="Filings, official statistics, central-bank communications, standards bodies, and company disclosures form the first layer. Secondary research can frame a question, but it does not substitute for the source." />
          <MethodBlock number="03" title="Time series over anecdotes" body="We prefer a directionally consistent series to a compelling single print. Every chart should name its unit, frequency, period, and revision behavior. Illustrative figures in this edition are clearly labeled." />
          <MethodBlock number="04" title="Scenarios over certainty" body="A base case is a working compression of assumptions, not a claim of inevitability. Bull and bear cases are included to expose the variables that have the most leverage on the conclusion." />
        </div>
        <aside>
          <SectionLabel>Source hierarchy</SectionLabel>
          <ol className="space-y-4 text-sm">{['Official statistics & regulators', 'Company filings & transcripts', 'Academic and industry research', 'Expert judgment & synthesis'].map((item, index) => <li key={item} className="flex gap-3 border-b border-border pb-4"><span className="mono text-[10px] text-primary">0{index + 1}</span>{item}</li>)}</ol>
          <SectionLabel>Limitations</SectionLabel>
          <p className="text-sm leading-6 text-muted-foreground">No dataset is complete. Revisions arrive late, definitions change, and the relationship between variables can break under stress. NEXUS does not provide personalized investment advice.</p>
        </aside>
      </div>
    </PageFrame>
  );
}
