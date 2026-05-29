import type { ReactNode } from 'react';
import type { TableColumn } from '@/types';

interface DataTableProps<T extends Record<string, unknown>> {
  columns: TableColumn<T>[];
  data: T[];
  keyField?: keyof T;
  emptyMessage?: string;
  isLoading?: boolean;
  onRowClick?: (row: T) => void;
}

/**
 * DataTable - generic reusable table component.
 * Preserves the app's existing styling: plain white table with dividers.
 */
export default function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  keyField = 'id' as keyof T,
  emptyMessage = 'No data found',
  isLoading = false,
  onRowClick,
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af' }}>
        Loading…
      </div>
    );
  }

  if (!data.length) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af' }}>
        {emptyMessage}
      </div>
    );
  }

  return (
    <div style={{ overflowX: 'auto', width: '100%' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                style={{
                  textAlign: 'left',
                  padding: '10px 12px',
                  borderBottom: '2px solid #f0f0f0',
                  fontWeight: 600,
                  color: '#374151',
                  whiteSpace: 'nowrap',
                }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr
              key={String(row[keyField] ?? rowIdx)}
              onClick={() => onRowClick?.(row)}
              style={{
                cursor: onRowClick ? 'pointer' : 'default',
                borderBottom: '1px solid #f9fafb',
              }}
            >
              {columns.map((col) => (
                <td
                  key={String(col.key)}
                  style={{ padding: '10px 12px', color: '#4b5563' }}
                >
                  {col.render
                    ? (col.render(row[col.key as keyof T], row) as ReactNode)
                    : String(row[col.key as keyof T] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
