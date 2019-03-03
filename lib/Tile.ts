import { Container, DisplayObject } from 'pixi.js'
import { TileRenderer } from "./TileRenderer"
import { GameObject } from './GameObject';
import { Coordinate } from './Coordinate';

export abstract class BaseTile implements GameObject {
    abstract initialise(): DisplayObject
    abstract update(parent?: GameObject): void
    abstract isPassable(): boolean

    constructor(public type: string, public position: Coordinate) {
    }
}

export class Tile extends BaseTile {
    private tileRenderer: TileRenderer = new TileRenderer(this.type)
    visibility: number = 0;

    initialise(): Container {
        return this.tileRenderer.initialise(this)
    }

    update(): void {
        this.tileRenderer.render(this)
    }

    setVisibility(visibility: number): any {
        this.visibility = visibility;
    }

    isPassable(): boolean {
        return this.type == "floor"
    }
}

export class NullTile extends BaseTile {
    constructor() {
        super("", new Coordinate(0, 0));
    }
    initialise(): DisplayObject {
        throw new Error("Method not implemented.");
    }

    update(_parent?: GameObject): void { }

    isPassable(): boolean {
        return true;
    }
}
