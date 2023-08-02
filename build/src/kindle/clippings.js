"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KindleClippingsParser = exports.KindleHighlight = exports.Location = exports.Book = void 0;
const moment = require("moment");
const log = require("../common/log");
// TODO make these real pods and make the highlight class use them
// a key to uniquely identify a book
class Book {
    constructor(title, authors) {
        this.title = title;
        this.authors = authors;
    }
}
exports.Book = Book;
// a key to uniquely identify a location in a book
class Location {
    constructor(loc_start, loc_end, page_number) {
        this.loc_start = loc_start;
        this.loc_end = loc_end;
        this.page_number = page_number;
    }
}
exports.Location = Location;
// POD class for storing an individual highlight in a readable format
class KindleHighlight {
    constructor(added_at, text) {
        this.added_at = added_at;
        this.text = text;
    }
}
exports.KindleHighlight = KindleHighlight;
class KindleClippingsParser {
    constructor() {
        this.highlight_count = 0;
        this.highlights = new Map();
    }
    // throws if the parse failed with error
    parse(contents) {
        var _a;
        this.highlight_count = 0;
        const lines = contents.split('\n');
        let i = 0;
        // assuming there won't be an incomplete highlight in the clippings file
        // TODO support email dumping for errors
        while (i < lines.length) {
            // title | authors
            const [title, authors] = this.parse_clippings_title_authors(lines[i++]);
            // clippings metadata
            const [page_number, [loc_start, loc_end], added_at] = this.parse_clippings_metadata(lines[i++]);
            // empty line
            i++;
            // highlight contents themselves
            const highlighted_text = lines[i++];
            // delimiter line
            i++;
            // store the highlight
            const typed_moment = moment(added_at, 'LLLL');
            const book = new Book(title, authors);
            const location = new Location(loc_start, loc_end, page_number);
            const highlight = new KindleHighlight(typed_moment, highlighted_text);
            // force book key to exist before updating the value
            if (this.highlights.get(book) === undefined) {
                this.highlights.set(book, new Map());
            }
            // ... but each location should be unique, so force push at this key level
            (_a = this.highlights.get(book)) === null || _a === void 0 ? void 0 : _a.set(location, highlight);
            this.highlight_count++;
            // dump the whole tree in varying levels of debug
            log.debug('added highlight %s from book %s at location %s', JSON.stringify(highlight), JSON.stringify(book), JSON.stringify(location));
            log.debug('highlights map now has %i objects:', this.highlight_count);
            log.trace('highlights tree after insertion: ', JSON.stringify(this.highlights));
        }
    }
    /// PARSER FUNCTIONS
    // title, author(s)
    // TODO support multiple authors. highlight a passage from a book which has multiple authors and add a unit test for it
    parse_clippings_title_authors(line) {
        // look for example of multi author in my clippings and create one if needed
        // then parse from reverse of string for parentheses (in case parentheses in title)
        line = line.trim();
        const author_end_ind = line.lastIndexOf(')');
        const author_start_ind = line.lastIndexOf('(');
        const author = line.substring(author_start_ind + 1, author_end_ind);
        // TODO remove non-utf8s? check unit tests
        const title = line.substring(0, author_start_ind).trim();
        const authors = [author];
        log.debug('line input: "%s"', line);
        log.debug('\tparsed title: "%s"', title);
        log.debug('\tparsed author(s): "%s"', authors);
        return [title, authors];
    }
    // page number, location range, timestamp added TODO
    parse_clippings_metadata(line) {
        return [0, [0, 0], ''];
    }
}
exports.KindleClippingsParser = KindleClippingsParser;
//# sourceMappingURL=clippings.js.map