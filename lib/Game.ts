import * as P from 'pixi.js'
import Map from './Map'

export default class Game {
  private app: P.Application
  private map: Map
  private mapContainer: P.Container

  constructor(app: P.Application) {
    this.app = app
    this.mapContainer = new P.Container()

    app.stage.addChild(this.mapContainer)
    this.map = new Map();
  }

  start(): void {
    this.app.ticker.add(_ => {
      this.map.update(this.mapContainer);
      this.mapContainer.position.x = (this.app.screen.width - this.mapContainer.width) / 2
      this.mapContainer.position.y = (this.app.screen.height - this.mapContainer.height) / 2
    })
  }
}
