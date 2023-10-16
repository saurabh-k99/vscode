console.log('Hello from doselect');
if (document.referrer) {
	parent.postMessage('iframeLoaded', document.referrer);

	window.addEventListener('focus', function () {
		// Send a message to the parent document indicating that focus is achieved
		parent.postMessage('triggerFocus', document.referrer);
	}, false);

	// Add a blur event listener or perform other actions when blurred
	window.addEventListener('blur', function () {
		// Send a message to the parent document indicating that focus is achieved
		parent && parent.postMessage('triggerBlur', document.referrer);
	}, false);
}

