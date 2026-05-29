/**
 * UploadOptionItem
 * ─────────────────────────────────────────────────────────────────────────────
 * A single tappable row inside an upload action sheet.
 * Renders an icon + label, separated by a horizontal rule below.
 */
import type { ReactNode } from 'react';

interface UploadOptionItemProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  /** If true, draws a separator line below this item */
  divider?: boolean;
}

export default function UploadOptionItem({
  icon,
  label,
  onClick,
  divider = true,
}: UploadOptionItemProps) {
  return (
    <>
      <button
        onClick={onClick}
        className="w-full flex items-center gap-5 px-6 py-[13px] hover:bg-gray-50 active:bg-gray-100 transition-colors text-left"
      >
        {/* Icon container */}
        <span className="w-6 h-[21px] flex-shrink-0 flex items-center justify-center text-[#1C3458]">
          {icon}
        </span>
        {/* Label */}
        <span
          className="text-[14px] leading-[120.82%] text-[#1C3458]"
          style={{ fontFamily: "'Lato', sans-serif", fontWeight: 400 }}
        >
          {label}
        </span>
      </button>
      {divider && <div className="border-t border-[#CAC7C7] mx-0" />}
    </>
  );
}
