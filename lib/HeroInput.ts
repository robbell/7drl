import { Key } from "./Key"
import { Hero } from "./Hero"
import { Direction } from "./Coordinate";

export class HeroInput {
    upKey: Key
    downKey: Key
    leftKey: Key
    rightKey: Key

    constructor() {
        this.upKey = new Key("ArrowUp")
        this.downKey = new Key("ArrowDown")
        this.leftKey = new Key("ArrowLeft")
        this.rightKey = new Key("ArrowRight")
    }

    update(hero: Hero): void {
        if(this.upKey.isDown) hero.tryMove(Direction.up)
        if(this.downKey.isDown) hero.tryMove(Direction.down)
        if(this.leftKey.isDown) hero.tryMove(Direction.left)
        if(this.rightKey.isDown) hero.tryMove(Direction.right)
    }
}
