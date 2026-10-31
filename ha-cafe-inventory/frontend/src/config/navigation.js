import DashboardOutlined from '@mui/icons-material/DashboardOutlined';
import Inventory2Outlined from '@mui/icons-material/Inventory2Outlined';
import AddOutlined from '@mui/icons-material/AddOutlined';
import MoveToInboxOutlined from '@mui/icons-material/MoveToInboxOutlined';
import OutboxOutlined from '@mui/icons-material/OutboxOutlined';
import LocalShippingOutlined from '@mui/icons-material/LocalShippingOutlined';
import BarChartOutlined from '@mui/icons-material/BarChartOutlined';
import PeopleOutline from '@mui/icons-material/PeopleOutline';
import ManageAccountsOutlined from '@mui/icons-material/ManageAccountsOutlined';

// path, sidebar label, breadcrumb label, icon
export const navItems = [
  { path: '/dashboard', label: 'Dashboard', crumb: 'Dashboard', icon: DashboardOutlined },
  { path: '/products', label: 'Product Management', crumb: 'Product Management', icon: Inventory2Outlined },
  { path: '/products/new', label: 'Add Product', crumb: 'Add Product', icon: AddOutlined },
  { path: '/stock-in', label: 'Stock In', crumb: 'Stock In', icon: MoveToInboxOutlined },
  { path: '/stock-out', label: 'Stock Out', crumb: 'Stock Out', icon: OutboxOutlined },
  { path: '/suppliers', label: 'Supplier', crumb: 'Suppliers', icon: LocalShippingOutlined, matchChildren: true },
  { path: '/reports', label: 'Reports', crumb: 'Reports', icon: BarChartOutlined },
  { path: '/users', label: "User's Interface", crumb: 'User Management', icon: PeopleOutline },
  { path: '/account', label: 'Account Settings', crumb: 'Account Settings', icon: ManageAccountsOutlined },
];

export const findNavItem = pathname =>
  navItems.find(n => n.path === pathname) ||
  navItems.find(n => n.matchChildren && pathname.startsWith(n.path + '/'));
