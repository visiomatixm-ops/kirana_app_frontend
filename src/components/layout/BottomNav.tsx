import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Home, Receipt, Package, Users, Settings } from 'lucide-react';
import { pathnameToScreen } from '@/app/routes/routeConstants';

interface BottomNavProps {
  /** activeScreen and onNavigate are kept for backward compat with existing pages */
  activeScreen?: string;
  onNavigate?: (screen: string) => void;
}

const navItems = [
  { id: 'dashboard', icon: Home,     label: 'Home'      },
  { id: 'inventory', icon: Package,  label: 'Inventory' },
  { id: 'billing',   icon: Receipt,  label: 'Bill'      },
  { id: 'khata',     icon: Users,    label: 'Khata'     },
  { id: 'settings',  icon: Settings, label: 'Settings'  },
];

export default function BottomNav({ activeScreen: propScreen, onNavigate }: BottomNavProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // Prefer URL-derived active screen; fall back to prop
  const activeScreen = pathnameToScreen(location.pathname) ?? propScreen ?? 'dashboard';

  const handleNav = (screen: string) => {
    navigate(`/app/${screen}`);
    onNavigate?.(screen);
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40"
      style={{
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderTop: '0.5px solid rgba(208,208,208,0.8)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <div className="max-w-7xl mx-auto flex items-stretch justify-around px-2 sm:px-4">
        {navItems.map((item) => {
          const isActive = activeScreen === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => handleNav(item.id)}
              whileTap={{ scale: 0.87 }}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                padding: '10px 4px 10px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Active pill background */}
              {isActive && (
                <motion.div
                  layoutId="navActivePill"
                  style={{
                    position: 'absolute',
                    inset: '4px 8%',
                    borderRadius: 14,
                    background: 'rgba(34,57,96,0.08)',
                  }}
                  transition={{ type: 'spring', stiffness: 440, damping: 36 }}
                />
              )}

              {/* Icon */}
              <motion.div
                animate={isActive ? { scale: 1, y: -1 } : { scale: 0.92, y: 0 }}
                transition={{ type: 'spring', stiffness: 440, damping: 28 }}
                style={{ position: 'relative', zIndex: 1 }}
              >
                <item.icon
                  style={{
                    width: 22,
                    height: 22,
                    color: isActive ? '#21385D' : '#8A8080',
                    strokeWidth: isActive ? 2.2 : 1.6,
                    transition: 'color 0.22s',
                  }}
                />
              </motion.div>

              {/* Label */}
              <motion.span
                animate={isActive
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0.55, y: 1 }
                }
                transition={{ duration: 0.2 }}
                style={{
                  fontSize: 9,
                  color: isActive ? '#21385D' : '#8A8080',
                  fontFamily: "'Lato', sans-serif",
                  fontWeight: isActive ? 700 : 400,
                  letterSpacing: 0.2,
                  position: 'relative',
                  zIndex: 1,
                  lineHeight: '12px',
                }}
              >
                {item.label}
              </motion.span>

              {/* Active dot */}
              {isActive && (
                <motion.div
                  layoutId="navActiveDot"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{
                    position: 'absolute',
                    bottom: 4,
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    background: '#21385D',
                  }}
                  transition={{ type: 'spring', stiffness: 520, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
