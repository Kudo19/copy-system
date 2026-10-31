// tone: green | amber | red | primary
export default function StatusPill({ tone = 'primary', children, ...rest }) {
  return <span className={`pill ${tone}`} {...rest}>{children}</span>;
}
