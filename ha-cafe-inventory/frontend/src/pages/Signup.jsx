import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Coffee from '@mui/icons-material/Coffee';
import CoffeeOutlined from '@mui/icons-material/CoffeeOutlined';
import PersonOutline from '@mui/icons-material/PersonOutline';
import MailOutline from '@mui/icons-material/MailOutline';
import TextInput from '../components/TextInput';
import PasswordField from '../components/PasswordField';
import useForm from '../hooks/useForm';
import { all, required, email, minLen, matches, passwordStrength } from '../utils/validators';
import { useToast } from '../context/ToastContext';

export default function Signup() {
  const toast = useToast();
  const navigate = useNavigate();
  const form = useForm({ name: '', email: '', password: '', confirm: '' });
  const { values } = form;

  const onSubmit = e => {
    e.preventDefault();
    const ok = form.validate({
      name: required('Enter a username'),
      email: all(required('Enter your email address'), email()),
      password: all(required('Enter a password'), minLen(8)),
      confirm: all(required('Re-enter your password'), matches('password', 'Passwords do not match')),
    });
    if (!ok) {
      return toast(values.password && values.confirm && values.password !== values.confirm
        ? 'Passwords do not match.' : 'Please complete all fields (password: 8+ characters).');
    }
    toast('Account created. Please log in.');
    navigate('/login', { state: { identity: values.email } });
  };

  return (
    <section className="auth">
      {[181, 291, 401].map(left => <span key={left} className="stripe" style={{ left, top: -211, height: 1152 }} />)}
      <div className="auth-panel even">
        <div className="auth-side">
          <form className="auth-form" onSubmit={onSubmit} noValidate>
            <span className="logo-circle auth-mobile-logo" role="img" aria-label="Cafe logo"><Coffee /></span>
            <h1>Create your account</h1>
            <p className="lead-x">Start keeping better track of every ingredient.</p>
            <div className="field-wrap"><TextInput label="Username" placeholder="Mia Carter" startIcon={PersonOutline} {...form.bind('name')} /></div>
            <div className="field-wrap"><TextInput label="Email address" type="email" placeholder="name@cafe.com" startIcon={MailOutline} {...form.bind('email')} /></div>
            <div className="field-wrap">
              <PasswordField label="Password" placeholder="Enter password" helperText={passwordStrength(values.password)} {...form.bind('password')} />
            </div>
            <div className="mb-4"><PasswordField label="Confirm Password" placeholder="Re-enter password" {...form.bind('confirm')} /></div>
            <Button type="submit" variant="contained" fullWidth>Create account</Button>
            <p className="center-text mb-0" style={{ fontSize: 12, color: '#8c817b', marginTop: 24 }}>
              Already have an account? <Link to="/login" className="linkish">Log in</Link>
            </p>
          </form>
        </div>
        <div className="auth-side photo"><div className="auth-photo"><CoffeeOutlined /></div></div>
      </div>
    </section>
  );
}
