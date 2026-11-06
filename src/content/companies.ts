import { z } from 'zod';
import microsoft from '../../content/companies/microsoft.json';

const link = z.string().url().refine((value) => value.startsWith('https://'));
const date = z.string().date();
const timelineEntry = z.object({ date, kind: z.string(), title: z.string(), url: link });
const revision = z.object({ date, title: z.string(), detail: z.string(), url: link });

const eventSchema = z.object({
  title: z.string(),
  date,
  baseline: date,
  benchmark: z.string(),
  context: z.string(),
  companySource: link,
  benchmarkSource: link,
  closes: z.array(z.object({
    date,
    company: z.number().positive(),
    benchmark: z.number().positive(),
  })).min(2),
}).refine(({ baseline, closes }) =>
  closes.some((point) => point.date === baseline) &&
  closes.every((point, index) => index === 0 || point.date > closes[index - 1].date),
{ message: 'Event dates must be distinct, sorted, and include the baseline.' });

const companySchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string(),
  ticker: z.string(),
  exchange: z.string(),
  period: z.string(),
  summary: z.string(),
  thesis: z.string(),
  counterargument: z.string(),
  watch: z.array(z.string()).min(1),
  claims: z.array(z.object({ title: z.string(), detail: z.string(), section: z.string(), url: link })).min(1),
  financialPeriods: z.object({ prior: z.string(), current: z.string() }),
  financials: z.array(z.object({ label: z.string(), prior: z.number(), current: z.number(), url: link })).min(1),
  timeline: z.array(timelineEntry).min(1),
  revisions: z.array(revision).min(1),
  scenarios: z.array(z.object({ name: z.enum(['Bull', 'Base', 'Bear']), detail: z.string() })).length(3),
  event: eventSchema,
});

export const companies = companySchema.array().parse([microsoft]);
export const companyIndex = companies.map(({ slug, name, ticker, exchange, summary }) =>
  ({ slug, name, ticker, exchange, summary }));
export type MarketEvent = z.infer<typeof eventSchema>;

export function getCompany(slug: string) {
  return companies.find((company) => company.slug === slug);
}
