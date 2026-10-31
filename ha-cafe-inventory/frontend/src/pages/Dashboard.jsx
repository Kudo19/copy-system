import { Link } from 'react-router-dom';
import Inventory2Outlined from '@mui/icons-material/Inventory2Outlined';
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';
import WarningAmberOutlined from '@mui/icons-material/WarningAmberOutlined';
import RemoveShoppingCartOutlined from '@mui/icons-material/RemoveShoppingCartOutlined';
import StatCard from '../components/StatCard';
import StatusPill from '../components/StatusPill';
import DataTable from '../components/DataTable';
import MovementChart from '../components/MovementChart';
import { useAuth } from '../context/AuthContext';
import { useInventory } from '../context/InventoryContext';
import { dashSeries, statusOf } from '../data/seed';

const greeting = () => {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
};

export default function Dashboard() {
  const { user } = useAuth();
  const { products, activity } = useInventory();

  const count = s => products.filter(p => statusOf(p) === s).length;
  const lowList = products
    .filter(p => statusOf(p) !== 'in')
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 5);
  const urgent = p => p.stock === 0 || p.stock <= Math.ceil(p.low / 2);

  const activityCols = [
    { key: 'type', width: 160, render: a => <span className={a.type === 'Stock in' ? 'in' : 'out'}>{a.type}</span> },
    { key: 'product', ink: true, render: a => <b style={{ fontWeight: 600 }}>{a.product}</b> },
    { key: 'qty', ink: true, width: 150 },
    { key: 'when', align: 'right', width: 160, sx: { fontSize: 11 } },
  ];

  return (
    <div className="page">
      <h1 className="page-title">{greeting()}, {user.name}</h1>
      <p className="page-sub mb-4">Here's what is happening across Morning Bell Café today.</p>

      <div className="grid g-4 mb-3">
        <StatCard label="Total Items" value={products.length} note="+8 this month" icon={Inventory2Outlined} tone="blue" minHeight={116} />
        <StatCard label="In Stock" value={count('in')} icon={CheckCircleOutline} tone="green" minHeight={116} />
        <StatCard label="Low stock" value={count('low')} icon={WarningAmberOutlined} tone="amber" minHeight={116} />
        <StatCard label="Out of Stock" value={count('out')} icon={RemoveShoppingCartOutlined} tone="lav" minHeight={116} />
      </div>

      <div className="grid g-7-5 mb-3">
        <div className="card-x card-pad">
          <div className="flex between center mb-3">
            <div><h2 className="card-title">Stock movement</h2><p className="card-sub">Last 7 days</p></div>
            <StatusPill tone="primary">This week</StatusPill>
          </div>
          <MovementChart data={dashSeries} height={178} />
        </div>
        <div className="card-x card-pad">
          <div className="flex between center mb-3">
            <h2 className="card-title">Low-stock alerts</h2>
            <Link to="/products" className="link-primary-x">View all</Link>
          </div>
          {lowList.length === 0 && <p className="page-sub">All stock levels look healthy.</p>}
          {lowList.map(p => (
            <div className="row-split" key={p.id}>
              <div>{p.name}<small>{p.stock === 0 ? 'Out of stock' : `${p.stock} ${p.stock !== 1 && ['carton', 'bottle'].includes(p.unit) ? p.unit + 's' : p.unit} left`}</small></div>
              <StatusPill tone={urgent(p) ? 'red' : 'amber'}>{urgent(p) ? 'Urgent' : 'Low'}</StatusPill>
            </div>
          ))}
        </div>
      </div>

      <div className="card-x card-pad">
        <div className="flex between mb-3">
          <h2 className="card-title">Recent activity</h2>
          <Link to="/reports" className="link-primary-x">View report</Link>
        </div>
        <DataTable hideHeader columns={activityCols} rows={activity} rowKey={(_, i) => i} rowHeight={37} empty="No recent activity." />
      </div>
    </div>
  );
}
