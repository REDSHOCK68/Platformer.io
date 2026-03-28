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
    gravity: 0.5
};

// 2. Platformlar Listesi
let platforms = [
    { x: 200, y: 300, width: 200, height: 20 },
    { x: 450, y: 200, width: 150, height: 20 },
    { x: 100, y: 150, width: 100, height: 20 }
];

// 3. Tuş Kontrolleri
let keys = {};

window.addEventListener("keydown", function(e) {
    keys[e.code] = true;
});

window.addEventListener("keyup", function(e) {
    keys[e.code] = false;
});

// 4. Güncelleme Fonksiyonu
function update() {
    // Yatay Hareket
    if (keys["ArrowRight"]) player.x += 5;
    if (keys["ArrowLeft"]) player.x -= 5;

    // Yer Çekimi ve Dikey Hareket
    player.dy += player.gravity;
    player.y += player.dy;

    // Zemin Kontrolü (Canvas'ın altı)
    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
        player.dy = 0;
    }

    // Zıplama (Sadece yerdeyken)
    if (keys["ArrowUp"] && player.dy === 0) {
        player.dy = -player.jumpForce;
    }
}

// 5. Çizim Fonksiyonu
function draw() {
    // Ekranı temizle
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

// Başlat
gameLoop();
