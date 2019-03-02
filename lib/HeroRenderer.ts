import { Sprite, Container } from 'pixi.js'
import { Hero } from './Hero'
import GameConstants from './GameConstants';
const someImage = require('../img/hero.png')

export class HeroRenderer {
    private static width: number = 20
    private static height: number = 20
    private movementXPixels: number
    private movementYPixels: number
    private sprite: Sprite

    get x(): number {
        return this.sprite.x
    }

    get y(): number {
        return this.sprite.y
    }

    constructor() {
        this.movementYPixels = GameConstants.tileHeight / Hero.movementSteps
        this.movementXPixels = GameConstants.tileWidth / Hero.movementSteps
        this.sprite = Sprite.from(someImage)
    }

    render(hero: Hero, stage: Container): void {
        
        this.sprite.x = hero.tileX * GameConstants.tileWidth + this.getXAdjustmentForMovement(hero)
        this.sprite.y = hero.tileY * GameConstants.tileHeight + this.getYAdjustmentForMovement(hero) 
        
        stage.addChild(this.sprite)
    }

    private getXAdjustmentForMovement(hero: Hero): any {
        if (hero.movingToTileX == hero.tileX) return 0
        return (this.movementXPixels * hero.movementStep) * (hero.movingToTileX - hero.tileX)
    }

    private getYAdjustmentForMovement(hero: Hero) {
        if (hero.movingToTileY == hero.tileY) return 0
        return (this.movementYPixels * hero.movementStep) * (hero.movingToTileY - hero.tileY)
    }
}
