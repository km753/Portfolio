const cards = document.querySelectorAll('.card');

let firstChoice;
let secondChoice;
let hasFlippedCard = false;
let lockGrid = false;

function flipCard() {
    if (lockGrid) return;
    if (this === firstChoice) return;
    
    this.classList.add('flip');
    
    if (!hasFlippedCard) {

    hasFlippedCard = true;
    firstChoice = this;
        
    return;
        
    }

    hasFlippedCard = false;

    secondChoice = this;
    checkForMatch();
}

function checkForMatch() {
  let isMatch = firstChoice.dataset.paintings === secondChoice.dataset.paintings;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstChoice.removeEventListener('click', flipCard);
  secondChoice.removeEventListener('click', flipCard);

  resetGrid();
}

function unflipCards() {
  lockGrid = true;

  setTimeout(() => {
    firstChoice.classList.remove('flip');
    secondChoice.classList.remove('flip');

    resetGrid();
  }, 1500);
}

function resetGrid() {
  [hasFlippedCard, lockGrid] = [false, false];
  [firstChoice, secondChoice] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
