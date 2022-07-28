function init() {
  // * Elements
  const grid = document.querySelector(".grid");
  const cells = [];
  const start = document.querySelector("#start");
  const scoreDisplay = document.querySelector(".score");
  const modal = document.querySelector(".modal");

  let snake = [2, 1, 0];

  // TODO: Variables
  let snakeSpeed = 800;
  let snakeTimer;
  let snakeDirection = "right";
  let snakePosition = 10;
  let appleTimer;
  let applePosition = 10;
  let score = 0;
  let gameStarted = false;

  // TODO: Grid creation
  const width = 10;
  const cellCount = width * width;

  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement("div");
      cell.textContent = i;
      cell.classList.add("cell");

      grid.append(cell);
      cells.push(cell);
    }
  }
  createGrid();

  // * Execution
  // TODO: newCell/Direction

  function startGame() {
    gameStarted = true;
    if (gameStarted) {
      grid.style.background = "#7A9D0F";
      appleTimer = setInterval(apple, 20000);
      snakeTimer = setInterval(moveSnake, snakeSpeed);

      // apple();
      // moveSnake();
      console.log("clicked");
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
  // TODO: Creating the snake

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

  // TODO: Apple

  function apple() {
    cells[applePosition].classList.remove("apple");
    applePosition = Math.floor(Math.random() * cells.length);
    cells[applePosition].classList.add("apple");
  }
  apple();

  function appleEaten() {
    if (applePosition === snakePosition) {
      console.log("same position");
      // ? Double check this
      snake.push(snake.length - 1 + 1);
      score += 100;
      scoreDisplay.textContent = score;
      console.log(snakeSpeed);
      clearInterval(snakeTimer);

      snakeSpeed = snakeSpeed - 30;

      snakeTimer = setInterval(moveSnake, snakeSpeed);
      apple();
    }
  }

  // TODO: Keypress event
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
        // ? Check this
        return;
      }
    }
  }

  // TODO: Game over

  function gameOver() {
    modal.style.visibility = "visible";
    snake.forEach((element) => {
      cells[element].classList.remove("snakeImage");
    });

    clearInterval(snakeTimer);
    clearInterval(appleTimer);
    cells[applePosition].classList.remove("apple");
    // let confirm = window.confirm(
    //   `Game over - you scored ${score}. Play again?`
    // );
    // if (confirm) {
    //   location.reload();
    // }
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
}

window.addEventListener("DOMContentLoaded", init);
