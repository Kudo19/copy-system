import { useNavigate } from 'react-router-dom';
import Coffee from '@mui/icons-material/Coffee';

export default function Landing() {
  const navigate = useNavigate();
  return (
    <section className="landing">
      <div className="landing-card">
        <div className="landing-logo" role="img" aria-label="Cafe logo"><Coffee /></div>
        <h1>Ha? Cafe and Patisserie<br />Inventory System</h1>
        <button type="button" className="btn-start" onClick={() => navigate('/login')}>Get Started</button>
      </div>
    </section>
  );
}
