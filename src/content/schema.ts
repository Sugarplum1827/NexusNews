import { z } from 'zod';

const scenarioSchema = z.object({
  name: z.enum(['Bull', 'Base', 'Bear']),
  probability: z.number().min(0).max(100),
  impact: z.string().min(1),
  summary: z.string().min(1),
  color: z.string().min(1),
});

const chartPointSchema = z.object({
  period: z.string().min(1),
  value: z.number(),
  secondary: z.number(),
});

const topicSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  eyebrow: z.string().min(1),
  definition: z.string().min(1),
  happening: z.string().min(1),
  why: z.string().min(1),
  risk: z.string().min(1),
  monitor: z.array(z.string().min(1)).min(1),
  tags: z.array(z.string().min(1)).min(1),
  category: z.string().min(1),
  updated: z.string().min(1),
  keyFigure: z.string().min(1),
  figureLabel: z.string().min(1),
  timeline: z.array(z.object({
    year: z.string().min(1),
    event: z.string().min(1),
  })).min(1),
  sources: z.array(z.string().min(1)).min(1),
  related: z.array(z.string().min(1)),
  chart: z.array(chartPointSchema).min(1),
});

const reportSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  deck: z.string().min(1),
  category: z.string().min(1),
  date: z.string().min(1),
  read: z.string().min(1),
  author: z.string().min(1),
  accent: z.string().min(1),
  takeaway: z.string().min(1),
  sections: z.array(z.object({
    title: z.string().min(1),
    body: z.string().min(1),
  })).min(1),
  scenarios: z.array(scenarioSchema).length(3),
  sources: z.array(z.string().min(1)).min(1),
});

const dataSeriesSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  change: z.string().min(1),
  series: z.array(z.number()).min(1),
  unit: z.string(),
});

export { dataSeriesSchema, reportSchema, scenarioSchema, topicSchema };