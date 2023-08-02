import LogLevel from './log_level';

function log(...args: unknown[]) {
  console.log(...args);
}

// logging functions for the masses
export function info(...args: unknown[]): void {
  log('[INFO]:', ...args);
}

export function debug(...args: unknown[]): void {
  if (globalThis.log_level >= LogLevel.DEBUG) {
    log('[DEBUG]:', ...args);
  }
}

export function trace(...args: unknown[]): void {
  if (globalThis.log_level >= LogLevel.TRACE) {
    log('[TRACE]:', ...args);
  }
}
