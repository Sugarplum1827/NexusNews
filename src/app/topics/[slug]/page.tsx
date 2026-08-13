import type { Metadata } from 'next';
import { topics } from '@/content';
import { TopicPageClient } from './topic-page-client';

export function generateStaticParams() {
  return topics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const topic = topics.find((item) => item.slug === slug);
  return { title: topic ? `${topic.name} — NEXUS` : 'NEXUS' };
}

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <TopicPageClient slug={slug} />;
}
