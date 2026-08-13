import { Search } from 'lucide-react';

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="border border-dashed border-border p-10 text-center">
      <Search size={22} className="mx-auto text-muted-foreground" />
      <h2 className="serif mt-4 text-xl">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
