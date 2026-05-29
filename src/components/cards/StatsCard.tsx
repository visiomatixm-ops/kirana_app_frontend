import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: string;
  subLabel?: string;
  icon?: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  trend?: { value: number; direction: 'up' | 'down' };
  onClick?: () => void;
}

/**
 * StatsCard - reusable metric card matching the app's existing dashboard style.
 */
export default function StatsCard({
  label,
  value,
  subLabel,
  icon: Icon,
  iconColor = '#0EA5E9',
  iconBg = '#e0f2fe',
  trend,
  onClick,
}: StatsCardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        background: '#fff',
        borderRadius: 16,
        padding: '16px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        cursor: onClick ? 'pointer' : 'default',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: 500 }}>{label}</span>
        {Icon && (
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: iconBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon size={18} color={iconColor} />
          </div>
        )}
      </div>

      <div style={{ fontSize: '1.375rem', fontWeight: 700, color: '#111827' }}>{value}</div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {trend && (
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: trend.direction === 'up' ? '#10b981' : '#ef4444',
            }}
          >
            {trend.direction === 'up' ? '↑' : '↓'} {Math.abs(trend.value)}%
          </span>
        )}
        {subLabel && (
          <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{subLabel}</span>
        )}
      </div>
    </div>
  );
}
