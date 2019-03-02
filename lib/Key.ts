export class Key {
    public isDown: boolean = false
    public isUp: boolean = false
    downHandler: (event: any) => void
    upHandler: (event: any) => void

    constructor(public value: string) {
        this.downHandler = event => {
            if (event.key === this.value) {
                this.isDown = true
                this.isUp = false
                event.preventDefault()
            }
        }

        this.upHandler = event => {
            if (event.key === this.value) {
                this.isDown = false
                this.isUp = true
                event.preventDefault()
            }
        }

        const downListener = this.downHandler.bind(this)
        const upListener = this.upHandler.bind(this)

        window.addEventListener("keydown", downListener, false)
        window.addEventListener("keyup", upListener, false)
    }
}
