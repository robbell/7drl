import { Sprite, Container } from 'pixi.js'
import { Tile } from './Tile'
import { GameConstants } from './GameConstants'
const someImage = require('../img/floor.png')

export class TileRenderer {
    sprite: Sprite

    constructor() {
        this.sprite = Sprite.from(someImage)
    }

    render(tile: Tile, stage: Container): void {
        this.sprite.x = tile.x * GameConstants.tileWidth
        this.sprite.y = tile.y * GameConstants.tileHeight
        this.sprite.alpha = tile.visibility
        stage.addChild(this.sprite)
    }
}
