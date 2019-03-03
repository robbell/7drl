import { Container } from 'pixi.js'
import { TileRenderer } from "./TileRenderer"
import { GameObject } from './GameObject';

export class Tile implements GameObject {
    private tileRenderer: TileRenderer = new TileRenderer(this.type)
    visibility: number = 0;

    constructor(public type: string, public x: number, public y: number) {
    }

    initialise(): Container {
        return this.tileRenderer.initialise(this)
    }

    update(): void {
        this.tileRenderer.render(this)
    }

    setVisibility(visibility: number): any {
        this.visibility = visibility;
    }
}
