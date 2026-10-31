import { useState } from 'react';

/**
 * Minimal form-state hook.
 *   const form = useForm({ name: '' });
 *   <TextInput {...form.bind('name')} />
 *   if (!form.validate({ name: required() })) return;
 */
export default function useForm(initial) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});

  const set = (name, value) => {
    setValues(v => ({ ...v, [name]: value }));
    setErrors(e => (e[name] ? { ...e, [name]: '' } : e));
  };

  const bind = (name, { checkbox = false } = {}) => ({
    value: values[name],
    error: errors[name],
    onChange: e => set(name, checkbox ? e.target.checked : e.target.value),
  });

  const reset = (next = initial) => { setValues(next); setErrors({}); };

  const setError = (name, msg) => setErrors(e => ({ ...e, [name]: msg }));

  // rules: { field: (value, allValues) => '' | 'message' }
  const validate = rules => {
    const next = {};
    Object.entries(rules).forEach(([name, rule]) => {
      const msg = rule(values[name], values);
      if (msg) next[name] = msg;
    });
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  return { values, errors, set, bind, reset, setError, validate };
}
