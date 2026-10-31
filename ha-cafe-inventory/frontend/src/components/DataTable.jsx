import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

/**
 * Generic table.
 * columns: [{ key, header, align, width, ink, render?(row), sx }]
 *   - `ink` colours the cell text dark (default is muted, as in the design)
 * Pass `hideHeader` for header-less lists.
 */
export default function DataTable({ columns, rows, rowKey = 'id', empty = 'No results.', hideHeader, rowHeight = 58 }) {
  return (
    <TableContainer>
      <Table>
        {!hideHeader && (
          <TableHead>
            <TableRow>
              {columns.map((c, i) => (
                <TableCell
                  key={c.key || i}
                  align={c.align}
                  sx={{
                    bgcolor: '#fefcfa', color: 'text.secondary', fontSize: 11, fontWeight: 700,
                    textTransform: 'uppercase', whiteSpace: 'nowrap', py: '14px', borderBottom: 0,
                    ...(i === 0 && { pl: '18px' }), width: c.width,
                  }}
                >{c.header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {rows.length === 0 ? (
            <TableRow><TableCell colSpan={columns.length} align="center" sx={{ py: 5, color: 'text.secondary', fontSize: 12, border: 0 }}>{empty}</TableCell></TableRow>
          ) : rows.map((row, r) => (
            <TableRow key={typeof rowKey === 'function' ? rowKey(row, r) : row[rowKey] ?? r}
              sx={{ '&:last-child td': { borderBottom: 0 } }}>
              {columns.map((c, i) => (
                <TableCell
                  key={c.key || i}
                  align={c.align}
                  sx={{
                    height: rowHeight, py: 0, fontSize: 12, color: c.ink ? 'text.primary' : 'text.secondary',
                    ...(i === 0 && { pl: '18px' }), ...c.sx,
                  }}
                >{c.render ? c.render(row, r) : row[c.key]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
