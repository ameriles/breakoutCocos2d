///////////////////////////////
// Class Pad
///////////////////////////////
var Pad = cc.Class.extend({
    _sprite: null,

    ctor: function(layer) {
        this._sprite = new cc.Sprite(res.Pad_png);
        this._sprite.setPosition(cc.p(cc.winSize.width / 2, 8));
        layer.addChild(this._sprite, 0);
    },

    move: function(delta) {
        var pos = this._sprite.getPosition();
        pos.x = pos.x + delta.x;

        var size = cc.director.getWinSize();
        if ((pos.x > 0) && (pos.x < size.width)) {
            if ((pos.y > 0) && (pos.y < size.height)) {
                this._sprite.setPosition(pos);
            }
        }
    }
});