import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * cn - merge Tailwind class names safely.
 * Combines clsx + tailwind-merge for conflict resolution.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * noop - a no-operation function placeholder.
 */
export const noop = () => {};

/**
 * isDefined - type guard for non-null/undefined values.
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * assertNever - exhaustive switch helper for TypeScript.
 */
export function assertNever(value: never): never {
  throw new Error(`Unhandled value: ${JSON.stringify(value)}`);
}
