export class Coordinate {
    constructor(public x: number, public y: number) {

    }

    move(direction: Direction) : Coordinate
    {
        return direction.directionAction(this)
    }
}

export class Direction {
    static up = new Direction((c: Coordinate) => new Coordinate(c.x, c.y - 1))
    static down = new Direction((c: Coordinate) => new Coordinate(c.x, c.y + 1))
    static left = new Direction((c: Coordinate) => new Coordinate(c.x - 1, c.y))
    static right = new Direction((c: Coordinate) => new Coordinate(c.x + 1, c.y))

    constructor(public directionAction: ((c: Coordinate) => Coordinate)) {
    }
}
