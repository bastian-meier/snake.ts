(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var snake = function () {
    function snake(canvasId, ticksPerSecond) {
        var _this = this;

        _classCallCheck(this, snake);

        this.keyPushed = false;
        this.squareWidth = 20;
        this.player = { x: 10, y: 10 };
        this.apple = { x: 15, y: 15 };
        this.velocity = { x: 1, y: 0 };
        this.trail = [];
        this.tail = 5;
        var canv = document.getElementById(canvasId);
        this.scoreDiv = document.getElementById('score');
        this.settingsHolder = document.getElementById('settingsHolder');
        this.scoreHolder = document.getElementById('scoreHolder');
        this.ctx = canv.getContext("2d");
        this.width = canv.width;
        this.height = canv.height;
        this.xBoxes = Math.floor(this.width / this.squareWidth);
        this.yBoxes = Math.floor(this.height / this.squareWidth);
        this.settingsHolder.style.display = 'none';
        this.setBackground();
        this.drawApple();
        this.interval = setInterval(function () {
            _this.gameTick();
        }, 1000 / ticksPerSecond);
        document.addEventListener('keydown', function (e) {
            _this.keyPush(e);
        });
    }

    _createClass(snake, [{
        key: "drawSquare",
        value: function drawSquare(point, color) {
            this.ctx.fillStyle = color;
            this.ctx.fillRect(point.x * this.squareWidth, point.y * this.squareWidth, this.squareWidth - 2, this.squareWidth - 2);
        }
    }, {
        key: "setBackground",
        value: function setBackground() {
            this.ctx.fillStyle = 'black';
            this.ctx.fillRect(0, 0, this.xBoxes * this.squareWidth, this.yBoxes * this.squareWidth);
        }
    }, {
        key: "drawApple",
        value: function drawApple() {
            this.drawSquare(this.apple, 'green');
        }
    }, {
        key: "setNewPoint",
        value: function setNewPoint() {
            this.player.x += this.velocity.x;
            this.player.y += this.velocity.y;
            if (this.player.x < 0) {
                this.player.x = this.xBoxes - 1;
            }
            if (this.player.x > this.xBoxes - 1) {
                this.player.x = 0;
            }
            if (this.player.y < 0) {
                this.player.y = this.yBoxes - 1;
            }
            if (this.player.y > this.yBoxes - 1) {
                this.player.y = 0;
            }
            this.keyPushed = false;
        }
    }, {
        key: "renewSnake",
        value: function renewSnake() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.trail[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _point = _step.value;

                    this.drawSquare(_point, 'yellow');
                    if (this.checkIfSamePosition(_point, this.player)) {
                        this.finishGame(_point);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            this.trail.push({ x: this.player.x, y: this.player.y });
            while (this.trail.length > this.tail) {
                var point = this.trail.shift();
                this.drawSquare(point, 'black');
            }
        }
    }, {
        key: "checkIfSamePosition",
        value: function checkIfSamePosition(firstPoint, secondPoint) {
            return firstPoint.x === secondPoint.x && firstPoint.y === secondPoint.y;
        }
    }, {
        key: "checkForApple",
        value: function checkForApple() {
            if (this.checkIfSamePosition(this.apple, this.player)) {
                this.tail++;
                while (true) {
                    this.apple = {
                        x: Math.floor(Math.random() * this.xBoxes),
                        y: Math.floor(Math.random() * this.yBoxes)
                    };
                    if (!this.appleIsInsideSnake()) {
                        break;
                    }
                }
                this.drawApple();
                this.setScore();
            }
        }
    }, {
        key: "appleIsInsideSnake",
        value: function appleIsInsideSnake() {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.trail[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var point = _step2.value;

                    if (this.checkIfSamePosition(this.apple, point)) {
                        return true;
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return false;
        }
    }, {
        key: "finishGame",
        value: function finishGame(point) {
            var _this2 = this;

            setTimeout(function () {
                _this2.drawSquare(point, 'red');
                clearInterval(_this2.interval);
                _this2.settingsHolder.style.display = 'block';
            }, 10);
        }
    }, {
        key: "setScore",
        value: function setScore() {
            var score = this.tail - 5;
            this.scoreHolder.style.display = 'block';
            this.scoreDiv.innerText = '' + score;
        }
    }, {
        key: "gameTick",
        value: function gameTick() {
            this.setNewPoint();
            this.renewSnake();
            this.checkForApple();
        }
    }, {
        key: "keyPush",
        value: function keyPush(evt) {
            if (!this.keyPushed) {
                this.keyPushed = true;
                switch (evt.keyCode) {
                    case 37:
                        if (this.velocity.x !== 1 && this.velocity.y !== 0) {
                            this.velocity = { x: -1, y: 0 };
                        }
                        break;
                    case 38:
                        if (this.velocity.x !== 0 && this.velocity.y !== 1) {
                            this.velocity = { x: 0, y: -1 };
                        }
                        break;
                    case 39:
                        if (this.velocity.x !== -1 && this.velocity.y !== 0) {
                            this.velocity = { x: 1, y: 0 };
                        }
                        break;
                    case 40:
                        if (this.velocity.x !== 0 && this.velocity.y !== -1) {
                            this.velocity = { x: 0, y: 1 };
                        }
                        break;
                }
            }
        }
    }]);

    return snake;
}();

var button = document.getElementById('start');
button.onclick = function () {
    var input = document.getElementById('ticks');
    new snake('snake', +input.value);
};

},{}]},{},[1])

//# sourceMappingURL=bundle.js.map
