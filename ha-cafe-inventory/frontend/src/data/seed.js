// Sample data from the original prototype. Replace with API calls (see src/api/client.js).
export const seedProducts = [
  { id: 'P001', name: 'Arabica Beans', cat: 'Ingredients', unit: 'kg', stock: 28, price: 14500, low: 10 },
  { id: 'P002', name: 'Oat Milk', cat: 'Dairy alternatives', unit: 'carton', stock: 4, price: 2200, low: 10 },
  { id: 'P003', name: 'Vanilla Syrup', cat: 'Syrups', unit: 'bottle', stock: 3, price: 5600, low: 5 },
  { id: 'P004', name: 'Cocoa Powder', cat: 'Ingredients', unit: 'kg', stock: 18, price: 4250, low: 5 },
  { id: 'P005', name: 'Paper Cups 12oz', cat: 'Supplies', unit: 'pcs', stock: 240, price: 3200, low: 100 },
  { id: 'P006', name: 'Matcha Powder', cat: 'Tea', unit: 'kg', stock: 0, price: 20000, low: 2 },
  { id: 'P007', name: 'Caramel Syrup', cat: 'Syrups', unit: 'bottle', stock: 12, price: 5600, low: 5 },
];
export const seedSuppliers = [
  { name: 'North Roast Co.', code: 'SUP-NR', contact: 'orders@northroast.co', products: 'Coffee beans', last: 'Today, 09:32', status: 'Active' },
  { name: 'Green Pantry', code: 'SUP-GP', contact: 'hello@greenpantry.ng', products: 'Milk alternatives', last: 'Sep 30', status: 'Active' },
  { name: 'Packright Ltd.', code: 'SUP-PR', contact: 'supply@packright.ng', products: 'Cups & packaging', last: 'Yesterday', status: 'Active' },
  { name: 'Sweet Supply', code: 'SUP-SS', contact: 'dispatch@sweetsupply.co', products: 'Syrups', last: 'Sep 29', status: 'Active' },
  { name: 'Garden Tea Market', code: 'SUP-GT', contact: 'sales@gardentea.ng', products: 'Tea & matcha', last: 'Sep 18', status: 'Paused' },
];
export const seedUsers = [
  { name: 'Noah Williams', email: 'noah@morningbell.cafe', role: 'Inventory staff', status: 'Active', last: '12 min ago', tint: '#e7effb' },
  { name: 'Lily Chen', email: 'lily@morningbell.cafe', role: 'Owner', status: 'Active', last: '2 min ago', tint: '#f1e9ec' },
  { name: 'James Adeyemi', email: 'james@morningbell.cafe', role: 'Barista', status: 'Inactive', last: 'Sep 24', tint: '#f7e8e6' },
];
export const seedActivity = [
  { type: 'Stock in', product: 'Arabica Beans', qty: '+20 kg', when: 'Today, 09:32' },
  { type: 'Stock out', product: 'Oat Milk', qty: '−4 cartons', when: 'Today, 08:15' },
  { type: 'Stock in', product: 'Paper Cups 12oz', qty: '+240 pcs', when: 'Yesterday' },
  { type: 'Stock out', product: 'Matcha Powder', qty: '−2 kg', when: 'Yesterday' },
];
export const seedRecentIn = [
  ['Arabica Beans', 'North Roast Co.', '+20 kg', 'Today, 09:32'],
  ['Paper Cups 12oz', 'Packright Ltd.', '+240 pcs', 'Yesterday'],
  ['Oat Milk', 'Green Pantry', '+36 cartons', 'Sep 30'],
  ['Vanilla Syrup', 'Sweet Supply', '+12 bottles', 'Sep 29'],
];
export const seedRecentOut = [
  ['Oat Milk', 'Daily service', '−4 cartons', 'Today, 08:15'],
  ['Arabica Beans', 'Bar usage', '−6 kg', 'Yesterday'],
  ['Paper Cups 12oz', 'Counter service', '−80 pcs', 'Sep 30'],
  ['Matcha Powder', 'Waste adjustment', '−2 kg', 'Sep 29'],
];

const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const toSeries = rows => rows.map(([i, o], k) => ({ day: week[k], stockIn: i, stockOut: o }));
export const dashSeries = toSeries([[76, 38], [106, 68], [66, 35], [126, 88], [100, 62], [132, 94], [114, 76]]);
export const reportSeries = toSeries([[72, 38], [104, 62], [66, 32], [120, 82], [94, 56], [128, 88], [108, 70]]);
export const categoryShare = [['Ingredients', 65], ['Supplies', 45], ['Syrups', 30], ['Tea & dairy', 35]];

export const categories = ['Ingredients', 'Dairy alternatives', 'Syrups', 'Supplies', 'Tea'];
export const units = ['kg', 'carton', 'bottle', 'pcs'];
export const roles = ['Owner', 'Inventory staff', 'Barista'];

export const fmtMoney = n => '₦' + n.toLocaleString('en-US');
export const statusOf = p => (p.stock === 0 ? 'out' : p.stock <= p.low ? 'low' : 'in');
export const stockBadge = { in: ['green', 'In stock'], low: ['amber', 'Low stock'], out: ['red', 'Out of stock'] };
