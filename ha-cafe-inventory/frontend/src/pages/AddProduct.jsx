import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import PageHeader from '../components/PageHeader';
import TextInput from '../components/TextInput';
import SelectInput from '../components/SelectInput';
import useForm from '../hooks/useForm';
import { required } from '../utils/validators';
import { useInventory } from '../context/InventoryContext';
import { useToast } from '../context/ToastContext';
import { categories, units } from '../data/seed';

const initial = { name: '', cat: '', unit: 'kg', stock: '', low: '', supplier: '' };

export default function AddProduct() {
  const { suppliers, addProduct } = useInventory();
  const toast = useToast();
  const navigate = useNavigate();
  const form = useForm(initial);

  const onSubmit = e => {
    e.preventDefault();
    if (!form.validate({ name: required('Enter a product name'), cat: required('Select a category') })) {
      return toast('Please enter a name and category.');
    }
    const v = form.values;
    addProduct({ name: v.name.trim(), cat: v.cat, unit: v.unit, stock: Number(v.stock) || 0, low: Number(v.low) || 10, supplier: v.supplier });
    form.reset();
    toast('Product saved to your catalogue.');
    navigate('/products');
  };

  return (
    <div className="page">
      <PageHeader title="Add New Product" subtitle="Fill in the details, then save it to your catalogue." />
      <form onSubmit={onSubmit} noValidate>
        <div className="card-x card-pad mb-3">
          <h2 className="card-title mb-3">Basic information</h2>
          <div className="field-wrap"><TextInput label="Product name" placeholder="e.g. Oat Milk" {...form.bind('name')} /></div>
          <div className="grid g-2col">
            <SelectInput label="Category" placeholder="Select category" options={categories} {...form.bind('cat')} />
            <SelectInput label="Unit" options={units} {...form.bind('unit')} />
          </div>
        </div>

        <div className="card-x card-pad mb-3">
          <h2 className="card-title mb-3">Stock settings</h2>
          <div className="grid g-2col mb-3">
            <TextInput label="No. of stock" type="number" placeholder="0" inputProps={{ min: 0 }} {...form.bind('stock')} />
            <TextInput label="Low-stock alert" type="number" placeholder="10" inputProps={{ min: 0 }}
              helperText="We'll alert you at this quantity" {...form.bind('low')} />
          </div>
          <SelectInput label="Preferred supplier" placeholder="Select supplier" options={suppliers.map(s => s.name)} {...form.bind('supplier')} />
        </div>

        <div className="flex wrap between center gap-3">
          <span className="helper" style={{ margin: 0 }}>All fields marked required must be completed.</span>
          <div className="flex gap-2">
            <Button variant="outlined" color="inherit" sx={{ borderColor: 'divider' }} onClick={() => navigate('/products')}>Cancel</Button>
            <Button type="submit" variant="contained">Save product</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
