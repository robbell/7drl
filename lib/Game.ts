import { Application } from 'pixi.js'
import { Map } from './Map'
import { MapBuilder } from './MapBuilder'
import { GameConstants } from './GameConstants';
import { Console } from './Console';

export default class Game {
  private app: Application
  private map: Map
  private console: Console;

  constructor(app: Application) {
    this.app = app
    this.app.stage.scale.set(GameConstants.scaleFactor)

    this.map = new MapBuilder().WithDimensions(200, 200).build()
    this.app.stage.addChild(this.map.initialise())

    this.console = new Console()
    this.app.stage.addChild(this.console.initialise())
  }

  start(): void {
    this.app.ticker.add(_ => {
      this.map.update()
      this.map.container.position.x = (this.app.screen.width / GameConstants.scaleFactor / 2) - this.map.xFocalPoint
      this.map.container.position.y = this.app.screen.height / GameConstants.scaleFactor / 2 - this.map.yFocalPoint
      this.console.update()
    })
  }
}
