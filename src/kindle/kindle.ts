// for grabbing highlights off of your physical device
import * as fs from 'fs';
import {KindleClippingsParser} from './clippings';

export class MountedKindle {
  private kindle_mount_path: string;

  private debug: boolean;

  private kindle_clippings_subpath: string;

  private parser: KindleClippingsParser = new KindleClippingsParser();

  private data_dir: string;

  constructor(kindle_mount_path: string, debug = false) {
    this.kindle_mount_path = kindle_mount_path;
    this.debug = debug;
    this.kindle_clippings_subpath = 'documents/My Clippings.txt';
    this.data_dir = 'data/';
  }

  public is_connected(): boolean {
    return fs.existsSync(this.kindle_mount_path);
  }

  // throws if there was a parsing error
  public load_my_clippings(): void {
    const contents = fs
      .readFileSync(this.kindle_mount_path + this.kindle_clippings_subpath)
      .toString('utf-8');
    this.parser.parse(contents);
  }
}
