const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Karakterimizin özelliklerini bir obje içinde tutalım 📦
let player = {
    x: 50,
    y: 200,
    width: 30,
    height: 30,
    color: "red
    dy: 0,
    jumpForce: 10,
    gravity: 0.5
};
 // 1. Yer çekimini hıza ekle
player.dy += player.gravity;

// 2. Hızı karakterin y konumuna ekle (düşüş başlasın)
player.y += player.dy;

// 3. Zemin Kontrolü (Collision)
// Eğer karakterin ayakları (y + height) canvas'ın alt sınırından büyükse:
if (player.y + player.height > canvas.height) {
    player.y = canvas.height - player.height; // Karakteri zemine sabitle
    player.dy = 0; // Düşme hızını sıfırla
}   
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
    //sağ ok tuşuna basılıyorsa x'i artır
    if (keys ["ArrowRight"]) {
        player.x += 5;
    }
    //sol ok tuşuna basılıyorsa x'i azalt
    if (keys ["ArrowLeft"]) {
        player.x -= 5;
    }
    //yukarı ok tuşuna basılıyorsa x'i azalt
    if (keys ["ArrowUp"]) {
        player.y += 5;
    }
    //yukarı ok tuşuna basılıyorsa x'i azalt
    if (keys ["ArrowDown"]) {
        player.y -= 5;
    }
}

function gameLoop() {
    update(); //önce
    draw();   // Sonra ekrana çiz
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
