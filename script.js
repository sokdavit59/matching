const gameBoard = document.getElementById("gameBoard");
const startButton = document.getElementById("startButton");
const messageElement = document.getElementById("message");

const cardValues = ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F"];
let cards = [];
let selectedCards = [];
let matchedPairs = 0;
let gameStarted = false;

// Shuffle the card values
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Create and display cards
function createCards() {
    shuffleArray(cardValues);
    gameBoard.innerHTML = "";
    cards = [];
    for (let i = 0; i < cardValues.length; i++) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.value = cardValues[i];
        card.textContent = "?";
        card.addEventListener("click", () => revealCard(card));
        gameBoard.appendChild(card);
        cards.push(card);
    }
}

// Reveal a card
function revealCard(card) {
    if (!gameStarted || card.classList.contains("matched") || selectedCards.length >= 2) {
        return;
    }

    card.textContent = card.dataset.value;
    card.classList.add("revealed");
    selectedCards.push(card);

    if (selectedCards.length === 2) {
        setTimeout(checkMatch, 1000);
    }
}

// Check if the selected cards match
function checkMatch() {
    if (selectedCards[0].dataset.value === selectedCards[1].dataset.value) {
        selectedCards[0].classList.add("matched");
        selectedCards[1].classList.add("matched");
        selectedCards = [];
        matchedPairs++;

        if (matchedPairs === cardValues.length / 2) {
            messageElement.textContent = "Congratulations! You've matched all pairs!";
            setTimeout(() => {
                createCards();
                messageElement.textContent = "";
                gameStarted = false;
            }, 2000);
        }
    } else {
        selectedCards.forEach(card => {
            card.textContent = "?";
            card.classList.remove("revealed");
        });
        selectedCards = [];
    }
}

// Start the game
startButton.addEventListener("click", () => {
    createCards();
    matchedPairs = 0;
    gameStarted = true;
});
