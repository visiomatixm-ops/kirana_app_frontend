import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, Plus, Minus, Check, Package, Barcode } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  price: number;
  mrp: number;
  unit?: string;
  stock?: number;
  category?: string;
}

interface CartQty {
  [productId: string]: number;
}

interface ProductPickerProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  cartQuantities: CartQty;
  onAddItem: (product: Product) => void;
  onRemoveItem: (productId: string) => void;
  onConfirm: () => void;
}

const CATEGORIES = ['All', 'Staples', 'Snacks', 'Oils', 'Dairy', 'Instant Food'];

export default function ProductPicker({
  isOpen,
  onClose,
  products,
  cartQuantities,
  onAddItem,
  onRemoveItem,
  onConfirm,
}: ProductPickerProps) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) setTimeout(() => searchRef.current?.focus(), 200);
    else setQuery('');
  }, [isOpen]);

  const filtered = products.filter((p) => {
    const matchQuery =
      !query ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      (p.category ?? '').toLowerCase().includes(query.toLowerCase());
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    return matchQuery && matchCat;
  });

  const totalSelected = Object.values(cartQuantities).reduce((s, q) => s + q, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="picker-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(17,24,39,0.52)',
              backdropFilter: 'blur(3px)',
              WebkitBackdropFilter: 'blur(3px)',
              zIndex: 55,
            }}
          />

          {/* Panel */}
          <motion.div
            key="picker-panel"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            style={{
              position: 'fixed', bottom: 0, left: 0, right: 0,
              height: '88vh',
              background: '#FFFFFF',
              borderRadius: '24px 24px 0 0',
              zIndex: 56,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              fontFamily: "'Lato', sans-serif",
              boxShadow: '0 -8px 40px rgba(0,0,0,0.12)',
            }}
          >
            {/* ── Header ── */}
            <div
              style={{
                padding: '12px 20px 0',
                borderBottom: '1px solid #F3F4F6',
                flexShrink: 0,
              }}
            >
              {/* Drag handle */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
                <div
                  style={{
                    width: 36, height: 4,
                    borderRadius: 2, background: '#E5E7EB',
                  }}
                />
              </div>

              {/* Title row */}
              <div
                style={{
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', marginBottom: 14,
                }}
              >
                <div>
                  <h3
                    style={{
                      fontWeight: 700, fontSize: 18,
                      color: '#223960', margin: 0,
                    }}
                  >
                    Add Products
                  </h3>
                  <p style={{ fontSize: 12, color: '#8A8080', margin: '2px 0 0' }}>
                    {products.length} items available
                  </p>
                </div>
                <button
                  onClick={onClose}
                  style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: '#F3F4F6', border: 'none',
                    cursor: 'pointer', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <X size={16} color="#6B7280" />
                </button>
              </div>

              {/* Search bar */}
              <div
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  background: '#F9FAFB',
                  border: '1.5px solid #E5E7EB',
                  borderRadius: 12, padding: '10px 14px',
                  marginBottom: 12,
                  transition: 'border-color 0.2s',
                }}
                onFocusCapture={(e) =>
                  (e.currentTarget.style.borderColor = '#0EA5E9')
                }
                onBlurCapture={(e) =>
                  (e.currentTarget.style.borderColor = '#E5E7EB')
                }
              >
                <Search size={16} color="#9CA3AF" style={{ flexShrink: 0 }} />
                <input
                  ref={searchRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products, categories..."
                  style={{
                    flex: 1, background: 'none', border: 'none',
                    outline: 'none', fontSize: 14,
                    color: '#111827', fontFamily: "'Lato', sans-serif",
                  }}
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    <X size={14} color="#9CA3AF" />
                  </button>
                )}
              </div>

              {/* Category pills */}
              <div
                style={{
                  display: 'flex', gap: 8,
                  overflowX: 'auto', paddingBottom: 12,
                  scrollbarWidth: 'none',
                }}
              >
                {CATEGORIES.map((cat) => (
                  <motion.button
                    key={cat}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      flexShrink: 0,
                      padding: '6px 14px',
                      borderRadius: 999,
                      border: `1.5px solid ${activeCategory === cat ? '#223960' : '#E5E7EB'}`,
                      background: activeCategory === cat ? '#223960' : '#FFFFFF',
                      color: activeCategory === cat ? '#FFFFFF' : '#6B7280',
                      fontSize: 12.5,
                      fontWeight: activeCategory === cat ? 700 : 400,
                      cursor: 'pointer',
                      fontFamily: "'Lato', sans-serif",
                      transition: 'all 0.18s',
                    }}
                  >
                    {cat}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* ── Product List ── */}
            <div
              style={{
                flex: 1, overflowY: 'auto',
                padding: '8px 20px 16px',
                scrollbarWidth: 'thin',
              }}
            >
              {filtered.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    paddingTop: '3rem', gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 56, height: 56, borderRadius: 16,
                      background: '#F3F4F6',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <Package size={26} color="#9CA3AF" />
                  </div>
                  <p style={{ fontSize: 14, color: '#9CA3AF', fontWeight: 600 }}>
                    No products found
                  </p>
                  <p style={{ fontSize: 12, color: '#D1D5DB' }}>
                    Try a different search or category
                  </p>
                </motion.div>
              ) : (
                <AnimatePresence>
                  {filtered.map((product, index) => {
                    const qty = cartQuantities[product.id] ?? 0;
                    const inCart = qty > 0;
                    const isLowStock = (product.stock ?? 99) < 5;

                    return (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{
                          type: 'spring', stiffness: 300, damping: 26,
                          delay: Math.min(index * 0.03, 0.25),
                        }}
                        style={{
                          display: 'flex', alignItems: 'center',
                          gap: 14,
                          padding: '12px 0',
                          borderBottom: '1px solid #F9FAFB',
                        }}
                      >
                        {/* Product icon */}
                        <motion.div
                          animate={inCart ? { scale: [1, 1.12, 1] } : {}}
                          transition={{ duration: 0.3 }}
                          style={{
                            width: 44, height: 44, borderRadius: 12,
                            background: inCart ? '#EFF6FF' : '#F3F4F6',
                            display: 'flex', alignItems: 'center',
                            justifyContent: 'center', flexShrink: 0,
                            border: inCart ? '1.5px solid #BFDBFE' : '1.5px solid transparent',
                            transition: 'all 0.2s',
                          }}
                        >
                          {inCart ? (
                            <Check size={20} color="#3B82F6" strokeWidth={2.5} />
                          ) : (
                            <Barcode size={20} color="#9CA3AF" />
                          )}
                        </motion.div>

                        {/* Product info */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p
                            style={{
                              fontWeight: 600, fontSize: 14,
                              color: '#111827', margin: 0,
                              whiteSpace: 'nowrap', overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {product.name}
                          </p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
                            <span style={{ fontSize: 13, fontWeight: 700, color: '#223960' }}>
                              ₹{product.price}
                            </span>
                            {product.mrp > product.price && (
                              <span
                                style={{
                                  fontSize: 11, color: '#9CA3AF',
                                  textDecoration: 'line-through',
                                }}
                              >
                                ₹{product.mrp}
                              </span>
                            )}
                            {product.unit && (
                              <span
                                style={{
                                  fontSize: 10, color: '#9CA3AF',
                                  background: '#F3F4F6', borderRadius: 4,
                                  padding: '1px 6px',
                                }}
                              >
                                {product.unit}
                              </span>
                            )}
                            {isLowStock && (
                              <span
                                style={{
                                  fontSize: 10, color: '#F59E0B',
                                  background: '#FFFBEB', borderRadius: 4,
                                  padding: '1px 6px', fontWeight: 600,
                                }}
                              >
                                Low stock
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Quantity controls */}
                        <div style={{ flexShrink: 0 }}>
                          {qty === 0 ? (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.93 }}
                              onClick={() => onAddItem(product)}
                              style={{
                                width: 36, height: 36, borderRadius: 10,
                                background: '#223960', border: 'none',
                                display: 'flex', alignItems: 'center',
                                justifyContent: 'center', cursor: 'pointer',
                                boxShadow: '0 2px 8px rgba(34,57,96,0.25)',
                              }}
                            >
                              <Plus size={18} color="#FFFFFF" strokeWidth={2.5} />
                            </motion.button>
                          ) : (
                            <motion.div
                              initial={{ scale: 0.85, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              style={{
                                display: 'flex', alignItems: 'center', gap: 6,
                                background: '#F0F4FF',
                                border: '1.5px solid #C7D7FB',
                                borderRadius: 10, padding: '4px 6px',
                              }}
                            >
                              <motion.button
                                whileTap={{ scale: 0.88 }}
                                onClick={() => onRemoveItem(product.id)}
                                style={{
                                  width: 26, height: 26, borderRadius: 7,
                                  background: qty === 1 ? '#FEE2E2' : '#E0E7FF',
                                  border: 'none', cursor: 'pointer',
                                  display: 'flex', alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <Minus
                                  size={13}
                                  color={qty === 1 ? '#EF4444' : '#3B82F6'}
                                  strokeWidth={2.5}
                                />
                              </motion.button>

                              <motion.span
                                key={qty}
                                initial={{ scale: 1.3, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                                style={{
                                  fontWeight: 700, fontSize: 14,
                                  color: '#223960', minWidth: 20,
                                  textAlign: 'center',
                                }}
                              >
                                {qty}
                              </motion.span>

                              <motion.button
                                whileTap={{ scale: 0.88 }}
                                onClick={() => onAddItem(product)}
                                style={{
                                  width: 26, height: 26, borderRadius: 7,
                                  background: '#223960', border: 'none',
                                  cursor: 'pointer',
                                  display: 'flex', alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <Plus size={13} color="#FFFFFF" strokeWidth={2.5} />
                              </motion.button>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              )}
            </div>

            {/* ── Confirm Button ── */}
            <AnimatePresence>
              {totalSelected > 0 && (
                <motion.div
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 80, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  style={{
                    padding: '14px 20px 24px',
                    borderTop: '1px solid #F3F4F6',
                    background: '#fff',
                    flexShrink: 0,
                  }}
                >
                  <motion.button
                    whileHover={{ y: -1.5, boxShadow: '0 8px 24px rgba(34,57,96,0.22)' }}
                    whileTap={{ scale: 0.98, y: 0 }}
                    onClick={onConfirm}
                    style={{
                      width: '100%', height: 52, borderRadius: 14,
                      background: 'linear-gradient(97deg, #223960 0%, #0EA5E9 100%)',
                      border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'center', gap: 10,
                      fontFamily: "'Lato', sans-serif",
                    }}
                  >
                    <motion.span
                      key={totalSelected}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      style={{
                        background: 'rgba(255,255,255,0.2)',
                        borderRadius: 999, padding: '2px 10px',
                        fontSize: 13, fontWeight: 700, color: '#fff',
                      }}
                    >
                      {totalSelected}
                    </motion.span>
                    <span style={{ fontWeight: 700, fontSize: 15, color: '#FFFFFF' }}>
                      Add to Bill
                    </span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
