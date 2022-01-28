// https://www3.animeflv.net/ver/one-piece-tv-979

function getPageLinks(url) {
	return new Promise((resolve, reject) => {
		fetch(url)
			.then((res) => res.text())
			.then((data) => {
				let div = document.createElement("div");

				div.innerHTML = data.trim();

				const downloadTable = div.querySelector("#DwsldCn table>tbody");
				const groups = Array.from(downloadTable.querySelectorAll("tr")).map(
					(n) => {
						const group = n.querySelector("td").innerText;
						const downloadLink = n
							.querySelector("a.fa-download")
							.getAttribute("href");
						return { group, downloadLink };
					}
				);

				resolve(
					groups.reduce(
						(acc, item) => ({
							...acc,
							[item.group]: item.downloadLink,
						}),
						{}
					)
				);
			});
	});
}

function printLinks(linksTable) {
	const linksText = Object.keys(linksTable)
		.filter((k) => k !== "description")
		.map((k) => `${k}:\n\r${linksTable[k].map((l) => `\t${l}\n\r`).join("")}`)
		.join("");
	return `${linksTable.description}\n\r${linksText}`;
}

function download(linksText) {
	const blob = new Blob([linksText], { type: "plain/text" });
	const url = window.URL.createObjectURL(blob);
	const a = document.createElement("a");

	a.style = "display: none";
	document.body.appendChild(a);
	a.href = url;
	a.download = "links.txt";
	a.click();
	window.URL.revokeObjectURL(url);
}

async function getDownloadLinks(urlPattern, start, count) {
	let linksTable = {
		description: `Download links from ${start} to ${start + count - 1}`,
	};

	console.log("Start grabbing");

	for (let i = 0; i < count; i++) {
		console.log(`Getting page ${start + i} links`);

		const pageLinks = await getPageLinks(`${urlPattern}${start + i}`);

		linksTable = Object.keys(pageLinks).reduce(
			(acc, key) => ({
				...acc,
				[key]: [...(linksTable[key] || []), pageLinks[key]],
			}),
			linksTable
		);
	}

	download(printLinks(linksTable));
}
