import * as P from 'pixi.js'
import Map from './Map'

export default class Game {
  private app : P.Application
  private map : Map

  constructor(app : P.Application) {
    this.app = app
    this.map = new Map();
  }

  start() : void {
    this.app.ticker.add(_ => {
      this.map.update(this.app.stage);
    })
  }
}
