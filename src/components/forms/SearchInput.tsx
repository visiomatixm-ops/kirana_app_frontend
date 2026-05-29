import { Search, X } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

/**
 * SearchInput - reusable search bar matching the app's existing style.
 */
export default function SearchInput({
  value,
  onChange,
  placeholder = 'Search…',
  className = '',
}: SearchInputProps) {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Search
        size={16}
        color="#9ca3af"
        style={{ position: 'absolute', left: 12, pointerEvents: 'none' }}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '10px 36px 10px 36px',
          borderRadius: 12,
          border: '1.5px solid #e5e7eb',
          fontSize: '0.875rem',
          outline: 'none',
          background: '#f9fafb',
          color: '#111',
        }}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          style={{
            position: 'absolute',
            right: 10,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 2,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <X size={14} color="#9ca3af" />
        </button>
      )}
    </div>
  );
}
