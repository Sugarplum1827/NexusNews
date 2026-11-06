import { z } from 'zod';
import edition from '../../content/companies/research-edition.json';
import microsoftArchive from '../../content/companies/microsoft.json';

const link = z.string().url().refine((value) => value.startsWith('https://'));
const date = z.string().date();
const financialValue = z.number().nullable();
const eventSchema = z.object({
  title: z.string(), date, baseline: date, benchmark: z.string(), context: z.string(),
  companySource: link, benchmarkSource: link,
  closes: z.array(z.object({ date, company: z.number().positive(), benchmark: z.number().positive() })).min(2),
}).refine(({ baseline, closes }) =>
  closes.some((point) => point.date === baseline) &&
  closes.every((point, index) => index === 0 || point.date > closes[index - 1].date),
{ message: 'Event dates must be distinct, sorted, and include the baseline.' });

const companySchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string(), ticker: z.string(), exchange: z.string(), status: z.string(),
  asOf: date, headline: z.string(), summary: z.string(), thesis: z.string(),
  counterargument: z.string(), watch: z.array(z.string()).min(1),
  claims: z.array(z.object({ title: z.string(), detail: z.string(), section: z.string(), url: link })).min(1),
  history: z.array(z.tuple([z.number().int(), z.number(), z.number(), z.number(), financialValue, financialValue])),
  interim: z.object({
    periods: z.tuple([z.string(), z.string()]),
    rows: z.array(z.tuple([z.string(), z.number(), z.number()])),
  }).optional(),
  basis: z.string(),
  timeline: z.array(z.object({ date, kind: z.string(), title: z.string(), url: link })).min(1),
  scenarios: z.array(z.object({ name: z.enum(['Bull', 'Base', 'Bear']), detail: z.string() })).length(3),
  risk: z.string(), gate: z.string(), financing: z.string(), governance: z.string(),
});

export const companies = companySchema.array().parse(edition);
export const companyIndex = companies.map(({ slug, name, ticker, exchange, summary, headline, status, asOf }) =>
  ({ slug, name, ticker, exchange, summary, headline, status, asOf }));
export const microsoftMarketEvent = eventSchema.parse(microsoftArchive.event);
export type MarketEvent = z.infer<typeof eventSchema>;

export function getCompany(slug: string) {
  return companies.find((company) => company.slug === slug);
}
