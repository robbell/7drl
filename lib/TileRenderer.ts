import { Sprite, Container } from 'pixi.js'
import { Tile } from './Tile'
import { GameConstants } from './GameConstants'
import { Spritesheet } from './Spritesheet'

export class TileRenderer {
    private visibilityFadeDownRate: number = 0.02
    sprite: Sprite

    constructor(type: string) {
        let texture = Spritesheet.sheet.textures[type == "wall" ? "wall.png" : "floor.png"]
        this.sprite = new PIXI.Sprite(texture)
    }

    initialise(tile: Tile): Container {
        this.sprite.x = tile.position.x * GameConstants.tileWidth
        this.sprite.y = tile.position.y * GameConstants.tileHeight
        this.sprite.alpha = tile.visibility
        this.sprite.anchor.set(0.5)
        return this.sprite
    }

    render(tile: Tile): void {
        if (this.sprite.alpha < tile.visibility)
            this.sprite.alpha = tile.visibility
        else if (this.sprite.alpha > tile.visibility)
            if (this.sprite.alpha - this.visibilityFadeDownRate < 0.15) this.sprite.alpha = 0.15
            else this.sprite.alpha -= this.visibilityFadeDownRate
    }
}
