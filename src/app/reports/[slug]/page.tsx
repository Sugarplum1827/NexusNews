import type { Metadata } from 'next';
import { reports } from '@/content';
import { ReportPageClient } from './report-page-client';

export function generateStaticParams() {
  return reports.map((report) => ({ slug: report.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const report = reports.find((item) => item.slug === slug);
  return { title: report ? `${report.title} — NEXUS` : 'NEXUS' };
}

export default async function ReportPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ReportPageClient slug={slug} />;
}
