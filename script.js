const ctx = document.getElementById('canvas').getContext('2d')

const game = new Game(ctx)


try {
  game.start()
} catch(err) {
  console.error(err)
}

