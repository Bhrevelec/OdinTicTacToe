//gameboard IIFE
const gameboard = (function () {
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
})();
