// set up canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random RGB color value

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
    this.symbol = ['✕', '○', '□', '△'][random(0, 3)];
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    
    // Dibujamos el símbolo de PlayStation
    ctx.font = `${this.size * 2}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.symbol, this.x, this.y);
  }

  update() {
    if (this.x + this.size >= width) {
      this.velX = -Math.abs(this.velX);
    }

    if (this.x - this.size <= 0) {
      this.velX = Math.abs(this.velX);
    }

    if (this.y + this.size >= height) {
      this.velY = -Math.abs(this.velY);
    }

    if (this.y - this.size <= 0) {
      this.velY = Math.abs(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball)) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

const balls = [];

// Eliminamos el while loop inicial y agregamos un event listener para Control+Y
document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.key === 'y') {
    const size = random(10, 20);
    const ball = new Ball(
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(-7, 7),
      random(-7, 7),
      randomRGB(),
      size
    );
    balls.push(ball);
  }
});

// Agregamos un contador en la esquina superior izquierda
function drawCounter() {
  ctx.fillStyle = 'white';
  ctx.font = '24px Arial';
  ctx.fillText(`Símbolos: ${balls.length}`, 10, 30);
}

// Modificamos la función loop para incluir el contador
function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }

  drawCounter(); // Agregamos el contador
  requestAnimationFrame(loop);
}

loop();