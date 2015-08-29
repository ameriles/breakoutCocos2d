///////////////////////////////
// Class Pad
// Sprite size: 120x20
///////////////////////////////
var Pad = cc.Class.extend({
    _WIDTH: 120,
    _HEIGHT: 20,
    _PADDING_BOTTOM: 40,
    _sprite: null,

    ctor: function(layer) {
        this._sprite = new cc.Sprite(res.Pad_png);
        this._sprite.setPosition(cc.p(cc.winSize.width / 2, (this._HEIGHT / 2) + this._PADDING_BOTTOM));
        layer.addChild(this._sprite, 0);
    },

    move: function(delta) {
        var pos = this._sprite.getPosition();
        pos.x = pos.x + delta.x;

        var size = cc.director.getWinSize();
        if ((pos.x - (this._WIDTH / 2) > 0) && (pos.x + (this._WIDTH / 2) < size.width)) {
            //if ((pos.y > 0) && (pos.y < size.height)) {
                this._sprite.setPosition(pos);
            //}
        }
    },

    getBoundingBox: function() {
        return this._sprite.getBoundingBox();
    },

    getSprite: function() {
        return this._sprite;
    }
});