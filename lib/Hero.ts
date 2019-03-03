import { DisplayObject } from 'pixi.js'
import { HeroRenderer } from './HeroRenderer'
import { HeroInput } from './HeroInput'
import { Map } from './Map'
import { Coordinate, Direction } from './Coordinate';
import { GameObject } from './GameObject';

export class Hero implements GameObject {
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
        this.destination = position
    }

    initialise() : DisplayObject{
        return this.heroRenderer.initialise()
    }

    update(map: Map): void {
        this.heroInput.update(this, map)
        if (this.isMoving) this.continueMoving()
        this.heroRenderer.render(this)
    }

    tryMove(direction: Direction, map: Map): void {
        if (this.isMoving) return

        let targetDestination = this.position.apply(direction)

        if (!map.isPassable(targetDestination)) return
        
        this.isMoving = true
        this.destination = targetDestination
    }

    private continueMoving() {
        this.movementStep++

        if (this.movementStep != Hero.movementSteps) return

        this.isMoving = false
        this.position = this.destination
        this.movementStep = 0
    }
}
