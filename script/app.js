function init() {
  // * Elements
  const grid = document.querySelector(".grid");
  const gridBackground = document.querySelector(".bg-snake");
  const cells = [];
  const cell = document.querySelector(".cell");
  const start = document.querySelector("#start-btn");
  const modal = document.querySelector(".modal");
  const scoreDisplay = document.querySelector(".score");
  const replayBtn = document.querySelector(".replay");

  // * Variables and snake
  let snake = [2, 1, 0];
  let snakeSpeed = 400;
  let snakeTimer;
  let snakeDirection = "right";
  let snakePosition = 10;
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
    gameStarted = true;
    if (gameStarted) {
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
  getNewCell();

  function moveSnake() {
    snake.forEach((element) => {
      cells[element].classList.add("snakeImage");
    });

    let newCell = getNewCell();

    let tail = snake.pop();

    cells[tail].classList.remove("snakeImage");

    snake.unshift(newCell);

    cells[newCell].classList.add("snakeImage");
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
      console.log("same position");
      snake.push(1);
      apple();
      score += 7;
      scoreDisplay.innerText = score;
      console.log(snakeSpeed);
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
        console.log("Invalid key");
      }

      if (snakeDirection === "left") {
        if (snakePosition % width === 0) {
          console.log("left side");
          gameOver();
        }
      } else if (snakeDirection === "right") {
        if (snakePosition % width === width - 1) {
          console.log("right side");
          gameOver();
        }
      } else if (snakeDirection === "up") {
        if (snakePosition <= width) {
          console.log("up side");
          gameOver();
        }
      } else if (snakeDirection === "down") {
        if (snakePosition + width >= cellCount) {
          console.log("down side");
          gameOver();
        }
      } else {
        return;
      }
    }
  }

  function gameOver() {
    modal.style.visibility = "visible";
    snake.forEach((element) => {
      cells[element].classList.remove("snakeImage");
    });

    clearInterval(snakeTimer);
    clearInterval(appleTimer);
    cells[applePosition].classList.remove("apple");
  }

  function playAgain() {
    location.reload();
  }

  function selfCrash() {
    let snakeBody = snake.slice(1);

    if (snakeBody.includes(snakePosition)) {
      gameOver();
    }
  }

  //* Events

  start.addEventListener("click", startGame);
  document.addEventListener("keyup", handleKeyUp);
  replayBtn.addEventListener("click", playAgain);
}

window.addEventListener("DOMContentLoaded", init);
