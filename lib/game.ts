import * as P from 'pixi.js'
const someImage = require('./floor.png');


export default class Game {
  private _app : P.Application

  constructor(app : P.Application) {
    this._app = app
  }

  start() : void {
    const floor = P.Sprite.from(someImage)
    floor.anchor.set(0.5)
    floor.x = this._app.screen.width / 2
    floor.y = this._app.screen.height / 2

    this._app.stage.addChild(floor)
    this._app.ticker.add(delta => {
      floor.rotation += 0.05 * delta
      floor.skew.x += 0.01 * delta
      floor.skew.y += 0.01 * delta
    })
  }
}
