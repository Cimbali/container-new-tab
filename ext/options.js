const getMsg = e => browser.i18n.getMessage(e);

function getCookieStoreId() {
	return browser.tabs.getCurrent().then(({ id: tabId }) => {
		return browser.cookies.getAllCookieStores().then(
			cookieStores => cookieStores.find(store => store.tabIds.includes(tabId))
		).then(({ id: storeId }) => storeId);
	});
}

async function setup() {
	document.title = getMsg('name');
	const id = await getCookieStoreId();

	document.getElementById('prompt').textContent = `
		${getMsg('prefsURL')} (${id})
	`;
	document.getElementById('post').textContent = getMsg('prefsNote');


	const entry = document.getElementById('url');
	const {[id]: target = null} = await browser.storage.local.get(id);

	if (target) {
		entry.value = target;
	}

	entry.addEventListener('input', () => {
		if (entry.validity.valid) {
			browser.storage.local.set({[id]: entry.value});
		}
	});

	entry.focus();
}

document.addEventListener('DOMContentLoaded', setup);
