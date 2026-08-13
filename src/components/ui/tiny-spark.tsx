'use client';

import { Line, LineChart, ResponsiveContainer } from 'recharts';

export function TinySpark({ values, color = 'hsl(var(--primary))' }: { values: number[]; color?: string }) {
  const points = values.map((value, index) => ({ index, value }));
  return (
    <div className="h-10 w-24">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={points}>
          <Line type="monotone" dataKey="value" stroke={color} strokeWidth={1.6} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
