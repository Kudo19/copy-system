import { useState } from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import LockOutlined from '@mui/icons-material/LockOutlined';
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlined from '@mui/icons-material/VisibilityOffOutlined';
import TextInput from './TextInput';

export default function PasswordField({ icon = true, ...props }) {
  const [show, setShow] = useState(false);
  return (
    <TextInput
      {...props}
      type={show ? 'text' : 'password'}
      startIcon={icon ? LockOutlined : undefined}
      endAdornment={(
        <InputAdornment position="end">
          <IconButton size="small" edge="end" onClick={() => setShow(s => !s)} aria-label={show ? 'Hide password' : 'Show password'}>
            {show ? <VisibilityOffOutlined fontSize="small" /> : <VisibilityOutlined fontSize="small" />}
          </IconButton>
        </InputAdornment>
      )}
    />
  );
}
