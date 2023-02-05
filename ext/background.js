'use strict'

browser.runtime.onInstalled.addListener(({ reason }) => {
	if (reason === 'install') {
		browser.runtime.openOptionsPage();
	}
});

browser.browserAction.onClicked.addListener(() => {
	browser.runtime.openOptionsPage();
});

browser.contextualIdentities.onRemoved.addListener(({ cookieStoreId: id }) => {
	browser.storage.local.remove(id);
});
