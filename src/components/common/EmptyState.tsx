import type { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * EmptyState - displayed when a list or screen has no data.
 */
export default function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 2rem',
        textAlign: 'center',
      }}
    >
      {Icon && (
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 20,
            background: '#f3f4f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16,
          }}
        >
          <Icon size={28} color="#9ca3af" />
        </div>
      )}

      <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#374151', marginBottom: 8 }}>
        {title}
      </h3>

      {description && (
        <p style={{ fontSize: '0.875rem', color: '#9ca3af', maxWidth: 260, marginBottom: 20 }}>
          {description}
        </p>
      )}

      {action && (
        <button
          onClick={action.onClick}
          style={{
            padding: '10px 24px',
            borderRadius: 12,
            background: '#0EA5E9',
            color: '#fff',
            border: 'none',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '0.875rem',
          }}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
