///////////////////////////////
// Class Brick
// BrickSize: 60x20
///////////////////////////////
var Brick = cc.Class.extend({
    _sprite: null,
    _containerLayer: null,
    
    ctor: function(layer, row, col) {
        var WIDTH = 60;
        var HEIGHT = 20;
        
        var paddingLeft = 20;
        var paddingTop = 20;
                
        var randBrick = this.getRandomBrick();

        this._sprite = new cc.Sprite(randBrick);
        this._sprite.setPosition(cc.p((col * WIDTH) + (WIDTH/2) + paddingLeft, cc.winSize.height - (HEIGHT/2) - (row * HEIGHT) - paddingTop));

        layer.addChild(this._sprite, 0);
        
        this._containerLayer = layer;
    },

    getRandomBrick: function() {
        var resBricks = [res.BlueBrick_png, res.GreenBrick_png, res.OrangeBrick_png, res.RedBrick_png, res.YellowBrick_png];
        var randomIndex = Math.floor(Math.random() * resBricks.length);
        return resBricks[randomIndex];
    },
    
    getBoundingBox: function() {
        return this._sprite.getBoundingBox();
    },
    
    destroy: function() {
        this._containerLayer.removeChild(this._sprite);
    }
});