interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: number;
  className?: string;
}

/**
 * Skeleton — shimmer placeholder for loading states.
 * Uses the global .skeleton CSS class (GPU-friendly gradient animation).
 */
export function Skeleton({ width = '100%', height = 16, borderRadius = 8, className = '' }: SkeletonProps) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{ width, height, borderRadius }}
    />
  );
}

/**
 * SkeletonCard — pre-built card skeleton for list items.
 */
export function SkeletonCard() {
  return (
    <div
      style={{
        padding: '14px 16px',
        background: '#fff',
        borderRadius: 16,
        border: '1px solid #F3F4F6',
        display: 'flex',
        gap: 14,
        alignItems: 'center',
        marginBottom: 10,
      }}
    >
      <Skeleton width={44} height={44} borderRadius={12} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Skeleton width="65%" height={14} />
        <Skeleton width="40%" height={11} />
      </div>
      <Skeleton width={36} height={36} borderRadius={10} />
    </div>
  );
}

/**
 * SkeletonList — multiple SkeletonCards.
 */
export function SkeletonList({ count = 5 }: { count?: number }) {
  return (
    <div>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

/**
 * SkeletonStat — dashboard stat card placeholder.
 */
export function SkeletonStat() {
  return (
    <div
      style={{
        padding: 16,
        background: '#fff',
        borderRadius: 16,
        border: '1px solid #F3F4F6',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Skeleton width="55%" height={11} />
        <Skeleton width={32} height={32} borderRadius={10} />
      </div>
      <Skeleton width="70%" height={24} />
      <Skeleton width="35%" height={10} />
    </div>
  );
}
