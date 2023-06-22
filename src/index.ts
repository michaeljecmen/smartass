// entry point for smartass
import { KindleClippingsExtractor } from "./kindle/clippings";

// Create an instance of the KindleFileCopier class
const copier = new KindleClippingsExtractor(
	'/media/pi/Kindle',
	'/media/pi/Kindle/documents/My Clippings.txt', // <-- these filepaths are actually correct
	`${process.env.HOME}/Desktop`
);

// Run the script
copier.run();
