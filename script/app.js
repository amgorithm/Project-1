function init() {
  // * Elements
  const grid = document.querySelector(".grid");
  const cells = [];
  const start = document.querySelector("#start-btn");
  const modal = document.querySelector(".modal");
  const scoreDisplay = document.querySelector(".score");
  const replayBtn = document.querySelector(".replay");

  // * Variables and snake
  let snake = [2, 1, 0];
  let snakeSpeed = 600;
  let snakeTimer;
  let snakeDirection = "right";
  let snakePosition = 4;
  let appleTimer;
  let applePosition = 10;
  let score = 0;
  let gameStarted = false;

  // * Grid creation
  const width = 20;
  const cellCount = width * width;

  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      grid.append(cell);
      cells.push(cell);
    }
  }
  createGrid();

  // * Execution

  function startGame() {
    if (!gameStarted) {
      console.log("test");
      gameStarted = true;
      apple();
      grid.style.background = "#7A9D0F";
      appleTimer = setInterval(apple, 20000);
      snakeTimer = setInterval(moveSnake, snakeSpeed);
    }
  }

  function getNewCell() {
    if (snakeDirection === "left") {
      if (snakePosition % width === 0) {
        gameOver();
      }
      return snake[0] - 1;
    } else if (snakeDirection === "right") {
      if (snakePosition % width === width - 1) {
        gameOver();
      }
      return snake[0] + 1;
    } else if (snakeDirection === "up") {
      if (snakePosition <= width) {
        gameOver();
      }
      return snake[0] - width;
    } else if (snakeDirection === "down") {
      if (snakePosition + width >= cellCount) {
        gameOver();
      }
      return snake[0] + width;
    } else {
      return `Invalid`;
    }
  }

  function moveSnake() {
    snake.forEach((element) => {
      cells[element].classList.add("snakeImage");
    });

    let newCell = getNewCell();

    let tail = snake.pop();

    cells[tail].classList.remove("snakeImage");

    snake.unshift(newCell);

    if (cells[newCell]) {
      cells[newCell].classList.add("snakeImage");
    }

    snakePosition = newCell;

    appleEaten();

    selfCrash();
  }

  function apple() {
    cells[applePosition].classList.remove("apple");
    applePosition = Math.floor(Math.random() * cells.length);
    cells[applePosition].classList.add("apple");
  }

  function appleEaten() {
    if (applePosition === snakePosition) {
      snake.push(1);
      apple();
      score += 7;
      scoreDisplay.innerText = score;
      clearInterval(snakeTimer);
      snakeSpeed = snakeSpeed - 20;
      snakeTimer = setInterval(moveSnake, snakeSpeed);
    }
  }

  function handleKeyUp(e) {
    if (gameStarted) {
      const key = e.keyCode;
      let left = 37;
      let right = 39;
      let up = 38;
      let down = 40;

      if (key === left && snakeDirection !== "right") {
        snakeDirection = "left";
      } else if (key === right && snakeDirection !== "left") {
        snakeDirection = "right";
      } else if (key === up && snakeDirection !== "down") {
        snakeDirection = "up";
      } else if (key === down && snakeDirection !== "up") {
        snakeDirection = "down";
      } else {
        return `Invalid`;
      }

      if (snakeDirection === "left") {
        if (snakePosition % width === 0) {
          gameOver();
        }
      } else if (snakeDirection === "right") {
        if (snakePosition % width === width - 1) {
          gameOver();
        }
      } else if (snakeDirection === "up") {
        if (snakePosition <= width) {
          gameOver();
        }
      } else if (snakeDirection === "down") {
        if (snakePosition + width >= cellCount) {
          gameOver();
        }
      } else {
        return `Invalid`;
      }
    }
  }

  function selfCrash() {
    let snakeBody = snake.slice(1);

    if (snakeBody.includes(snakePosition)) {
      gameOver();
    }
  }

  function gameOver() {
    clearInterval(snakeTimer);
    clearInterval(appleTimer);
    snake.forEach((element) => {
      cells[element].classList.remove("snakeImage");
    });
    cells[applePosition].classList.remove("apple");
    modal.style.visibility = "visible";
    scoreDisplay.innerText = score;
  }

  function playAgain() {
    location.reload();
  }

  //* Events

  start.addEventListener("click", startGame);
  document.addEventListener("keyup", handleKeyUp);
  replayBtn.addEventListener("click", playAgain);
}

window.addEventListener("DOMContentLoaded", init);
