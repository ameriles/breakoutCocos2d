///////////////////////////////
// Class Brick
///////////////////////////////
var Brick = cc.Class.extend({
    _sprite: null,
    _containerLayer: null,
    
    ctor: function(layer, row, col) {
        var randBrick = this.getRandomBrick();

        this._sprite = new cc.Sprite(randBrick);
        this._sprite.setPosition(cc.p((col * 64) + 32, cc.winSize.height - 8 - (row * 16)));

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