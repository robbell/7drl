import { Container } from 'pixi.js'
import { Tile } from './Tile'
import { Hero } from './Hero'
import { GameConstants } from './GameConstants'
import { Coordinate } from './Coordinate'

export class Map {

  tiles: Tile[][]
  hero!: Hero

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

  setStartPosition(): any {
    this.hero = new Hero(this.findStartingPoint())
  }

  private findStartingPoint(): Coordinate {
    if (this.tiles != null) {
      for (var rowCount: number = 0; rowCount < this.tiles.length; rowCount++) {
        for (var tileCount: number = 0; tileCount < this.tiles[rowCount].length; tileCount++) {
          let target = new Coordinate(rowCount, tileCount)
          if (this.isPassable(target)) return target
        }
      }
    }

    throw new Error("No suitable starting position found")
  }
}
