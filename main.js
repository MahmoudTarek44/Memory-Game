// Game build and shuffle cards >>

var gameSection = document.getElementById("card-container");
var gameCover = { imgSrc: "./Images/Cover.jpg", name: "Cover" };

var lives = 10;
var hints = 3;

var livesCount = document.getElementById("count");
var newGame = document.getElementById("new");
var helpGame = document.getElementById("hint");

livesCount.textContent = lives;

gameSources = [
	{ imgSrc: "./Images/Ace.jpg", name: "Ace" },
	{ imgSrc: "./Images/FourSpades.jpg", name: "Four" },
	{ imgSrc: "./Images/Joker.jpg", name: "Joker" },
	{ imgSrc: "./Images/King.jpg", name: "King" },
	{ imgSrc: "./Images/Queen.png", name: "Queen" },
	{ imgSrc: "./Images/Jack.jpg", name: "Jack" },
	{ imgSrc: "./Images/Ace.jpg", name: "Ace" },
	{ imgSrc: "./Images/FourSpades.jpg", name: "Four" },
	{ imgSrc: "./Images/Joker.jpg", name: "Joker" },
	{ imgSrc: "./Images/King.jpg", name: "King" },
	{ imgSrc: "./Images/Queen.png", name: "Queen" },
	{ imgSrc: "./Images/Jack.jpg", name: "Jack" },
];

function shuffleCards(game) {
	for (var i = game.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = game[i];
		game[i] = game[j];
		game[j] = temp;
	}
}
console.log(gameSources); // test random cards

function createCard() {
	shuffleCards(gameSources);

	gameSources.forEach((element) => {
		// console.log(element);
		var card = document.createElement("div");
		var photo = document.createElement("img");
		var cover = document.createElement("img");

		card.classList.add("card", "hidden");

		card.setAttribute("name", element.name);

		photo.classList = "photo";
		cover.classList = "cover";

		photo.src = element.imgSrc;
		cover.src = gameCover.imgSrc;

		gameSection.appendChild(card);
		card.appendChild(photo);
		card.appendChild(cover);

		card.addEventListener("click", (element) => {
			card.classList.toggle("flip");
			matchCards(element);
		});
	});
}
createCard();

// Matching cards & game over >>

function matchCards(c) {
	var targetElement = c.target;
	targetElement.classList.add("clicked");

	var selected = document.querySelectorAll(".clicked");
	var underTest = document.querySelectorAll(".flip");
	console.log(underTest);

	if (selected.length == 2) {
		if (selected[0].getAttribute("name") == selected[1].getAttribute("name")) {
			selected[0].classList.remove("clicked");
			selected[1].classList.remove("clicked");
			selected[0].classList.remove("hidden");
			selected[1].classList.remove("hidden");

			console.log("match");
		} else {
			console.log("wrong");
			selected[0].classList.remove("clicked");
			selected[1].classList.remove("clicked");

			lives--;
			livesCount.textContent = lives;
			console.log(lives);

			setTimeout(() => {
				selected[0].classList.remove("flip");
				selected[1].classList.remove("flip");
			}, 1000);
		}
	}

	function resetGame() {
		if (lives == 0) {
			setTimeout(() => {
				underTest.forEach((s) => {
					s.classList.remove("flip");
				});
			}, 1000);
			setTimeout(() => {
				alert("Game over , Please try again!");
			}, 1500);
			setTimeout(() => {
				gameSection.innerHTML = "";
				createCard();
				lives = 10;
				livesCount.textContent = lives;
				helpGame.style.display = "inline-block";
			}, 3000);
		}
	}
	resetGame();

	if (underTest.length == 12) {
		setTimeout(() => {
			underTest.forEach((s) => {
				s.classList.remove("flip");
			});
		}, 1000);
		setTimeout(() => {
			alert("Congratulations , you win .. \n what about a new shot !! ");
			helpGame.style.display = "inline-block";
			lives = 10;
			livesCount.textContent = lives;
			hints = 3;
		}, 1500);
	}
}

// New game & hints >>

newGame.addEventListener("click", () => {
	var allCards = document.querySelectorAll(".card");

	allCards.forEach((s) => {
		s.classList.add("flip");
		setTimeout(() => {
			s.classList.remove("flip");
		}, 1000);
	});

	setTimeout(() => {
		alert("Start a new game \n... You only have 3 hints ...");
	}, 2000);

	setTimeout(() => {
		gameSection.innerHTML = "";
		createCard();
		lives = 10;
		livesCount.textContent = lives;
		hints = 3;
		if (hints == 3) {
			helpGame.style.display = "inline-block";
		}
	}, 2000);
});

helpGame.addEventListener("click", () => {
	var hiddenCards = document.querySelectorAll(".hidden");
	hiddenCards.forEach((h) => {
		h.classList.add("flip");
		setTimeout(() => {
			h.classList.remove("flip");
		}, 1000);
	});

	hints--;
	if (hints == 0) {
		helpGame.style.display = "none";
	}
});
