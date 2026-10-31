import { useState } from 'react';
import { Link } from 'react-router-dom';
import MoveToInboxOutlined from '@mui/icons-material/MoveToInboxOutlined';
import OutboxOutlined from '@mui/icons-material/OutboxOutlined';
import BarChartOutlined from '@mui/icons-material/BarChartOutlined';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import SelectInput from '../components/SelectInput';
import DataTable from '../components/DataTable';
import MovementChart from '../components/MovementChart';
import { useInventory } from '../context/InventoryContext';
import { categories, categoryShare, reportSeries } from '../data/seed';

const periods = ['01 Sep – 30 Sep 2026', '01 Aug – 31 Aug 2026', 'Last 7 days'];

export default function Reports() {
  const { activity } = useInventory();
  const [period, setPeriod] = useState(periods[0]);
  const [cat, setCat] = useState('');

  const columns = [
    { key: 'type', header: 'Type', render: a => <span className={a.type === 'Stock in' ? 'in' : 'out'}>{a.type}</span> },
    { key: 'product', header: 'Product', ink: true, render: a => <b style={{ fontWeight: 600 }}>{a.product}</b> },
    { key: 'qty', header: 'Quantity', ink: true },
    { key: 'when', header: 'Date', align: 'right', sx: { fontSize: 11 } },
  ];

  return (
    <div className="page">
      <PageHeader title="Reports" />
      <div className="card-x flex wrap center gap-3 mb-3" style={{ padding: '9px 14px', boxShadow: 'none' }}>
        <SelectInput size="small" value={period} onChange={e => setPeriod(e.target.value)} options={periods} sx={{ minWidth: 220 }} />
        <SelectInput size="small" value={cat} onChange={e => setCat(e.target.value)} placeholder="All categories"
          options={[{ value: '', label: 'All categories' }, ...categories]} sx={{ minWidth: 170 }} />
        <span className="ml-auto helper" style={{ margin: 0 }}>Updated 2 minutes ago</span>
      </div>

      <div className="grid g-3 mb-3">
        <StatCard label="Stock in" value="2" note="+24 entries" icon={MoveToInboxOutlined} tone="blue" />
        <StatCard label="Stock out" value="2" note="−18 entries" icon={OutboxOutlined} tone="rose" />
        <StatCard label="Low stock" value="8" note="Needs attention" icon={BarChartOutlined} tone="amber" />
      </div>

      <div className="grid g-8-4 mb-3">
        <div className="card-x card-pad">
          <div className="flex between mb-2" style={{ alignItems: 'flex-start' }}>
            <div><h2 className="card-title">Inventory movement</h2><p className="card-sub">Stock in vs stock out · last 7 days</p></div>
            <div className="legend">
              <span><i style={{ background: 'var(--primary)' }} />Stock in</span>
              <span><i style={{ background: 'var(--lavender)' }} />Stock out</span>
            </div>
          </div>
          <MovementChart data={reportSeries} height={167} />
        </div>
        <div className="card-x card-pad">
          <h2 className="card-title">Stock by category</h2>
          <p className="card-sub mb-3">Current inventory value</p>
          {categoryShare.map(([name, pct]) => (
            <div className="mb-3" key={name}>
              <div className="flex between" style={{ marginBottom: 4 }}>
                <span style={{ fontSize: 12 }}>{name}</span><span className="metric-note">{pct}%</span>
              </div>
              <div className="track" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={name}><div style={{ width: `${pct}%` }} /></div>
            </div>
          ))}
        </div>
      </div>

      <div className="card-x card-pad">
        <div className="flex between mb-2">
          <h2 className="card-title">Recent inventory movement</h2>
          <Link to="/reports" className="link-primary-x">View full report</Link>
        </div>
        <DataTable columns={columns} rows={activity} rowKey={(_, i) => i} rowHeight={34} empty="No movement recorded." />
      </div>
    </div>
  );
}
