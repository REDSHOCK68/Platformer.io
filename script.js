const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// PLAYER
let player = {
    x: 50,
    y: 200,
    width: 30,
    height: 30,
    color: "red",

    dx: 0,
    dy: 0,

    speed: 2.5,
    maxSpeed: 5,
    friction: 0.8,

    jumpForce: 40,
    gravity: 0.5,

    onGround: false
};

// PLATFORMS
let platforms = [
    { x: 200, y: 300, width: 200, height: 20 },
    { x: 450, y: 200, width: 150, height: 20 },
    { x: 100, y: 150, width: 100, height: 20 }
];

// INPUT
let keys = {};
window.addEventListener("keydown", (e) => keys[e.code] = true);
window.addEventListener("keyup", (e) => keys[e.code] = false);

// COLLISION CHECK
function isColliding(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

// UPDATE
function update() {

    // HORIZONTAL INPUT (ACCELERATION)
    if (keys["ArrowRight"]) player.dx += player.speed;
    if (keys["ArrowLeft"]) player.dx -= player.speed;

    // LIMIT SPEED
    if (player.dx > player.maxSpeed) player.dx = player.maxSpeed;
    if (player.dx < -player.maxSpeed) player.dx = -player.maxSpeed;

    // APPLY FRICTION
    player.dx *= player.friction;

    // GRAVITY
    player.dy += player.gravity;

    // MOVE X
    player.x += player.dx;

    // X COLLISION
    platforms.forEach(plat => {
        if (isColliding(player, plat)) {
            if (player.dx > 0) {
                player.x = plat.x - player.width;
            } else if (player.dx < 0) {
                player.x = plat.x + plat.width;
            }
            player.dx = 0;
        }
    });

    // MOVE Y
    player.y += player.dy;
    player.onGround = false;

    // Y COLLISION
    platforms.forEach(plat => {
        if (isColliding(player, plat)) {
            if (player.dy > 0) {
                // Üstten çarpma
                player.y = plat.y - player.height;
                player.dy = 0;
                player.onGround = true;
            } else if (player.dy < 0) {
                // Alttan çarpma
                player.y = plat.y + plat.height;
                player.dy = 0;
            }
        }
    });

    // FLOOR
    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
        player.dy = 0;
        player.onGround = true;
    }

    // JUMP
    if (keys["ArrowUp"] && player.onGround) {
        player.dy = -player.jumpForce;
    }
}

// DRAW
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Platforms
    ctx.fillStyle = "green";
    platforms.forEach(p => {
        ctx.fillRect(p.x, p.y, p.width, p.height);
    });

    // Player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// LOOP
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
