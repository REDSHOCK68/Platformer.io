const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// KARAKTER
let player = {
    x: 50,
    y: 200,
    w: 30,
    h: 30,

    dx: 0,
    dy: 0,

    speed: 8,     // ✔️ Stabil hızlı
    jump: 15,     // ✔️ Güçlü ama kontrol edilebilir
    gravity: 0.7,

    onGround: false
};

// PLATFORM
let platforms = [
    { x: 200, y: 300, w: 200, h: 20 },
    { x: 450, y: 200, w: 150, h: 20 }
];

// TUŞLAR
let keys = {};
window.addEventListener("keydown", e => keys[e.code] = true);
window.addEventListener("keyup", e => keys[e.code] = false);

// ÇARPIŞMA
function hit(a, b) {
    return (
        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y
    );
}

// UPDATE
function update() {

    // HAREKET
    if (keys["ArrowRight"]) player.x += player.speed;
    if (keys["ArrowLeft"]) player.x -= player.speed;

    // GRAVITY
    player.dy += player.gravity;
    player.y += player.dy;

    player.onGround = false;

    // PLATFORM
    for (let p of platforms) {
        if (hit(player, p)) {
            if (player.dy > 0) {
                player.y = p.y - player.h;
                player.dy = 0;
                player.onGround = true;
            }
        }
    }

    // ZEMİN
    if (player.y + player.h > canvas.height) {
        player.y = canvas.height - player.h;
        player.dy = 0;
        player.onGround = true;
    }

    // ZIPLAMA
    if (keys["ArrowUp"] && player.onGround) {
        player.dy = -player.jump;
    }
}

// DRAW
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "green";
    for (let p of platforms) {
        ctx.fillRect(p.x, p.y, p.w, p.h);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(player.x, player.y, player.w, player.h);
}

// LOOP
function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

loop();
