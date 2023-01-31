browser.runtime.onInstalled.addListener(event => {
	event.reason == 'install' && browser.runtime.openOptionsPage();
});
