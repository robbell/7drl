import { Container, DisplayObject } from 'pixi.js'
import { Hero } from './Hero'
import { GameConstants } from './GameConstants'
import { Coordinate } from './Coordinate'
import { GameObject } from './GameObject'
import { FOV as Fov } from "rot-js"
import { TileArray } from './TileArray';

export class Map implements GameObject {
  container: Container
  tiles: TileArray
  private hero!: Hero
  private fov: any;
  private isInitialised: boolean = false

  get xFocalPoint(): number {
    return this.hero.x
  }

  get yFocalPoint(): number {
    return this.hero.y
  }

  constructor(width: number, height: number) {
    this.container = new Container()
    this.tiles = new TileArray(width, height)
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
    this.tiles.apply(tile => tile.update())
    this.hero.update(this)
  }

  isPassable(destination: Coordinate): any {
    return this.tiles.getTileAt(destination).isPassable();
  }

  private initialiseTiles(): void {
    this.fov = new Fov.PreciseShadowcasting((x: number, y: number) =>
      this.isPassable(new Coordinate(x, y)))
    this.tiles.apply(t => this.container.addChild(t.initialise()))
  }

  private initialiseHero(): any {
    let start = this.findStartingPoint()
    this.hero = new Hero(start)
    this.container.addChild(this.hero.initialise())
  }

  private setMapVisibility(): void {
    this.resetVisibility();
    this.fov.compute(this.hero.position.x, this.hero.position.y, GameConstants.drawDistance,
      (x: number, y: number, _r: any, visibility: number) => {
        this.setTileVisibility(new Coordinate(x, y), visibility)
      });
  }

  private resetVisibility(): void {
    this.tiles.apply(t => t.setVisibility(0))
  }

  private setTileVisibility(position: Coordinate, visibility: number): void {
    this.tiles.getTileAt(position).setVisibility(visibility)
  }

  private findStartingPoint(): Coordinate {
    return this.tiles.find(t => t.isPassable()).position
  }
}
