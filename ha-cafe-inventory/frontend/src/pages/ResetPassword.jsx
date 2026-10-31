import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import CoffeeOutlined from '@mui/icons-material/CoffeeOutlined';
import PasswordField from '../components/PasswordField';
import useForm from '../hooks/useForm';
import { all, required, minLen, matches } from '../utils/validators';
import { useToast } from '../context/ToastContext';

export default function ResetPassword() {
  const toast = useToast();
  const navigate = useNavigate();
  const form = useForm({ password: '', confirm: '' });

  const onSubmit = e => {
    e.preventDefault();
    const ok = form.validate({
      password: all(required('Enter a new password'), minLen(8)),
      confirm: all(required('Re-enter your new password'), matches('password', 'Passwords do not match')),
    });
    if (!ok) {
      return toast(form.values.password.length >= 8 ? 'Passwords do not match.' : 'Password must be at least 8 characters.');
    }
    toast('Password updated. Log in with your new password.');
    navigate('/login');
  };

  return (
    <section className="auth">
      <div className="auth-panel even">
        <div className="auth-side photo"><div className="auth-photo"><CoffeeOutlined /></div></div>
        <div className="auth-side">
          <form className="auth-form" onSubmit={onSubmit} noValidate>
            <h1>Reset Password</h1>
            <p className="lead-x">Choose a strong new password.</p>
            <div className="field-wrap">
              <PasswordField label="New password" placeholder="Enter new password" helperText="Enter a strong password" {...form.bind('password')} />
            </div>
            <div className="mb-4"><PasswordField label="Confirm new password" placeholder="Re-enter new password" {...form.bind('confirm')} /></div>
            <Button type="submit" variant="contained" fullWidth>Reset Password</Button>
            <p className="center-text mb-0" style={{ fontSize: 12, marginTop: 24 }}><Link to="/login" className="linkish">← Back to Log In</Link></p>
          </form>
        </div>
      </div>
    </section>
  );
}
