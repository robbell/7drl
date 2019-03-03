import { Container } from 'pixi.js'
import { Tile } from './Tile'
import { Hero } from './Hero'
import { GameConstants } from './GameConstants'
import { Coordinate } from './Coordinate'
import { FOV as Fov } from "rot-js"


export class Map {

  tiles: Tile[][]
  tileVisibility: number[][];
  hero!: Hero
  fov: any;
  isInitialised: boolean = false;

  get xFocalPoint(): number {
    return this.hero.x + GameConstants.tileWidth / 2
  }

  get yFocalPoint(): number {
    return this.hero.y + GameConstants.tileHeight / 2
  }

  constructor(_width: number, height: number) {
    this.tiles = []
    this.tileVisibility = []

    for (var rowCount: number = 0; rowCount < height; rowCount++) {
      this.tiles[rowCount] = []
      this.tileVisibility[rowCount] = []
    }
  }

  initialise(): void {
    this.hero = new Hero(this.findStartingPoint())
    this.fov = new Fov.PreciseShadowcasting((x: number, y: number) => this.lightPasses(x, y));
    this.isInitialised = true
  }

  initialiseTiles(container: Container): void{
    this.tiles.forEach(row => {
      row.forEach(tile => {
        let visibilityRating = this.tileVisibility[tile.x][tile.y]
        tile.setVisibility(visibilityRating)
        tile.initialise(container)
      })
    })
  }

  update(container: Container): void {
    if (!this.isInitialised) return

    this.gatherTileVisibility();

    this.tiles.forEach(row => {
      row.forEach(tile => {
        let visibilityRating = this.tileVisibility[tile.x][tile.y]
        tile.setVisibility(visibilityRating)
        tile.update(container)
      })
    })

    this.hero.update(this, container)
  }

  isPassable(destination: Coordinate): any {
    return this.tiles[destination.x] == null || this.tiles[destination.x][destination.y] == null || this.tiles[destination.x][destination.y].type == "floor"
  }

  private gatherTileVisibility() {
    this.clearVisibileTiles();

    this.fov.compute(this.hero.position.x, this.hero.position.y, 5, (x: number, y: number, r: number, visibility: number) => this.setTileVisibility(x, y, r, visibility));
  }

  private clearVisibileTiles() {
    this.tileVisibility = [];
    for (let rowCount: number = 0; rowCount < this.tiles.length; rowCount++) {
      this.tileVisibility[rowCount] = [];
    }
  }

  private setTileVisibility(x: number, y: number, _r: number, visibility: number): any {
    if (!this.tileVisibility[x][y] || visibility > this.tileVisibility[x][y])
      this.tileVisibility[x][y] = visibility;
  }

  private findStartingPoint(): Coordinate {
    if (this.tiles != null) {
      for (let rowCount: number = 0; rowCount < this.tiles.length; rowCount++) {
        for (let tileCount: number = 0; tileCount < this.tiles[rowCount].length; tileCount++) {
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
