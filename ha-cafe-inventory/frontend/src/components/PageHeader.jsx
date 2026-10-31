import { Link } from 'react-router-dom';
import ArrowBack from '@mui/icons-material/ArrowBack';

export default function PageHeader({ title, subtitle, action, backTo, compact }) {
  return (
    <div className="flex wrap between gap-3 mb-3" style={{ alignItems: 'flex-start' }}>
      <div>
        {backTo ? (
          <div className="flex center gap-2 mb-2">
            <Link to={backTo} aria-label="Back" style={{ color: 'inherit', display: 'flex' }}><ArrowBack /></Link>
            <h1 className="page-title" style={{ margin: 0, fontSize: 24 }}>{title}</h1>
          </div>
        ) : (
          <h1 className="page-title">{title}</h1>
        )}
        {subtitle && <p className="page-sub">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
