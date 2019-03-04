import { sprites } from './Game';
export class Spritesheet {
    private static instance: Spritesheet;
    private static src: string;
    static sheet: PIXI.Spritesheet;
    static loadCompleteCallback: () => void;

    constructor(src: string) {
        if (Spritesheet.instance)
            throw new Error("Spritesheet already initialised with src");
        Spritesheet.src = src;
    }

    static getInstance() {
        return this.instance;
    }

    static loadAndCall(callback: () => void): void {
        this.loadCompleteCallback = callback;
        PIXI.loader
            .add(this.src)
            .load(() => this.loadComplete());
    }

    private static loadComplete() {
        this.sheet = PIXI.loader.resources[sprites].spritesheet
        this.loadCompleteCallback();
    }
}
