import { Text, DisplayObject, TextStyle } from 'pixi.js'
import { GameObject } from './GameObject';

export class Console implements GameObject {
    private lastMeasurement: number = 0
    private lastTimeRedrawn: number = performance.now()
    private maximumUpdateInterval: number = 500
    private delta: number = 0
    private displayObject: Text = new Text('0', new TextStyle({
        fontFamily: 'Courier',
        fontSize: 10,
        fill: '#fff'
    }))

    initialise(): DisplayObject {
        return this.displayObject
    }

    update(): void {
        let fpsValue = this.calculateFps().toPrecision(4)
        const currentTime = performance.now();

        if (this.lastTimeRedrawn > currentTime - this.maximumUpdateInterval) return

        this.lastTimeRedrawn = currentTime
        this.displayObject.text = "FPS4:" + fpsValue
    }

    private calculateFps(): number {
        this.delta = (performance.now() - this.lastMeasurement) / 1000
        this.lastMeasurement = performance.now()
        return 1 / this.delta
    }
}
