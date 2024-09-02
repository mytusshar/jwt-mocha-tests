module.exports = () => {
	return new Promise((res, rej) => {
		setTimeout(() => res(3), 6000);
	}).then((num) => {
		return num * 2;
	});
};
