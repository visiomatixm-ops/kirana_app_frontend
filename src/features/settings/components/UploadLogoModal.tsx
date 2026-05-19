/**
 * UploadLogoModal
 * ─────────────────────────────────────────────────────────────────────────────
 * Bottom-sheet action sheet for uploading a shop logo.
 * Identical structure to UploadSignatureModal — only the title differs.
 * Converted from Figma CSS (393×171) to responsive Flexbox TSX.
 */
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import UploadOptionItem from './UploadOptionItem';

// ── Camera SVG icon ────────────────────────────────────────────────────────
function CameraIcon() {
  return (
    <svg width="26" height="21" viewBox="0 0 26 21" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M25 17.5C25 17.898 24.842 18.279 24.5607 18.5607C24.2794 18.8420 23.898 19 23.5 19H2.5C2.10218 19 1.72064 18.8420 1.43934 18.5607C1.15804 18.2794 1 17.898 1 17.5V7C1 6.60218 1.15804 6.22064 1.43934 5.93934C1.72064 5.65804 2.10218 5.5 2.5 5.5H6.5L8.5 2.5H17.5L19.5 5.5H23.5C23.898 5.5 24.279 5.65804 24.5607 5.93934C24.842 6.22064 25 6.60218 25 7V17.5Z"
        stroke="#1C3458" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      />
      <circle cx="13" cy="12" r="4" stroke="#1C3458" strokeWidth="1.5" />
    </svg>
  );
}

// ── Gallery SVG icon ───────────────────────────────────────────────────────
function GalleryIcon() {
  return (
    <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="1" y="1" width="20" height="19" rx="2" stroke="#1C3458" strokeWidth="1.5" />
      <circle cx="6.5" cy="6.5" r="2" stroke="#1C3458" strokeWidth="1.5" />
      <path d="M1 14L7 8L11 12L15 8L21 14" stroke="#1C3458" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface UploadLogoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCamera?: () => void;
  onGallery?: () => void;
}

export default function UploadLogoModal({
  isOpen,
  onClose,
  onCamera,
  onGallery,
}: UploadLogoModalProps) {
  const handleCamera = () => {
    onCamera?.();
    onClose();
  };

  const handleGallery = () => {
    onGallery?.();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            key="logo-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] bg-black/50"
            style={{ backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)' }}
            onClick={onClose}
          />

          {/* ── Bottom Sheet ── */}
          <motion.div
            key="logo-sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
            className="fixed bottom-0 left-0 right-0 z-[71] bg-white overflow-hidden"
            style={{
              borderRadius: '20px 20px 0 0',
              paddingBottom: 'env(safe-area-inset-bottom, 0px)',
              maxWidth: 480,
              margin: '0 auto',
            }}
          >
            {/* ── Title row ── */}
            <div className="relative flex items-center justify-center px-6 pt-[18px] pb-[18px]">
              <h3
                className="text-[20px] leading-[120.82%] text-center text-[#1C3458]"
                style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700 }}
              >
                Upload Your Logo
              </h3>
              <button
                onClick={onClose}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-[#1C3458]" strokeWidth={2.5} />
              </button>
            </div>

            {/* ── Separator ── */}
            <div className="border-t border-[#CAC7C7]" />

            {/* ── Options ── */}
            <UploadOptionItem
              icon={<CameraIcon />}
              label="Camera"
              onClick={handleCamera}
              divider
            />
            <UploadOptionItem
              icon={<GalleryIcon />}
              label="Gallery"
              onClick={handleGallery}
              divider={false}
            />

            {/* ── Bottom border line ── */}
            <div className="border-t border-[#CAC7C7]" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
