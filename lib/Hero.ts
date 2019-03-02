import { Container } from 'pixi.js'
import { HeroRenderer } from './HeroRenderer'
import { HeroInput } from './HeroInput'
import { Coordinate, Direction } from './Coordinate';

export class Hero {
    static movementSteps: number = 15
    private heroInput: HeroInput = new HeroInput()
    private heroRenderer: HeroRenderer = new HeroRenderer()
    isMoving: boolean = false
    destination: Coordinate
    movementStep: number = 0

    get x(): number {
        return this.heroRenderer.x
    }

    get y(): number {
        return this.heroRenderer.y
    }

    constructor(public position: Coordinate) {
        console.log(position)
        this.destination = position
    }

    update(stage: Container): void {
        this.heroInput.update(this)

        if (this.isMoving) this.continueMoving()

        this.heroRenderer.render(this, stage)
    }

    tryMove(direction: Direction): void {
        if (this.isMoving) return

        this.isMoving = true
        this.destination = this.position.move(direction)
    }

    private continueMoving() {
        this.movementStep++

        if (this.movementStep != Hero.movementSteps) return

        this.isMoving = false
        this.position = this.destination
        this.movementStep = 0
    }
}
