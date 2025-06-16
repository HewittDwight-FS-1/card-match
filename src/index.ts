import "./index.scss";
import cardBack from "../assets/card-back.png";

const cards = ["A", "A", "B", "B", "C", "C"];
let attempts = 3;
let flipped: HTMLElement[] = [];

function shuffle(array: string[]) {
  return array.sort(() => 0.5 - Math.random());
}

function createCard(letter: string): HTMLElement {
  const card = document.createElement("div");
  card.className = "card";
  card.setAttribute("data-letter", letter);
  card.style.backgroundImage = `url(${cardBack})`;
  card.addEventListener("click", () => handleFlip(card));
  return card;
}

function handleFlip(card: HTMLElement): void {
  if (
    flipped.length < 2 &&
    !card.classList.contains("matched") &&
    !flipped.includes(card)
  ) {
    card.classList.add("flipped");
    card.textContent = card.getAttribute("data-letter") || "";
    card.style.backgroundImage = "none";
    flipped.push(card);

    if (flipped.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

function checkMatch(): void {
  const [card1, card2] = flipped;

  if (card1.getAttribute("data-letter") === card2.getAttribute("data-letter")) {
    card1.classList.add("matched");
    card2.classList.add("matched");
  } else {
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
    card1.textContent = "";
    card2.textContent = "";
    card1.style.backgroundImage = `url(${cardBack})`;
    card2.style.backgroundImage = `url(${cardBack})`;
    attempts--;
    document.getElementById(
      "attempts"
    )!.textContent = `Attempts left: ${attempts}`;
  }

  flipped = [];
  checkWinOrLose();
}

function checkWinOrLose() {
  const unmatched = document.querySelectorAll(".card:not(.matched)");
  const result = document.getElementById("result")!;
  const restart = document.getElementById("restart")!;

  if (unmatched.length === 0) {
    result.textContent = "You Won!";
    result.hidden = false;
    restart.hidden = false;
  } else if (attempts === 0) {
    result.textContent = "You Lost!";
    result.hidden = false;
    restart.hidden = false;
  }
}

function restartGame(): void {
  document.getElementById("game-board")!.innerHTML = "";
  document.getElementById("result")!.hidden = true;
  document.getElementById("restart")!.hidden = true;
  attempts = 3;
  document.getElementById(
    "attempts"
  )!.textContent = `Attempts left: ${attempts}`;
  setupGame();
}

function setupGame(): void {
  const board = document.getElementById("game-board")!;
  const shuffled = shuffle([...cards]);
  shuffled.forEach((letter) => {
    const card = createCard(letter);
    board.appendChild(card);
  });
}

document.getElementById("restart")!.addEventListener("click", restartGame);
setupGame();
