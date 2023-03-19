const N = 130;
const Granularity = 3;

const getRGBfromString = (String) => String.match(/rgb\((?<r>.*?),(?<g>.*?),(?<b>.*?)\)/).groups;

const colorsCanBeSame = (colorA, colorB) => {
	let { r, g, b } = getRGBfromString(colorA);
	let { r: r1, g: g1, b: b1 } = getRGBfromString(colorB);

	return (
		Math.abs(Number(r) - Number(r1)) < N &&
		Math.abs(Number(g) - Number(g1)) < N &&
		Math.abs(Number(b) - Number(b1)) < N
	)
}

const initImg = (img) => {
	let style = window.getComputedStyle(img);
	let width = parseInt(style.width, 10);
	let height = parseInt(style.height, 10);
	let canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	let ctx = canvas.getContext('2d');
	ctx.drawImage(img, 0, 0);

	const getPixelColor = (x, y) => {
		let imageData = ctx.getImageData(x, y, 1, 1);
		let pixel = imageData.data;
		let r = pixel[0];
		let g = pixel[1];
		let b = pixel[2];
		let a = pixel[3] / 255;
		a = Math.round(a * 100) / 100;

		let rgbColor = `rgb(${r},${g},${b})`;

		return rgbColor;
	}

	return {
		width,
		height,
		getColor: getPixelColor,
	};
}

export const generateData = (imgNode, xStart, xEnd, yStart, yEnd) => {
	const canvas = initImg(imgNode);
	const resData = {
		"rgb(255,255,255)": [],
		"rgb(50,50,50)": [],
	};

	for (let j = 0; j < canvas.height; j += Granularity) {
		for (let i = 0; i < canvas.width; i += Granularity) {

			let color = canvas.getColor(i, j);

			let xCooratt = Math.floor(i / canvas.width * (xEnd - xStart) + xStart);
			let yCooratt = Math.floor((canvas.height - j) / canvas.height * (yEnd - yStart) + yStart);

			let cooratt = `[${xCooratt},${yCooratt}]`;

			let keys = Object.keys(resData);

			let sameFlag = false;
			for (var n = 0; n < keys.length; n++) {
				if (colorsCanBeSame(keys[n], color)) {
					resData[`${keys[n]}`].push(cooratt);
					sameFlag = true;
					break;
				}
			}
			if (!sameFlag) {
				resData[`${color}`] = [cooratt];
			}
		}
	}

	delete (resData["rgb(255,255,255)"]);
	// delete (resData["rgb(50,50,50)"]);

	return resData;
}