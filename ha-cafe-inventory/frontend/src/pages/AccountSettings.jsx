import { useRef } from 'react';
import { Button } from '@mui/material';
import PageHeader from '../components/PageHeader';
import TextInput from '../components/TextInput';
import PasswordField from '../components/PasswordField';
import useForm from '../hooks/useForm';
import { all, required, email, minLen, matches } from '../utils/validators';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const initials = name => name.split(/\s+/).filter(Boolean).map(part => part[0]).join('').slice(0, 2).toUpperCase();

export default function AccountSettings() {
  const { user, avatarUrl, setAvatarUrl, updateProfile, changePassword } = useAuth();
  const toast = useToast();
  const fileRef = useRef(null);
  const profile = useForm({ name: user.name, email: user.email });
  const pwd = useForm({ current: '', next: '', confirm: '' });

  const onPickImage = e => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      e.target.value = '';
      return toast('Choose an image file for your profile picture.');
    }
    if (avatarUrl) URL.revokeObjectURL(avatarUrl);
    setAvatarUrl(URL.createObjectURL(file));
  };

  const saveProfile = e => {
    e.preventDefault();
    if (!profile.validate({ name: required('Enter your full name'), email: all(required('Enter your email'), email()) })) {
      return toast('Enter a valid name and email address.');
    }
    updateProfile({ name: profile.values.name.trim(), email: profile.values.email.trim() });
    toast('Profile updated.');
  };

  const savePassword = e => {
    e.preventDefault();
    const ok = pwd.validate({
      current: required('Enter your current password'),
      next: all(required('Enter a new password'), minLen(8)),
      confirm: all(required('Re-enter your new password'), matches('next', 'New passwords do not match')),
    });
    if (!ok) {
      return toast(pwd.values.next.length >= 8 && pwd.values.next !== pwd.values.confirm
        ? 'New passwords do not match.'
        : 'Enter your current password and a new password of at least 8 characters.');
    }
    const err = changePassword(pwd.values.current, pwd.values.next);
    if (err) {
      if (err.includes('incorrect')) pwd.setError('current', err);
      return toast(err);
    }
    pwd.reset();
    toast('Password updated successfully.');
  };

  return (
    <div className="page">
      <PageHeader title="Account Settings" subtitle="Update your profile and account password." />
      <div className="grid g-2col" style={{ gridTemplateColumns: 'minmax(0,5fr) minmax(0,7fr)', alignItems: 'start' }}>
        <section className="card-x card-pad profile-card">
          <div className="profile-avatar">
            {avatarUrl ? <img src={avatarUrl} alt="Profile picture" /> : <span>{initials(user.name)}</span>}
          </div>
          <h2 className="card-title" style={{ marginTop: 16 }}>{user.name}</h2>
          <p className="card-sub">{user.email}</p>
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={onPickImage} />
          <Button variant="outlined" color="inherit" sx={{ borderColor: 'divider', mt: 2 }} onClick={() => fileRef.current?.click()}>
            Change profile picture
          </Button>
        </section>

        <div>
          <form className="card-x card-pad mb-3" onSubmit={saveProfile} noValidate>
            <h2 className="card-title mb-3">Profile</h2>
            <div className="field-wrap"><TextInput label="Full Name" {...profile.bind('name')} /></div>
            <div className="field-wrap"><TextInput label="Email" type="email" {...profile.bind('email')} /></div>
            <Button type="submit" variant="contained">Save Profile</Button>
          </form>

          <form className="card-x card-pad" onSubmit={savePassword} noValidate>
            <h2 className="card-title mb-3">Change Password</h2>
            <div className="field-wrap"><PasswordField icon={false} label="Current Password" autoComplete="current-password" {...pwd.bind('current')} /></div>
            <div className="field-wrap"><PasswordField icon={false} label="New Password" autoComplete="new-password" {...pwd.bind('next')} /></div>
            <div className="field-wrap"><PasswordField icon={false} label="Re-enter Password" autoComplete="new-password" {...pwd.bind('confirm')} /></div>
            <Button type="submit" variant="contained">Save Password</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
