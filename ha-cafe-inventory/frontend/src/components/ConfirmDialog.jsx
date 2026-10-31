import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

export default function ConfirmDialog({
  open, title, message, confirmLabel = 'Yes', cancelLabel = 'No', onConfirm, onClose, tone = 'dark',
}) {
  const confirmSx = tone === 'danger'
    ? { bgcolor: 'error.main', '&:hover': { bgcolor: '#8c4343' } }
    : { bgcolor: '#38241e', '&:hover': { bgcolor: '#241610' } };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontSize: 18, fontWeight: 700 }}>{title}</DialogTitle>
      <DialogContent sx={{ color: 'text.secondary', fontSize: 14 }}>{message}</DialogContent>
      <DialogActions sx={{ p: 2, pt: 0, gap: 1 }}>
        <Button variant="outlined" color="inherit" onClick={onClose} sx={{ borderColor: 'divider' }}>{cancelLabel}</Button>
        <Button variant="contained" onClick={onConfirm} sx={confirmSx}>{confirmLabel}</Button>
      </DialogActions>
    </Dialog>
  );
}
