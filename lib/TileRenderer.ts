import { Sprite, Container, BLEND_MODES } from 'pixi.js'
import { Tile } from './Tile'
import { GameConstants } from './GameConstants'
const floorImage = require('../img/floor.png')
const wallImage = require('../img/wall.png')

export class TileRenderer {
    private visibilityFadeDownRate: number = 0.01
    sprite: Sprite

    constructor(type: string) {
        this.sprite = Sprite.from(type == "wall" ? wallImage : floorImage)
    }

    initialise(tile: Tile): Container {
        this.sprite.x = tile.position.x * GameConstants.tileWidth
        this.sprite.y = tile.position.y * GameConstants.tileHeight
        this.sprite.blendMode = BLEND_MODES.DIFFERENCE
        this.sprite.alpha = tile.visibility
        this.sprite.anchor.set(0.5);
        return this.sprite
    }

    render(tile: Tile): void {
        if (this.sprite.alpha < tile.visibility)
            this.sprite.alpha = tile.visibility
        else if (this.sprite.alpha > tile.visibility)
            this.sprite.alpha -= this.visibilityFadeDownRate
    }
}
