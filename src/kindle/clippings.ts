import * as moment from 'moment';

// TODO make these real pods and make the highlight class use them
// a key to uniquely identify a book
export class Book {
    public title: string;
    public authors: string[];
	constructor(title: string, authors: string[]) {
		this.title = title;
		this.authors = authors;
	}
}

// a key to uniquely identify a location in a book
export class Location {
	// location start and location end of highlight. still not sure
    // exactly what this is but I think it's the raw character index
    // which, with a start and end, can encapsulate the entire highlight
    // lcoation.
    public loc_start: number;
    public loc_end: number;
	public page_number: number;
	constructor(loc_start: number, loc_end: number, page_number: number) {
		this.loc_start = loc_start;
		this.loc_end = loc_end;
		this.page_number = page_number;
	}
}

// POD class for storing an individual highlight in a readable format
export class KindleHighlight {
    public added_at: moment.Moment;
    public text: string;
    constructor(added_at: moment.Moment, text: string) {
        this.added_at = added_at;
        this.text = text;
    }
}

export class KindleClippingsParser {
    private highlight_count: number = 0;
    private highlights: Map<Book, Map<Location, KindleHighlight>> = new Map();

    // throws if the parse failed with error
    public parse(contents: string): void {
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
			let highlighted_text = lines[i++];

			// delimiter line
			i++;

			// store the highlight
            let typed_moment = moment(added_at, 'LLLL');
			let book = new Book(title, authors);
			let location = new Location(loc_start, loc_end, page_number);
			let highlight = new KindleHighlight(typed_moment, highlighted_text);

			// force book key to exist before updating the value
			if (this.highlights.get(book) === undefined) {
				this.highlights.set(book, new Map<Location, KindleHighlight>());
			}
			// ... but each location should be unique, so force push at this key level
			this.highlights.get(book)?.set(location, highlight);

			this.highlight_count++;

			// dump the whole tree if it's debug mode
			if (global.debug) {
				console.log("added highlight %s from book %s at location %s", JSON.stringify(highlight), JSON.stringify(book), JSON.stringify(location));
				console.log("highlights map now has %i objects:", this.highlight_count);
			}
		}
	}

	/// PARSER FUNCTIONS
	// TODO unit test these good practice with junit & jest

	// title, author(s) TODO
	public parse_clippings_title_authors(line: string): [string, string[]] {
		// look for example of multi author in my clippings and create one if needed
		// then parse from reverse of string for parentheses (in case parentheses in title)
		let authors: string[] = [];
		let title = "";
		if (global.debug) {
			console.log("line input: \"%s\"", line);
			console.log("\tparsed title: \"%s\"", title);
			console.log("\tparsed author(s): \"%s\"", authors);
		}
		return [title, authors];
	}

	// page number, location range, timestamp added TODO
	public parse_clippings_metadata(line: string): [number, [number, number], string] {
		return [0, [0,0], ""];
	}
}