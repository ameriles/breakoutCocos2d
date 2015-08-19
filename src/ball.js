///////////////////////////////
// Class Ball
///////////////////////////////
var Ball = cc.Class.extend({
    _sprite: null,

    ctor: function(layer) {
        this._sprite = new cc.Sprite(res.Ball_png);
        this._sprite.setPosition(cc.p(cc.winSize.width / 2, 8 + 16));

        layer.addChild(this._sprite, 0);
    }
});