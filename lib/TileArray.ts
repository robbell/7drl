import { Tile, NullTile, BaseTile } from "./Tile"
import { Coordinate } from "./Coordinate"

export class TileArray {
    tiles: Tile[][]

    constructor(public _width: number, public height: number) {
        this.tiles = []

        for (var rowCount: number = 0; rowCount < height; rowCount++) {
            this.tiles[rowCount] = []
        }
    }

    getTileAt(coordinate: Coordinate): BaseTile {
        return this.tiles[coordinate.x] && this.tiles[coordinate.x][coordinate.y] || new NullTile()
    }

    setTileAt(coordinate: Coordinate, tile: Tile): void {
        this.tiles[coordinate.x][coordinate.y] = tile
    }

    apply(action: (tile: Tile) => void): void {
        this.tiles.forEach(row => {
            row.forEach(tile => {
                action(tile)
            })
        })
    }

    find(criteria: (tile: Tile) => boolean): BaseTile {
        for (let rowCount = 0; rowCount < this.tiles.length; rowCount++) {
            let matching = this.tiles[rowCount].filter(criteria)
            if (matching.length > 0) return matching[0]
        }
        return new NullTile()
    }
}
