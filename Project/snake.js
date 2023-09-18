const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
const boxSize = 20;
let score = 0;
let speed = 300;
let snake = [{x: 10 * boxSize, y: 10 * boxSize}];
let food = {
    x: Math.floor(Math.random() * 20) * boxSize,
    y: Math.floor(Math.random() * 20) * boxSize
};
let d;

document.addEventListener("keydown", direction);
document.getElementById("restartGame").addEventListener("click", restartGame);

document.getElementById("themeToggle").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});

function direction(event) {
    if (event.keyCode == 37 && d != "RIGHT") {
        d = "LEFT";
        event.preventDefault();
    } else if (event.keyCode == 38 && d != "DOWN") {
        d = "UP";
        event.preventDefault(); 
    } else if (event.keyCode == 39 && d != "LEFT") {
        d = "RIGHT";
        event.preventDefault();
    } else if (event.keyCode == 40 && d != "UP") {
        d = "DOWN";
        event.preventDefault();
    }
}

function collision(head, array) {
    for(let i = 0; i < array.length; i++) {
        if(head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

function draw() {
    if(document.body.classList.contains("dark-mode")) {
        context.fillStyle = "#333"; // или любой другой цвет, который вы хотите использовать для темного режима
    } else {
        context.fillStyle = "#FFF"; // Белый фон для светлой темы
    }
    context.fillRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < snake.length; i++) {
        context.fillStyle = (i === 0) ? "green" : "white";
        context.fillRect(snake[i].x, snake[i].y, boxSize, boxSize);
        context.strokeStyle = "red";
        context.strokeRect(snake[i].x, snake[i].y, boxSize, boxSize);
    }

    context.fillStyle = "blue";
    context.fillRect(food.x, food.y, boxSize, boxSize);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(d == "LEFT") snakeX -= boxSize;
    if(d == "UP") snakeY -= boxSize;
    if(d == "RIGHT") snakeX += boxSize;
    if(d == "DOWN") snakeY += boxSize;

    if(snakeX == food.x && snakeY == food.y) {
        score++;
        if (score % 10 === 0) {
            speed -= 10;
            clearInterval(game);
            game = setInterval(draw, speed);
        }
        food = {
            x: Math.floor(Math.random() * 20) * boxSize,
            y: Math.floor(Math.random() * 20) * boxSize
        };
    } else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    if(snakeX < 0 || snakeY < 0 || snakeX > canvas.width - boxSize || snakeY > canvas.height - boxSize || collision(newHead, snake)) {
        restartGame();
    }

    snake.unshift(newHead);
    document.getElementById("score").innerHTML = "Очки: " + score;
}

function restartGame() {
    clearInterval(game);
    score = 0;
    speed = 200;
    snake = [{x: 10 * boxSize, y: 10 * boxSize}];
    d = undefined;
    food = {
        x: Math.floor(Math.random() * 20) * boxSize,
        y: Math.floor(Math.random() * 20) * boxSize
    };
    game = setInterval(draw, speed);
    document.getElementById("score").innerHTML = "Очки: " + score;
}

function stopGame() {
    if (game) clearInterval(game);
}

function updateSpeed() {
    if (score % 10 == 0) {
        speed *= 0.9;  
        stopGame();
        startGame();
    }
}


let game = setInterval(draw, speed);