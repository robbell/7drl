import { Container } from 'pixi.js';
import { Tile } from './Tile';

export default class Map {
  tiles: Tile[][];

  constructor() {
    this.tiles = [];
    for (var rowCount: number = 0; rowCount < 5; rowCount++) {
      this.tiles[rowCount] = [];
      for (var tileCount: number = 0; tileCount < 10; tileCount++) {
        this.tiles[rowCount][tileCount] = new Tile("floor", rowCount, tileCount)
      }
    }
  }

  update(container: Container): void {
    this.tiles.forEach(row => {
      row.forEach(tile => {
        tile.update(container)
      });
    });
  }
}
