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

  const checkAvailability = (row, col) => {
    if (board[row][col].getValue() === 0) {
      return true;
    } else {
      return false;
    }
  };

  const checkWin = () => {
    if (
      (board[0][0].getValue() === board[0][1].getValue() &&
        board[0][0].getValue() === board[0][2].getValue() &&
        board[0][1].getValue() === board[0][2].getValue() &&
        board[0][0].getValue() !== 0) ||
      (board[1][0].getValue() === board[1][1].getValue() &&
        board[1][0].getValue() === board[1][2].getValue() &&
        board[1][1].getValue() === board[1][2].getValue() &&
        board[1][0].getValue() !== 0) ||
      (board[2][0].getValue() === board[2][1].getValue() &&
        board[2][0].getValue() === board[2][2].getValue() &&
        board[2][1].getValue() === board[2][2].getValue() &&
        board[2][0].getValue() !== 0)
    ) {
      return true;
    } else if (
      (board[0][0].getValue() === board[1][0].getValue() &&
        board[0][0].getValue() === board[2][0].getValue() &&
        board[1][0].getValue() === board[2][0].getValue() &&
        board[0][0].getValue() !== 0) ||
      (board[0][1].getValue() === board[1][1].getValue() &&
        board[0][1].getValue() === board[2][1].getValue() &&
        board[1][1].getValue() === board[2][1].getValue() &&
        board[0][1].getValue() !== 0) ||
      (board[0][2].getValue() === board[1][2].getValue() &&
        board[0][2].getValue() === board[2][2].getValue() &&
        board[1][2].getValue() === board[2][2].getValue() &&
        board[0][2].getValue() !== 0)
    ) {
      return true;
    } else if (
      (board[0][0].getValue() === board[1][1].getValue() &&
        board[0][0].getValue() === board[2][2].getValue() &&
        board[1][1].getValue() === board[2][2].getValue() &&
        board[0][0].getValue() !== 0) ||
      (board[2][0].getValue() === board[1][1].getValue() &&
        board[2][0].getValue() === board[0][2].getValue() &&
        board[1][1].getValue() === board[0][2].getValue() &&
        board[2][0].getValue() !== 0)
    ) {
      return true;
    }
    return false;
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

  return { showBoard, placeToken, checkAvailability, checkWin };
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
    if (board.checkAvailability(row, col)) {
      board.placeToken(row, col, activePlayer.token);
      if (board.checkWin()) {
        console.log(`${activePlayer.name} wins.`);
        return;
      }
      changeActivePlayer();
      printNewRound();
    } else {
      console.log("This position is already taken. Let's try again...");
      printNewRound();
    }
  };
  return { playRound, printNewRound };
})();

gameFlow.printNewRound();
