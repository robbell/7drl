import Game from './lib/Game'
import { Spritesheet } from "./lib/Spritesheet";
import { Application, settings, SCALE_MODES } from 'pixi.js'

window.addEventListener('DOMContentLoaded', startInitialiseGame)

function removeExistingGame(): void {
  const els = document.body.children
  if (els.length > 0) document.body.removeChild(els.item(0) as Node)
}

function initialise(): Application {
  removeExistingGame()
  const app = new Application(800, 600, { backgroundColor: 0x000000 })
  document.body.appendChild(app.view)
  return app
}

function startInitialiseGame(): void {
  settings.SCALE_MODE = SCALE_MODES.NEAREST
  new Spritesheet("sprites.json")
  Spritesheet.loadAndCall(() => completeInitialiseGame())
}

function completeInitialiseGame(): void {
  console.log(Spritesheet.sheet)
  const app = initialise()
  const game = new Game(app)
  game.start()
}


// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept(function accept() {
    startInitialiseGame()
  })
}
