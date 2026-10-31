import { useId } from 'react';
import { TextField, MenuItem } from '@mui/material';

const normalize = o => (typeof o === 'object' ? o : { value: o, label: o });

/**
 * Labelled select. `options` can be strings or { value, label }.
 * `placeholder` renders a muted, disabled first entry when nothing is chosen.
 */
export default function SelectInput({
  label, required, options = [], placeholder, error, helperText, size = 'medium', sx, id, value, ...rest
}) {
  const autoId = useId();
  const fieldId = id || autoId;
  const small = size === 'small';
  const opts = options.map(normalize);
  return (
    <div>
      {label && (
        <label className="form-label-x" htmlFor={fieldId}>
          {label}{required && <span className="req"> *</span>}
        </label>
      )}
      <TextField
        select
        id={fieldId}
        fullWidth
        value={value ?? ''}
        error={Boolean(error)}
        helperText={error || helperText}
        slotProps={{
          select: {
            displayEmpty: Boolean(placeholder),
            renderValue: v =>
              v === '' || v == null
                ? <span style={{ color: '#8c817b' }}>{placeholder}</span>
                : (opts.find(o => o.value === v)?.label ?? v),
          },
          formHelperText: { sx: { mx: 0, fontSize: 11 } },
        }}
        sx={{
          '& .MuiOutlinedInput-root': { minHeight: small ? 36 : 42, fontSize: small ? 12 : 14 },
          '& .MuiSelect-select': { py: small ? '8px' : '11px' },
          ...sx,
        }}
        {...rest}
      >
        {placeholder && <MenuItem value="" disabled>{placeholder}</MenuItem>}
        {opts.map(o => <MenuItem key={o.value} value={o.value} sx={{ fontSize: small ? 12 : 14 }}>{o.label}</MenuItem>)}
      </TextField>
    </div>
  );
}
