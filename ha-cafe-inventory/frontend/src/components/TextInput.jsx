import { useId } from 'react';
import { TextField, InputAdornment } from '@mui/material';

/**
 * Labelled text field (label above the input, like the original design).
 * `error` is a message string; `startIcon` is a MUI icon component.
 */
export default function TextInput({
  label, required, helperText, error, startIcon: StartIcon, endAdornment,
  size = 'medium', sx, inputProps, id, ...rest
}) {
  const autoId = useId();
  const fieldId = id || autoId;
  const small = size === 'small';
  return (
    <div>
      {label && (
        <label className="form-label-x" htmlFor={fieldId}>
          {label}{required && <span className="req"> *</span>}
        </label>
      )}
      <TextField
        id={fieldId}
        fullWidth
        error={Boolean(error)}
        helperText={error || helperText}
        slotProps={{
          input: {
            startAdornment: StartIcon ? (
              <InputAdornment position="start"><StartIcon sx={{ fontSize: 18, color: 'text.secondary' }} /></InputAdornment>
            ) : undefined,
            endAdornment,
          },
          htmlInput: inputProps,
          formHelperText: { sx: { mx: 0, fontSize: 11 } },
        }}
        sx={{
          '& .MuiOutlinedInput-root': { minHeight: small ? 36 : 42, fontSize: small ? 12 : 14 },
          '& .MuiOutlinedInput-input': { py: small ? '8px' : '11px' },
          '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: 'primary.main', boxShadow: '0 0 0 3px rgba(124,74,86,.12)' },
          ...sx,
        }}
        {...rest}
      />
    </div>
  );
}
