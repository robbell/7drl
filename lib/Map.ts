import { Container } from 'pixi.js';
import { Tile } from './Tile';

export default class Map {
  tiles: Tile[][];

  constructor() {
    this.tiles = [];
    for (var i: number = 0; i < 5; i++) {
      this.tiles[i] = [];
      for (var j: number = 0; j < 5; j++) {
        this.tiles[i][j] = new Tile("floor")
      }
    }
  }

  update(stage: Container): void {
    this.tiles.forEach(row => {
      row.forEach(tile => {
        tile.update(stage)
      });
    });
  }
}
