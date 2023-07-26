// entry point for smartass
import { KindleClippings } from "./kindle/clippings";


function send_new_clippings_to_notion() {
	// 1. create the clippings object
	const clippings = new KindleClippings (
		'/media/pi/Kindle',
		'documents/My Clippings.txt'
	);

	// 2. check if the kindle is connected, and exit if not TODO

	// 3. load the clippings as JSON and exit if there's a parsing error TODO

	// 4. get the list of new clippings by comparing against the JSON stored on disk TODO

	// 5. send the new clippings to notion and debug level log them to a file TODO
}

// TODO make this entry point configurable based on how it's run
// (once per day updater or the actual readwise highlights forwarder)