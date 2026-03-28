const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Karakterimizin özelliklerini bir obje içinde tutalım 📦
let player = {
    x: 50,
    y: 200,
    width: 30,
    height: 30,
    color: "red"
    dy: 0,
    jumpForce: 10,
    gravity: 0.5
};

// Çizim işlemini bir fonksiyon içine alalım 🎨
function draw() {
    // Önce ekranı temizlemeliyiz, yoksa eski çizimler kalır!
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Karakteri çiz
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

draw(); // Fonksiyonu çalıştır

//Hangi tuşların basılı olduğunu tutan bir liste
let keys = {};

//Bir tuşa basıldığında çalışır
window.addEventListener("keydown", function(e) {
    keys[e.code] = true;
});

//Tuş bırakıldığında çalışır
window.addEventListener("keyup", function(e) {
    keys[e.code] = false;
});

function update() {
    // Yatay Hareket
    if (keys["ArrowRight"]) player.x += 5;
    if (keys["ArrowLeft"]) player.x -= 5;

    // --- YER ÇEKİMİ VE DİKEY HAREKET ---
    
    // 1. Yer çekimini hıza ekle
    player.dy += player.gravity;
    // 2. Hızı konuma ekle
    player.y += player.dy;

    // 3. Zemin Kontrolü
    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
        player.dy = 0; // Yere değince hızı sıfırla
    }

    // 4. Zıplama (Sadece yerdeyken zıplayabilsin)
    if (keys["ArrowUp"] && player.dy === 0) {
        player.dy = -player.jumpForce; // Yukarı doğru fırlat!
    }
}

function gameLoop() {
    update(); //önce
    draw();   // Sonra ekrana çiz
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
