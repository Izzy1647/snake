let board;
let context;

let blockSize = 20;
let rowsCount = 25;
let colsCount = 25;

// Initial snake head pos
let snakeHeadX = 5 * blockSize;
let snakeHeadY = 5 * blockSize;
let snakebody = [];

// Snake initial velocity
let velocityX = 1;
let veloxityY = 0;

// Position to put food
let foodX;
let foodY;

let gameover = false;

window.onload = () => {
    board = document.getElementById("snakeBoard");
    board.height = rowsCount * blockSize;
    board.width = colsCount * blockSize;

    context = board.getContext("2d");

    document.addEventListener("keyup", changeDirection);
    
    // Places the first food
    placeFood();

    // Starts the game: canvas rerenders every 100 ms
    setInterval(update, 100);
}

/**
 * Updates the board
 */
function update() {
    if(gameover) {
        clearInterval();
        return;
    }

    // Renders board
    context.fillStyle = "grey";
    context.fillRect(0, 0, board.width, board.height);

    // Renders food
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    // Updates snake head position
    snakeHeadX += velocityX * blockSize;
    snakeHeadY += veloxityY * blockSize;

    // Game over condition: collides with the body
    snakebody.forEach(pos => {
        if(pos[0] === snakeHeadX && pos[1] === snakeHeadY) {
            console.log("pos:", pos, "snakeBody:", snakebody, "headX, headY:", snakeHeadX, snakeHeadY, "collide!!")
            gameover = true;
            alert("Game over");
        }
    })

    // Game over condition: out of bound
    if(snakeHeadX < 0 || snakeHeadX > colsCount * blockSize ||
        snakeHeadY < 0 || snakeHeadY > rowsCount * blockSize) {
            gameover = true;
            alert("Game over");
    }

    // Snake collides with the food
    if(snakeHeadX === foodX && snakeHeadY === foodY) {
        snakebody.push([foodX, foodY]);
        placeFood();
    }

    // Snake movement
    for(let i = snakebody.length - 1; i > 0; i -= 1) {
        snakebody[i] = snakebody[i-1];
    }
    snakebody[0] = [snakeHeadX, snakeHeadY];

    // Renders snake body
    context.fillStyle = "blue";
    snakebody.forEach((item) => {
        const [x, y] = item;
        context.fillRect(x, y, blockSize, blockSize);
    })
}

/**
 * Changes the direction of the snake by keyboard input
 * @param {KeyboardEvent} e 
 */
function changeDirection(e) {
    if(e.code === "ArrowUp" && veloxityY !== 1) {
        velocityX = 0;
        veloxityY = -1;
        return;
    }

    if(e.code === "ArrowDown" && veloxityY !== -1) {
        velocityX = 0;
        veloxityY = 1;
        return;
    }

    if(e.code === "ArrowLeft" && velocityX !== 1) {
        velocityX = -1;
        veloxityY = 0;
        return;
    }

    if(e.code === "ArrowRight" && velocityX !== -1) {
        velocityX = 1;
        veloxityY = 0;
        return;
    }
}

/**
 * Places a food randomly
 */
function placeFood() {
    let newX = Math.floor(Math.random() * colsCount) * blockSize;
    let newY = Math.floor(Math.random() * rowsCount) * blockSize;
    foodX = newX;
    foodY = newY;
}
