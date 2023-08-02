import * as moment from 'moment';
export declare class Book {
    title: string;
    authors: string[];
    constructor(title: string, authors: string[]);
}
export declare class Location {
    loc_start: number;
    loc_end: number;
    page_number: number;
    constructor(loc_start: number, loc_end: number, page_number: number);
}
export declare class KindleHighlight {
    added_at: moment.Moment;
    text: string;
    constructor(added_at: moment.Moment, text: string);
}
export declare class KindleClippingsParser {
    private highlight_count;
    private highlights;
    parse(contents: string): void;
    parse_clippings_title_authors(line: string): [string, string[]];
    parse_clippings_metadata(line: string): [number, [number, number], string];
}
