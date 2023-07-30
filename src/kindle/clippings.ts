import * as moment from 'moment';

// TODO make these real pods and make the highlight class use them
// a key to uniquely identify a book
export class Book {
    public title: string;
    public authors: string[];
}

// a key to uniquely identify a location in a book
export class Location {
    public loc_start: number;
    public loc_end: number;
}

// POD class for storing an individual highlight in a readable format
export class KindleHighlight {
    public title: string;
    public authors: string[];
    public page_number: number;
    // location start and location end of highlight. still not sure
    // exactly what this is but I think it's the raw character index
    // which, with a start and end, can encapsulate the entire highlight
    // lcoation.
    public loc_start: number;
    public loc_end: number;
    public added_at: moment.Moment;
    public text: string;

    constructor(title: string, authors: string[], page_number: number, loc_start: number, loc_end: number, added_at: moment.Moment, text: string) {
        this.title = title;
        this.authors = authors;
        this.page_number = page_number;
        this.loc_start = loc_start;
        this.loc_end = loc_end;
        this.added_at = added_at;
        this.text = text;
    }
}

export class KindleClippingsParser {
    private highlight_count: number = 0;
    type BookKey = 
    private highlights: Map<

    // throws if the parse failed with error
    public parse(contents: string): void {
        // TODO
        this.highlight_count = 0;
		let lines = contents.split('\n');
		let i = 0;

		// assuming there won't be an incomplete highlight in the clippings file
		// TODO support email dumping for errors
		while (i < lines.length) {
			// title | authors
			let [title, authors] = this.parse_clippings_title_authors(lines[i++]);

			// clippings metadata
			let [page_number, [loc_start, loc_end], added_at] = this.parse_clippings_metadata(lines[i++]);

			// empty line
			i++;

			// highlight contents themselves
			let highlight_text = lines[i++];

			// delimiter line
			i++;

			// store the highlight
            let typed_moment = moment(added_at, 'LLLL');
            let highlight = new KindleHighlight(title, authors, page_number, loc_start, loc_end, typed_moment, highlight_text);
            // TODO store it
			this.highlight_count++;
		}
	}

	/// PARSER FUNCTIONS
	// TODO unit test these good practice with junit & jest

	// title, author(s)
	private parse_clippings_title_authors(line: string): [string, string[]] {
		let authors: string[] = [];
		let title = "";
		if (this.debug) {
			console.log("line input: \"%s\"", line);
			console.log("\tparsed title: \"%s\"", title);
			console.log("\tparsed author(s): \"%s\"", authors);
		}
		return [title, authors];
	}

	// page number, location range, timestamp added
	private parse_clippings_metadata(line: string): [number, [number, number], string] {
		return [0, [0,0], ""];
	}
}