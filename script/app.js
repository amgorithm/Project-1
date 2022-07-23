function init() {
  // * Elements
  const grid = document.querySelector(".grid");
  const cells = [];
  let snake = [2, 1, 0];

  // TODO: Variables
  let snakeDirection = "right";
  let applePosition;

  // TODO: Grid creation
  const width = 10;
  const cellCount = width * width;

  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement("div");
      cell.textContent = i;
      grid.append(cell);
      cells.push(cell);
    }
  }
  createGrid();

  // * Execution
  // TODO: newCell/Direction

  function getNewCell() {
    if (snakeDirection === "left") {
      return snake[0] - 1;
    } else if (snakeDirection === "right") {
      return snake[0] + 1;
    } else if (snakeDirection === "up") {
      return snake[0] - width;
    } else if (snakeDirection === "down") {
      return snake[0] + width;
    } else {
      return `Invalid`;
    }
  }
  getNewCell();
  // TODO: Creating the snake

  function moveSnake() {
    snake.forEach((element) => {
      // ? element = num
      cells[element].classList.add("snakeImage");
    });

    const timer = setInterval(() => {
      //Looks at the current state of dir - returns what the new head position should be
      let newCell = getNewCell();
      // let newCellLeft = getNewCell();

      let tail = snake.pop();
      cells[tail].classList.remove("snakeImage");

      snake.unshift(newCell);
      cells[newCell].classList.add("snakeImage");

      // console.log("test", snake);
    }, 1000);
  }

  moveSnake();
  // TODO: Keypress event

  function handleKeyUp(e) {
    const key = e.keyCode;
    const left = 37;
    const right = 39;
    const up = 38;
    const down = 40;

    if (key === left) {
      snakeDirection = "left";
    } else if (key === right) {
      snakeDirection = "right";
    } else if (key === up) {
      snakeDirection = "up";
    } else if (key === down) {
      snakeDirection = "down";
    } else {
      console.log("Invalid key");
    }
  }

  //* Events
  document.addEventListener("keyup", handleKeyUp);
}

window.addEventListener("DOMContentLoaded", init);
