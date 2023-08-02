import * as moment from 'moment';
import * as log from '../common/log';

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
  private highlight_count = 0;

  private highlights: Map<Book, Map<Location, KindleHighlight>> = new Map();

  // throws if the parse failed with error
  public parse(contents: string): void {
    this.highlight_count = 0;
    const lines = contents.split('\n');
    let i = 0;

    // assuming there won't be an incomplete highlight in the clippings file
    // TODO support email dumping for errors
    while (i < lines.length) {
      // title | authors
      const [title, authors] = this.parse_clippings_title_authors(lines[i++]);

      // clippings metadata
      const [page_number, [loc_start, loc_end], added_at] =
        this.parse_clippings_metadata(lines[i++]);

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
        this.highlights.set(book, new Map<Location, KindleHighlight>());
      }
      // ... but each location should be unique, so force push at this key level
      this.highlights.get(book)?.set(location, highlight);

      this.highlight_count++;

      // dump the whole tree in varying levels of debug
      log.debug(
        'added highlight %s from book %s at location %s',
        JSON.stringify(highlight),
        JSON.stringify(book),
        JSON.stringify(location)
      );
      log.debug('highlights map now has %i objects:', this.highlight_count);
      log.trace(
        'highlights tree after insertion: ',
        JSON.stringify(this.highlights)
      );
    }
  }

  /// PARSER FUNCTIONS

  // title, author(s)
  // TODO support multiple authors. highlight a passage from a book which has multiple authors and add a unit test for it
  public parse_clippings_title_authors(line: string): [string, string[]] {
    // look for example of multi author in my clippings and create one if needed
    // then parse from reverse of string for parentheses (in case parentheses in title)
    line = line.trim();
    const author_end_ind = line.lastIndexOf(')');
    const author_start_ind = line.lastIndexOf('(');
    const author = line.substring(author_start_ind + 1, author_end_ind);

    // TODO remove non-utf8s? check unit tests
    const title = line.substring(0, author_start_ind).trim();
    const authors: string[] = [author];
    log.debug('line input: "%s"', line);
    log.debug('\tparsed title: "%s"', title);
    log.debug('\tparsed author(s): "%s"', authors);
    return [title, authors];
  }

  // page number, location range, timestamp added TODO
  public parse_clippings_metadata(
    line: string
  ): [number, [number, number], string] {
    return [0, [0, 0], ''];
  }
}
