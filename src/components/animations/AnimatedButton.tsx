import { motion } from 'motion/react';
import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  isLoading?: boolean;
  isSuccess?: boolean;
}

/**
 * AnimatedButton — drop-in replacement for plain <button>.
 * Adds: lift on hover, press feedback, loading spinner, success state.
 */
export default function AnimatedButton({
  children,
  isLoading = false,
  isSuccess = false,
  className = '',
  disabled,
  ...rest
}: AnimatedButtonProps) {
  return (
    <motion.button
      whileHover={!disabled && !isLoading ? { y: -1.5, boxShadow: '0 6px 20px rgba(34,57,96,0.13)' } : undefined}
      whileTap={!disabled && !isLoading ? { scale: 0.97, y: 0 } : undefined}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      disabled={disabled || isLoading}
      className={className}
      style={{ willChange: 'transform', position: 'relative', overflow: 'hidden' }}
      {...(rest as Record<string, unknown>)}
    >
      {isLoading ? (
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.7, ease: 'linear' }}
            style={{
              display: 'inline-block',
              width: 16,
              height: 16,
              borderRadius: '50%',
              border: '2px solid currentColor',
              borderTopColor: 'transparent',
            }}
          />
          Loading…
        </span>
      ) : isSuccess ? (
        <motion.span
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
        >
          ✓ Done
        </motion.span>
      ) : (
        children
      )}
    </motion.button>
  );
}
