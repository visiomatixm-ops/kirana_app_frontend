import BaseModal from './BaseModal';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'primary';
  isLoading?: boolean;
}

/**
 * ConfirmModal - reusable yes/no confirmation dialog built on BaseModal.
 */
export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'primary',
  isLoading = false,
}: ConfirmModalProps) {
  const confirmColor = variant === 'danger' ? '#ef4444' : '#0EA5E9';

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={title}>
      <p style={{ color: '#555', marginBottom: 24, lineHeight: 1.5 }}>{message}</p>
      <div style={{ display: 'flex', gap: 12 }}>
        <button
          onClick={onClose}
          disabled={isLoading}
          style={{
            flex: 1,
            padding: '12px',
            borderRadius: 12,
            border: '1px solid #e5e7eb',
            background: '#fff',
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          {cancelLabel}
        </button>
        <button
          onClick={onConfirm}
          disabled={isLoading}
          style={{
            flex: 1,
            padding: '12px',
            borderRadius: 12,
            border: 'none',
            background: confirmColor,
            color: '#fff',
            cursor: 'pointer',
            fontWeight: 600,
            opacity: isLoading ? 0.7 : 1,
          }}
        >
          {isLoading ? 'Loading…' : confirmLabel}
        </button>
      </div>
    </BaseModal>
  );
}
