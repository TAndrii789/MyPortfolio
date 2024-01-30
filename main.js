const navSlide = () => {
	const list = document.querySelector(".list");
	const nav = document.querySelector(".nav-links");
	const navLinks = document.querySelectorAll(".nav-links li");

	list.addEventListener("click", () => {
		// Toggle Nav
		nav.classList.toggle("nav-active");

		// Animate links
		navLinks.forEach((link, index) => {
			if (link.style.animation) {
				link.style.animation = "";
			} else {
				link.style.animation = `navLinkFade 0.5s ease forwards ${
					index / 7 + 0.5
				}s`;
			}
		});
		// list animation
		list.classList.toggle("tog");
	});
};

navSlide();

