import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { tokens } from '../theme';

/** Stock in vs stock out bar chart. data: [{ day, stockIn, stockOut }] */
export default function MovementChart({ data, height = 178 }) {
  return (
    <div style={{ height, width: '100%' }} role="img" aria-label="Stock in versus stock out per day">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barGap={4} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke={tokens.border} strokeDasharray="3 3" />
          <XAxis dataKey="day" axisLine={{ stroke: tokens.border }} tickLine={false} tick={{ fontSize: 11, fill: tokens.muted }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: tokens.muted }} />
          <Tooltip
            cursor={{ fill: tokens.primarySoft }}
            contentStyle={{ borderRadius: 10, border: `1px solid ${tokens.border}`, fontSize: 12 }}
            formatter={(v, name) => [v, name === 'stockIn' ? 'Stock in' : 'Stock out']}
          />
          <Bar dataKey="stockIn" fill={tokens.primary} radius={[4, 4, 0, 0]} maxBarSize={13} />
          <Bar dataKey="stockOut" fill={tokens.lavender} radius={[4, 4, 0, 0]} maxBarSize={13} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
