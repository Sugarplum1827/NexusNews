'use client';

import { type FormEvent, type ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import {
  BookOpen,
  CircleHelp,
  Database,
  FileText,
  LayoutGrid,
  Menu,
  Moon,
  Network,
  PanelLeft,
  Search,
  Sun,
  Target,
  X,
} from 'lucide-react';

const nav = [
  { href: '/', label: 'Research desk', icon: LayoutGrid },
  { href: '/topics', label: 'Topics', icon: BookOpen },
  { href: '/reports', label: 'Reports', icon: FileText },
  { href: '/data', label: 'Data', icon: Database },
  { href: '/models', label: 'Models', icon: Network },
];

export function Shell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => setMounted(true), []);

  const dark = mounted && resolvedTheme === 'dark';
  const toggleTheme = () => setTheme(dark ? 'light' : 'dark');
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
  const submitSearch = (event: FormEvent) => {
    event.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <aside className={`fixed inset-y-0 left-0 z-40 isolate flex w-[248px] flex-col border-r border-sidebar-border bg-[hsl(var(--sidebar))] px-4 py-5 text-sidebar-foreground shadow-[10px_0_30px_rgba(0,0,0,0.18)] [backdrop-filter:none] transition-transform duration-300 md:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-2">
          <Link href="/" className="flex items-center gap-3" data-testid="link-logo">
            <span className="grid h-8 w-8 place-items-center border border-teal-300/50 text-sm font-bold text-teal-200">N</span>
            <span className="text-[15px] font-semibold tracking-[.28em] text-stone-100">NEXUS</span>
          </Link>
          <button className="rounded p-1 text-stone-400 hover:bg-white/10 md:hidden" onClick={() => setMobileOpen(false)} aria-label="Close navigation" data-testid="button-close-nav"><X size={17} /></button>
        </div>
        <div className="mt-10 px-2 text-[10px] font-medium uppercase tracking-[.22em] text-stone-500">Navigate</div>
        <nav className="mt-3 space-y-1" aria-label="Primary navigation">
          {nav.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 border-l-2 px-3 py-2.5 text-[13px] transition-colors ${isActive(href) ? 'border-teal-300 bg-white/[.08] text-teal-100' : 'border-transparent text-stone-400 hover:bg-white/[.05] hover:text-stone-100'}`} data-testid={`link-nav-${label.toLowerCase().replace(' ', '-')}`}>
              <Icon size={16} strokeWidth={1.7} /><span>{label}</span>
              {label === 'Models' && <span className="ml-auto mono text-[9px] text-teal-300">BETA</span>}
            </Link>
          ))}
        </nav>
        <div className="mt-9 px-2 text-[10px] font-medium uppercase tracking-[.22em] text-stone-500">Reference</div>
        <nav className="mt-3 space-y-1">
          <Link href="/methodology" onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 border-l-2 px-3 py-2.5 text-[13px] ${isActive('/methodology') ? 'border-teal-300 bg-white/[.08] text-teal-100' : 'border-transparent text-stone-400 hover:bg-white/[.05] hover:text-stone-100'}`} data-testid="link-nav-methodology"><CircleHelp size={16} strokeWidth={1.7} /><span>Methodology</span></Link>
          <Link href="/about" onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 border-l-2 px-3 py-2.5 text-[13px] ${isActive('/about') ? 'border-teal-300 bg-white/[.08] text-teal-100' : 'border-transparent text-stone-400 hover:bg-white/[.05] hover:text-stone-100'}`} data-testid="link-nav-about"><Target size={16} strokeWidth={1.7} /><span>About NEXUS</span></Link>
        </nav>
        <div className="mt-auto border-t border-sidebar-border pt-4">
          <div className="px-2 text-[10px] uppercase tracking-[.18em] text-stone-500">Desk status</div>
          <div className="mt-3 flex items-center gap-2 px-2 text-xs text-stone-300"><span className="h-2 w-2 rounded-full bg-teal-300" /> All systems nominal</div>
          <div className="mt-2 flex items-center justify-between px-2 mono text-[10px] text-stone-500"><span>Edition 02.25</span><span>UTC−05</span></div>
        </div>
      </aside>
      {mobileOpen && <button className="fixed inset-0 z-30 bg-slate-950/60 md:hidden" onClick={() => setMobileOpen(false)} aria-label="Close menu overlay" data-testid="button-menu-overlay" />}
      <div className="md:pl-[248px]">
        <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
          <div className="flex h-[66px] items-center gap-3 px-4 sm:px-7 lg:px-10">
            <button className="rounded p-2 text-muted-foreground hover:bg-muted md:hidden" onClick={() => setMobileOpen(true)} aria-label="Open navigation" data-testid="button-open-nav"><Menu size={20} /></button>
            <form onSubmit={submitSearch} className="relative max-w-[410px] flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the encyclopedia…" className="h-9 w-full border border-border bg-card pl-9 pr-12 text-[12px] outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary" data-testid="input-global-search" />
              <span className="absolute right-2 top-1/2 hidden -translate-y-1/2 border border-border px-1.5 py-0.5 mono text-[9px] text-muted-foreground sm:block">⌘ K</span>
            </form>
            <div className="ml-auto flex items-center gap-1">
              <button onClick={toggleTheme} className="rounded p-2 text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Toggle theme" data-testid="button-theme-toggle">{dark ? <Sun size={17} /> : <Moon size={17} />}</button>
              <Link href="/search" className="hidden items-center gap-2 border-l border-border pl-4 text-[11px] text-muted-foreground hover:text-foreground sm:flex" data-testid="link-search"><PanelLeft size={15} /> Search all</Link>
            </div>
          </div>
        </header>
        <main className="page-enter">{children}</main>
        <footer className="border-t border-border px-5 py-8 sm:px-10">
          <div className="flex flex-col justify-between gap-4 text-[11px] text-muted-foreground sm:flex-row"><span className="tracking-[.12em]">NEXUS / RESEARCH IN CONTEXT</span><span>Static edition · Figures are illustrative · Updated 20 Jun 2025</span></div>
        </footer>
      </div>
    </div>
  );
}
