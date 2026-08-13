import { dataSeriesSchema, reportSchema, topicSchema } from './schema';
import type { DataSeries, Report, Topic } from './types';

// Next.js's bundler doesn't support Vite's import.meta.glob, so each content
// file is imported explicitly. Add a line here whenever a topic or report is
// added to content/topics or content/reports.
import artificialIntelligence from '../../content/topics/artificial-intelligence.json';
import china from '../../content/topics/china.json';
import federalReserve from '../../content/topics/federal-reserve.json';
import semiconductors from '../../content/topics/semiconductors.json';

import aiInvestmentCycle from '../../content/reports/ai-investment-cycle.json';
import fedRateCycle from '../../content/reports/fed-rate-cycle.json';
import semiconductorRisks from '../../content/reports/semiconductor-risks.json';

import dataSeriesRaw from '../../content/data-series.json';

type JsonModule = Record<string, unknown>;

const topicFiles: JsonModule = {
  'artificial-intelligence.json': artificialIntelligence,
  'china.json': china,
  'federal-reserve.json': federalReserve,
  'semiconductors.json': semiconductors,
};

const reportFiles: JsonModule = {
  'ai-investment-cycle.json': aiInvestmentCycle,
  'fed-rate-cycle.json': fedRateCycle,
  'semiconductor-risks.json': semiconductorRisks,
};

function validationError(kind: string, file: string, error: unknown): Error {
  const firstIssue = error instanceof Error && 'issues' in error
    ? (error as { issues?: Array<{ path: (string | number)[]; message: string }> }).issues?.[0]
    : undefined;
  const field = firstIssue?.path?.length ? firstIssue.path.join('.') : 'root';
  const problem = firstIssue?.message ?? 'The JSON could not be parsed.';
  return new Error(`NEXUS CONTENT ERROR\nType: ${kind}\nFile: ${file}\nField: ${field}\nProblem: ${problem}`);
}

function loadCollection<T>(
  files: JsonModule,
  kind: string,
  schema: { parse: (value: unknown) => T },
): T[] {
  return Object.entries(files)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([file, value]) => {
      try {
        return schema.parse(value);
      } catch (error) {
        throw validationError(kind, file, error);
      }
    });
}

export const topics: Topic[] = loadCollection(topicFiles, 'topic', topicSchema);
export const reports: Report[] = loadCollection(reportFiles, 'report', reportSchema);

export const dataSeries: DataSeries[] = (() => {
  try {
    if (!Array.isArray(dataSeriesRaw)) {
      throw new Error('Expected an array of data series.');
    }
    return dataSeriesSchema.array().parse(dataSeriesRaw);
  } catch (error) {
    throw validationError('data series', '../../content/data-series.json', error);
  }
})();

export const categories = Array.from(
  new Set([...topics, ...reports].map((item) => item.category)),
).sort();

export function getTopic(slug: string): Topic | undefined {
  return topics.find((topic) => topic.slug === slug);
}

export function getReport(slug: string): Report | undefined {
  return reports.find((report) => report.slug === slug);
}
