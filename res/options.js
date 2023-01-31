var c=e=>document.createElement(e),y=e=>browser.i18n.getMessage(e),ct=e=>document.createTextNode(e);
document.addEventListener('DOMContentLoaded',()=>{
	browser.storage.local.get({t:null,f:false},i=>{
		document.title=y('extName');
		var h=c('section'),
		b=c('h1');
		b.appendChild(ct(y('extURL')));
		h.appendChild(b);
		b=c('input');
		b.setAttribute('type','text');
		if(i.t)b.value=i.t;
		b.setAttribute('placeholder','https://');
		b.setAttribute('pattern','^(([hH]ttps?|HTTPS?|moz-extension)://[^\\s/$.?#].[^\\s]*)|(about:(blank|home))$');
		b.addEventListener('input',function(e){
			this.validity.valid&&browser.storage.local.set({t:this.value})
		});
		h.appendChild(b);
		document.body.appendChild(h);
		b.focus()
	})
});
