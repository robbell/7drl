import { Container } from 'pixi.js'
import { Tile } from './Tile'
import { Hero } from './Hero'
import { GameConstants } from './GameConstants'
import { Coordinate } from './Coordinate';

export class Map {
  tiles: Tile[][]
  hero: Hero = new Hero(new Coordinate(3, 3))

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

    this.hero.update(this, container)
  }

  isPassable(destination: Coordinate): any {
    return this.tiles[destination.x][destination.y] == null
  }
}
