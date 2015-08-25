var InGameSpriteLayer = cc.Layer.extend({
    _pad: null,
    _ball: null,
    _bricks: null,

    ctor: function() {
        this._super();
    },

    init: function() {
        // create bricks
        _bricks = [];
        for (var i = 0; i < 12; i++) {
            for (var j = 0; j < 5; j++) {
                var b = new Brick(this, j, i);
                _bricks.push(b);
            }
        }
        // end bricks

        // create pad
        _pad = new Pad(this);

        // create ball
        _ball = new Ball(this);

        this.setupTouchListener();

        this.scheduleUpdate();
    },

    setupTouchListener: function() {
        var touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE, //one click
            swallowTouches: true, //is onTouch return true, stop event propagation
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved
        });

        cc.eventManager.addListener(touchListener, this);
    },

    onTouchBegan: function(touch, event) {
        return true;
    },

    onTouchMoved: function(touch, event) {
        cc.log(touch.getDelta());

        var delta = touch.getDelta();
        _pad.move(delta)

        return true;
    },

    update: function(dt) {
        _ball.checkBounds(this);
    
        _ball.checkCollisions(_bricks, _pad);
    
        _ball.update(dt);
    }
});

var InGameScene = cc.Scene.extend({
    onEnter: function() {
        this._super();

        var backgroundLayer = new cc.LayerColor(new cc.Color(128, 128, 64, 255), cc.winSize.width, cc.winSize.height);
        this.addChild(backgroundLayer);

        var spriteLayer = new InGameSpriteLayer();
        spriteLayer.init();

        this.addChild(spriteLayer);
    }
});