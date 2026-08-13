export type ScenarioName = 'Bull' | 'Base' | 'Bear';

export type Scenario = {
  name: ScenarioName;
  probability: number;
  impact: string;
  summary: string;
  color: string;
};

export type ChartPoint = {
  period: string;
  value: number;
  secondary: number;
};

export type TimelineEvent = {
  year: string;
  event: string;
};

export type Topic = {
  slug: string;
  name: string;
  eyebrow: string;
  definition: string;
  happening: string;
  why: string;
  risk: string;
  monitor: string[];
  tags: string[];
  category: string;
  updated: string;
  keyFigure: string;
  figureLabel: string;
  timeline: TimelineEvent[];
  sources: string[];
  related: string[];
  chart: ChartPoint[];
};

export type ReportSection = {
  title: string;
  body: string;
};

export type Report = {
  slug: string;
  title: string;
  deck: string;
  category: string;
  date: string;
  read: string;
  author: string;
  accent: string;
  takeaway: string;
  sections: ReportSection[];
  scenarios: Scenario[];
  sources: string[];
};

export type DataSeries = {
  label: string;
  value: string;
  change: string;
  series: number[];
  unit: string;
};