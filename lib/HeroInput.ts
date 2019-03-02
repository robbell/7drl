import { Key } from "./Key"
import { Hero } from "./Hero"

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
        if(this.upKey.isDown) hero.tryMoveUp()
        if(this.downKey.isDown) hero.tryMoveDown()
        if(this.leftKey.isDown) hero.tryMoveLeft()
        if(this.rightKey.isDown) hero.tryMoveRight()
    }
}
