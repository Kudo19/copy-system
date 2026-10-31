import { createContext, useContext, useState } from 'react';
import {
  seedProducts, seedSuppliers, seedUsers, seedActivity, seedRecentIn, seedRecentOut,
} from '../data/seed';

const InventoryContext = createContext(null);
export const useInventory = () => useContext(InventoryContext);

export function InventoryProvider({ children }) {
  const [products, setProducts] = useState(seedProducts);
  const [suppliers, setSuppliers] = useState(seedSuppliers);
  const [users, setUsers] = useState(seedUsers);
  const [activity, setActivity] = useState(seedActivity);
  const [recentIn, setRecentIn] = useState(seedRecentIn);
  const [recentOut, setRecentOut] = useState(seedRecentOut);

  const addProduct = p => {
    const id = 'P' + String(products.length + 1).padStart(3, '0');
    setProducts(list => [...list, { id, price: 0, ...p }]);
  };
  const deleteProduct = id => setProducts(list => list.filter(p => p.id !== id));

  const stockIn = (id, qty, supplier) => {
    const p = products.find(x => x.id === id);
    setProducts(list => list.map(x => (x.id === id ? { ...x, stock: x.stock + qty } : x)));
    setRecentIn(r => [[p.name, supplier, `+${qty} ${p.unit}`, 'Just now'], ...r].slice(0, 4));
    setActivity(a => [{ type: 'Stock in', product: p.name, qty: `+${qty} ${p.unit}`, when: 'Just now' }, ...a].slice(0, 6));
  };
  const stockOut = (id, qty) => {
    const p = products.find(x => x.id === id);
    setProducts(list => list.map(x => (x.id === id ? { ...x, stock: x.stock - qty } : x)));
    setRecentOut(r => [[p.name, 'Manual removal', `−${qty} ${p.unit}`, 'Just now'], ...r].slice(0, 4));
    setActivity(a => [{ type: 'Stock out', product: p.name, qty: `−${qty} ${p.unit}`, when: 'Just now' }, ...a].slice(0, 6));
  };

  const addSupplier = s => {
    const code = 'SUP-' + s.name.split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
    setSuppliers(list => [...list, { code, last: '—', status: s.active ? 'Active' : 'Paused', ...s }]);
  };

  const updateUser = (email, patch) => setUsers(list => list.map(u => (u.email === email ? { ...u, ...patch } : u)));
  const deleteUser = email => setUsers(list => list.filter(u => u.email !== email));

  return (
    <InventoryContext.Provider value={{
      products, suppliers, users, activity, recentIn, recentOut,
      addProduct, deleteProduct, stockIn, stockOut, addSupplier, updateUser, deleteUser,
    }}>
      {children}
    </InventoryContext.Provider>
  );
}
