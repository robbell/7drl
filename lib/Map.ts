import { Container } from 'pixi.js'
import { Tile } from './Tile'
import { Hero } from './Hero'
import { GameConstants } from './GameConstants'
import { Coordinate } from './Coordinate'
import { FOV as Fov } from "rot-js"


export class Map {

  tiles: Tile[][]
  hero!: Hero
  fov: any;
  isInitialised: boolean = false;

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
    if(!this.isInitialised) return

    this.fov.compute(this.hero.position.x, this.hero.position.y, 10,
      (x: number, y: number, r: number, visibility: number) => this.dumpVisibility(x, y, r, visibility))
    this.tiles.forEach(row => {
      row.forEach(tile => {
        tile.update(container)
      })
    })

    this.hero.update(this, container)
  }

  dumpVisibility(x: number, y: number, r: number, visibility: number): any {
    console.log(x, y, r, visibility)
    if(!this.tiles[x][y]) return
    this.tiles[x][y].setVisibility(visibility)
  }

  isPassable(destination: Coordinate): any {
    return this.tiles[destination.x][destination.y] == null
  }

  initialise(): any {
    this.hero = new Hero(this.findStartingPoint())
    this.fov = new Fov.PreciseShadowcasting((x: number, y: number) => this.lightPasses(x, y));
    this.isInitialised = true
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

  private lightPasses(x: number, y: number): boolean {
    return this.isPassable(new Coordinate(x, y))
  }
}
