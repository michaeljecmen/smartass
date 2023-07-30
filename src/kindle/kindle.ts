// for grabbing highlights off of your physical device
import * as fs from 'fs';

export class MountedKindle {
	private kindle_mount_path: string;
	private kindle_clippings_subpath: string;
	private data_dir: string;

	constructor(kindle_mount_path: string) {
		this.kindle_mount_path = kindle_mount_path;
		this.kindle_clippings_subpath = 'documents/My Clippings.txt';
		this.data_dir = "data/";
	}

	public is_connected(): boolean {
		return fs.existsSync(this.kindle_mount_path);
	}

	// returns whether or not there was a parsing error
	public load_my_clippings(): boolean {
		let contents = fs.readFileSync(this.kindle_mount_path + this.kindle_clippings_subpath).toString('utf-8');
		
		let highlight_count = 0;
		let lines = contents.split('\n');
		let i = 0;

		// assuming there won't be an incomplete highlight in the clippings file
		while (i < lines.length) {
			// title | author
			let [title, author] = this.parse_clippings_title_author(lines[i++]);

			// clippings metadata
			let [page_number, [loc_start, loc_end], added_at] = this.parse_clippings_metadata(lines[i++]);

			// empty line
			i++;

			// highlight
			let highlight = lines[i++];

			// delimiter line
			i++;

			// store the highlight TODO
			highlight_count++;
		}
		
		console.log("error parsing clippings file at '%s'", this.kindle_mount_path+this.kindle_clippings_subpath);
		return true;
	}

	/// PARSER FUNCTIONS
	// TODO unit test these good practice with junit & jest

	// title, author(s)
	private parse_clippings_title_author(line: string): [string, string[]] {
		return ["", []];
	}

	// page number, location range, timestamp added
	private parse_clippings_metadata(line: string): [number, [number, number], string] {
		return [0, [0,0], ""];
	}
}
