import { Sprite, Container } from 'pixi.js';
import { Tile } from './Tile';
const someImage = require('../img/floor.png');

export class TileRenderer {
    sprite: Sprite;
    constructor() {
        this.sprite = Sprite.from(someImage);
    }
    render(tile: Tile, stage: Container): void {
        stage.addChild(this.sprite);
    }
}
