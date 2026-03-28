// 1. Canvas elementini HTML'den çekiyoruz
const canvas = document.getElementById('gameCanvas');

// 2. Çizim yapabilmek için "2d" bağlamını (context) alıyoruz
const ctx = canvas.getContext('2d');

// Test için ekrana basit bir kare (karakterimiz) çizelim
ctx.fillStyle = "red"; // Fırça rengini kırmızı yap
ctx.fillRect(50, 50, 40, 40); // (x: 50, y: 50) konumuna, 40x40 boyutunda bir kare çiz
