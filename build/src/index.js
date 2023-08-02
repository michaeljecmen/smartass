"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// entry point for smartass
const log_level_1 = require("./common/log_level");
const log = require("./common/log");
const kindle_1 = require("./kindle/kindle");
function send_new_clippings_to_notion() {
    // 1. create the kindle object
    const kindle = new kindle_1.MountedKindle('/media/pi/Kindle');
    // 2. check if the kindle is connected, and exit if not
    if (!kindle.is_connected()) {
        return;
    }
    // 3. load the "My Clippings.txt" file from the kindle.
    // will throw if any parsing errors. // TODO handle all throws
    kindle.load_my_clippings();
    // 4. get the list of new clippings by comparing against the JSON stored on disk TODO
    // 5. send the new clippings to notion and debug level log them to a file TODO
}
// TODO make this entry point configurable based on how it's run
// (once per day updater or the actual readwise highlights forwarder)
function main() {
    const args = process.argv.slice(2);
    globalThis.log_level = log_level_1.default.INFO;
    log.info('invoked with args: ', args);
    if (args.includes('--debug')) {
        globalThis.log_level = log_level_1.default.DEBUG;
        log.debug('set log level to DEBUG');
    }
    if (args.includes('--trace')) {
        globalThis.log_level = log_level_1.default.TRACE;
        log.trace('set log level to TRACE');
    }
    send_new_clippings_to_notion();
}
main();
//# sourceMappingURL=index.js.map