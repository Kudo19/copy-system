// Small validator helpers used with the useForm hook.
// Each rule receives (value, allValues) and returns '' when valid or an error message.
export const required = (msg = 'This field is required') => v => (String(v ?? '').trim() ? '' : msg);
export const email = (msg = 'Enter a valid email address') => v => (!v || /^\S+@\S+\.\S+$/.test(v) ? '' : msg);
export const minLen = n => v => (!v || String(v).length >= n ? '' : `Use at least ${n} characters`);
export const matches = (field, msg = 'Values do not match') => (v, all) => (v === all[field] ? '' : msg);

// Run rules in order and return the first error message.
export const all = (...rules) => (v, values) => {
  for (const rule of rules) {
    const msg = rule(v, values);
    if (msg) return msg;
  }
  return '';
};

export const passwordStrength = v => {
  if (!v) return 'Enter a strong password';
  const score = [/.{8,}/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter(r => r.test(v)).length;
  return ['Too weak', 'Weak', 'Fair', 'Good', 'Strong'][score];
};
