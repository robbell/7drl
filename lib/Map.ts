import { Container } from 'pixi.js'
import { Tile } from './Tile'
import { Hero } from './Hero'
import GameConstants from './GameConstants'

export default class Map {
  tiles: Tile[][]
  hero: Hero = new Hero(3, 3)

  get xFocalPoint(): number {
    return this.hero.x + GameConstants.tileWidth / 2
  }

  get yFocalPoint(): number {
    return this.hero.y + GameConstants.tileHeight / 2
  }

  constructor() {
    this.tiles = []
    for (var rowCount: number = 0; rowCount < 5; rowCount++) {
      this.tiles[rowCount] = []
      for (var tileCount: number = 0; tileCount < 10; tileCount++) {
        this.tiles[rowCount][tileCount] = new Tile("floor", rowCount, tileCount)
      }
    }
  }

  update(container: Container): void {
    this.tiles.forEach(row => {
      row.forEach(tile => {
        tile.update(container)
      })
    })

    this.hero.update(container)
  }
}
