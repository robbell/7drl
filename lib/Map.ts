import { Container } from 'pixi.js'
import { Tile } from './Tile'
import { Hero } from './Hero'
import { GameConstants } from './GameConstants'

export class Map {
  tiles: Tile[][]
  hero: Hero = new Hero(0, 0)

  get xFocalPoint(): number {
    return this.hero.x + GameConstants.tileWidth / 2
  }

  get yFocalPoint(): number {
    return this.hero.y + GameConstants.tileHeight / 2
  }

  constructor(width: number, height: number) {
    this.tiles = []
    for (var rowCount: number = 0; rowCount < height; rowCount++) {
      this.tiles[rowCount] = []
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
