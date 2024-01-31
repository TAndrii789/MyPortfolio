// Custom Http Module
function customHttp() {
	return {
		get(url, cb) {
			try {
				const xhr = new XMLHttpRequest();
				xhr.open("GET", url);
				xhr.addEventListener("load", () => {
					if (Math.floor(xhr.status / 100) !== 2) {
						cb(`Error. Status code: ${xhr.status}`, xhr);
						return;
					}
					const response = JSON.parse(xhr.responseText);
					cb(null, response);
				});

				xhr.addEventListener("error", () => {
					cb(`Error. Status code: ${xhr.status}`, xhr);
				});

				xhr.send();
			} catch (error) {
				cb(error);
			}
		},
		post(url, body, headers, cb) {
			try {
				const xhr = new XMLHttpRequest();
				xhr.open("POST", url);
				xhr.addEventListener("load", () => {
					if (Math.floor(xhr.status / 100) !== 2) {
						cb(`Error. Status code: ${xhr.status}`, xhr);
						return;
					}
					const response = JSON.parse(xhr.responseText);
					cb(null, response);
				});

				xhr.addEventListener("error", () => {
					cb(`Error. Status code: ${xhr.status}`, xhr);
				});

				if (headers) {
					Object.entries(headers).forEach(([key, value]) => {
						xhr.setRequestHeader(key, value);
					});
				}

				xhr.send(JSON.stringify(body));
			} catch (error) {
				cb(error);
			}
		},
	};
}
// Init http module
const http = customHttp();

const newsService = (function () {
	const apiKey = "839b66a383c54b06954864b113481037";
	const apiurl = "https://newsapi.org/v2";

	return {
		topHeadlines(country = "ua", cb) {
			http.get(
				`${apiurl}/top-headlines?country=${country}&apiKey=${apiKey}`,
				cb
			);
		},
		everything(query, cb) {
			http.get(`${apiurl}/everything?q=${query}&apiKey=${apiKey}`, cb);
		},
	};
})();

// Elements
const form = document.forms["newsControls"];
const countrySelect = form.elements["country"];
const searchInput = form.elements["search"];

form.addEventListener("submit", (e) => {
	e.preventDefault();
	loadNews();
});

//  init selects
document.addEventListener("DOMContentLoaded", function () {
	M.AutoInit();
	loadNews();
});

// Load news function
function loadNews() {
	showLoader();

	const country = countrySelect.value;
	const searchText = searchInput.value;

	if (!searchText) {
		newsService.topHeadlines(country, onGetResponse);
	} else {
		newsService.everything(searchText, onGetResponse);
	}
}

// Function on get response from server
function onGetResponse(err, res) {
	removePreloader();

	if (err) {
		showAlert(err, "error-msg");
		return;
	}

	if (!res.articles.length) {
		// show empty message
		alert("Try find something else");
		return;
	}

	renderNews(res.articles);
}

// Function render news
function renderNews(news) {
	const newsContainer = document.querySelector(".news-container .row");
	if (newsContainer.children.length) {
		clearContainer(newsContainer);
	}
	let fragment = "";

	news.forEach((newsitem) => {
		const el = newsTemplate(newsitem);
		fragment += el;
	});

	newsContainer.insertAdjacentHTML("afterbegin", fragment);
}

// Function clear container
function clearContainer(container) {
	// container.innerHTML = '';
	let child = container.lastElementChild;
	while (child) {
		container.removeChild(child);
		child = container.lastElementChild;
	}
}

// News item template function
function newsTemplate({ urlToImage, title, url, description }) {
	if (urlToImage === null) {
		urlToImage =
			"https://www.charlotteathleticclub.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png";
	}
	return `
   <div class = 'col s12'>
     <div class = 'card'>
       <div class = 'card-image'>
         <img src="${urlToImage}">
         <span class="cart-title">${title || ""}</span>
       </div>
       <div class = 'card-content'>
         <p>${description || ""}</p>
       </div>
       <div class = 'card-action'>
         <a href = "${url}">Read more</a>
       </div>
     </div>
   </div>
 `;
}

function showAlert(msg, type = "succes") {
	M.toast({ html: msg, classes: type });
}

// Show loader function
function showLoader() {
	document.body.insertAdjacentHTML(
		"afterbegin",
		`<div class="progress">
     <div class="indeterminate"></div>
    </div>`
	);
}

// Remove loader function

function removePreloader() {
	const loader = document.querySelector(".progress");
	if (loader) {
		loader.remove();
	}
}
