var InGameSpriteLayer = cc.Layer.extend({
    _pad: null,
    _ball: null,
    _bricks: null,
    _touchListener: null,

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
        // end pad

        // create ball
        _ball = new Ball(this);
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
    },

    onTouchBegan: function(touch, event) { //touchbegan callback

        cc.log("onTouchBegan");
        return true;
    },

    onTouchMoved: function(touch, event) { //touchmoved callback
        cc.log(touch.getDelta());
       
        var delta = touch.getDelta();
       
        _pad.move(delta)
       
        return true;
    }
});

var InGameScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new InGameSpriteLayer();
        layer.init();
        
        this.addChild(layer);
    }
});