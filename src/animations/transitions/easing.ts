/** Premium easing curves — GPU-friendly, enterprise feel */

export const ease = {
  /** Standard SaaS smooth ease */
  smooth: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],

  /** Stripe-style entrance */
  out: [0.0, 0.0, 0.2, 1.0] as [number, number, number, number],

  /** Snappy exit */
  in: [0.4, 0.0, 1.0, 1.0] as [number, number, number, number],

  /** Notion-style soft in-out */
  inOut: [0.4, 0.0, 0.2, 1.0] as [number, number, number, number],

  /** Vercel-style dramatic entrance */
  expo: [0.16, 1, 0.3, 1] as [number, number, number, number],

  /** Framer-style organic */
  organic: [0.22, 1, 0.36, 1] as [number, number, number, number],
} as const;

/** CSS variable strings for use in style props */
export const easeCss = {
  smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  out: "cubic-bezier(0.0, 0.0, 0.2, 1.0)",
  expo: "cubic-bezier(0.16, 1, 0.3, 1)",
  organic: "cubic-bezier(0.22, 1, 0.36, 1)",
} as const;
