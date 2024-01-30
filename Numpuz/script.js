let numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ""];

const wrapper = document.querySelector(".wrapper");
const items = document.getElementsByClassName("grid-item");

let dropFrom;
let dropTo;

const shuffle = (array) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
};

function fillNumbers(arr) {
	for (let i = 0; i < arr.length; i++) {
		let div = document.createElement("div");
		if (i < 4) {
			div.setAttribute("alt", `0 ${i}`);
		} else if (i > 3 && i < 8) {
			div.setAttribute("alt", `1 ${i - 4}`);
		} else if (i > 7 && i < 12) {
			div.setAttribute("alt", `2 ${i - 8}`);
		} else if (i > 11 && i < 16) {
			div.setAttribute("alt", `3 ${i - 12}`);
		}
		if (arr[i] !== "") {
			div.innerText = arr[i];
			div.setAttribute("id", `${i}`);
			div.setAttribute("class", "grid-item drag");
			div.setAttribute("draggable", "true");
		} else {
			div.setAttribute("id", `${i}`);
			div.setAttribute("class", "grid-item drop-zone");
		}
		wrapper.appendChild(div);
	}
}
shuffle(numArray);
fillNumbers(numArray);

let dropZone = document.querySelector(".drop-zone");
let altDropZone = dropZone.attributes.alt.nodeValue.split(" ");
let rowDropZone = altDropZone[0];
let columnDropZone = altDropZone[1];
let parseRowDropZone = parseInt(rowDropZone.match(/\d+/)[0], 10);
let parseColumnDropZone = parseInt(columnDropZone.match(/\d+/)[0], 10);
let oldId;

document.addEventListener("mousedown", (e) => {
	dropFrom = e.target;
	e.target.addEventListener("dragstart", (event) => {});
});

wrapper.addEventListener("dragover", (e) => {
	e.preventDefault();
});

wrapper.addEventListener("drop", (e) => {
	e.preventDefault();
	dropTo = e.target;
	let altDropFromArr = dropFrom.attributes.alt.nodeValue.split(" ");
	let row = altDropFromArr[0];
	let column = altDropFromArr[1];
	let parseRow = parseInt(row.match(/\d+/)[0], 10);
	let parseColumn = parseInt(column.match(/\d+/)[0], 10);

	let dropId;
	let newId;
	let newDropZOne;
	let newEl;
	let num = 0;
	let ii;

	let arrNew = [];

	if (columnDropZone === column && dropTo !== wrapper) {
		if (dropTo.innerText !== "") {
			if (parseRowDropZone < 2) {
				for (let i = parseRowDropZone; i < 3; i++) {
					ii = i + 1;
					dropId = parseInt(dropZone.id.match(/\d+/)[0], 10);
					newId = dropId + 4;
					moveElementVertical(numArray, dropZone.id, dropId + 4);
					arrNew = numArray.slice();
					changeNumbers(arrNew);
					dropZone.id = newId;
					if (num === 0) {
						newEl = document.getElementById(dropZone.id);
						oldId = dropId;
						num++;
					} else if (ii >= 3) {
						newEl.id = oldId;
					}

					// newDropZOne = document.getElementById(newId);
					// console.log(arrNew);
					// newDropZOne.innerText = "";
					// newDropZOne.removeAttribute("draggable");
					// newDropZOne.setAttribute("class", "grid-item drop-zone");
					// numArray[dropZone.id] = "";
					parseRowDropZone += 1;
				}
			} else {
				for (let i = parseRowDropZone; i > 0; i--) {
					ii = i - 1;
					dropId = parseInt(dropZone.id.match(/\d+/)[0], 10);
					newId = dropId - 4;
					moveElementVertical(numArray, dropZone.id, dropId - 4);
					arrNew = numArray.slice();
					changeNumbers(arrNew);
					dropZone.id = newId;
					if (num === 0) {
						newEl = document.getElementById(dropZone.id);
						oldId = dropId;
						num++;
					} else if (ii <= 0) {
						newEl.id = oldId;
					}

					// newDropZOne = document.getElementById(newId);
					// console.log(arrNew);
					// newDropZOne.innerText = "";
					// newDropZOne.removeAttribute("draggable");
					// newDropZOne.setAttribute("class", "grid-item drop-zone");
					// numArray[dropZone.id] = "";
					parseRowDropZone -= 1;
				}
			}
		}
	} else if (rowDropZone === row && dropTo !== wrapper) {
		moveElementVertical(numArray, dropTo.id, dropFrom.id);
		changeNumbers(numArray);
	}
});

function changePosition(arr, from, to) {
	arr.splice(to, 0, arr.splice(from, 1)[0]);
	return arr;
}
// numArray = changePosition(numArray, dropZone.id, dropFrom.id);

function moveElementVertical(array, fromIndex, toIndex) {
	let temp = array[fromIndex];
	array[fromIndex] = array[toIndex];
	array[toIndex] = temp;
}

function changeNumbers(arr) {
	for (let i = 0; i < numArray.length; i++) {
		if (arr[i] !== "") {
			items[i].innerText = arr[i];
			// items[i].setAttribute("id", `${i}`);
			items[i].setAttribute("class", "grid-item drag");
			items[i].setAttribute("draggable", "true");
		} else {
			items[i].innerText = arr[i];
			// items[i].setAttribute("id", `${i}`);
			items[i].removeAttribute("draggable");
			items[i].setAttribute("class", "grid-item drop-zone");
		}
	}
}
