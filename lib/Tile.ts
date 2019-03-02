import { Container } from 'pixi.js'
import { TileRenderer } from "./TileRenderer"

export class Tile {
    private tileRenderer: TileRenderer = new TileRenderer()
    visibility: number = 0;

    constructor(public type: string, public x: number, public y: number) {
    }

    update(stage: Container): void {
        this.tileRenderer.render(this, stage)
    }

    setVisibility(visibility: number): any {
        this.visibility = visibility;
    }
}
