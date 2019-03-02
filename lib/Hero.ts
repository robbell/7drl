import { Container } from 'pixi.js'
import { HeroRenderer } from './HeroRenderer'
import { HeroInput } from './HeroInput'

export class Hero {
    static movementSteps: number = 15
    private heroInput: HeroInput = new HeroInput()
    private heroRenderer: HeroRenderer = new HeroRenderer()
    isMoving: boolean = false
    movingToTileX: number
    movingToTileY: number
    movementStep: number = 0
    
    get x(): number {
        return this.heroRenderer.x
    }

    get y(): number {
        return this.heroRenderer.y
    }

    constructor(public tileX: number, public tileY: number) {
        this.movingToTileX = tileX
        this.movingToTileY = tileY
    }

    update(stage: Container): void {
        this.heroInput.update(this)

        if (this.isMoving) this.continueMoving()

        this.heroRenderer.render(this, stage)
    }

    // ToDo: Refactor to single method
    tryMoveUp(): void {
        if (this.isMoving) return

        this.isMoving = true
        this.movingToTileY = this.tileY - 1
    }

    tryMoveDown(): void {
        if (this.isMoving) return

        this.isMoving = true
        this.movingToTileY = this.tileY + 1
    }

    tryMoveLeft(): void {
        if (this.isMoving) return

        this.isMoving = true
        this.movingToTileX = this.tileX - 1
    }

    tryMoveRight(): void {
        if (this.isMoving) return

        this.isMoving = true
        this.movingToTileX = this.tileX + 1
    }

    private continueMoving() {
        this.movementStep++

        if (this.movementStep != Hero.movementSteps) return

        this.isMoving = false
        this.tileX = this.movingToTileX
        this.tileY = this.movingToTileY
        this.movementStep = 0
    }
}
