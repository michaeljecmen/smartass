// entry point for smartass
import { KindleClippings, MountedKindle } from "./kindle/kindle";


function send_new_clippings_to_notion() {
	// 1. create the kindle object
	const kindle = new MountedKindle('/media/pi/Kindle');

	// 2. check if the kindle is connected, and exit if not
	if (!kindle.isConnected()) {
		return;
	}

	// 3. load the clippings as JSON and exit if there's a parsing error
	if (!kindle.loadMyClippings()) {
		return;
	}

	// 4. get the list of new clippings by comparing against the JSON stored on disk TODO

	// 5. send the new clippings to notion and debug level log them to a file TODO
}

// TODO make this entry point configurable based on how it's run
// (once per day updater or the actual readwise highlights forwarder)