import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import AppLayout from './components/AppLayout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import StockIn from './pages/StockIn';
import StockOut from './pages/StockOut';
import Suppliers from './pages/Suppliers';
import AddSupplier from './pages/AddSupplier';
import Reports from './pages/Reports';
import Users from './pages/Users';
import AccountSettings from './pages/AccountSettings';

function Protected({ children }) {
  const { authed } = useAuth();
  return authed ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/reset" element={<ResetPassword />} />

      <Route element={<Protected><AppLayout /></Protected>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/new" element={<AddProduct />} />
        <Route path="/stock-in" element={<StockIn />} />
        <Route path="/stock-out" element={<StockOut />} />
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/suppliers/new" element={<AddSupplier />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/users" element={<Users />} />
        <Route path="/account" element={<AccountSettings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
