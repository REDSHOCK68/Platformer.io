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

    speed: 20,      // ⬅️ DAHA HIZLI
    jump: 50,      // ⬅️ DAHA YÜKSEK ZIPLAMA
    gravity: 0.6,

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

// ÇARPIŞMA KONTROLÜ
function hit(a, b) {
    return (
        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y
    );
}

// GÜNCELLEME
function update() {

    // SAĞ / SOL
    if (keys["ArrowRight"]) player.x += player.speed;
    if (keys["ArrowLeft"]) player.x -= player.speed;

    // YERÇEKİMİ
    player.dy += player.gravity;
    player.y += player.dy;

    player.onGround = false;

    // PLATFORM ÇARPIŞMA
    for (let p of platforms) {
        if (hit(player, p)) {

            // ÜSTÜNE BASMA
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

// ÇİZİM
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // PLATFORM
    ctx.fillStyle = "green";
    for (let p of platforms) {
        ctx.fillRect(p.x, p.y, p.w, p.h);
    }

    // PLAYER
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
