import * as P from 'pixi.js'

export class Console {
    private lastMeasurement: number = 0
    private lastTimeRedrawn: number = performance.now()
    private maximumUpdateInterval: number = 500
    private delta: number = 0

    component: P.Text = new P.Text('0', new P.TextStyle({
        fontFamily: 'Courier New',
        fontSize: 10,
        fill: '#fff'
    }))

    update() : void{
        let fpsValue = this.calculateFps().toPrecision(4)
        const currentTime = performance.now();
        
        if (this.lastTimeRedrawn > currentTime - this.maximumUpdateInterval) return

        this.lastTimeRedrawn = currentTime
        this.component.text = "FPS:" + fpsValue
    }

    private calculateFps(): number {
        this.delta = (performance.now() - this.lastMeasurement) / 1000
        this.lastMeasurement = performance.now()
        return 1 / this.delta
    }
}
