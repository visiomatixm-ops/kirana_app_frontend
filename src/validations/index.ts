export function isValidPhone(phone: string): boolean {
  return /^[6-9]\d{9}$/.test(phone.replace(/\s/g, ''));
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidOtp(otp: string): boolean {
  return /^\d{6}$/.test(otp);
}

export function isValidGstin(gstin: string): boolean {
  return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gstin);
}

export function isPositiveNumber(value: number): boolean {
  return typeof value === 'number' && value > 0;
}

export function isNonNegativeNumber(value: number): boolean {
  return typeof value === 'number' && value >= 0;
}
