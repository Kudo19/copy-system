import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Checkbox, FormControlLabel } from '@mui/material';
import Coffee from '@mui/icons-material/Coffee';
import MailOutline from '@mui/icons-material/MailOutline';
import TextInput from '../components/TextInput';
import PasswordField from '../components/PasswordField';
import useForm from '../hooks/useForm';
import { required } from '../utils/validators';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Login() {
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const { state } = useLocation();
  const form = useForm({ identity: state?.identity || '', password: '', remember: false });

  const onSubmit = e => {
    e.preventDefault();
    if (!form.validate({ identity: required('Enter your username or email'), password: required('Enter your password') })) {
      return toast('Enter your username and password.');
    }
    login(form.values.identity, form.values.password);
    navigate('/dashboard');
  };

  return (
    <section className="auth">
      <span className="stripe" style={{ left: 80, top: -300, height: 1430, transform: 'rotate(30deg)' }} />
      <span className="stripe" style={{ left: 283, top: -80, height: 1150, transform: 'rotate(30deg)' }} />
      <div className="auth-panel l5-7">
        <div className="auth-brand">
          <span className="logo-circle" role="img" aria-label="Cafe logo"><Coffee /></span>
          <h2>Ha? Cafe and Patisserie</h2>
        </div>
        <div className="auth-side">
          <form className="auth-form" onSubmit={onSubmit} noValidate>
            <h1 className="center-text">Welcome!</h1>
            <p className="lead-x center-text">Log in to manage your café inventory.</p>
            <div className="field-wrap">
              <TextInput label="Username" placeholder="Username/Email Address" startIcon={MailOutline}
                autoComplete="username" {...form.bind('identity')} />
            </div>
            <div className="field-wrap">
              <PasswordField label="Password" placeholder="Enter your password" autoComplete="current-password" {...form.bind('password')} />
            </div>
            <div className="flex between center mb-4" style={{ fontSize: 12 }}>
              <FormControlLabel
                control={<Checkbox size="small" checked={form.values.remember} onChange={form.bind('remember', { checkbox: true }).onChange} />}
                label={<span style={{ fontSize: 12, color: '#8c817b' }}>Remember me</span>} />
              <Link to="/reset" className="linkish">Forgot password?</Link>
            </div>
            <Button type="submit" variant="contained" fullWidth>Log In</Button>
            <p className="center-text mb-0" style={{ fontSize: 12, color: '#8c817b', marginTop: 24 }}>
              New to Ha Cafe and Patisserie? <Link to="/signup" className="linkish">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
