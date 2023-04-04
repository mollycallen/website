class Player {
  constructor(name) {
    this.name = name;
    this.number = Game.userNumber;
  }
  makeMove(cell, board) {
    cell.innerText = this.name;
    cell.classList.remove("available");

    cell.classList.add(this.name.toLowerCase() + "-select");

    // get cell's corresponding index and mark the game board
    const cellId = cell.getAttribute("id");
    const cellNum = parseInt(cellId.substring(1));
    board[cellNum] = this.number;
    //console.log(board);
  }
}
class Computer extends Player {
  constructor(name) {
    super(name);
    this.number = Game.computerNumber;
  }

  getRandomMove(board) {
    // returns the index ib the board array of a random available move

    // used to store all available moves
    let moves = [];

    // fill array with preferred moves, if available
    // corners and center are preferred
    if (board[4] === 0) {
      moves.push(4);
    }
    if (board[0] === 0) {
      moves.push(0);
    }
    if (board[2] === 0) {
      moves.push(2);
    }
    if (board[6] === 0) {
      moves.push(6);
    }
    if (board[8] === 0) {
      moves.push(8);
    }

    // if no preferred moves available, add all available moves
    if (moves.length === 0) {
      for (let i = 0; i < board.length; i++) {
        if (board[i] === 0) {
          moves.push(i);
        }
      }
    }
    // randomly select a move
    const selected = Math.floor(Math.random() * moves.length);
    return moves[selected];
  }

  getSmartMove(board) {
    // returns the index on the board for next move

    // flag used to determine if a smart move was found
    let selected = 100;

    // for each possible winning row, check for possible win or block
    for (const row of Game.winningRows) {
      //Game.winningRows.forEach((row) => {
      const sum = board[row[0]] + board[row[1]] + board[row[2]];

      // if win possible
      if (sum === 20) {
        if (board[row[0]] === 0) {
          selected = row[0];
        } else if (board[row[1]] === 0) {
          selected = row[1];
        } else if (board[row[2]] === 0) {
          selected = row[2];
        }
        break;
        // go for block
      } else if (sum === 2) {
        if (board[row[0]] === 0) {
          selected = row[0];
        } else if (board[row[1]] === 0) {
          selected = row[1];
        } else if (board[row[2]] === 0) {
          selected = row[2];
        }
      }
    }
    // });

    // if no block or win availabe, get random move
    if (selected === 100) {
      selected = this.getRandomMove(board);
    }
    return selected;
  }

  makeMove(board) {
    const cellId = "c" + this.getSmartMove(board);
    const cell = document.getElementById(cellId);
    super.makeMove(cell, board);
  }
}

class Game {
  // winning "rows"
  static winningRows = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  static userNumber = 1;
  static computerNumber = 10;
  constructor() {
    this.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.turnCount = 0;
    this.gameOver = false;
    this.winner = "";
    this.scores = {
      user: 0,
      computer: 0,
      draw: 0,
    };
  }

  setupNewGame() {
    this.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.turnCount = 0;
    this.gameOver = false;
    this.winner = "";

    const scoreList = document.querySelectorAll(".score-container");
    scoreList.forEach((element) => {
      element.classList.remove("highlight");
    });
    const cellList = document.querySelectorAll(".cell");
    cellList.forEach((cell) => {
      cell.innerText = "";
      cell.classList.remove("x-select");
      cell.classList.remove("o-select");
      cell.classList.remove("x-win");
      cell.classList.remove("o-win");

      cell.classList.add("available");
      //console.log(cell);
    });
  }

  checkStatus() {
    // game is over if no  more available moves or
    // if someone wins
    // first, check if no more available moves
    if (this.turnCount === 9) {
      this.gameOver = true;
      this.scores.draw++;
      this.winner = "draw";
    }

    // second,did someone win?
    // for each winning row, add user's points
    // the user will winning sum will be

    Game.winningRows.forEach((row) => {
      const sum = this.board[row[0]] + this.board[row[1]] + this.board[row[2]];

      // x (user) won
      if (sum === 3) {
        this.gameOver = true;
        this.scores.user++;
        this.winner = "user";
        this.displayWinningRow(row);
      } else if (sum === 30) {
        // else if y (computer) won
        this.gameOver = true;
        this.scores.computer++;
        this.winner = "computer";
        this.displayWinningRow(row);
      }
    });

    if (this.gameOver) {
      this.updateScores();
      this.disableBoard();
    }
  }

  updateScores() {
    if (this.winner === "draw") {
      const draw = document.querySelector(".draw-score");
      draw.innerText = this.scores.draw;
      draw.parentElement.classList.add("highlight");
    } else if (this.winner === "user") {
      const xUser = document.querySelector(".user-score");
      xUser.innerText = this.scores.user;
      xUser.parentElement.classList.add("highlight");
    } else if (this.winner === "computer") {
      const oComputer = document.querySelector(".computer-score");
      oComputer.innerText = this.scores.computer;
      oComputer.parentElement.classList.add("highlight");
    }
  }

  displayWinningRow(row) {
    row.forEach((element) => {
      const cell = document.getElementById("c" + element);
      if (cell.innerText === "X") {
        cell.classList.remove("x-select");
        cell.classList.add("x-win");
      } else {
        cell.classList.remove("o-select");
        cell.classList.add("o-win");
      }
    });
  }

  disableBoard() {
    const cellList = document.querySelectorAll(".cell");
    cellList.forEach((cell) => {
      cell.classList.remove("available");
    });
  }
}

// create game
const user = new Player("X");
const computer = new Computer("O");
let startingPlayer = user;
const game = new Game();

// add event listeners
const cellList = document.querySelectorAll(".cell");
cellList.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (!game.gameOver) {
      game.turnCount++;
      user.makeMove(cell, game.board);
      game.checkStatus();
      if (!game.gameOver) {
        // add a small delay
        setTimeout(() => {
          game.turnCount++;
          computer.makeMove(game.board);
          game.checkStatus();
        }, 250);
      }
    }
  });
});

const playBtn = document.querySelector(".play-btn");
playBtn.addEventListener("click", () => {

  game.setupNewGame();
  if (startingPlayer === user) {
    startingPlayer = computer;
    // add a small delay
    setTimeout(() => {
      game.turnCount++;
      computer.makeMove(game.board);
    }, 500);
  } else {
    startingPlayer = user;
  }
});
