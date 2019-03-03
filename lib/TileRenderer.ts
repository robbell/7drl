import { Sprite, Container, BLEND_MODES } from 'pixi.js'
import { Tile } from './Tile'
import { GameConstants } from './GameConstants'
const floorImage = require('../img/floor.png')
const wallImage = require('../img/wall.png')

export class TileRenderer {
    initialise(tile: Tile, stage: Container): any {
        this.sprite.x = tile.x * GameConstants.tileWidth
        this.sprite.y = tile.y * GameConstants.tileHeight
        this.sprite.blendMode = BLEND_MODES.DIFFERENCE
        this.sprite.alpha = tile.visibility
        stage.addChild(this.sprite)
    }
    sprite: Sprite

    constructor(type: string) {
        this.sprite = Sprite.from(type == "wall" ? wallImage : floorImage)
    }

    render(tile: Tile, stage: Container): void {
        this.sprite.alpha = tile.visibility ? tile.visibility : 0
    }
}
