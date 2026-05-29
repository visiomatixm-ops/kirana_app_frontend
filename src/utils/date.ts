import { format, formatDistanceToNow, isToday, isYesterday, parseISO } from 'date-fns';
import { DATE_FORMATS } from '@/constants';

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, DATE_FORMATS.DISPLAY);
}

export function formatDateWithTime(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, DATE_FORMATS.DISPLAY_WITH_TIME);
}

export function formatRelativeDate(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  if (isToday(d)) return 'Today';
  if (isYesterday(d)) return 'Yesterday';
  return formatDistanceToNow(d, { addSuffix: true });
}

export function formatTime(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, DATE_FORMATS.TIME);
}

export function toApiDate(date: Date): string {
  return format(date, DATE_FORMATS.API);
}

export function getCurrentDate(): string {
  return toApiDate(new Date());
}
