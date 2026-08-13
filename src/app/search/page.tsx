import { Suspense } from 'react';
import type { Metadata } from 'next';
import { SearchPageClient } from './search-page-client';

export const metadata: Metadata = { title: 'Search — NEXUS' };

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchPageClient />
    </Suspense>
  );
}
