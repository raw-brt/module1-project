class Character {
  constructor(ctx) {
    this.ctx = ctx
    this.tick = 0

    this.x = 100
    this.y = 0

    this.w = 66
    this.h = 50

    this.x = 0
    this.y = 0
    this.vx = 0
    this.vy = 0
    this.ay = 0
    this.ax = 0
    this.g = 0.08

    this.colocon = 0;

    this.actions = {
      right: false,
      left: false,
      up: false,
      shoot: false
    }

    this.img = new Image()
    this.img.src = "images/rivera_volando.png"

    this._setListeners()
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

  isFloor() {
    return this.y + this.h >= this.ctx.canvas.height * 0.95
  }

  move() {
    this._applyActions()

    this.vx += this.ax
    this.vy += this.ay
    this.vy += this.g
    this.x += this.vx
    this.y += this.vy
  }

  _setListeners() {
    document.onkeydown = e => this._switchAction(e.keyCode, true)
    document.onkeyup = e => this._switchAction(e.keyCode, false)
  }

  _applyActions() {
    this.ay = this.actions.up ? -0.25 : 0
    
    if (this.actions.right) {
      this.ax = 0.15
    } else if (this.actions.left) {
      this.ax = -0.15
    } else {
      this.ax = 0
    }
  }

  _switchAction(key, apply) {
    switch (key) {
      case LEFT:
        this.actions.left = apply
        break;
      case RIGHT:
        this.actions.right = apply
        break;
      case UP:
        this.actions.up = apply
        break;
    }
  }
}
