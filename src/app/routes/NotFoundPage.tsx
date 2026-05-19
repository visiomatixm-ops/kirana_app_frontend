import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { Home, ArrowLeft } from 'lucide-react';
import { ROUTES } from '@/app/routes/routeConstants';

/**
 * NotFoundPage — 404 handler.
 * Shown for any route that doesn't match a defined path.
 * Preserves the existing app's design language (Lato, #223960).
 */
export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        background: '#fff',
        fontFamily: "'Lato', sans-serif",
      }}
    >
      {/* Big 404 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        style={{ textAlign: 'center' }}
      >
        <p
          style={{
            fontSize: 96,
            fontWeight: 900,
            color: '#223960',
            lineHeight: 1,
            marginBottom: 8,
            letterSpacing: -4,
          }}
        >
          404
        </p>
        <h2
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: '#223960',
            marginBottom: 10,
          }}
        >
          Page Not Found
        </h2>
        <p
          style={{
            fontSize: 14,
            color: '#8A8080',
            marginBottom: 32,
            maxWidth: 280,
            margin: '0 auto 32px',
            lineHeight: 1.6,
          }}
        >
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate(-1)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 24px',
              borderRadius: 12,
              border: '1.5px solid #E5E7EB',
              background: '#fff',
              color: '#223960',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: "'Lato', sans-serif",
            }}
          >
            <ArrowLeft size={16} />
            Go Back
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate(ROUTES.DASHBOARD, { replace: true })}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 24px',
              borderRadius: 12,
              border: 'none',
              background: 'linear-gradient(97deg, #223960 0%, #0EA5E9 100%)',
              color: '#fff',
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: "'Lato', sans-serif",
            }}
          >
            <Home size={16} />
            Go to Dashboard
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
