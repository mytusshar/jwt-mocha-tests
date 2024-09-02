let input = {
	a: {
		b: {
			c: 1
		},
		d: 2
	},
	e: {
		f: {
			g: {
				i: {
					j: {
						k: 1
					}
				}
			}
		},
		h: 2
	}
};
function getKeys(obj) {
	if (typeof obj !== 'object') {
		return [];
	}
	let keys = Object.keys(obj);
	let childKeys = [];
	for (let i = 0; i < keys.length; i++) {
		let newKeys = getKeys(obj[keys[i]]);
		childKeys = childKeys.concat(newKeys);
	}
	return keys.concat(childKeys);
}
// getKeys(input);

function getPaths(obj, path) {
	if (typeof obj !== 'object') {
		return [];
	}
	let keys = Object.keys(obj);
	let childKeys = [];
	for (let i = 0; i < keys.length; i++) {
		let newKeys = getPaths(obj[keys[i]], keys[i]);
		childKeys = childKeys.concat(newKeys);
	}

	keys = keys.concat(childKeys);
	for (let i = 0; i < keys.length; i++) {
		keys[i] = path ? path + '.' + keys[i] : keys[i];
	}
	return keys;
}
getPaths(input, '');

/*

*/
