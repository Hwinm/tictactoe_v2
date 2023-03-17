let currentPlayer = "X";
let gameEnded = false;
let board = new Array(9).fill("");
const squares = document.querySelectorAll(".square");
const message = document.getElementById("message");
const resetButton = document.getElementById("reset");
function init() {
  board = new Array(9).fill("");
  gameEnded = false;
  message.innerText = "";
  currentPlayer = "X";
  updateBoard();
}
function updateBoard() {
  squares.forEach((square, index) => {
    square.textContent = board[index];
  });
}
function makeMove(index) {
  if (gameEnded || board[index])
    return;
  board[index] = currentPlayer;
  updateBoard();
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  const isWinningCombo = (combo) => {
    return combo.every((i) => board[i] === currentPlayer);
  };
  if (winningCombos.some(isWinningCombo)) {
    message.innerText = `${currentPlayer} wins!`;
    gameEnded = true;
    return;
  }
  if (board.every((square) => square)) {
    message.innerText = "Tie!";
    gameEnded = true;
    return;
  }
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}
squares.forEach((square, index) => {
  square.addEventListener("click", () => makeMove(index));
});
resetButton.addEventListener("click", init);
init();
