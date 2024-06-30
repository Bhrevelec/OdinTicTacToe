//gameboard IIFE
const gameboard = function () {
  let board = [];
  for (let i = 0; i < 3; i++) {
    board[i] = [];
    for (let j = 0; j < 3; j++) {
      board[i].push(cell());
    }
  }

  const getBoard = () => {
    return board;
  };

  const resetBoard = () => {
    board = [];
    for (let i = 0; i < 3; i++) {
      board[i] = [];
      for (let j = 0; j < 3; j++) {
        board[i].push(cell());
      }
    }
  };

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

  const checkDraw = () => {
    if (
      board[0][0].getValue() !== 0 &&
      board[0][1].getValue() !== 0 &&
      board[0][2].getValue() !== 0 &&
      board[1][0].getValue() !== 0 &&
      board[1][1].getValue() !== 0 &&
      board[1][2].getValue() !== 0 &&
      board[2][0].getValue() !== 0 &&
      board[2][1].getValue() !== 0 &&
      board[2][2].getValue() !== 0
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

  return {
    getBoard,
    resetBoard,
    showBoard,
    placeToken,
    checkAvailability,
    checkWin,
    checkDraw,
  };
};

const gameFlow = (function (player1 = "Mario", player2 = "Luigi") {
  const players = [
    { name: player1, token: "X" },
    { name: player2, token: "O" },
  ];

  const board = gameboard();

  const getBoard = () => {
    return board;
  };

  const inputPlayerName = (position, playerName) => {
    players[position].name = playerName;
  };

  let activePlayer = players[0];

  const getActivePlayer = () => {
    return activePlayer;
  };

  const changeActivePlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const changeToDefaultPlayer = () => {
    activePlayer = players[0];
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
        return "win";
      } else if (board.checkDraw()) {
        console.log("It's a tie.");
        return "tie";
      }
      changeActivePlayer();
      printNewRound();
    } else {
      console.log("This position is already taken. Let's try again...");
      printNewRound();
    }
  };
  return {
    playRound,
    printNewRound,
    inputPlayerName,
    getActivePlayer,
    changeToDefaultPlayer,
    getBoard,
  };
})();

gameFlow.printNewRound();

const screenController = (function () {
  const buttons = document.querySelectorAll(".gameboardPosition");
  let gameEnded = false;
  let namesInputDone = false;
  const resultBanner = document.querySelector(".resultBanner");

  const inputPlayer1 = document.querySelector("#inputPlayer1");
  const inputPlayer2 = document.querySelector("#inputPlayer2");
  const inputButton = document.querySelector("#inputButton");
  const checkMark = document.querySelector("svg");
  inputButton.addEventListener("click", () => {
    if (inputPlayer1.value !== "" && inputPlayer2.value !== "") {
      gameFlow.inputPlayerName(0, inputPlayer1.value);
      gameFlow.inputPlayerName(1, inputPlayer2.value);
      if (!namesInputDone) {
        checkMark.classList.toggle("hidden");
      }
      namesInputDone = true;
    }
  });

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      if (
        gameFlow
          .getBoard()
          .checkAvailability(
            event.target.getAttribute("data-row"),
            event.target.getAttribute("data-col")
          ) &&
        !gameEnded
      ) {
        event.target.textContent = gameFlow.getActivePlayer().token;
        let result = gameFlow.playRound(
          event.target.getAttribute("data-row"),
          event.target.getAttribute("data-col")
        );
        if (result === "win") {
          gameEnded = true;
          resultBanner.innerHTML = `${
            gameFlow.getActivePlayer().name
          } wins the game! <br>Push the reset button to restart.`;
          resultBanner.classList.toggle("hidden");
        } else if (result === "tie") {
          gameEnded = true;
          resultBanner.innerHTML = `It's a tie! <br>Push the reset button to restart.`;
          resultBanner.classList.toggle("hidden");
        }
      }
    });
  });

  const resetButton = document.querySelector(".resetButton");
  resetButton.addEventListener("click", () => {
    gameEnded = false;
    gameFlow.getBoard().resetBoard();
    gameFlow.changeToDefaultPlayer();
    buttons.forEach((button) => {
      button.textContent = "";
    });
    if (!resultBanner.classList.contains("hidden")) {
      resultBanner.innerHTML = "";
      resultBanner.classList.toggle("hidden");
    }
    if (!checkMark.classList.contains("hidden")) {
      gameFlow.inputPlayerName(0, "player1");
      gameFlow.inputPlayerName(1, "player2");
      checkMark.classList.toggle("hidden");
      namesInputDone = false;
    }
  });
})();
