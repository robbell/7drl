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
        let rotMap = new MapGenerator.Digger(this.width, this.height)
        rotMap.create((x: number, y: number, value: number) => this.generatorCallback(x, y, value))

        this.map.initialise()
        return this.map
    }

    private generatorCallback(x: number, y: number, value: number) {
        if (value > 0) this.map.tiles[x][y] = new Tile("something", x, y)
    }
}
