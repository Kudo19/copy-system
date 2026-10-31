import { useNavigate } from 'react-router-dom';
import { Button, Switch } from '@mui/material';
import BusinessOutlined from '@mui/icons-material/BusinessOutlined';
import PersonOutline from '@mui/icons-material/PersonOutline';
import LocationOnOutlined from '@mui/icons-material/LocationOnOutlined';
import Inventory2Outlined from '@mui/icons-material/Inventory2Outlined';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import Check from '@mui/icons-material/Check';
import PageHeader from '../components/PageHeader';
import TextInput from '../components/TextInput';
import SelectInput from '../components/SelectInput';
import useForm from '../hooks/useForm';
import { all, required, email } from '../utils/validators';
import { useInventory } from '../context/InventoryContext';
import { useToast } from '../context/ToastContext';
import { categories } from '../data/seed';

const countries = ['Philippines', 'Nigeria', 'United States', 'United Kingdom'];
const initial = {
  name: '', contact: '', email: '', phone: '', website: '', street: '', city: '', state: '', postal: '',
  country: '', products: '', lead: '', active: true,
};

export default function AddSupplier() {
  const { addSupplier } = useInventory();
  const toast = useToast();
  const navigate = useNavigate();
  const form = useForm(initial);

  const onSubmit = e => {
    e.preventDefault();
    const ok = form.validate({
      name: required('Enter the supplier name'),
      contact: required('Enter a contact person'),
      email: all(required('Enter an email address'), email()),
      phone: required('Enter a phone number'),
      products: required('Select a product category'),
    });
    if (!ok) return toast('Please complete the required fields.');
    const v = form.values;
    addSupplier({ name: v.name.trim(), contact: v.email, products: v.products, active: v.active });
    form.reset();
    toast('Supplier saved.');
    navigate('/suppliers');
  };

  const Section = ({ icon: Icon, children }) => <div className="section-h"><Icon />{children}</div>;

  return (
    <div className="page">
      <PageHeader backTo="/suppliers" title="Add supplier"
        subtitle="Create a supplier profile to manage orders, deliveries and payments."
        action={<span className="helper" style={{ margin: 0 }}>* Required fields</span>} />
      <form onSubmit={onSubmit} noValidate>
        <div className="grid g-8-4 mb-3">
          <div className="card-x card-pad" style={{ padding: 20 }}>
            <Section icon={BusinessOutlined}>Supplier details</Section>
            <div className="grid g-2col">
              <TextInput label="Supplier name" required placeholder="e.g. Daily Harvest Supply" {...form.bind('name')} />
              <TextInput label="Supplier code" placeholder="Assigned automatically" disabled />
            </div>
            <div className="divider" />
            <Section icon={PersonOutline}>Contact information</Section>
            <div className="grid g-2col">
              <TextInput label="Contact person" required placeholder="Full name" {...form.bind('contact')} />
              <TextInput label="Email address" required type="email" placeholder="name@company.com" {...form.bind('email')} />
              <TextInput label="Phone number" required type="tel" placeholder="Enter phone number" {...form.bind('phone')} />
              <TextInput label="Website" type="url" placeholder="https://www.company.com" {...form.bind('website')} />
            </div>
            <div className="divider" />
            <Section icon={LocationOnOutlined}>Business address</Section>
            <div className="field-wrap"><TextInput label="Street address" placeholder="Street, building, unit or floor" {...form.bind('street')} /></div>
            <div className="grid g-2col">
              <TextInput label="City" placeholder="Enter city" {...form.bind('city')} />
              <TextInput label="State / Province" placeholder="Enter state or province" {...form.bind('state')} />
              <TextInput label="Postal code" placeholder="Enter postal code" {...form.bind('postal')} />
              <SelectInput label="Country" placeholder="Select country" options={countries} {...form.bind('country')} />
            </div>
          </div>

          <div className="card-x card-pad" style={{ alignSelf: 'start' }}>
            <Section icon={Inventory2Outlined}>Supply details</Section>
            <div className="field-wrap"><SelectInput label="Products supplied" required placeholder="Select product categories" options={categories} {...form.bind('products')} /></div>
            <div className="field-wrap"><TextInput label="Delivery lead time" placeholder="e.g. 3 business days" {...form.bind('lead')} /></div>
            <div className="flex between center">
              <div>
                <div style={{ fontSize: 12, fontWeight: 500 }}>Active supplier</div>
                <div className="helper" style={{ margin: 0, fontSize: 10 }}>Available for new orders</div>
              </div>
              <Switch checked={form.values.active} onChange={form.bind('active', { checkbox: true }).onChange} />
            </div>
          </div>
        </div>

        <div className="card-x flex wrap between center gap-3" style={{ padding: '12px 20px', boxShadow: 'none' }}>
          <span className="helper flex center gap-2" style={{ margin: 0 }}><InfoOutlined sx={{ fontSize: 16 }} /> Review the supplier details before saving.</span>
          <div className="flex gap-2" style={{ justifyContent: 'center', width: '100%' }}>
            <Button variant="outlined" color="inherit" sx={{ borderColor: 'divider', height: 40 }} onClick={() => navigate('/suppliers')}>Cancel</Button>
            <Button type="submit" variant="contained" startIcon={<Check />} sx={{ height: 40 }}>Save supplier</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
