// entry point for smartass
import { MountedKindle } from "./kindle/kindle";

function send_new_clippings_to_notion() {
	// 1. create the kindle object
	const kindle = new MountedKindle('/media/pi/Kindle');

	// 2. check if the kindle is connected, and exit if not
	if (!kindle.is_connected()) {
		return;
	}

	// 3. load the "My Clippings.txt" file from the kindle.
	// will throw if any parsing errors. // TODO handle all throws
	kindle.load_my_clippings();

	// 4. get the list of new clippings by comparing against the JSON stored on disk TODO

	// 5. send the new clippings to notion and debug level log them to a file TODO
}

// TODO make this entry point configurable based on how it's run
// (once per day updater or the actual readwise highlights forwarder)
function main() {
	let args = process.argv.slice(2);
	console.log("invoked with args: ", args);
	if (args.find((arg) => { arg === "--debug" }) !== undefined) {
		global.debug = true;
	}

	send_new_clippings_to_notion();
}
main();