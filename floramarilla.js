
const canvas = document.getElementById('flowerCanvas');
const ctx = canvas.getContext('2d');

// Ajustar canvas al tamaño de la pantalla
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2 - 50;

let petalProgress = 0; // Controla la animación de apertura

function drawStem() {
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX, centerY + 220);
    ctx.strokeStyle = '#2e7d32';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.stroke();
}

function drawPetal(angle, scale) {
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(angle);

    ctx.beginPath();
    // Dibujo del pétalo mediante curvas Bézier
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(-25 * scale, -60 * scale, 0, -110 * scale);
    ctx.quadraticCurveTo(25 * scale, -60 * scale, 0, 0);
    
    // Degradado para los pétalos
    const gradient = ctx.createLinearGradient(0, 0, 0, -110 * scale);
    gradient.addColorStop(0, '#fbc02d');
    gradient.addColorStop(1, '#ffeb3b');
    
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.restore();
}

function drawCenter() {
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
    ctx.fillStyle = '#5d4037';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#8d6e63';
    ctx.stroke();
}

function drawMessage() {
    ctx.font = 'bold 28px sans-serif';
    ctx.fillStyle = '#ffeb3b';
    ctx.textAlign = 'center';
    ctx.fillText('¡Feliz 21 de Septiembre!', centerX, centerY + 280);
    
    ctx.font = '18px sans-serif';
    ctx.fillStyle = '#e0e0e0';
    ctx.fillText('No podía faltar tu flor amarilla 💛', centerX, centerY + 310);
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawStem();

    // Dibujar 12 pétalos que se van expandiendo progresivamente
    const numPetals = 12;
    for (let i = 0; i < numPetals; i++) {
        const angle = (i * 2 * Math.PI) / numPetals;
        drawPetal(angle, petalProgress);
    }

    drawCenter();

    // Mostrar texto cuando la flor haya abierto por completo
    if (petalProgress >= 1) {
        drawMessage();
    } else {
        petalProgress += 0.015; // Velocidad de la animación
        requestAnimationFrame(animate);
    }
}

// Iniciar animación al cargar
animate();