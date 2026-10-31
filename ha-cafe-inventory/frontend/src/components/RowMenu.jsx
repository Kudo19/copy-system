import { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreHoriz from '@mui/icons-material/MoreHoriz';

/** Kebab menu for table rows. items: [{ label, onClick, danger }] */
export default function RowMenu({ items }) {
  const [anchor, setAnchor] = useState(null);
  const close = () => setAnchor(null);
  return (
    <>
      <IconButton size="small" aria-label="Actions" onClick={e => setAnchor(e.currentTarget)} sx={{ color: 'text.secondary' }}>
        <MoreHoriz fontSize="small" />
      </IconButton>
      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={close}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        {items.map(it => (
          <MenuItem key={it.label} onClick={() => { close(); it.onClick(); }}
            sx={{ fontSize: 13, color: it.danger ? 'error.main' : 'inherit' }}>{it.label}</MenuItem>
        ))}
      </Menu>
    </>
  );
}
