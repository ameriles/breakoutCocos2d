var InGameSpriteLayer = cc.Layer.extend({
    _pad: null,
    _ball: null,
    _bricks: null,

    ctor: function() {
        this._super();
    },

    init: function() {
        var centerpos = cc.p(cc.winSize.width / 2, cc.winSize.height / 2);
        var spritebg = new cc.Sprite(res.Background_jpg);
        spritebg.setPosition(centerpos);
        this.addChild(spritebg);
        
        var ROWS = 7;
        var COLS = 10;
        // create bricks
        _bricks = [];
        for (var i = 0; i < COLS; i++) {
            for (var j = 0; j < ROWS; j++) {
                var b = new Brick(this, j, i);
                _bricks.push(b);
            }
        }
        // end bricks

        // create pad
        _pad = new Pad(this);

        // create ball
        _ball = new Ball(this);
        _ball.setInitialPosition(_pad);

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

        var spriteLayer = new InGameSpriteLayer();
        spriteLayer.init();

        this.addChild(spriteLayer);
    }
});