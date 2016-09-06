/* Global variables */
var frontBuffer = document.getElementById('snake');
var frontCtx = frontBuffer.getContext('2d');
var backBuffer = document.createElement('canvas');
backBuffer.width = frontBuffer.width;
backBuffer.height = frontBuffer.height;
var backCtx = backBuffer.getContext('2d');
var oldTime = performance.now();

var speed = 1/16/100;

var x = 0;
var y = 0;

// Initialize Snake
var snake = [];
var apple;

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
  spawnSnake();

  resetDirection();

  var appleX = Math.ceil(Math.random() * (75 - 1 + 1) + 4) * 10;
  var appleY = Math.ceil(Math.random() * (47 - 4 + 1) + 4) * 10;

  spawnApple(appleX, appleY);
  console.log("apple pos x: ", apple.x);
  console.log("apple pos y: ", apple.y);

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

  // TODO: Spawn an apple periodically
  drawApple(apple.x, apple.y);

  // TODO: Grow the snake periodically
  // growSnake();

  // TODO: Move the snake
  var moveX = snake[0].x;
  var moveY = snake[0].y;
  console.log("Snake head pos X: ", moveX);
  console.log("Snake head pos Y: ", moveY);

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

  var end = snake.pop();
  end.x = moveX;
  end.y = moveY;
  snake.unshift(end);

  // TODO: Determine if the snake has moved out-of-bounds (offscreen)
  // FIXME: Border of screen is off
  checkOutOfBounds();

  // TODO: Determine if the snake has eaten an apple
  // TODO: Determine if the snake has eaten its tail
  // TODO: [Extra Credit] Determine if the snake has run into an obstacle
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
function spawnApple(appleX, appleY) {
  apple = {
    x: appleX,
    y: appleY,
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

function checkOutOfBounds() {
  if (snake[0].x < -1 || snake[0].y < -1 || snake[0].x > 761 || snake[0].y > 481) {
    snake = [];
    resetDirection();
    init();
  }
}

function spawnSnake() {
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

window.onkeydown = function(event) {
  event.preventDefault();
  console.log(event.keyCode);
  switch(event.keyCode) {
    // UP
    case 38:
    case 87:
      input.up = true;
      input.down = false;
      input.left = false;
      input.right = false;
      break;
    // LEFT
    case 37:
    case 65:
      input.left = true;
      input.right = false;
      input.up = false;
      input.down = false;
      break;
    // RIGHT
    case 39:
    case 68:
      input.right = true;
      input.up = false;
      input.down = false;
      input.left = false;
      break;
    // DOWN
    case 40:
    case 83:
      input.down = true;
      input.left = false;
      input.right = false;
      input.up = false;
      break;
  }
  return false;
}

function resetDirection() {
  input.up = false;
  input.down = false;
  input.left = false;
  input.right = true;
}

/* Launch the game */
// window.requestAnimationFrame(loop);
