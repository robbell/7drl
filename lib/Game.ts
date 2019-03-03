import * as P from 'pixi.js'
import { Map } from './Map'
import { MapBuilder } from './MapBuilder'
import { GameConstants } from './GameConstants';
import { Console } from './Console';

export default class Game {
  private app: P.Application
  private map: Map
  private mapContainer: P.Container
  private console: Console;

  constructor(app: P.Application) {
    P.settings.SCALE_MODE = P.SCALE_MODES.NEAREST
    this.app = app
    this.app.stage.scale.set(GameConstants.scaleFactor)

    this.map = new MapBuilder().WithDimensions(200, 200).build()
    this.mapContainer = new P.Container()
    this.app.stage.addChild(this.mapContainer)

    this.console = new Console()
    this.app.stage.addChild(this.console.component)
  }

  start(): void {
    this.map.initialiseTiles(this.mapContainer)

    this.app.ticker.add(_ => {
      this.map.update(this.mapContainer)
      this.mapContainer.position.x = (this.app.screen.width / GameConstants.scaleFactor / 2) - this.map.xFocalPoint
      this.mapContainer.position.y = this.app.screen.height / GameConstants.scaleFactor / 2 - this.map.yFocalPoint
      this.console.update()
    })
  }
}
