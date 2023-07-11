// for grabbing highlights off of your physical device
import { exec } from 'child_process';
import * as fs from 'fs';

export class KindleClippings {
	private kindleMountPath: string;
	private kindleClippingsSubpath: string;
	private dataDir: string;

	constructor(kindleMountPath: string, kindleClippingsSubpath: string) {
		this.kindleMountPath = kindleMountPath;
		this.kindleClippingsSubpath = kindleClippingsSubpath;
		this.dataDir = "data/";
	}

	private isFileDiffNonZero(sourcePath: string, destinationPath: string): boolean {
		try {
			const content1 = fs.readFileSync(sourcePath, 'utf-8');
			const content2 = fs.readFileSync(destinationPath, 'utf-8');
		
			return content1 === content2;
		} catch (error) {
			console.log('Error:', error);
			return false;
		}
	}

	private isKindleConnected(): boolean {
		return fs.existsSync(this.kindleMountPath);
	}

	public async run(): Promise<void> {
		exec('mount', (err, stdout) => {
			if (err) {
				console.error('Error executing mount command:', err);
				return;
			}

			if (!stdout.includes(this.kindleMountPath)) {
				console.error('Kindle is not connected or mounted.');
				return;
			}

			this.checkKindleConnected();
		});
	}
}
