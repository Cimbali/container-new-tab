const createNode = e => document.createElement(e);
const getMsg = e => browser.i18n.getMessage(e);
const createText = e => document.createTextNode(e);

document.addEventListener('DOMContentLoaded', () => {
	browser.storage.local.get({target: null, f: false}, storage => {
		document.title = getMsg('extName');
		const section = createNode('section');
		const title = createNode('h1');
		title.append(createText(getMsg('extURL')));
		section.append(title);
		const entry = createNode('input');
		entry.setAttribute('type', 'text');
		if (storage.target) {
			entry.value = storage.target;
		}

		entry.setAttribute('placeholder', 'https://');
		entry.setAttribute('pattern', '^(([hH]ttps?|HTTPS?|moz-extension)://[^\\s/$.?#].[^\\s]*)|(about:(blank|home))$');
		entry.addEventListener('input', function (e) {
			this.validity.valid && browser.storage.local.set({target: this.value});
		});
		section.append(entry);
		document.body.append(section);
		entry.focus();
	});
});
