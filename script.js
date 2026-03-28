const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 1. Karakter Özellikleri
let player = {
    x: 50,
    y: 200,
    width: 30,
    height: 30,
    color: "red",
    dy: 0,
    jumpForce: 10,
    gravity: 0.5,
    onGround: false // Karakterin bir yere basıp basmadığını takip eder
};

// 2. Platformlar Listesi
let platforms = [
    { x: 200, y: 300, width: 200, height: 20 },
    { x: 450, y: 200, width: 150, height: 20 },
    { x: 100, y: 150, width: 100, height: 20 }
];

// 3. Tuş Kontrolleri
let keys = {};
window.addEventListener("keydown", (e) => keys[e.code] = true);
window.addEventListener("keyup", (e) => keys[e.code] = false);

// 4. Güncelleme Fonksiyonu (Tüm mantık burada toplanmalı)
function update() {
    // Yatay Hareket
    if (keys["ArrowRight"]) player.x += 5;
    if (keys["ArrowLeft"]) player.x -= 5;

    // Yer Çekimi Uygula
    player.dy += player.gravity;
    player.y += player.dy;

    // Başlangıçta havada olduğunu varsayalım
    player.onGround = false;

    // Zemin Kontrolü (Canvas Altı)
    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
        player.dy = 0;
        player.onGround = true;
    }

    // Platform Çarpışma Kontrolü
    platforms.forEach(plat => {
        // Karakter platformun X hizasındaysa
        if (player.x + player.width > plat.x && player.x < plat.x + plat.width) {
            // Karakter düşerken ayakları platformun üst sınırına değdi mi?
            if (player.dy > 0 && 
                player.y + player.height > plat.y && 
                player.y + player.height - player.dy <= plat.y) {
                
                player.dy = 0;
                player.y = plat.y - player.height;
                player.onGround = true;
            }
        }
    });

    // Zıplama (Sadece yerdeyken)
    if (keys["ArrowUp"] && player.onGround) {
        player.dy = -player.jumpForce;
        player.onGround = false;
    }
}

// 5. Çizim Fonksiyonu
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Platformları çiz
    ctx.fillStyle = "green";
    platforms.forEach(plat => {
        ctx.fillRect(plat.x, plat.y, plat.width, plat.height);
    });

    // Karakteri çiz
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// 6. Oyun Döngüsü
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
