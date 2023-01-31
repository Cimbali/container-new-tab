'use strict'

browser.runtime.onInstalled.addListener(({ reason }) => {
	if (reason === 'install') {
		browser.runtime.openOptionsPage();
	}
});

browser.browserAction.onClicked.addListener(() => {
	browser.runtime.openOptionsPage();
});
