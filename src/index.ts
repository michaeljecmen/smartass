// entry point for smartass
import { KindleClippings } from "./kindle/clippings";

// Create an instance of the KindleFileCopier class
const copier = new KindleClippings (
	'/media/pi/Kindle',
	'documents/My Clippings.txt',
	`${process.env.HOME}/Desktop`
);

// Run the script
copier.run();
