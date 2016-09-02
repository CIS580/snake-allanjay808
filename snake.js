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

var snakeSize = 0;

// Initialize Snake
var snake = [];
snake.push(new Circle(36, 12));
snake.push(new Circle(24, 12));
snake.push(new Circle(12, 12));

var input = {
  up: false,
  down: false,
  left: false,
  right: false
}

/**
 * @function loop
 * The main game loop.
 * @param{time} the current time as a DOMHighResTimeStamp
 */
function loop(newTime) {
  var elapsedTime = newTime - oldTime;
  oldTime = newTime;

  // console.log(snakeArr.length);

  update(elapsedTime);
  render(elapsedTime);

  // Flip the back buffer
  frontCtx.drawImage(backBuffer, 0, 0);

  // Run the next loop
  window.requestAnimationFrame(loop);
}

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
    snake[0].y -= 1;
  }
  if (input.down) {
    snake[0].y += 1;
  }
  if (input.left) {
    snake[0].x -= 1;
  }
  if (input.right) {
    snake[0].x += 1;
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

  for (var i = 0; i < snake.length; i++) {
    drawCircle(snake[i].x, snake[i].y);
  }
}

/**
  * @function Circle
  * Draws a circle-shaped object and draws on canvas based on coordinates
  *
  */
function drawCircle(x, y) {
  backCtx.beginPath();
  backCtx.arc(x, y, 12, 0, 2 * Math.PI);
  backCtx.fillStyle = "green";
  backCtx.fill();
  backCtx.strokeStyle = 'green';
  backCtx.stroke();
}

function Circle(x, y) {
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

// window.onkeyup = function(event) {
//   event.preventDefault();
//   console.log(event.keyCode);
//   switch(event.keyCode) {
//     // UP
//     case 38:
//     case 87:
//       input.up = false;
//       break;
//     // LEFT
//     case 37:
//     case 65:
//       input.left = false;
//       break;
//     // RIGHT
//     case 39:
//     case 68:
//       input.right = false;
//       break;
//     // DOWN
//     case 40:
//     case 83:
//       input.down = false;
//       break;
//   }
// }

/* Launch the game */
window.requestAnimationFrame(loop);
