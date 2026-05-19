type BadgeVariant = 'success' | 'error' | 'warning' | 'info' | 'neutral';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, { bg: string; color: string }> = {
  success: { bg: '#dcfce7', color: '#16a34a' },
  error: { bg: '#fee2e2', color: '#dc2626' },
  warning: { bg: '#fef9c3', color: '#ca8a04' },
  info: { bg: '#e0f2fe', color: '#0284c7' },
  neutral: { bg: '#f3f4f6', color: '#6b7280' },
};

/**
 * Badge - inline status/label chip.
 */
export default function Badge({ label, variant = 'neutral' }: BadgeProps) {
  const { bg, color } = variantStyles[variant];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 10px',
        borderRadius: 999,
        fontSize: '0.75rem',
        fontWeight: 600,
        background: bg,
        color,
      }}
    >
      {label}
    </span>
  );
}
