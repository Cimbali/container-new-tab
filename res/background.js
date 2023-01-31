browser.runtime.onInstalled.addListener(e=>{
	"install"==e.reason&&browser.runtime.openOptionsPage()
});