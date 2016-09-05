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

var input = {
  up: false,
  down: false,
  left: false,
  right: false
}

function init() {
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

  input.right = true;

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
  // TODO: Grow the snake periodically

  // TODO: Move the snake
  // Move head
  var moveX = snake[0].x;
  var moveY = snake[0].y;

  if (input.up) {
    snake[0].y -= 10;
  }
  else if (input.down) {
    snake[0].y += 10;
  }
  else if (input.left) {
    snake[0].x -= 10;
  }
  else if (input.right) {
    snake[0].x += 10;
  }

  var tempY = 0;
  var tempX = 0;
  for (var i = 1; i < snake.length; i++) {
    tempY = snake[i].y;
    tempX = snake[i].x;
    snake[i].y = moveY;
    snake[i].x = moveX;
    moveY = tempY;
    moveX = tempX;
  }

  // TODO: Determine if the snake has moved out-of-bounds (offscreen)
  // TODO: Determine if the snake has eaten an apple
  // TODO: Determine if the snake has eaten its tail
  // TODO: [Extra Credit] Determine if the snake has run into an obstacle
}

/**
  * @function render
  * Renders the current game state into a back buffer.
  * @param {elapsedTime} A DOMHighResTimeStamp indicting
  * the number of milliseconds passed since the last frame.
  */
function render(elapsedTime) {
  // TODO: Draw the game objects into the backBuffer
  backCtx.clearRect(0, 0, backBuffer.width, backBuffer.height);
  backCtx.fillStyle = "black";
  backCtx.fillRect(0, 0, backBuffer.width, backBuffer.height);

  // backCtx.fillStyle = "green";
  // backCtx.fillRect(30, 30, 50, 50);

  for (var i = 0; i < snake.length; i++) {
    drawSquare(snake[i].x, snake[i].y);
    // drawCircle(snake[i].x, snake[i].y);
  }

}

/**
  * @function drawSqaure
  */
function drawSquare(x, y) {
  backCtx.fillStyle = "green";
  backCtx.fillRect(x, y, 10, 10);
  backCtx.strokeStyle = "white";
  backCtx.strokeRect(x, y, 10, 10);
}

function Square(x, y) {
  this.x = x;
  this.y = y;
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

/* Launch the game */
// window.requestAnimationFrame(loop);
