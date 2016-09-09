/* Global variables */
var frontBuffer = document.getElementById('snake');
var frontCtx = frontBuffer.getContext('2d');
var backBuffer = document.createElement('canvas');
backBuffer.width = frontBuffer.width;
backBuffer.height = frontBuffer.height;
var backCtx = backBuffer.getContext('2d');
var oldTime = performance.now();

// Track head movement
var moveX;
var moveY;
// Track apple position
var appleX;
var appleY;
// Initialize Snake and Apple
var snake = [];
var apple;

// Track direction
var input = {
  up: false,
  down: false,
  left: false,
  right: false
}

/**
  * @function init
  * Initializes or restarts the game
  */
function init() {
  frontCtx.drawImage(backBuffer, 0, 0);

  // Set the current direction to right, spawn snake and apple
  resetDirection();
  spawnSnake();
  spawnApple();

  update();
  render();

  // Flip the back buffer
  frontCtx.drawImage(backBuffer, 0, 0);
};
init();

/**
 * @function loop
 * The main game loop.
 * @param{time} the current time as a DOMHighResTimeStamp
 */
function loop(newTime) {
  var elapsedTime = newTime - oldTime;
  oldTime = newTime;

  update(elapsedTime);
  render(elapsedTime);

  // Flip the back buffer
  frontCtx.drawImage(backBuffer, 0, 0);

  setTimeout(loop, 120);
  // Run the next loop
  // window.requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
loop();

/**
 * @function update
 * Updates the game state, moving
 * game objects and handling interactions
 * between them.
 * @param {elapsedTime} A DOMHighResTimeStamp indicting
 * the number of milliseconds passed since the last frame.
 */
function update(elapsedTime) {

  // Check if snake ate it's own tail
  snakeAteTail();

  // Check if snake head went out of bounds
  checkOutOfBounds();

  // Move the snake, pop the end of the snake array and add to front after
  // updating the head's coordinates based on direction
  moveX = snake[0].x;
  moveY = snake[0].y;
  move();
  var end = snake.pop();
  end.x = moveX;
  end.y = moveY;
  snake.unshift(end);

  // Check if snake ate the apple
  appleEaten();
}

/**
  * @function render
  * Renders the current game state into a back buffer.
  * @param {elapsedTime} DOMHighResTimeStamp indicting
  * the number of milliseconds passed since the last frame.
  */
function render(elapsedTime) {
  // TODO: Draw the game objects into the backBuffer
  backCtx.clearRect(0, 0, backBuffer.width, backBuffer.height);
  backCtx.fillStyle = "black";
  backCtx.fillRect(0, 0, backBuffer.width, backBuffer.height);

  for (var i = 0; i < snake.length; i++) {
    drawSquare(snake[i].x, snake[i].y);
  }

  drawApple(apple.x, apple.y);
}

/**
  * @function drawSqaure
  * Draws part of the snake given the coordinates
  * @param {x} X coordinate at which to draw
  * @param {y} Y coordinate at which to draw
  */
function drawSquare(x, y) {
  backCtx.fillStyle = "green";
  backCtx.fillRect(x, y, 10, 10);
  backCtx.strokeStyle = "black";
  backCtx.strokeRect(x, y, 10, 10);
}

/**
  * @function Square
  * A single square object that is used to add to the snake
  * @param {x} X coordinate of the square
  * @param {y} Y coordinate of the square
  */
function Square(x, y) {
  this.x = x;
  this.y = y;
}

/**
  * @function spawnApple
  * This will set the coordinates of the apple
  * @param {appleX} X random coordinate of the apple
  * @param {appleY} Y random coordinate of the apple
  */
function spawnApple() {
  apple = {
    x: appleX = Math.floor(Math.random() * (75 - 1 + 1) + 1) * 10,
    y: appleY = Math.floor(Math.random() * (47 - 1 + 1) + 1) * 10,
  };
}

/**
  * @function drawApple
  * Draws the apple given the coordinates
  * @param {x} X coordinate at which to draw
  * @param {y} Y coordinate at which to draw
  */
function drawApple(x, y) {
  backCtx.fillStyle = "red";
  backCtx.fillRect(x, y, 10, 10);
  backCtx.strokeStyle = "black";
  backCtx.strokeRect(x, y, 10, 10);
}

/**
  * @function move
  * Increment movement based on direction
  */
function move() {
  if (input.up) {
    moveY -= 10;
  }
  if (input.down) {
    moveY += 10;
  }
  if (input.left) {
    moveX -= 10;
  }
  if (input.right) {
    moveX += 10;
  }
}

/**
  * @function checkOutOfBounds
  * Determine if snake head passes the edge of the canvas
  * If so, reset game
  */
function checkOutOfBounds() {
  if (snake[0].x < -9 || snake[0].y < -9 || snake[0].x >= 760 || snake[0].y >= 480) {
    snake = [];
    init();
  }
}

/**
  * @function appleEaten
  * Determine if snake came into contact with apple
  * If so, grow snake and generate new random apple
  */
function appleEaten() {
  if (snake[0].x == apple.x && snake[0].y == apple.y) {
    growSnake();
    spawnApple();
  }
}

/**
  * @function growSnake
  * Add a new segment to the snake array
  */
function growSnake() {
  move();
  snake.unshift(new Square(moveX, moveY));
}

/**
  * @function
  * Determine if snake ate its own tail
  * If so reset game
  */
function snakeAteTail() {
  var headPosX = snake[0].x;
  var headPosY = snake[0].y;
  for (var i = 1; i < snake.length; i++) {
    if (headPosX == snake[i].x && headPosY == snake[i].y) {
      snake = [];
      init();
      break;
    }
  }
}

/**
  * @function spawnSnake
  * Utilized at beginning and restart of game, generates default snake
  */
function spawnSnake() {
  snake.push(new Square(180, 30));
  snake.push(new Square(170, 30));
  snake.push(new Square(160, 30));
  snake.push(new Square(150, 30));
  snake.push(new Square(140, 30));
  snake.push(new Square(130, 30));
  snake.push(new Square(120, 30));
  snake.push(new Square(110, 30));
  snake.push(new Square(100, 30));
  snake.push(new Square(90, 30));
  snake.push(new Square(80, 30));
  snake.push(new Square(70, 30));
  snake.push(new Square(60, 30));
  snake.push(new Square(50, 30));
  snake.push(new Square(40, 30));
  snake.push(new Square(30, 30));
}

/**
  * @function resetDirection
  * Resets direction of snake movement to the right
  */
function resetDirection() {
  input.up = false;
  input.down = false;
  input.left = false;
  input.right = true;
}

window.onkeydown = function(event) {
  event.preventDefault();
  console.log(event.keyCode);
  switch(event.keyCode) {
    // UP
    case 38:
    case 87:
      if (input.down) {
        break;
      }
      input.up = true;
      input.down = false;
      input.left = false;
      input.right = false;
      break;
    // LEFT
    case 37:
    case 65:
      if (input.right) {
        break;
      }
      input.left = true;
      input.right = false;
      input.up = false;
      input.down = false;
      break;
    // RIGHT
    case 39:
    case 68:
      if (input.left) {
        break;
      }
      input.right = true;
      input.up = false;
      input.down = false;
      input.left = false;
      break;
    // DOWN
    case 40:
    case 83:
      if (input.up) {
        break;
      }
      input.down = true;
      input.left = false;
      input.right = false;
      input.up = false;
      break;
  }
  return false;
}
