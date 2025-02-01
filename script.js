// Light Dark Theme Controller
const light_dark_btn = document.getElementById('theme-toggle-btn');
const light_dark = document.getElementById('theme-style');

light_dark_btn.addEventListener('click', () => {
    console.log(light_dark.getAttribute('href'));
    if(light_dark.getAttribute('href') === './light.css') {
        light_dark.setAttribute('href', './dark.css');
    }
    else{
        light_dark.setAttribute('href', './light.css');
    }
});

// Initializing the Variables
const cells = document.querySelectorAll('.cell');
const reset = document.getElementById('reset');
const gameContainer = document.getElementById('game-container');
const winnerBox = document.getElementById('winner-box');
const winnerMessage = document.getElementById('winner-message');
const newGame = document.getElementById('new-game');
const winCom = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
]
let board = Array(9).fill(-1);
let currentPlayer = 'X';


// Playing the Game
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        // console.log(`${cell.id}, ${index}`);
        if(currentPlayer === 'X') {
            board[index] = 'X';
            cell.textContent = 'X';
            cell.style.pointerEvents = 'none';
            checkWinner(currentPlayer);
            currentPlayer = 'O';
        }
        else{
            board[index] = 'O';
            cell.textContent = 'O';
            cell.style.pointerEvents = 'none';
            checkWinner(currentPlayer);
            currentPlayer = 'X';
        }
    })
})

// Reset the Game
reset.addEventListener('click', () => {
    resetGame();
})

// Check Winner
function checkWinner(player){
    let = flag = 0;
    for(let i=0; i<winCom.length; i++){
        if(board[winCom[i][0]] === player && board[winCom[i][1]] === player && board[winCom[i][2]] === player){
            flag = 1;
            break;
        }
    }
    if(flag){
        displayWinner(player);
    }
    else{
        checkEndGame();
    }
}

// Check if the Game is Over
function checkEndGame(){
    let flag = 1;
    for(let i=0; i<board.length; i++){
        if(board[i] === -1){
            flag = 0;
            break;
        }
    }
    if(flag){
        displayWinner('Draw');
    }
}

// Display Winner
function displayWinner(player){
    gameContainer.style.display = 'none';
    winnerBox.style.display = 'block';
    if(player==='Draw'){
        winnerMessage.textContent = `It's a Draw!`;
    }
    else{
        winnerMessage.textContent = `Player ${player} Wins!`;
    }
    newGame.addEventListener('click', () => {
        resetGame();
    });
}

// Reset the Game
function resetGame(){
    board = Array(9).fill(-1);
    currentPlayer = 'X';
    gameContainer.style.display = 'block';
    winnerBox.style.display = 'none';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.pointerEvents = 'auto';
    });
}
