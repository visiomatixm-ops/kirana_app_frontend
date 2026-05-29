/**
 * KiranaPageLoader.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Branded skeleton loader for Kirana Enterprise.
 *
 * Displayed via Suspense fallback while lazy-loaded pages are being fetched.
 * Each variant matches the real page's layout skeleton so there is ZERO
 * visual jump between the loader and the page — the chrome (header height,
 * card shapes, bottom nav) stays identical.
 *
 * Variants:
 *   dashboard  | billing  | inventory | khata | reports | settings | default
 *
 * Usage:
 *   <Suspense fallback={<KiranaPageLoader variant="inventory" />}>
 *     <InventoryScreen … />
 *   </Suspense>
 *
 * Design system colours:
 *   Primary   #1D3458  (navy)
 *   Orange    #FF6900
 *   Sky       #1FABEA
 *   Border    #DBDBDB
 *   Skeleton  #F0F0F0 → #E4E4E4  (shimmer)
 */

import { useEffect, useState } from 'react';

/* ─── Shimmer keyframe injected once ──────────────────────────────────────── */
const SHIMMER_CSS = `
@keyframes kirana-shimmer {
  0%   { background-position: -400px 0; }
  100% { background-position:  400px 0; }
}
.k-shimmer {
  background: linear-gradient(90deg, #F0F0F0 25%, #E8E8E8 37%, #F0F0F0 63%);
  background-size: 800px 100%;
  animation: kirana-shimmer 1.4s ease-in-out infinite;
  border-radius: 8px;
}
.k-shimmer-orange {
  background: linear-gradient(90deg, #FF6900 25%, #FF8533 37%, #FF6900 63%);
  background-size: 800px 100%;
  animation: kirana-shimmer 1.6s ease-in-out infinite;
  border-radius: 8px;
}
.k-shimmer-dark {
  background: linear-gradient(90deg, #1D3458 25%, #223f6a 37%, #1D3458 63%);
  background-size: 800px 100%;
  animation: kirana-shimmer 1.6s ease-in-out infinite;
  border-radius: 8px;
}
`;

function injectShimmer() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('kirana-shimmer-css')) return;
  const style = document.createElement('style');
  style.id = 'kirana-shimmer-css';
  style.textContent = SHIMMER_CSS;
  document.head.appendChild(style);
}

/* ─── Reusable atoms ──────────────────────────────────────────────────────── */

/** A single shimmer block */
function Bone({
  w = '100%',
  h = 16,
  r = 8,
  cls = 'k-shimmer',
  style,
}: {
  w?: string | number;
  h?: number;
  r?: number;
  cls?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={cls}
      style={{ width: w, height: h, borderRadius: r, flexShrink: 0, ...style }}
    />
  );
}

/** Round avatar bone */
function AvatarBone({ size = 40 }: { size?: number }) {
  return <Bone w={size} h={size} r={size} />;
}

