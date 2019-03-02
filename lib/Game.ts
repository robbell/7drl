import * as P from 'pixi.js'
import Map from './Map'

export default class Game {
  private app: P.Application
  private map: Map
  private mapContainer: P.Container
  private static scaleFactor: number = 2

  constructor(app: P.Application) {
    P.settings.SCALE_MODE = P.SCALE_MODES.NEAREST
    this.app = app
    this.mapContainer = new P.Container()
    this.map = new Map()
    app.stage.scale.set(Game.scaleFactor)
    app.stage.addChild(this.mapContainer)
  }

  start(): void {
    this.app.ticker.add(_ => {
      this.map.update(this.mapContainer)

      this.mapContainer.position.x = (this.app.screen.width / Game.scaleFactor - (this.map.xFocalPoint * Game.scaleFactor)) / 2

      this.mapContainer.position.y = (this.app.screen.height / Game.scaleFactor - (this.map.yFocalPoint * Game.scaleFactor)) / 2
    })
  }
}
