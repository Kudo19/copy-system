import { useSearchParams } from 'react-router-dom';
import { Button } from '@mui/material';
import Coffee from '@mui/icons-material/CoffeeOutlined';
import MoveToInboxOutlined from '@mui/icons-material/MoveToInboxOutlined';
import ReceiptLongOutlined from '@mui/icons-material/ReceiptLongOutlined';
import PageHeader from '../components/PageHeader';
import TextInput from '../components/TextInput';
import SelectInput from '../components/SelectInput';
import StatusPill from '../components/StatusPill';
import useForm from '../hooks/useForm';
import { useInventory } from '../context/InventoryContext';
import { useToast } from '../context/ToastContext';
import { units } from '../data/seed';

const today = () => new Date().toISOString().slice(0, 10);

export default function StockIn() {
  const { products, suppliers, recentIn, stockIn } = useInventory();
  const toast = useToast();
  const [params] = useSearchParams();
  const form = useForm({
    product: params.get('product') || products[0]?.id || '',
    qty: '20', supplier: suppliers[0]?.name || '', date: today(), ref: '', note: '',
  });
  const v = form.values;

  const product = products.find(p => p.id === v.product) || products[0];
  if (!product) {
    return <div className="page"><PageHeader title="Stock In" subtitle="Add a product first before recording deliveries." /></div>;
  }
  const qty = Math.max(0, Number(v.qty) || 0);

  const onSubmit = e => {
    e.preventDefault();
    if (!(qty > 0)) {
      form.setError('qty', 'Enter a quantity greater than 0');
      return toast('Enter a quantity greater than 0.');
    }
    stockIn(product.id, qty, v.supplier);
    toast(`Added ${qty} ${product.unit} of ${product.name}.`);
  };

  return (
    <div className="page">
      <PageHeader title="Stock In" subtitle="Record a new delivery and update quantities instantly." />
      <div className="grid g-7-5">
        <form className="card-x card-pad" onSubmit={onSubmit} noValidate>
          <h2 className="card-title">Delivery details</h2>
          <p className="card-sub mb-3">Items are added to the current stock after saving.</p>
          <div className="field-wrap"><SelectInput label="Product" options={products.map(p => ({ value: p.id, label: p.name }))} {...form.bind('product')} value={product.id} /></div>
          <div className="flex gap-3 field-wrap">
            <div style={{ flex: 1 }}><TextInput label="Quantity received" type="number" placeholder="20" inputProps={{ min: 1 }} {...form.bind('qty')} /></div>
            <div style={{ width: 160 }}><SelectInput label="Unit" options={units} value={product.unit} disabled /></div>
          </div>
          <div className="grid g-2col field-wrap">
            <SelectInput label="Supplier" options={suppliers.map(s => s.name)} {...form.bind('supplier')} />
            <TextInput label="Delivery date" type="date" {...form.bind('date')} />
          </div>
          <div className="field-wrap"><TextInput label="Reference / invoice" placeholder="INV-2026-1084" startIcon={ReceiptLongOutlined} {...form.bind('ref')} /></div>
          <div className="field-wrap"><TextInput label="Notes" placeholder="Optional delivery note" {...form.bind('note')} /></div>
          <div className="flex wrap between center gap-2">
            <StatusPill tone="green">New stock: {product.stock + qty} {product.unit}</StatusPill>
            <div className="flex gap-2 ml-auto">
              <Button variant="outlined" color="inherit" sx={{ borderColor: 'divider' }} onClick={() => form.reset({ ...v, qty: '', ref: '', note: '' })}>Clear</Button>
              <Button type="submit" variant="contained" startIcon={<MoveToInboxOutlined />}>Save Stock In</Button>
            </div>
          </div>
        </form>

        <div className="card-x card-pad">
          <h2 className="card-title mb-3">Selected product</h2>
          <div className="summary-box mb-4">
            <div className="flex center gap-3 mb-3">
              <div className="prod-icon"><Coffee /></div>
              <div><div style={{ fontWeight: 700 }}>{product.name}</div><div className="card-sub" style={{ margin: 0 }}>{product.id} · {product.cat}</div></div>
            </div>
            <div className="card-sub" style={{ margin: 0 }}>Current stock</div>
            <div className="big">{product.stock} {product.unit}</div>
          </div>
          <h2 className="card-title mb-2">Recent stock entries</h2>
          {recentIn.map((r, i) => (
            <div className="row-split" style={{ minHeight: 58 }} key={i}>
              <div>{r[0]}<small>{r[1]}</small></div>
              <div style={{ textAlign: 'right' }}><span className="in">{r[2]}</span><small>{r[3]}</small></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
