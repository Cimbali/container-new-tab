browser.storage.local.get({target: null}, storage => {
	browser.tabs.update({ url: storage.target ? storage.target : 'about:blank' });
});
