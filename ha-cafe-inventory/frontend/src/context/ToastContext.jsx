import { createContext, useCallback, useContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

const ToastContext = createContext(() => {});
export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }) {
  const [state, setState] = useState({ open: false, msg: '' });
  const toast = useCallback(msg => setState({ open: true, msg }), []);
  return (
    <ToastContext.Provider value={toast}>
      {children}
      <Snackbar open={state.open} autoHideDuration={2600} onClose={() => setState(s => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity="info" variant="filled" icon={false} sx={{ bgcolor: '#2e211d', color: '#fff' }}>{state.msg}</Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
}
