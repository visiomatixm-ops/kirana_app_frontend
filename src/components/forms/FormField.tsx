import type { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}

/**
 * FormField - labeled wrapper for form inputs.
 * Displays label, required indicator, hint text, and validation error.
 */
export default function FormField({ label, error, required, hint, children }: FormFieldProps) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label
        style={{
          display: 'block',
          fontSize: '0.8125rem',
          fontWeight: 600,
          color: '#374151',
          marginBottom: 6,
        }}
      >
        {label}
        {required && <span style={{ color: '#ef4444', marginLeft: 2 }}>*</span>}
      </label>

      {children}

      {hint && !error && (
        <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: 4 }}>{hint}</p>
      )}
      {error && (
        <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: 4 }}>{error}</p>
      )}
    </div>
  );
}
