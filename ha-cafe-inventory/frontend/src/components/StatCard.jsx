// tone: blue | green | amber | lav | rose
export default function StatCard({ label, value, note, icon: Icon, tone = 'lav', minHeight }) {
  return (
    <div className="metric" style={minHeight ? { minHeight } : undefined}>
      <div className="flex between center mb-2">
        <span className="metric-label">{label}</span>
        {Icon && <span className={`metric-icon bg-${tone}-x`}><Icon /></span>}
      </div>
      <div className="flex between end">
        <span className="metric-value">{value}</span>
        {note && <span className="metric-note">{note}</span>}
      </div>
    </div>
  );
}
