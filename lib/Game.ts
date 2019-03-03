import * as P from 'pixi.js'
import { Map } from './Map'
import { MapBuilder } from './MapBuilder'

export default class Game {
  private app: P.Application
  private map: Map
  private mapContainer: P.Container
  private style: P.TextStyleOptions = new PIXI.TextStyle({
    fontFamily: 'Consolas',
    fontSize: 10,
  })
  private consoleText: P.Text = new PIXI.Text('Rich text with a lot of options and across multiple lines', this.style)

  private static scaleFactor: number = 1
  lastCalledTime: any;
  delta: number = 0;

  constructor(app: P.Application) {
    P.settings.SCALE_MODE = P.SCALE_MODES.NEAREST
    this.app = app
    this.mapContainer = new P.Container()
    this.map = new MapBuilder().WithDimensions(200, 200).build()
    app.stage.scale.set(Game.scaleFactor)
    app.stage.addChild(this.mapContainer)
  }

  start(): void {
    this.app.stage.addChild(this.consoleText)
    this.map.initialiseTiles(this.mapContainer)

    this.app.ticker.add(_ => {
      this.map.update(this.mapContainer)
      this.mapContainer.position.x = (this.app.screen.width / Game.scaleFactor / 2) - this.map.xFocalPoint
      this.mapContainer.position.y = this.app.screen.height / Game.scaleFactor / 2 - this.map.yFocalPoint
      this.consoleText.text = this.getFps().toString()
    })
  }

  private getFps(): number{
    if(!this.lastCalledTime) {
      this.lastCalledTime = performance.now();
      return 0;
   }
   this.delta = (performance.now() - this.lastCalledTime)/1000;
   this.lastCalledTime = performance.now();
   return 1/this.delta;
  }
}
