'use strict'

function getCookieStoreId() {
	return browser.tabs.getCurrent().then(({ id: tabId }) => {
		return browser.cookies.getAllCookieStores().then(
			cookieStores => cookieStores.find(store => store.tabIds.includes(tabId))
		).then(({ id: storeId }) => storeId);
	});
}

function redirect(storeId) {
	browser.storage.local.get(storeId, ({[storeId]: url = 'about:blank'}) => {
		browser.tabs.update({ url, loadReplace: true });
	});
}

getCookieStoreId().then(redirect);
