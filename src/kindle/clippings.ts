// for grabbing highlights off of your physical device
import { exec } from 'child_process';
import { promises as fs } from 'fs';

export class KindleClippingsExtractor {
	private kindleMountPath: string;
	private kindleClippingsPath: string;
	private desktopPath: string;

	constructor(kindleMountPath: string, kindleClippingsPath: string, desktopPath: string) {
		this.kindleMountPath = kindleMountPath;
		this.kindleClippingsPath = kindleClippingsPath;
		this.desktopPath = desktopPath;
	}

	private async copyFile(sourcePath: string, destinationPath: string): Promise<void> {
		try {
			await fs.copyFile(sourcePath, destinationPath);
			console.log('File copied successfully!');
		} catch (err) {
			console.error(`Error copying file: ${err}`);
		}
	}

	private async isFileChanged(sourcePath: string, destinationPath: string): Promise<boolean> {
		try {
			const sourceStats = await fs.stat(sourcePath);
			const destinationStats = await fs.stat(destinationPath);

			const sourceModifiedTime = sourceStats.mtimeMs;
			const destinationModifiedTime = destinationStats.mtimeMs;

			return sourceModifiedTime > destinationModifiedTime;
		} catch (err) {
			if (err.code === 'ENOENT') {
				// Destination file doesn't exist
				return true;
			} else {
				console.error(`Error checking file status: ${err}`);
				return false;
			}
		}
	}

	private async checkKindleConnected(): Promise<void> {
		try {
			await fs.access(this.kindleMountPath, fs.constants.F_OK);

			const destinationPath = `${this.desktopPath}/My Clippings.txt`;

			const changed = await this.isFileChanged(this.kindleClippingsPath, destinationPath);

			if (changed) {
				await this.copyFile(this.kindleClippingsPath, destinationPath);
			} else {
				console.log('File is up to date. No need to copy.');
			}
		} catch (err) {
			console.error('Kindle is not connected or mounted.');
		}
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
