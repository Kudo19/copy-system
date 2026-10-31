import { useEffect, useRef, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Coffee from '@mui/icons-material/Coffee';
import Logout from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNone from '@mui/icons-material/NotificationsNone';
import { navItems, findNavItem } from '../config/navigation';
import { useAuth } from '../context/AuthContext';
import ConfirmDialog from './ConfirmDialog';

export default function AppLayout() {
  const { user, avatarUrl, logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const searchRef = useRef(null);

  // close the mobile drawer and scroll to top on navigation
  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [pathname]);

  // ⌘K / Ctrl+K focuses the global search
  useEffect(() => {
    const onKey = e => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const crumb = findNavItem(pathname)?.crumb || 'Dashboard';

  const onSearchKey = e => {
    if (e.key === 'Enter') {
      const q = e.target.value.trim();
      navigate(q ? `/products?q=${encodeURIComponent(q)}` : '/products');
    }
  };

  const doLogout = () => { setConfirmLogout(false); logout(); navigate('/login'); };

  return (
    <>
      <aside className={`sidebar${open ? ' open' : ''}`}>
        <div className="brand"><span className="brand-mark"><Coffee /></span>Ha Cafe and Patisserie</div>
        <nav>
          {navItems.map(({ path, label, icon: Icon, matchChildren }) => (
            <NavLink key={path} to={path} end={!matchChildren}
              className={({ isActive }) => `nav-item-x${isActive ? ' active' : ''}`}>
              <Icon />{label}
            </NavLink>
          ))}
        </nav>
        <button type="button" className="logout" onClick={() => setConfirmLogout(true)}><Logout fontSize="small" />Log out</button>
      </aside>
      {open && <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.25)', zIndex: 1150 }} />}

      <div className="workspace">
        <header className="topbar">
          <div className="flex center gap-3" style={{ flexGrow: 1 }}>
            <button type="button" className="menu-toggle" aria-label="Menu" onClick={() => setOpen(o => !o)}><MenuIcon /></button>
            <div style={{ flexGrow: 1, maxWidth: 560 }}>
              <div className="crumb">Home / {crumb}</div>
              <label className="global-search">
                <SearchIcon sx={{ fontSize: 16 }} />
                <input ref={searchRef} placeholder="Search products, suppliers..." autoComplete="off" onKeyDown={onSearchKey} />
                <span className="kbd">⌘ K</span>
              </label>
            </div>
          </div>
          <div className="flex center gap-3">
            <button type="button" className="icon-btn" aria-label="Notifications"><NotificationsNone fontSize="small" /></button>
            {avatarUrl ? <img className="avatar" src={avatarUrl} alt="" /> : <div className="avatar" />}
            <div className="d-none-sm">
              <div className="acct-name">{user.name}</div>
              <div className="acct-role">Store manager</div>
            </div>
          </div>
        </header>

        <main><Outlet /></main>
      </div>

      <ConfirmDialog open={confirmLogout} title="Log Out" message="Are you sure you want to log out?"
        onConfirm={doLogout} onClose={() => setConfirmLogout(false)} />
    </>
  );
}
