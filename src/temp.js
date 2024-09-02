function a(x) {}

async function b() {
	let resp = await a(true).catch((e) => e);
	console.log(resp);
}

b();
