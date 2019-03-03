import { Map } from './Map'
import { Map as MapGenerator } from "rot-js"
import { Tile } from './Tile'

export class MapBuilder {
    private width: number = 10
    private height: number = 10
    private map!: Map

    WithDimensions(width: number, height: number): MapBuilder {
        this.width = width, this.height = height
        return this
    }

    build(): Map {
        this.map = new Map(this.width, this.height)

        new MapGenerator.Digger(this.width, this.height)
            .create((x: number, y: number, value: number) => this.generatorCallback(x, y, value))

        this.map.initialise()

        return this.map
    }

    private generatorCallback(x: number, y: number, value: number) {
        this.map.tiles[x][y] = value > 0 ? new Tile("wall", x, y) : new Tile("floor", x, y)
    }
}
