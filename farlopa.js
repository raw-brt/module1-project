class Farlopa {
  constructor(ctx) {
    this.ctx = ctx
    this.x = this.ctx.canvas.width
    this.dist = Math.random() * 100 + 300
    this.y = Math.random() > 0.5 ? 0 - this.dist : this.dist
    this.w = 60
    this.h = 60
    this.vx = -7

    this.img = new Image()
    this.img.src = "images/cocaina.svg"
  }

  draw() {
    this.ctx.drawImage(
          this.img,
          this.x,
          this.y,
          this.w,
          this.h
        );
  }

  move() {
    this.x += this.vx
  }

  collide(el) {
    const collideX = el.x + el.w > this.x && el.x < this.x + this.w
    const collideY = el.y < this.y + this.h && el.y + el.h > this.y

    return collideX && collideY
  }

  isVisible() {
    return (
      this.x < this.ctx.canvas.width * 2 &&
      this.x > 0 - this.ctx.canvas.width
    )
  }
}