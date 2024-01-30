const form = document.querySelector("form");
const popup = document.getElementById("popup");
const okBtn = document.querySelector(".ok-btn");
const textarea = document.querySelector("textarea");
const checkInput = document.querySelectorAll("input[type='checkbox']");
const sum = document.getElementById("calc");
const cost = document.querySelectorAll(".cost");

function sendEmail() {
	Email.send({
		Host: "smtp.elasticemail.com",
		Username: "myplane789@gmail.com",
		Password: "67ACF7E845CF65083F85E21FEC03B612C199",
		To: "myplane789@gmail.com",
		From: "myplane789@gmail.com",
		// document.getElementById("email").value,
		Subject: document.getElementById("subject").value,
		Body:
			"Name: " +
			document.getElementById("name").value +
			"<br> Email: " +
			document.getElementById("email").value +
			"<br> Message: " +
			document.getElementById("message").value,
	});
	// .then((message) => alert(message));
}

function openPopup() {
	popup.classList.add("open-popup");
}
function closePopup() {
	popup.classList.remove("open-popup");
}

form.addEventListener("submit", (e) => {
	e.preventDefault();
	sendEmail();
	openPopup();
});

okBtn.addEventListener("click", (e) => {
	closePopup();
	location.reload();
});

for (let i = 0; i < checkInput.length; i++) {
	checkInput[i].addEventListener("click", sumOferrs);
}

let offers = {};

function sumOferrs(e) {
	if (e.target.checked) {
		offers[e.target.id] = {
			value: e.target.value,
		};
	} else {
		delete offers[e.target.id];
	}

	let total = 0;

	for (let key in offers) {
		total += parseInt(offers[key].value);
	}

	sum.innerText = total;
}
