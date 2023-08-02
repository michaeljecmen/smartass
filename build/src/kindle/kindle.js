"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MountedKindle = void 0;
// for grabbing highlights off of your physical device
const fs = require("fs");
const clippings_1 = require("./clippings");
class MountedKindle {
    constructor(kindle_mount_path, debug = false) {
        this.parser = new clippings_1.KindleClippingsParser();
        this.kindle_mount_path = kindle_mount_path;
        this.debug = debug;
        this.kindle_clippings_subpath = 'documents/My Clippings.txt';
        this.data_dir = 'data/';
    }
    is_connected() {
        return fs.existsSync(this.kindle_mount_path);
    }
    // throws if there was a parsing error
    load_my_clippings() {
        const contents = fs
            .readFileSync(this.kindle_mount_path + this.kindle_clippings_subpath)
            .toString('utf-8');
        this.parser.parse(contents);
    }
}
exports.MountedKindle = MountedKindle;
//# sourceMappingURL=kindle.js.map