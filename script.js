let board;
const playerO = "O";
const playerX = "X";
let currentPlayer = playerX;
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('resetButton');

startGame();

function startGame() {
    board = Array.from(Array(9).keys());
    cells.forEach(cell => {
        cell.innerText = '';
        cell.style.removeProperty('background-color');
        cell.addEventListener('click', handleClick, false);
    });
    message.innerText = `${currentPlayer}'s turn`;
}

function handleClick(square) {
    if (typeof board[square.target.dataset.index] === 'number') {
        turn(square.target.dataset.index, currentPlayer);
        if (!checkWin(board, currentPlayer) && !checkTie()) {
            currentPlayer = currentPlayer === playerX ? playerO : playerX;
            message.innerText = `${currentPlayer}'s turn`;
        }
    }
}

function turn(squareId, player) {
    board[squareId] = player;
    document.querySelector(`[data-index='${squareId}']`).innerText = player;
    let gameWon = checkWin(board, player);
    if (gameWon) gameOver(gameWon);
}

function checkWin(board, player) {
    let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    for (let [index, win] of winCombos.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = {index: index, player: player};
            break;
        }
    }
    return gameWon;
}

function gameOver(gameWon) {
    for (let index of winCombos[gameWon.index]) {
        document.querySelector(`[data-index='${index}']`).style.backgroundColor =
            gameWon.player === playerX ? "blue" : "red";
    }
    cells.forEach(cell => cell.removeEventListener('click', handleClick, false));
    message.innerText = `${gameWon.player} wins!`;
}

function checkTie() {
    if (board.every(s => typeof s !== 'number')) {
        cells.forEach(cell => {
            cell.style.backgroundColor = "green";
            cell.removeEventListener('click', handleClick, false);
        });
        message.innerText = "It's a tie!";
        return true;
    }
    return false;
}

resetButton.addEventListener('click', startGame);

const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
