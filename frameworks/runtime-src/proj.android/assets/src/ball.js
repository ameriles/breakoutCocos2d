///////////////////////////////
// Class Ball
// Sprite size: 16x16
///////////////////////////////
var Ball = cc.Class.extend({
    _sprite: null,
    _speed: 200,
    _directionX: 1,
    _directionY: 1,

    ctor: function(layer) {
        this._sprite = new cc.Sprite(res.Ball_png);
        layer.addChild(this._sprite, 0);
    },

    update: function(dt) {
        var newPos = this._sprite.getPosition();
        newPos.x += this._directionX * this._speed * dt;
        newPos.y += this._directionY * this._speed * dt;
        this._sprite.setPosition(newPos);
    },

    checkBounds: function(boundsLayer) {
        var position = this._sprite.getPosition();
        if (position.x + 8 > boundsLayer.width) {
            this._directionX = -1;
        } else if (position.x - 8 < 0) {
            this._directionX = 1;
        }

        if (position.y + 8 > boundsLayer.height) {
            this._directionY = -1;
        } else if (position.y + 8 < 0) {
            // the ball is gone baby...
        }
    },

    getBoundingBox: function() {
        return this._sprite.getBoundingBox();
    },

    checkCollisions: function(bricks, pad) {
        var ballBoundingBox = this.getBoundingBox();

        var padBoundingBox = pad.getBoundingBox();
        // Checks for ball vs pad
        if (cc.rectIntersectsRect(padBoundingBox, ballBoundingBox)) {
            // TODO: detect where in the pad the collision occurs
            // a. Over the pad, reflects angle
            // b. Sides of the pad, adjust angle
            this._directionY = 1;
            return;
        }

        // Checks for ball vs bricks
        for (var i = 0; i < bricks.length; i++) {
            var brickBoundingBox = bricks[i].getBoundingBox();
            if (cc.rectIntersectsRect(brickBoundingBox, ballBoundingBox)) {
                // TODO: detect where in the brick the collision occurs...
                // a. Below the brick, reflects angle
                // b. Sides of the brick, adjust angle
                this._directionY = -1;
                bricks[i].destroy();
                bricks.splice(i, 1);
                this.increaseSpeed();
                return;
            }
        }
    },

    increaseSpeed: function() {
        this._speed += 5;
    },
    
    setInitialPosition: function(pad) {
        // TODO inspeccionar el sprite de pad para obtener las dimensiones del sprite y reemplazar la hardcodeada 16
        var position = pad.getSprite().getPosition();
        this._sprite.setPosition(cc.p(cc.winSize.width / 2, position.y + 16));
    }
});