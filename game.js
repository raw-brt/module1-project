class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.intervalId = null;
    this.intervalScore = null;
    this.tick = 0
    this.bg = new Background(ctx)
    this.character = new Character(ctx)
    this.obstacles = []
    this.farlopa = []
    this.score = 0;
  }

  start() {
    this._runAnimationLoop()
  }

  _runAnimationLoop() {
    this.intervalId = setInterval(() => {
      this._clear()
      this._draw()
      this._move()
      this._addObstacle()
      this._addFarlopa()
      this._checkCollisions()
      this._checkColocon()
      this._clearObstacles()
      this._increaseScore()

      if (this.tick++ > 10000) {
        this.tick = 0
      }
    }, 1000 / 60)
  }

  _clearObstacles() {
    this.obstacles = this.obstacles.filter(o => o.isVisible())
  }

  _addObstacle() {
    if (this.tick % 100) return

    this.obstacles.push(new Obstacle(this.ctx))
  }

  _addFarlopa() {
    if (this.tick % 100) return

    this.farlopa.push(new Farlopa(this.ctx))
    }

  _clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }

  _draw() {
    this.bg.draw()
    this.character.draw()
    this.obstacles.forEach(o => o.draw())
    this.farlopa.forEach(o => o.draw())
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("SCORE: " + this.score, 900, 35, 100);
  }
  
  _move() {
    this.bg.move()
    this.character.move()
    this.obstacles.forEach(o => o.move())
    this.farlopa.forEach(o => o.move())
  }

  _checkCollisions() {
    const col = (
      this.obstacles.some(o => o.collide(this.character)) ||
      this.character.isFloor()
    )

    if (col) {
      this._gameOver()
    }
  }

  _checkColocon() {
    const coloconChecker = (
      this.farlopa.some(o => o.collide(this.character))
    )

    if (coloconChecker) {
      this.score += 5000;
      this.bg.vx -= 0.1;
      this.obstacles.forEach(o => o.vx -= 10);
      this.farlopa.forEach(o => o.vx -= 10);
    }
  }

  _increaseScore() {
    this.intervalScore = setInterval(() => {
      this.score++;
    }, 1000);
    console.log(this.score)
  }

  _gameOver() {
    clearInterval(this.intervalId)

    this.ctx.font = "40px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "orange";
    this.ctx.fillText(
      "Tu huida hacia delante ha acabado",
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2
      );
    
  }
}