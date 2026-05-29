import { env } from '@/app/config/env';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const MIN_LEVEL: LogLevel = env.isProd ? 'warn' : 'debug';

function shouldLog(level: LogLevel): boolean {
  return LEVELS[level] >= LEVELS[MIN_LEVEL];
}

function formatMessage(level: LogLevel, message: string): string {
  const ts = new Date().toISOString();
  return `[${ts}] [${level.toUpperCase()}] ${message}`;
}

export const logger = {
  debug: (message: string, ...args: unknown[]) => {
    if (shouldLog('debug')) console.debug(formatMessage('debug', message), ...args);
  },
  info: (message: string, ...args: unknown[]) => {
    if (shouldLog('info')) console.info(formatMessage('info', message), ...args);
  },
  warn: (message: string, ...args: unknown[]) => {
    if (shouldLog('warn')) console.warn(formatMessage('warn', message), ...args);
  },
  error: (message: string, ...args: unknown[]) => {
    if (shouldLog('error')) console.error(formatMessage('error', message), ...args);
  },
};
