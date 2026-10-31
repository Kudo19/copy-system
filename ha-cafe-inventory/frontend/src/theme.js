import { createTheme } from '@mui/material/styles';

export const tokens = {
  bg: '#faf8f5', border: '#e8ded7', inputBorder: '#d9c9c0', ink: '#2e211d', muted: '#8c817b',
  primary: '#7c4a56', primarySoft: '#f1e9ec', lavender: '#ddd6ee', brown: '#ac7f5e',
};

const theme = createTheme({
  palette: {
    primary: { main: tokens.primary, dark: '#6a3d49' },
    background: { default: tokens.bg, paper: '#fff' },
    text: { primary: tokens.ink, secondary: tokens.muted },
    error: { main: '#a45353' },
    success: { main: '#537b62' },
    warning: { main: '#c98b2e' },
    divider: tokens.border,
  },
  shape: { borderRadius: 10 },
  typography: { fontFamily: "'Inter', system-ui, sans-serif", fontSize: 14, button: { textTransform: 'none', fontWeight: 600 } },
  components: {
    MuiButton: { defaultProps: { disableElevation: true }, styleOverrides: { root: { height: 42, borderRadius: 10, padding: '0 18px' } } },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { borderRadius: 10, background: '#fff', fontSize: 14, '& fieldset': { borderColor: tokens.inputBorder } },
        input: { padding: '11px 12px' },
      },
    },
    MuiTableCell: { styleOverrides: { root: { borderColor: tokens.border } } },
    MuiMenu: { styleOverrides: { paper: { borderRadius: 10, border: `1px solid ${tokens.border}`, boxShadow: '0 4px 12px rgba(76,54,32,.1)' } } },
    MuiDialog: { styleOverrides: { paper: { borderRadius: 16 } } },
  },
});

export default theme;
