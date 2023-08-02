import { LogLevel } from './log_level';

// logging functions for the masses
export function info(...args: any[]): void {
    log("[INFO]:", ...args);
}

export function debug(...args: any[]): void {
    if (globalThis.log_level >= LogLevel.DEBUG) {
        log("[DEBUG]:", ...args);
    }
}

export function trace(...args: any[]): void {
    if (globalThis.log_level >= LogLevel.TRACE) {
        log("[TRACE]:",...args);
    }
}

function log(...args: any[]) {
    console.log(...args);
}