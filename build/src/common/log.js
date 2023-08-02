"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trace = exports.debug = exports.info = void 0;
const log_level_1 = require("./log_level");
function log(...args) {
    console.log(...args);
}
// logging functions for the masses
function info(...args) {
    log('[INFO]:', ...args);
}
exports.info = info;
function debug(...args) {
    if (globalThis.log_level >= log_level_1.default.DEBUG) {
        log('[DEBUG]:', ...args);
    }
}
exports.debug = debug;
function trace(...args) {
    if (globalThis.log_level >= log_level_1.default.TRACE) {
        log('[TRACE]:', ...args);
    }
}
exports.trace = trace;
//# sourceMappingURL=log.js.map