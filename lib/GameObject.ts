import { DisplayObject } from "pixi.js";

export interface GameObject{
    initialise() : DisplayObject
    update(parent?: GameObject) : void
}