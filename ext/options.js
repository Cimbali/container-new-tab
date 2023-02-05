'use strict'

const getMsg = e => browser.i18n.getMessage(e);


function setupInput(input, storage, id) {
	if (id in storage) {
		input.value = storage[id];
	}

	input.addEventListener('input', () => {
		if (input.validity.valid) {
			browser.storage.local.set({[id]: input.value});
		}
	});
}

async function setup() {
	document.title = getMsg('name');
	document.getElementById('prompt').textContent = getMsg('prefsURL');

	const firstEntry = document.querySelector('section p');

	const storage = await browser.storage.local.get();
	const identities = await browser.contextualIdentities.query({}).catch(() => ([]));

	for (const { cookieStoreId: id, iconUrl, colorCode, name } of identities) {
		const p = firstEntry.cloneNode(true);
		const input = p.getElementsByTagName('input')[0];
		input.name = id;
		input.id = id;

		const label = p.getElementsByTagName('label')[0];
		label.setAttribute('for', id);
		label.textContent = name;

		// Make an SVG filter to apply the color
		const filter = `<svg xmlns="http://www.w3.org/2000/svg">
		<filter id="recolor" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="
			0 0 0 0 ${parseInt(colorCode.slice(1, 3), 16) / 255}
			0 0 0 0 ${parseInt(colorCode.slice(3, 5), 16) / 255}
			0 0 0 0 ${parseInt(colorCode.slice(5, 7), 16) / 255}
			0 0 0 1 0
	    "/></filter>
		</svg>`;

		const img = label.insertBefore(document.createElement('img'), label.firstChild);
		img.src = iconUrl;
		img.alt = `Icon for ${name} container`
		img.style.filter = `url('data:image/svg+xml;utf8,${filter.split('\n').join(' ')}#recolor')`;

		setupInput(input, storage, id);
		firstEntry.parentNode.appendChild(p);
	}

	const input = firstEntry.getElementsByTagName('input')[0];
	const label = firstEntry.getElementsByTagName('label')[0];

	label.textContent = getMsg('noContainer');
	setupInput(input, storage, 'firefox-default');
	input.id = 'firefox-default';
	input.focus();
}

document.addEventListener('DOMContentLoaded', setup);
