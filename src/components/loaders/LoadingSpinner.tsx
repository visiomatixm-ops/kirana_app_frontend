interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

const sizes = {
  sm: 20,
  md: 32,
  lg: 48,
};

export default function LoadingSpinner({ size = 'md', fullScreen = false }: LoadingSpinnerProps) {
  const px = sizes[size];

  const spinner = (
    <div
      style={{
        width: px,
        height: px,
        border: `${px / 8}px solid #e5e7eb`,
        borderTopColor: '#0EA5E9',
        borderRadius: '50%',
        animation: 'spin 0.7s linear infinite',
      }}
    />
  );

  if (fullScreen) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        {spinner}
      </div>
    );
  }

  return (
    <>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      {spinner}
    </>
  );
}
