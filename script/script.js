const statusDisp = document.querySelector('.game_stat');
const currentPlayerDisp = document.querySelector('.current_player');
let gameActive = true;
let currentPlayer = 'X';
let gameStat = ['', '', '', '', '', '', '', '', ''];
const winningCond = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const message = {
  win: () => {
    return `Player ${currentPlayer} has Won!`;
  },
  draw: () => {
    return `Game ended in Draw!`;
  },
  playerTurn: () => {
    return `It's ${currentPlayer}'s Turn!`;
  },
};

currentPlayerDisp.innerHTML = message.playerTurn();

const handleBoxPlayed = (clickedBox, clickedBoxIndex) => {
  gameStat[clickedBoxIndex] = currentPlayer;
  clickedBox.innerHTML = currentPlayer;
};

const handlePlayerChanged = () => {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  currentPlayerDisp.innerHTML = message.playerTurn();
};

const handleResultValid = () => {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCond = winningCond[i];
    let a = gameStat[winCond[0]];
    let b = gameStat[winCond[1]];
    let c = gameStat[winCond[2]];
    if (a === '' || b === '' || c === '') {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    statusDisp.innerHTML = message.win();
    gameActive = false;
    return;
  }

  let roundDraw = !gameStat.includes('');
  if (roundDraw) {
    statusDisp.innerHTML = message.draw();
    gameActive = false;
    return;
  }

  handlePlayerChanged();
};

const handleBoxClick = (e) => {
  const clickedBox = e.target;

  const clickedBoxIndex = parseInt(clickedBox.getAttribute('data-box-index'));

  if (gameStat[clickedBoxIndex] !== '' || !gameActive) {
    return;
  }

  handleBoxPlayed(clickedBox, clickedBoxIndex);
  handleResultValid();
};

const handleRestartBtn = () => {
  gameActive = true;
  currentPlayer = 'X';
  gameStat = ['', '', '', '', '', '', '', '', ''];
  currentPlayerDisp.innerHTML = message.playerTurn();
  document.querySelectorAll('.box').forEach((box) => (box.innerHTML = ''));
};

document
  .querySelectorAll('.box')
  .forEach((box) => box.addEventListener('click', (e) => handleBoxClick(e)));
document
  .querySelector('.game_restart')
  .addEventListener('click', (e) => handleRestartBtn());
