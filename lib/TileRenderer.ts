import { Sprite, Container } from 'pixi.js';
import { Tile } from './Tile';
const someImage = require('../img/floor.png');

export class TileRenderer {
    private static width: number = 20
    private static height: number = 20
    sprite: Sprite;

    constructor() {
        this.sprite = Sprite.from(someImage);
    }

    render(tile: Tile, stage: Container): void {
        this.sprite.x = tile.x * TileRenderer.width;
        this.sprite.y = tile.y * TileRenderer.height;
        stage.addChild(this.sprite);
    }
}
