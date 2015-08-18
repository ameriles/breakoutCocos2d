var InGameSpriteLayer = cc.Layer.extend({

    _self: null,
    _pad: null,
    _ball: null,
    _bricks: null,
    _touchListener: null,

    ctor: function() {
        //////////////////////////////
        // 1. super init first
        this._super();
        _self = this;

        // create bricks
        var size = cc.winSize;
        var resBricks = [res.BlueBrick_png, res.GreenBrick_png, res.OrangeBrick_png, res.RedBrick_png, res.YellowBrick_png];

        _bricks = [];
        for (var i = 0; i < 12; i++) {
            for (var j = 0; j < 5; j++) {
                var resBrick = resBricks[Math.floor(Math.random() * 5)];
                var s = new cc.Sprite(resBrick)
                s.setAnchorPoint(cc.p(0.5, 0.5));
                s.setPosition(cc.p((i * 64) + 32, size.height - 8 - (j * 16)));
                this.addChild(s, 0);
                _bricks.push(s);
            }
        }
        // end bricks

        // create pad
        _pad = new cc.Sprite(res.Pad_png);
        _pad.setAnchorPoint(cc.p(0.5, 0.5));
        _pad.setPosition(cc.p(size.width / 2, 8));
        _pad.setTag(1);
        this.addChild(_pad, 0);
        // end pad

        // create ball
        _ball = new cc.Sprite(res.Ball_png);
        _ball.setAnchorPoint(cc.p(0.5, 0.5));
        _ball.setPosition(cc.p(size.width / 2, 8 + 16));
        this.addChild(_ball, 0);
        // end ball

        //if ('touches' in cc.sys.capabilities) {
            _touchListener = cc.EventListener.create({
                event: cc.EventListener.TOUCH_ONE_BY_ONE, //one click
                swallowTouches: true, //is onTouch return true, stop event propagation
                onTouchBegan: this.onTouchBegan, //callbacks
                onTouchMoved: this.onTouchMoved
            });

            cc.eventManager.addListener(_touchListener, this);
        //}

        this.scheduleUpdate();
    },

    movePad: function(destination) {
        var size = cc.director.getWinSize();
        if ((destination.x > 0) && (destination.x < size.width)) //check if square is inside the screen
        if ((destination.y > 0) && (destination.y < size.height)) _pad.setPosition(destination); //if ok, move it
    },

    onTouchBegan: function(touch, event) { //touchbegan callback

        cc.log("onTouchBegan");
        return true;
    },

    onTouchMoved: function(touch, event) { //touchmoved callback
        cc.log(touch.getDelta());
       
        var delta = touch.getDelta();
        var pos = _pad.getPosition();
        pos.x = pos.x + delta.x;
        _self.movePad(pos)
       
        return true;
    }
});

var InGameScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new InGameSpriteLayer();
        this.addChild(layer);
    }
});