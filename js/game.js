// Seleção de imagens para as cartas
const img = [
  '../img/1.svg', '../img/2.svg', '../img/3.svg', '../img/4.svg',
  '../img/5.svg', '../img/6.svg', '../img/7.svg', '../img/8.svg', '../img/9.svg'
];

// Duplicando o array para ter pares de cartas
let cardsArray = [...img, ...img];

// Embaralha o array de cartas
cardsArray.sort(() => 0.5 - Math.random());


const gameBoard = document.getElementById('gameBoard');
const winMessage = document.getElementById('winMessage');
const restartButton = document.getElementById('restartButton');

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;

// Função para criar as cartas no tabuleiro
function createBoard() {
  gameBoard.innerHTML = ''; // Limpa o tabuleiro antes de criar as cartas
  cardsArray.forEach((img) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    cardFront.innerHTML = '<p>?</p>'; // Exibição da frente da carta

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    const cardImage = document.createElement('img');
    cardImage.src = `../img/${img}`;
    cardBack.appendChild(cardImage);

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    card.dataset.img = img;

    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

// Função para virar a carta
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flipped');

  if (!firstCard) {
    // Primeira carta selecionada
    firstCard = this;
  } else {
    // Segunda carta selecionada
    secondCard = this;
    checkForMatch();
  }
}


// Verifica se as cartas combinam
function checkForMatch() {
  const isMatch = firstCard.dataset.img === secondCard.dataset.img;

  isMatch ? disableCards() : unflipCards();
}

// Desabilita as cartas combinadas
function disableCards() {
  firstCard.classList.add('matched');
  secondCard.classList.add('matched');

  resetBoard();

  matches += 2;
  if (matches === cardsArray.length) {
    setTimeout(showWinMessage, 500);
  }
}

// Desvira as cartas se não combinarem
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');

    resetBoard();
  }, 1000);
}

// Reseta as variáveis de controle
function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

// Exibe a mensagem de vitória e o desfoque no fundo
function showWinMessage() {
  winMessage.style.display = 'block';
  gameBoard.classList.add('blur'); // Aplica o desfoque ao game-board
  
}

// Reseta o jogo e embaralha novamente as imagens
function restartGame() {
  winMessage.style.display = 'none';
  gameBoard.classList.remove('blur'); // Remove o desfoque
  matches = 0;
  cardsArray.sort(() => 0.5 - Math.random());
  createBoard();
}


// Inicializa o jogo
createBoard();

// Adiciona o evento ao botão de jogar novamente
restartButton.addEventListener('click', restartGame);