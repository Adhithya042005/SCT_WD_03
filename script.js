const board = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('game-status');
const resetButton = document.getElementById('reset-button');

let currentPlayer = 'X';  // 'X' is the player, 'O' is the computer
let gameBoard = ['', '', '', '', '', '', '', '', ''];  // Tracks the game state

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
];

const checkWin = (player) => {
    return winPatterns.some(pattern => {
        return pattern.every(index => gameBoard[index] === player);
    });
};

const handleCellClick = (event) => {
    const index = event.target.dataset.index;
    
    if (gameBoard[index] === '') {
        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        event.target.classList.add('taken');
        
        if (checkWin(currentPlayer)) {
            gameStatus.textContent = `${currentPlayer} wins!`;
            return;
        }
        
        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
        
        if (currentPlayer === 'O') {
            setTimeout(computerMove, 500);
        }
    }
};

const computerMove = () => {
    const availableMoves = gameBoard.map((cell, index) => cell === '' ? index : null).filter(item => item !== null);
    
    if (availableMoves.length > 0) {
        const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        gameBoard[randomMove] = 'O';
        board[randomMove].textContent = 'O';
        board[randomMove].classList.add('taken');
        
        if (checkWin('O')) {
            gameStatus.textContent = 'Computer (O) wins!';
            return;
        }
        
        currentPlayer = 'X';  // Switch to player
    }
};

const resetGame = () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    board.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken');
    });
    gameStatus.textContent = '';
};

board.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);
