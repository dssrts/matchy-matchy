const cardArray = [
  {
    name: "ace",
    imgSrc: "cards/ace.jpg"
  },
  {
    name: "queen",
    imgSrc: "cards/queen.jpg"
  },
  {
    name: "jack",
    imgSrc: "cards/jack.jpg"
  },
  {
    name: "king",
    imgSrc: "cards/king.jpg"
  },
  {
    name: "joker",
    imgSrc: "cards/joker.jpg"
  },
  {
    name: "king2",
    imgSrc: "cards/king2.jpg"
  },
  {
    name: "king",
    imgSrc: "cards/king.jpg"
  },
  {
    name: "jack",
    imgSrc: "cards/jack.jpg"
  },
  {
    name: "queen",
    imgSrc: "cards/queen.jpg"
  },
  {
    name: "king2",
    imgSrc: "cards/king2.jpg"
  },
  {
    name: "ace",
    imgSrc: "cards/ace.jpg"
  },
  {
    name: "joker",
    imgSrc: "cards/joker.jpg"
  }
];

var audio = document.getElementById("sound");
audio.volume = 0.3;

const grid = document.querySelector(".grid");
let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];
let timer;
let moves = 0;


function startTimer() {
  let seconds = 0;
  timer = setInterval(() => {
  seconds++;
  document.getElementById('timer').textContent = "Time: " + seconds + " s";
}, 1000);
}

function createBoard() {
  startTimer();
  grid.classList.add("shuffle");
  cardArray.sort(() => 0.5 - Math.random());
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.image = cardArray[i].imgSrc; // Add data attribute to store image path
    card.dataset.id = i;
    card.addEventListener("click", flipCard);
    const frontFace = document.createElement("div");
    frontFace.classList.add("front-face");
    const backFace = document.createElement("div");
    backFace.classList.add("back-face");
    backFace.style.backgroundImage = `url(${cardArray[i].imgSrc})`; // Set background image
    card.appendChild(frontFace);
    card.appendChild(backFace);
  grid.appendChild(card);
  }
}

function showPopUp(message) {
const popup = document.createElement("div");
popup.classList.add("popup");
const popupText = document.createElement("p");
popupText.innerText = message;
const movesText = document.createElement("p");
movesText.innerText = "Moves: " + moves;
const playAgainBtn = document.createElement("button");
playAgainBtn.innerText = "Play Again";
playAgainBtn.addEventListener("click", () => {
  location.reload();
});
popup.appendChild(popupText);
popup.appendChild(movesText);
popup.appendChild(playAgainBtn);
document.body.appendChild(popup);
}

function flipCard() {
  if (cardsChosen.length >= 2) {
    return; // Exit function if 2 cards already flipped
  }

  const cardId = this.dataset.id;
  if (cardsChosenId.includes(cardId)) {
    return; // Prevent selecting the same card twice
  }

  cardsChosen.push(cardArray[cardId].name);
  cardsChosenId.push(cardId);
  this.classList.add("flip");
  const flipSound = new Audio("pop.mp3");
  flipSound.play();

  if (cardsChosen.length === 2) {
    setTimeout(checkForMatch, 500);
  }
}
  
  function checkForMatch() {
  const cards = document.querySelectorAll(".card");
  const cardId1 = cardsChosenId[0];
  const cardId2 = cardsChosenId[1];
  if (cardsChosen[0] === cardsChosen[1]) {
  cards[cardId1].classList.add("match");
  cards[cardId2].classList.add("match");
  cardsWon.push(cardsChosen);
  } else {
  cards[cardId1].classList.remove("flip");
  cards[cardId2].classList.remove("flip");
  const mismatchSound = new Audio("mismatch.mp3");
  mismatchSound.play();
  }
  cardsChosen = [];
  cardsChosenId = [];
  moves++;
  if (cardsWon.length === cardArray.length / 2) {
    clearInterval(timer);
    showPopUp("Congratulations! You've matched all the cards!");
  }
  }
  
  createBoard();