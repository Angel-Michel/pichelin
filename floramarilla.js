<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tu Ramo de Rosas</title>
    <style>
        /* Fondo de atardecer */
        body {
            margin: 0;
            padding: 0;
            height: 100vh;
            background: linear-gradient(to bottom, #2b1055 0%, #7597de 30%, #f6a56c 70%, #ff7b54 100%);
            overflow: hidden;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
        }

        /* Lienzo para los fuegos artificiales */
        canvas {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
        }

        /* Diseño de la tarjeta del ramo (Glassmorphism) */
        .tarjeta-ramo {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            padding: 40px;
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.3);
            z-index: 2;
            text-align: center;
            max-width: 450px;
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
            animation: flotar 3s ease-in-out infinite;
        }

        @keyframes flotar {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }

        h1 {
            color: #ffe6e6;
            margin-top: 0;
            font-size: 2em;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.4);
        }

        p.intro {
            font-size: 1.1em;
            margin-bottom: 20px;
            font-style: italic;
        }

        ul {
            text-align: left;
            font-size: 1.1em;
            line-height: 1.8;
            padding-left: 20px;
        }

        li span.rojo {
            color: #ff3333;
            font-weight: bold;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
        }
    </style>
</head>
<body>

    <!-- Lienzo donde se dibujarán los fuegos artificiales -->
    <canvas id="fuegosArtificiales"></canvas>

    <!-- Contenido del ramo -->
    <div class="tarjeta-ramo">
        <h1>Un Ramo Especial</h1>
        <p class="intro">Diseñado para iluminar tu día bajo este hermoso atardecer:</p>
        
        <ul>
            <li>12 <span class="rojo">Rosas Rojas Pasión</span> de tallo largo.</li>
            <li>6 <span class="rojo">Rosas Rojas Aterciopeladas</span> (variedad Black Magic).</li>
            <li>Hermosas Orquídeas moradas cayendo en cascada.</li>
            <li>Follaje de eucalipto y toques de nube blanca.</li>
        </ul>
        <p>Envuelto en un fino papel de seda y atado con un listón escarlata.</p>
    </div>

    <!-- Script de JavaScript para la animación -->
    <script>
        const canvas = document.getElementById('fuegosArtificiales');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particulas = [];
        // Colores para los fuegos artificiales
        const colores = ['#ff3333', '#ffaa00', '#ff00aa', '#ffffff', '#ffd700'];

        class Particula {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.r = Math.random() * 3 + 1;
                this.color = colores[Math.floor(Math.random() * colores.length)];
                
                // Distribución circular de la explosión
                const angulo = Math.random() * Math.PI * 2;
                const velocidad = Math.random() * 6 + 2;
                this.vx = Math.cos(angulo) * velocidad;
                this.vy = Math.sin(angulo) * velocidad;
                
                this.alpha = 1;
                this.decaimiento = Math.random() * 0.02 + 0.01;
            }

            actualizar() {
                this.x += this.vx;
                this.vy += 0.05; // Efecto de gravedad
                this.y += this.vy;
                this.alpha -= this.decaimiento;
            }

            dibujar() {
                ctx.globalAlpha = this.alpha;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        function crearFuegoArtificial() {
            // Posición aleatoria en la mitad superior de la pantalla
            const x = Math.random() * canvas.width;
            const y = (Math.random() * canvas.height) / 2;
            
            // Crea 60 partículas por cada explosión
            for (let i = 0; i < 60; i++) {
                particulas.push(new Particula(x, y));
            }
        }

        function animar() {
            // Crear el efecto de estela borrando ligeramente el lienzo anterior
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.globalCompositeOperation = 'lighter';
            
            // Probabilidad de que aparezca un nuevo fuego artificial
            if (Math.random() < 0.04) {
                crearFuegoArtificial();
            }

            // Actualizar y dibujar todas las partículas
            for (let i = particulas.length - 1; i >= 0; i--) {
                particulas[i].actualizar();
                particulas[i].dibujar();
                
                // Eliminar las que ya no son visibles
                if (particulas[i].alpha <= 0) {
                    particulas.splice(i, 1);
                }
            }
            requestAnimationFrame(animar);
        }

        // Iniciar animación
        animar();

        // Ajustar tamaño del lienzo si se cambia el tamaño de la ventana
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    </script>
</body>
</html>
}

// Iniciar animación al cargar
animate();
