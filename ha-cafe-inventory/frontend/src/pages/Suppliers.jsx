import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, IconButton } from '@mui/material';
import AddOutlined from '@mui/icons-material/AddOutlined';
import SearchIcon from '@mui/icons-material/Search';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import LocalShippingOutlined from '@mui/icons-material/LocalShippingOutlined';
import EventOutlined from '@mui/icons-material/EventOutlined';
import ChecklistOutlined from '@mui/icons-material/ChecklistOutlined';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import TextInput from '../components/TextInput';
import SelectInput from '../components/SelectInput';
import DataTable from '../components/DataTable';
import StatusPill from '../components/StatusPill';
import { useInventory } from '../context/InventoryContext';

export default function Suppliers() {
  const { suppliers } = useInventory();
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('');
  const [delivery, setDelivery] = useState('');

  const needle = q.trim().toLowerCase();
  const list = suppliers.filter(s =>
    (!needle || (s.name + s.contact).toLowerCase().includes(needle)) && (!status || s.status === status));

  const columns = [
    { key: 'name', header: 'Supplier', render: s => (
      <div className="who"><span className="avatar sm" /><div><b>{s.name}</b><small>{s.code}</small></div></div>
    ) },
    { key: 'contact', header: 'Contact' },
    { key: 'products', header: 'Products' },
    { key: 'last', header: 'Last delivery' },
    { key: 'status', header: 'Status', render: s => <StatusPill tone={s.status === 'Active' ? 'green' : 'amber'}>{s.status}</StatusPill> },
    { key: 'actions', header: '', align: 'right', render: () => (
      <IconButton size="small" aria-label="Actions" sx={{ color: 'text.secondary' }}><MoreHoriz fontSize="small" /></IconButton>
    ) },
  ];

  return (
    <div className="page">
      <PageHeader
        title="Suppliers"
        subtitle="Manage supplier contacts, deliveries and purchasing relationships."
        action={<Button component={Link} to="/suppliers/new" variant="contained" startIcon={<AddOutlined />}>Add new supplier</Button>}
      />
      <div className="grid g-3 mb-3">
        <StatCard label="Active suppliers" value={suppliers.filter(s => s.status === 'Active').length} note="2 added this quarter" icon={LocalShippingOutlined} tone="lav" />
        <StatCard label="Deliveries due" value="3" note="Within 7 days" icon={EventOutlined} tone="amber" />
        <StatCard label="Orders this month" value="24" note="₦184,600 committed" icon={ChecklistOutlined} tone="green" />
      </div>
      <div className="card-x">
        <div className="filters">
          <div style={{ width: 360, maxWidth: '100%' }}>
            <TextInput size="small" placeholder="Search suppliers or contacts..." startIcon={SearchIcon} value={q} onChange={e => setQ(e.target.value)} />
          </div>
          <SelectInput size="small" value={status} onChange={e => setStatus(e.target.value)} placeholder="All statuses"
            options={[{ value: '', label: 'All statuses' }, 'Active', 'Paused']} sx={{ minWidth: 150 }} />
          <SelectInput size="small" value={delivery} onChange={e => setDelivery(e.target.value)} placeholder="All deliveries"
            options={[{ value: '', label: 'All deliveries' }, 'Due this week', 'Delivered']} sx={{ minWidth: 160 }} />
          <span className="count">{list.length} {list.length === 1 ? 'supplier' : 'suppliers'}</span>
        </div>
        <DataTable columns={columns} rows={list} rowKey="code" empty="No suppliers found." />
      </div>
    </div>
  );
}
