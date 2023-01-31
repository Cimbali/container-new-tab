browser.storage.local.get({t:null},q=>{
	browser.tabs.update({url:q.t?q.t:"about:blank"})
});