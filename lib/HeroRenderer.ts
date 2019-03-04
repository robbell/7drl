import { Container } from 'pixi.js'
import { Hero } from './Hero'
import { GameConstants } from './GameConstants'
import { Spritesheet } from './Spritesheet'

export class HeroRenderer {
    private movementXPixels: number
    private movementYPixels: number
    private sprite: PIXI.extras.AnimatedSprite

    get x(): number {
        return this.sprite.x
    }

    get y(): number {
        return this.sprite.y
    }

    constructor() {
        this.movementYPixels = GameConstants.tileHeight / Hero.movementSteps
        this.movementXPixels = GameConstants.tileWidth / Hero.movementSteps
        this.sprite = new PIXI.extras.AnimatedSprite(Spritesheet.sheet.animations["hero/hero"])
        this.sprite.animationSpeed = 0.2
        this.sprite.play()
    }

    initialise(): Container {
        this.sprite.anchor.set(0.5)
        return this.sprite
    }

    render(hero: Hero): void {
        if (hero.isMoving) this.sprite.play()
        else this.sprite.stop()

        this.sprite.x = hero.position.x * GameConstants.tileWidth
            + this.getXAdjustmentForMovement(hero)
        this.sprite.y = hero.position.y * GameConstants.tileHeight
            + this.getYAdjustmentForMovement(hero)
    }

    private getXAdjustmentForMovement(hero: Hero): any {
        if (hero.destination.x == hero.position.x) return 0
        return (this.movementXPixels * hero.movementStep) * (hero.destination.x - hero.position.x)
    }

    private getYAdjustmentForMovement(hero: Hero) {
        if (hero.destination.y == hero.position.y) return 0
        return (this.movementYPixels * hero.movementStep) * (hero.destination.y - hero.position.y)
    }
}
