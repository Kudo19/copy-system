import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

const titleCase = s => s.replace(/\b\w/g, c => c.toUpperCase());

export function AuthProvider({ children }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('hc-auth') === '1');
  const [user, setUser] = useState({
    name: sessionStorage.getItem('hc-name') || 'Mia Carter',
    email: sessionStorage.getItem('hc-email') || 'mia@morningbell.cafe',
  });
  const [password, setPassword] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const persist = u => { sessionStorage.setItem('hc-name', u.name); sessionStorage.setItem('hc-email', u.email); };

  // TODO: replace with POST /api/auth/login
  const login = (identity, pass) => {
    const id = identity.trim();
    const name = id.includes('@') ? titleCase(id.split('@')[0].replace(/[._-]+/g, ' ')) : titleCase(id);
    const u = { name, email: id.includes('@') ? id : user.email };
    setUser(u); setPassword(pass); persist(u);
    setAuthed(true); sessionStorage.setItem('hc-auth', '1');
  };
  const logout = () => { setAuthed(false); sessionStorage.removeItem('hc-auth'); };
  const updateProfile = u => { setUser(u); persist(u); };
  const changePassword = (current, next) => {
    if (!password) return 'Please log in again before changing your password.';
    if (current !== password) return 'Current password is incorrect.';
    setPassword(next);
    return null;
  };

  return (
    <AuthContext.Provider value={{ authed, user, avatarUrl, setAvatarUrl, login, logout, updateProfile, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
}
