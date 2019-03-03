import Game from './lib/Game'
import * as P from 'pixi.js'

window.addEventListener('DOMContentLoaded', initGame)

function removeExistingGame(): void {
  const els = document.body.children
  if (els.length > 0) document.body.removeChild(els.item(0) as Node)
}

function init(): P.Application {
  removeExistingGame()
  const app = new P.Application(
    800, 600, { backgroundColor: 0x000000 }
  )
  document.body.appendChild(app.view)
  return app
}

function initGame(): void {
  const app = init()
  const game = new Game(app)
  game.start()
}

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept(function accept() {
    initGame()
  })
}
