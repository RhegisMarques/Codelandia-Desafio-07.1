// Seleção de imagens para as cartas
const img = [
  '1.svg', '2.svg', '3.svg', '4.svg',
  '5.svg', '6.svg', '7.svg', '8.svg', '9.svg'
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
    card.dataset.img = img;

    const cardImage = document.createElement('img');
    cardImage.src = `./img/${img}`;
    card.appendChild(cardImage);

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

// Reseta o jogo e embaralha novamente as cartas
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