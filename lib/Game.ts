import * as P from 'pixi.js'
import { Map } from './Map'
import { MapBuilder } from './MapBuilder'

export default class Game {
  private app: P.Application
  private map: Map
  private mapContainer: P.Container
  private static scaleFactor: number = 3

  constructor(app: P.Application) {
    P.settings.SCALE_MODE = P.SCALE_MODES.NEAREST
    this.app = app
    this.mapContainer = new P.Container()
    this.map = new MapBuilder().WithDimensions(40, 40).build()
    app.stage.scale.set(Game.scaleFactor)
    app.stage.addChild(this.mapContainer)
  }

  start(): void {
    this.app.ticker.add(_ => {
      this.map.update(this.mapContainer)
      this.mapContainer.position.x = (this.app.screen.width / Game.scaleFactor / 2) - this.map.xFocalPoint
      this.mapContainer.position.y = this.app.screen.height / Game.scaleFactor / 2 - this.map.yFocalPoint
    })
  }
}
