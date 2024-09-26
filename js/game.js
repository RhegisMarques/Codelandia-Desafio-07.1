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
const clickCounter = document.getElementById('clickCounter');
const winMessageParagraph = document.querySelector('.win-message p'); // Seleciona o parágrafo da mensagem de vitória

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;
let clickCount = 0; // Contador de cliques

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
  if (lockBoard) return; // Impede a ação enquanto as cartas estão virando
  if (this === firstCard) return; // Impede o clique na mesma carta duas vezes
  if (this.classList.contains('matched')) return; // Impede que cartas combinadas sejam clicadas novamente

  this.classList.add('flipped'); // Vira a carta

  // Incrementa o contador de cliques
  clickCount++;
  updateClickCounter(); // Atualiza o contador na tela

  if (!firstCard) {
    // Primeira carta selecionada
    firstCard = this;
  } else {
    // Segunda carta selecionada
    secondCard = this;
    checkForMatch();
  }
}

// Atualiza o contador de cliques na tela
function updateClickCounter() {
  clickCounter.textContent = `Cliques: ${clickCount}`;
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

// Exibe a mensagem de vitória com a quantidade de cliques
function showWinMessage() {
  winMessageParagraph.textContent = `Parabéns! Você encontrou todas as combinações em ${clickCount} cliques, Que tal jogar novamente`; // Atualiza a mensagem
  winMessage.style.display = 'block';
  gameBoard.classList.add('blur'); // Aplica o desfoque ao game-board
}

// Reseta o jogo e o contador de cliques
function restartGame() {
  winMessage.style.display = 'none';
  gameBoard.classList.remove('blur'); // Remove o desfoque
  matches = 0;
  clickCount = 0; // Reseta o contador de cliques
  updateClickCounter(); // Atualiza o contador na tela
  cardsArray.sort(() => 0.5 - Math.random());
  createBoard();
}


// Inicializa o jogo
createBoard();

// Adiciona o evento ao botão de jogar novamente
restartButton.addEventListener('click', restartGame);