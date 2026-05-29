// ─── Login Form ───────────────────────────────────────────────────────────────
export interface LoginFormValues {
  phone: string;
}

export interface OtpFormValues {
  otp: string;
}

export type LoginStep = 'phone' | 'otp';

// ─── Shop Setup Form ──────────────────────────────────────────────────────────
export interface ShopSetupFormValues {
  businessName: string;
  ownerName: string;
  phone: string;
  address: string;
  gstin?: string;
  category: ShopCategory;
}

export type ShopCategory =
  | 'grocery'
  | 'medical'
  | 'electronics'
  | 'clothing'
  | 'restaurant'
  | 'other';

// ─── Onboarding ───────────────────────────────────────────────────────────────
export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  illustration?: string;
}
