import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import PeopleOutline from '@mui/icons-material/PeopleOutline';
import GridViewOutlined from '@mui/icons-material/GridViewOutlined';
import SearchIcon from '@mui/icons-material/Search';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import TextInput from '../components/TextInput';
import SelectInput from '../components/SelectInput';
import DataTable from '../components/DataTable';
import StatusPill from '../components/StatusPill';
import RowMenu from '../components/RowMenu';
import ConfirmDialog from '../components/ConfirmDialog';
import useForm from '../hooks/useForm';
import { all, required, email } from '../utils/validators';
import { useInventory } from '../context/InventoryContext';
import { useToast } from '../context/ToastContext';
import { roles } from '../data/seed';

export default function Users() {
  const { users, updateUser, deleteUser } = useInventory();
  const toast = useToast();
  const [q, setQ] = useState('');
  const [role, setRole] = useState('');
  const [editing, setEditing] = useState(null); // original user being edited
  const [toDelete, setToDelete] = useState(null);
  const form = useForm({ name: '', email: '' });

  const needle = q.trim().toLowerCase();
  const list = users.filter(u => (!needle || (u.name + u.email).toLowerCase().includes(needle)) && (!role || u.role === role));

  const openEdit = u => { form.reset({ name: u.name, email: u.email }); setEditing(u); };

  const saveEdit = e => {
    e.preventDefault();
    if (!form.validate({ name: required('Enter a full name'), email: all(required('Enter an email address'), email()) })) {
      return toast('Enter a valid name and email address.');
    }
    const name = form.values.name.trim();
    const mail = form.values.email.trim();
    if (users.some(u => u.email !== editing.email && u.email.toLowerCase() === mail.toLowerCase())) {
      form.setError('email', 'Another user already has that email address');
      return toast('Another user already has that email address.');
    }
    updateUser(editing.email, { name, email: mail });
    setEditing(null);
    toast('User details updated.');
  };

  const columns = [
    { key: 'user', header: 'User', render: u => (
      <div className="who"><span className="avatar sm" style={{ background: u.tint }} /><div><b>{u.name}</b><small>{u.email}</small></div></div>
    ) },
    { key: 'role', header: 'Role' },
    { key: 'status', header: 'Status', render: u => <StatusPill tone={u.status === 'Active' ? 'green' : 'red'}>{u.status}</StatusPill> },
    { key: 'last', header: 'Last active', sx: { fontSize: 11 } },
    { key: 'actions', header: '', align: 'right', render: u => (
      <RowMenu items={[{ label: 'Edit', onClick: () => openEdit(u) }, { label: 'Delete', danger: true, onClick: () => setToDelete(u) }]} />
    ) },
  ];

  return (
    <div className="page">
      <PageHeader title="User Management" subtitle="Manage team access and account status." />
      <div className="grid g-2 mb-3">
        <StatCard label="Team Members" value={users.length} icon={PeopleOutline} tone="lav" />
        <StatCard label="Active Users" value={users.filter(u => u.status === 'Active').length} icon={GridViewOutlined} tone="green" />
      </div>
      <div className="card-x">
        <div className="filters">
          <div style={{ width: 290, maxWidth: '100%' }}>
            <TextInput size="small" placeholder="Search users..." startIcon={SearchIcon} value={q} onChange={e => setQ(e.target.value)} />
          </div>
          <SelectInput size="small" value={role} onChange={e => setRole(e.target.value)} placeholder="All roles"
            options={[{ value: '', label: 'All roles' }, ...roles]} sx={{ minWidth: 150 }} />
          <span className="count">{list.length} {list.length === 1 ? 'user' : 'users'}</span>
        </div>
        <DataTable columns={columns} rows={list} rowKey="email" empty="No users found." />
      </div>

      <Dialog open={Boolean(editing)} onClose={() => setEditing(null)} maxWidth="xs" fullWidth>
        <form onSubmit={saveEdit} noValidate>
          <DialogTitle sx={{ fontSize: 18, fontWeight: 700 }}>Edit User</DialogTitle>
          <DialogContent>
            <div className="field-wrap" style={{ marginTop: 8 }}><TextInput label="Full Name" {...form.bind('name')} /></div>
            <TextInput label="Email" type="email" {...form.bind('email')} />
          </DialogContent>
          <DialogActions sx={{ p: 2, pt: 0 }}>
            <Button variant="outlined" color="inherit" sx={{ borderColor: 'divider' }} onClick={() => setEditing(null)}>Cancel</Button>
            <Button type="submit" variant="contained">Save Changes</Button>
          </DialogActions>
        </form>
      </Dialog>

      <ConfirmDialog open={Boolean(toDelete)} title="Delete user" tone="danger" confirmLabel="Delete" cancelLabel="Cancel"
        message={`Delete ${toDelete?.name}?`}
        onConfirm={() => { deleteUser(toDelete.email); toast(`${toDelete.name} deleted.`); setToDelete(null); }}
        onClose={() => setToDelete(null)} />
    </div>
  );
}
