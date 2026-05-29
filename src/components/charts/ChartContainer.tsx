import { ResponsiveContainer, type ResponsiveContainerProps } from 'recharts';
import type { ReactNode } from 'react';

interface ChartContainerProps {
  height?: number;
  children: ReactNode;
  title?: string;
  subtitle?: string;
  action?: ReactNode;
}

/**
 * ChartContainer — wraps any Recharts chart in a consistent card shell.
 * Preserves the app's existing white-card aesthetic.
 */
export function ChartContainer({
  height = 200,
  children,
  title,
  subtitle,
  action,
}: ChartContainerProps) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 16,
        padding: '16px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      }}
    >
      {(title || action) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: 12,
          }}
        >
          <div>
            {title && (
              <p style={{ fontWeight: 600, fontSize: '0.9rem', color: '#111827', margin: 0 }}>
                {title}
              </p>
            )}
            {subtitle && (
              <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: '2px 0 0' }}>
                {subtitle}
              </p>
            )}
          </div>
          {action}
        </div>
      )}
      <ResponsiveContainer width="100%" height={height}>
        {children as React.ReactElement<ResponsiveContainerProps>}
      </ResponsiveContainer>
    </div>
  );
}

export default ChartContainer;
