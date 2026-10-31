import { products } from '../data/products.js';

export function listProducts(req, res) {
  res.json(products);
}

export function createProduct(req, res) {
  const { name, cat, unit, stock = 0, low = 10, price = 0 } = req.body || {};
  if (!name || !cat) return res.status(400).json({ message: 'name and cat are required' });
  const id = 'P' + String(products.length + 1).padStart(3, '0');
  const product = { id, name, cat, unit: unit || 'pcs', stock: Number(stock), low: Number(low), price: Number(price) };
  products.push(product);
  res.status(201).json(product);
}

export function deleteProduct(req, res) {
  const i = products.findIndex(p => p.id === req.params.id);
  if (i === -1) return res.status(404).json({ message: 'Product not found' });
  products.splice(i, 1);
  res.status(204).end();
}
