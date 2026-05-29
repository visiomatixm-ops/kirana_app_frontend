/**
 * Export an array of objects as a CSV file download
 */
export function exportToCsv<T extends Record<string, unknown>>(
  data: T[],
  filename: string,
  headers?: Partial<Record<keyof T, string>>
): void {
  if (!data.length) return;

  const keys = Object.keys(data[0]) as (keyof T)[];
  const headerRow = keys.map((k) => (headers?.[k] ?? String(k))).join(',');
  const rows = data.map((row) =>
    keys.map((k) => {
      const val = row[k];
      const str = val === null || val === undefined ? '' : String(val);
      return `"${str.replace(/"/g, '""')}"`;
    }).join(',')
  );

  const csv = [headerRow, ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Trigger browser print dialog
 */
export function printElement(elementId: string): void {
  const el = document.getElementById(elementId);
  if (!el) return;
  const originalBody = document.body.innerHTML;
  document.body.innerHTML = el.innerHTML;
  window.print();
  document.body.innerHTML = originalBody;
  window.location.reload();
}
