//gameboard IIFE
const gameboard = function () {
  const board = [];
  for (let i = 0; i < 3; i++) {
    board[i] = [];
    for (let j = 0; j < 3; j++) {
      board[i].push(cell());
    }
  }

  const showBoard = () => {
    console.log(board.map((row) => row.map((cell) => cell.getValue())));
  };

  const placeToken = (row, col, val) => {
    board[row][col].setValue(val);
  };

  function cell() {
    let value = 0;
    const setValue = (newValue) => {
      value = newValue;
    };
    const getValue = () => {
      return value;
    };
    return { setValue, getValue };
  }

  return { showBoard, placeToken };
};

const gameFlow = (function (player1 = "Mario", player2 = "Luigi") {
  const players = [
    { name: player1, token: "X" },
    { name: player2, token: "O" },
  ];

  const board = gameboard();

  let activePlayer = players[0];

  const changeActivePlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const printNewRound = () => {
    console.log(`It's ${activePlayer.name}'s turn:`);
    board.showBoard();
  };

  const playRound = (row, col) => {
    board.placeToken(row, col, activePlayer.token);
    changeActivePlayer();
    printNewRound();
  };
  return { playRound, printNewRound };
})();

gameFlow.printNewRound();
