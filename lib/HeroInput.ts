import { Key } from "./Key"
import { Hero } from "./Hero"
import { Direction } from "./Coordinate";
import { Map } from "./Map";

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

    update(hero: Hero, map: Map): void {
        if(this.upKey.isDown) hero.tryMove(Direction.up, map)
        if(this.downKey.isDown) hero.tryMove(Direction.down, map)
        if(this.leftKey.isDown) hero.tryMove(Direction.left, map)
        if(this.rightKey.isDown) hero.tryMove(Direction.right, map)
    }
}
