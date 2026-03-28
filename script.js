const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Karakterimizin özelliklerini bir obje içinde tutalım 📦
let player = {
    x: 50,
    y: 200,
    width: 30,
    height: 30,
    color: "red"
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
    //sağ ok tuşuna basılıyorsa x'i artır
    if (keys ["ArrowRight"]) {
        player.x += 5;
    }
    //sol ok tuşuna basılıyorsa x'i azalt
    if (keys ["ArrowLeft"]) {
        player.x -= 5;
    }+
}

function gameLoop() {
    update(); //önce
    draw();   // Sonra ekrana çiz
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
