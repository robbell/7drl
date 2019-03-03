import { Container, DisplayObject } from 'pixi.js'
import { Tile } from './Tile'
import { Hero } from './Hero'
import { GameConstants } from './GameConstants'
import { Coordinate } from './Coordinate'
import { GameObject } from './GameObject'
import { FOV as Fov } from "rot-js"

export class Map implements GameObject {
  container: Container
  private tiles: Tile[][]
  private hero!: Hero
  private fov: any;
  private isInitialised: boolean = false

  get xFocalPoint(): number {
    return this.hero.x + GameConstants.tileWidth / 2
  }

  get yFocalPoint(): number {
    return this.hero.y + GameConstants.tileHeight / 2
  }

  constructor(_width: number, height: number) {
    this.container = new Container()
    this.tiles = []

    for (var rowCount: number = 0; rowCount < height; rowCount++) {
      this.tiles[rowCount] = []
    }
  }

  initialise(): DisplayObject {
    this.initialiseTiles()
    this.initialiseHero()
    this.isInitialised = true

    return this.container
  }

  update(): void {
    if (!this.isInitialised) return

    this.setMapVisibility();

    this.tiles.forEach(row => {
      row.forEach(tile => {
        tile.update()
      })
    })

    this.hero.update(this)
  }

  isPassable(destination: Coordinate): any {
    return this.tiles[destination.x] == null
      || this.tiles[destination.x][destination.y] == null
      || this.tiles[destination.x][destination.y].type == "floor"
  }

  private initialiseTiles(): void {
    this.fov = new Fov.PreciseShadowcasting((x: number, y: number) => this.lightPasses(x, y));
    this.tiles.forEach(row => {
      row.forEach(tile => {
        this.container.addChild(tile.initialise())
      })
    })
  }

  private initialiseHero(): any {
    this.hero = new Hero(this.findStartingPoint())
    this.container.addChild(this.hero.initialise())
  }

  private setMapVisibility(): void {
    this.resetVisibility();
    this.fov.compute(this.hero.position.x, this.hero.position.y, 5,
      (x: number, y: number, r: number, visibility: number) => this.setTileVisibility(x, y, r, visibility));
  }

  private resetVisibility(): void {
    this.tiles.forEach(row => {
      row.forEach(tile => {
        tile.setVisibility(0)
      })
    })
  }

  private setTileVisibility(x: number, y: number, _r: number, visibility: number): void {
    this.tiles[x][y].setVisibility(visibility)
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
