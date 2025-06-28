const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let dx = 1;
let dy = 0;
let food = { x: 15, y: 15 };
let gameInterval = null;

function drawTile(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * gridSize, y * gridSize, gridSize - 2, gridSize - 2);
}

function gameLoop() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // Проверка на выход за границы или самоуничтожение
    if (
        head.x < 0 || head.x >= tileCount ||
        head.y < 0 || head.y >= tileCount ||
        snake.some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        clearInterval(gameInterval);
        alert("Игра окончена!");
        return;
    }

    snake.unshift(head);

    // Проверка еды
    if (head.x === food.x && head.y === food.y) {
        placeFood();
    } else {
        snake.pop();
    }

    // Рендер
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTile(food.x, food.y, "red");
    snake.forEach((segment, index) =>
        drawTile(segment.x, segment.y, index === 0 ? "lime" : "green")
    );
}

function placeFood() {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);
}

document.addEventListener("keydown", e => {
    switch (e.code) {
        case "ArrowUp":
            if (dy === 0) {
                dx = 0; dy = -1;
            }
            break;
        case "ArrowDown":
            if (dy === 0) {
                dx = 0; dy = 1;
            }
            break;
        case "ArrowLeft":
            if (dx === 0) {
                dx = -1; dy = 0;
            }
            break;
        case "ArrowRight":
            if (dx === 0) {
                dx = 1; dy = 0;
            }
            break;
    }
});

// Предотвращаем прокрутку страницы при нажатии стрелок
window.addEventListener("keydown", function(e) {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {
        e.preventDefault();
    }
}, false);

// Запуск игры
placeFood();
gameInterval = setInterval(gameLoop, 150); // Интервал движения: 0.15 секунды