/** A card shell */
function CardShell({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #DBDBDB',
        borderRadius: 20,
        padding: '16px',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Bottom Nav skeleton (always present) ─────────────────────────────────── */
function BottomNavSkeleton({ active }: { active: string }) {
  const tabs = [
    { id: 'dashboard', label: 'Home'      },
    { id: 'inventory', label: 'Inventory' },
    { id: 'billing',   label: 'Bill'      },
    { id: 'khata',     label: 'Khata'     },
    { id: 'settings',  label: 'Settings'  },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 64,
        background: '#fff',
        borderTop: '1px solid #DBDBDB',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: 40,
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        return (
          <div
            key={tab.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              flex: 1,
            }}
          >
            {/* icon placeholder */}
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: isActive ? 8 : 12,
                background: isActive ? '#1D3458' : '#E4E4E4',
                transition: 'background 0.2s',
              }}
            />
            {/* label */}
            <div
              style={{
                width: isActive ? 48 : 32,
                height: 8,
                borderRadius: 4,
                background: isActive ? '#1D3458' : '#E4E4E4',
              }}
            />
            {/* active dot */}
            {isActive && (
              <div
                style={{
                  position: 'absolute',
                  bottom: 6,
                  width: 4,
                  height: 4,
                  borderRadius: 2,
                  background: '#1D3458',
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Skeleton Variants ────────────────────────────────────────────────────── */

function DashboardSkeleton() {
  return (
    <div style={{ height: '100dvh', overflow: 'hidden', background: '#F8FAFC', display: 'flex', flexDirection: 'column' }}>
      {/* Header gradient */}
      <div
        className="k-shimmer-dark"
        style={{ borderRadius: '0 0 28px 28px', padding: '48px 24px 32px', flexShrink: 0 }}
      >
        <Bone w={120} h={14} cls="k-shimmer-dark" style={{ opacity: 0.4, marginBottom: 6 }} />
        <Bone w={180} h={22} cls="k-shimmer-dark" style={{ opacity: 0.4, marginBottom: 20 }} />
        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {[0, 1].map((i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 16, padding: 14 }}>
              <Bone w={60} h={10} cls="k-shimmer-dark" style={{ opacity: 0.3, marginBottom: 8 }} />
              <Bone w={90} h={18} cls="k-shimmer-dark" style={{ opacity: 0.3 }} />
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, padding: '16px 20px', paddingBottom: 80, overflowY: 'auto' }}>
        <Bone w={100} h={13} style={{ marginBottom: 12 }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
          {[0, 1, 2, 3].map((i) => (
            <CardShell key={i}>
              <AvatarBone size={36} />
              <Bone w="70%" h={12} style={{ marginTop: 10, marginBottom: 6 }} />
              <Bone w="50%" h={18} style={{ marginBottom: 4 }} />
              <Bone w="40%" h={10} />
            </CardShell>
          ))}
        </div>
        <Bone w={120} h={13} style={{ marginBottom: 12 }} />
        {[0, 1, 2].map((i) => (
          <CardShell key={i} style={{ marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
            <AvatarBone size={40} />
            <div style={{ flex: 1 }}>
              <Bone w="60%" h={13} style={{ marginBottom: 6 }} />
              <Bone w="40%" h={10} />
            </div>
            <Bone w={60} h={13} />
          </CardShell>
        ))}
      </div>
      <BottomNavSkeleton active="dashboard" />
    </div>
  );
}

function InventorySkeleton() {
  return (
    <div style={{ height: '100dvh', overflow: 'hidden', background: '#fff', display: 'flex', flexDirection: 'column' }}>
      {/* Sticky header */}
      <div style={{ flexShrink: 0, background: '#fff', borderBottom: '1px solid #DBDBDB', padding: '20px 24px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div>
            <Bone w={110} h={26} style={{ marginBottom: 6 }} />
            <Bone w={80} h={12} />
          </div>
          <Bone w={80} h={34} r={10} />
        </div>
        {/* Search bar */}
        <Bone w="100%" h={40} r={12} style={{ marginBottom: 10 }} />
        {/* Summary cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ background: '#F8FAFC', borderRadius: 12, padding: '10px 12px' }}>
              <Bone w="70%" h={10} style={{ marginBottom: 6 }} />
              <Bone w="50%" h={16} />
            </div>
          ))}
        </div>
      </div>

      {/* Product list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', paddingBottom: 80 }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <CardShell
            key={i}
            style={{
              marginBottom: 14,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              borderLeft: `4px solid ${i === 0 ? '#FF6900' : i === 1 ? '#10B981' : '#DBDBDB'}`,
              borderRadius: '0 16px 16px 0',
            }}
          >
            <div style={{ flex: 1 }}>
              <Bone w="65%" h={14} style={{ marginBottom: 7 }} />
              <Bone w="45%" h={11} style={{ marginBottom: 7 }} />
              <Bone w="55%" h={11} />
            </div>
            <div style={{ textAlign: 'right' }}>
              <Bone w={50} h={14} style={{ marginBottom: 6 }} />
              <Bone w={40} h={22} r={6} />
            </div>
          </CardShell>
        ))}
      </div>
      <BottomNavSkeleton active="inventory" />
    </div>
  );
}

function BillingSkeleton() {
  return (
    <div style={{ height: '100dvh', overflow: 'hidden', background: '#F8FAFC', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ flexShrink: 0, background: '#fff', borderBottom: '1px solid #DBDBDB', padding: '20px 20px 14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <Bone w={80} h={26} />
          <div style={{ display: 'flex', gap: 8 }}>
            <Bone w={34} h={34} r={10} />
            <Bone w={34} h={34} r={10} />
          </div>
        </div>
        {/* Customer / product selects */}
        <Bone w="100%" h={44} r={12} style={{ marginBottom: 10 }} />
        <Bone w="100%" h={44} r={12} />
      </div>

      {/* Cart area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', paddingBottom: 140 }}>
        <Bone w={80} h={13} style={{ marginBottom: 12 }} />
        {[0, 1, 2].map((i) => (
          <CardShell key={i} style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <Bone w="60%" h={14} style={{ marginBottom: 6 }} />
              <Bone w="40%" h={11} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Bone w={28} h={28} r={8} />
              <Bone w={24} h={14} />
              <Bone w={28} h={28} r={8} />
            </div>
            <Bone w={55} h={14} />
          </CardShell>
        ))}
      </div>

      {/* Bottom total + button */}
      <div style={{ position: 'fixed', bottom: 64, left: 0, right: 0, background: '#fff', borderTop: '1px solid #DBDBDB', padding: '12px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <Bone w={60} h={13} />
          <Bone w={80} h={18} />
        </div>
        <Bone w="100%" h={48} r={14} cls="k-shimmer-dark" />
      </div>
      <BottomNavSkeleton active="billing" />
    </div>
  );
}

function KhataSkeleton() {
  return (
    <div style={{ height: '100dvh', overflow: 'hidden', background: '#fff', display: 'flex', flexDirection: 'column' }}>
      {/* Orange gradient header */}
      <div
        className="k-shimmer-orange"
        style={{ flexShrink: 0, borderRadius: '0 0 40px 40px', padding: '48px 24px 24px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <Bone w={160} h={22} cls="k-shimmer-orange" style={{ opacity: 0.5, marginBottom: 6 }} />
            <Bone w={90} h={12} cls="k-shimmer-orange" style={{ opacity: 0.4 }} />
          </div>
          <Bone w={40} h={40} r={12} cls="k-shimmer-orange" style={{ opacity: 0.5 }} />
        </div>
        {/* Outstanding card */}
        <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 20, padding: 18 }}>
          <Bone w={130} h={11} cls="k-shimmer-orange" style={{ opacity: 0.4, marginBottom: 8 }} />
          <Bone w={150} h={24} cls="k-shimmer-orange" style={{ opacity: 0.4 }} />
        </div>
      </div>

      {/* Customer list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', paddingBottom: 80 }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <CardShell key={i} style={{ marginBottom: 14, display: 'flex', alignItems: 'center', gap: 14 }}>
            <AvatarBone size={48} />
            <div style={{ flex: 1 }}>
              <Bone w="55%" h={16} style={{ marginBottom: 6 }} />
              <Bone w="45%" h={11} style={{ marginBottom: 5 }} />
              <Bone w="50%" h={11} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Bone w={56} h={14} />
              <Bone w={18} h={18} r={9} />
            </div>
          </CardShell>
        ))}
      </div>
      <BottomNavSkeleton active="khata" />
    </div>
  );
}

function ReportsSkeleton() {
  return (
    <div style={{ height: '100dvh', overflow: 'hidden', background: '#F8FAFC', display: 'flex', flexDirection: 'column' }}>
      {/* Header + period tabs */}
      <div style={{ flexShrink: 0, background: '#fff', borderBottom: '1px solid #DBDBDB', padding: '20px 20px 14px' }}>
        <Bone w={200} h={20} style={{ marginBottom: 14 }} />
        <div style={{ display: 'flex', gap: 8 }}>
          {[0, 1, 2, 3].map((i) => (
            <Bone key={i} w={70} h={32} r={10} cls={i === 0 ? 'k-shimmer-dark' : 'k-shimmer'} />
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', paddingBottom: 80 }}>
        {/* Stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
          {[0, 1, 2, 3].map((i) => (
            <CardShell key={i}>
              <Bone w={32} h={32} r={10} style={{ marginBottom: 10 }} />
              <Bone w="60%" h={11} style={{ marginBottom: 6 }} />
              <Bone w="75%" h={20} style={{ marginBottom: 4 }} />
              <Bone w="40%" h={10} />
            </CardShell>
          ))}
        </div>
        {/* Chart placeholder */}
        <CardShell style={{ marginBottom: 16 }}>
          <Bone w="50%" h={13} style={{ marginBottom: 14 }} />
          <Bone w="100%" h={140} r={12} />
        </CardShell>
        {/* Table rows */}
        {[0, 1, 2].map((i) => (
          <CardShell key={i} style={{ marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Bone w="45%" h={13} />
            <Bone w="25%" h={13} />
            <Bone w="15%" h={13} />
          </CardShell>
        ))}
      </div>
      <BottomNavSkeleton active="reports" />
    </div>
  );
}

function SettingsSkeleton() {
  return (
    <div style={{ height: '100dvh', overflow: 'hidden', background: '#fff', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ flexShrink: 0, background: '#fff', borderBottom: '1px solid #DBDBDB', padding: '20px 24px 16px' }}>
        <Bone w={120} h={26} />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', paddingBottom: 80 }}>
        {/* Profile card */}
        <CardShell style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
          <AvatarBone size={56} />
          <div style={{ flex: 1 }}>
            <Bone w="55%" h={16} style={{ marginBottom: 7 }} />
            <Bone w="40%" h={12} />
          </div>
        </CardShell>

        {/* Settings sections */}
        {['Shop', 'Finance', 'Preferences', 'Help'].map((section) => (
          <div key={section} style={{ marginBottom: 20 }}>
            <Bone w={80} h={12} style={{ marginBottom: 10 }} />
            <div style={{ background: '#fff', border: '1px solid #DBDBDB', borderRadius: 16, overflow: 'hidden' }}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '14px 16px',
                    borderBottom: i < 2 ? '1px solid #F0F0F0' : 'none',
                  }}
                >
                  <Bone w={32} h={32} r={8} />
                  <Bone w="50%" h={13} />
                  <div style={{ marginLeft: 'auto' }}>
                    <Bone w={18} h={18} r={9} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <BottomNavSkeleton active="settings" />
    </div>
  );
}

function DefaultSkeleton() {
  return (
    <div style={{ height: '100dvh', overflow: 'hidden', background: '#F8FAFC', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ flexShrink: 0, background: '#fff', borderBottom: '1px solid #DBDBDB', padding: '20px 24px 16px' }}>
        <Bone w={150} h={24} style={{ marginBottom: 8 }} />
        <Bone w={100} h={12} />
      </div>
      {/* Body */}
      <div style={{ flex: 1, padding: '16px 20px', paddingBottom: 80 }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <CardShell key={i} style={{ marginBottom: 14, display: 'flex', alignItems: 'center', gap: 14 }}>
            <AvatarBone size={40} />
            <div style={{ flex: 1 }}>
              <Bone w="60%" h={14} style={{ marginBottom: 6 }} />
              <Bone w="40%" h={11} />
            </div>
          </CardShell>
        ))}
      </div>
      <BottomNavSkeleton active="" />
    </div>
  );
}

/* ─── Public Component ─────────────────────────────────────────────────────── */

export type LoaderVariant =
  | 'dashboard'
  | 'billing'
  | 'inventory'
  | 'khata'
  | 'reports'
  | 'settings'
  | 'default';

interface KiranaPageLoaderProps {
  variant?: LoaderVariant;
  /**
   * Minimum ms to show the loader (prevents flash for fast loads).
   * Defaults to 0 (show/hide immediately).
   */
  minDuration?: number;
}

const VARIANT_MAP: Record<LoaderVariant, () => JSX.Element> = {
  dashboard: DashboardSkeleton,
  billing:   BillingSkeleton,
  inventory: InventorySkeleton,
  khata:     KhataSkeleton,
  reports:   ReportsSkeleton,
  settings:  SettingsSkeleton,
  default:   DefaultSkeleton,
};

export default function KiranaPageLoader({
  variant = 'default',
  minDuration = 0,
}: KiranaPageLoaderProps) {
  injectShimmer();

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (minDuration <= 0) return;
    const timer = setTimeout(() => setVisible(false), minDuration);
    return () => clearTimeout(timer);
  }, [minDuration]);

  if (!visible) return null;

  const Skeleton = VARIANT_MAP[variant] ?? DefaultSkeleton;
  return <Skeleton />;
}
