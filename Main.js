function Main() {
    this.app = new PIXI.Application(500, 500, { backgroundColor: 0x1099bb });
    document.body.appendChild(this.app.view);
    this.loadSprites();

    this.map = new Map();

    this.app.ticker.add(function (delta) {
        this.update();
    }.bind(this));
}

Main.prototype.loadSprites = function () {
    this.wallTexture = PIXI.Texture.fromImage("wall.png");
    this.floorTexture = PIXI.Texture.fromImage("floor.png");
}

Main.prototype.update = function () { 
    this.map.draw(this.app);
}