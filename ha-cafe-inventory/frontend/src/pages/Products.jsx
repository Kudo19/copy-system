import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@mui/material';
import AddOutlined from '@mui/icons-material/AddOutlined';
import SearchIcon from '@mui/icons-material/Search';
import PageHeader from '../components/PageHeader';
import TextInput from '../components/TextInput';
import SelectInput from '../components/SelectInput';
import DataTable from '../components/DataTable';
import StatusPill from '../components/StatusPill';
import RowMenu from '../components/RowMenu';
import ConfirmDialog from '../components/ConfirmDialog';
import { useInventory } from '../context/InventoryContext';
import { useToast } from '../context/ToastContext';
import { categories, fmtMoney, statusOf, stockBadge } from '../data/seed';

const levels = [
  { value: 'in', label: 'In stock' },
  { value: 'low', label: 'Low stock' },
  { value: 'out', label: 'Out of stock' },
];

export default function Products() {
  const { products, deleteProduct } = useInventory();
  const toast = useToast();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [cat, setCat] = useState('');
  const [level, setLevel] = useState('');
  const [toDelete, setToDelete] = useState(null);

  const q = params.get('q') || '';
  const setQ = v => setParams(v ? { q: v } : {}, { replace: true });

  const needle = q.trim().toLowerCase();
  const list = products.filter(p =>
    (!needle || p.name.toLowerCase().includes(needle) || p.id.toLowerCase().includes(needle)) &&
    (!cat || p.cat === cat) && (!level || statusOf(p) === level));

  const columns = [
    { key: 'id', header: 'ID', sx: { fontSize: 11 } },
    { key: 'name', header: 'Product', ink: true },
    { key: 'cat', header: 'Category' },
    { key: 'unit', header: 'Unit' },
    { key: 'stock', header: 'Stock', ink: true },
    { key: 'price', header: 'Price', ink: true, render: p => fmtMoney(p.price) },
    { key: 'status', header: 'Status', render: p => { const [tone, text] = stockBadge[statusOf(p)]; return <StatusPill tone={tone}>{text}</StatusPill>; } },
    { key: 'actions', header: '', align: 'right', render: p => (
      <RowMenu items={[
        { label: 'Stock in', onClick: () => navigate(`/stock-in?product=${p.id}`) },
        { label: 'Stock out', onClick: () => navigate(`/stock-out?product=${p.id}`) },
        { label: 'Delete', danger: true, onClick: () => setToDelete(p) },
      ]} />
    ) },
  ];

  const confirmDelete = () => {
    deleteProduct(toDelete.id);
    toast(`${toDelete.name} deleted.`);
    setToDelete(null);
  };

  return (
    <div className="page">
      <PageHeader
        title="Product Management"
        subtitle="View, edit and monitor every item in your inventory."
        action={<Button component={Link} to="/products/new" variant="contained" startIcon={<AddOutlined />}>Add new product</Button>}
      />
      <div className="card-x">
        <div className="filters">
          <div style={{ width: 360, maxWidth: '100%' }}>
            <TextInput size="small" placeholder="Search by product or ID..." startIcon={SearchIcon} value={q} onChange={e => setQ(e.target.value)} />
          </div>
          <SelectInput size="small" value={cat} onChange={e => setCat(e.target.value)} placeholder="All categories"
            options={[{ value: '', label: 'All categories' }, ...categories]} sx={{ minWidth: 170 }} />
          <SelectInput size="small" value={level} onChange={e => setLevel(e.target.value)} placeholder="All stock levels"
            options={[{ value: '', label: 'All stock levels' }, ...levels]} sx={{ minWidth: 170 }} />
          <span className="count">{list.length} {list.length === 1 ? 'product' : 'products'}</span>
        </div>
        <DataTable columns={columns} rows={list} rowHeight={62} empty="No products match your filters." />
      </div>

      <ConfirmDialog open={Boolean(toDelete)} title="Delete product" tone="danger" confirmLabel="Delete" cancelLabel="Cancel"
        message={`Delete ${toDelete?.name}? This cannot be undone.`} onConfirm={confirmDelete} onClose={() => setToDelete(null)} />
    </div>
  );
}
