const tictactoe = (function () {
  // private variable and functions

  let board = [
    [1, 2, 3],
    [3, 4, 5],
    [6, 7, 8],
  ];

  let currentPlayer = "x";
  let gameover = false;
  let round = 0;

  // function that check rows and column for a win

  const checkWin = () => {
    for (let i = 0; i < board.length; i++) {
      if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        console.log(`${currentPlayer} wins `);
        updateDisplay();
        gameover = true;

        return true;
      }
    }

    for (let i = 0; i < board.length; i++) {
      if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        console.log(`${currentPlayer} wins `);
        updateDisplay();
        gameover = true;

        return true;
      }
    }

    if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      console.log(`${currentPlayer} wins `);
      updateDisplay();
      gameover = true;

      return true;
    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      console.log(`${currentPlayer} wins `);
      updateDisplay();
      gameover = true;

      return true;
    }

    const cells = document.querySelectorAll("[data-cell]");
    for (const cell of cells) {
      if (!cell.textContent) {
        return false;
      }
    }

    const win = document.querySelector(".win");
    win.innerHTML = "Its a draw";
  };

  const updateDisplay = () => {
    const win = document.querySelector(".win");
    win.innerHTML = `${currentPlayer} wins `;
  };

  // Public function and variables

  const alternatePlayer = () => {
    if (currentPlayer === "x") {
      currentPlayer = "o";
    } else if (currentPlayer === "o") {
      currentPlayer = "x";
    }
  };

  const playerMove = () => {
    let cellClicked = 0;

    const cellElements = document.querySelectorAll("[data-cell]");
    cellElements.forEach((cell) => {
      cell.addEventListener("click", handleclick, { once: true });
    });
    function handleclick(e) {
      if (gameover === true) {
        cell.removeEventListener("click", handleclick);
        round = 0;
        return;
      } else {
        const id = e.target.id;
        const cell = document.getElementById(id);
        cell.innerHTML = currentPlayer;

        const row = Math.floor((id - 1) / 3);
        const col = (id - 1) % 3;
        board[row][col] = currentPlayer;

        round = round + 1;
        console.log(round);
        checkWin(board);
        alternatePlayer(currentPlayer);
      }
    }
  };

  const restart = () => {
    currentPlayer = "x";
    board = [
      [1, 2, 3],
      [3, 4, 5],
      [6, 7, 8],
    ];
    gameover = false;
    const cells = document.querySelectorAll("[data-cell]");
    cells.forEach((cell) => {
      cell.textContent = "";
    });
    round = 0;
    const win = document.querySelector(".win");
    win.innerHTML = "Let's do this !";
  };

  return {
    checkWin,
    playerMove,
    alternatePlayer,
    updateDisplay,
    restart,
  };
})();

const startgame = (function () {
  let game = tictactoe;
  const start = () => {
    game.restart();
    game.playerMove();
  };
  const restart = () => {
    game.restart();
    game.playerMove();
  };
  return { start, restart };
})();

startgame.start();
