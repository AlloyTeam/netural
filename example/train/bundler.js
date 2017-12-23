/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(1);

var _data = __webpack_require__(5);

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var network = new _index.Network({
    framework: [2, 6, 6, 1],
    layers: [{ type: "sigmoid" }, { type: "sigmoid" }, { type: "sigmoid" }]
});

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
ctx.translate(200, 200);
ctx.scale(1, -1);

var dataCanvas = document.querySelector('#dataCanvas');
var dataCtx = dataCanvas.getContext('2d');
dataCtx.translate(200, 200);
dataCtx.scale(1, -1);

function renderData() {
    dataCtx.fillStyle = 'red';
    _data2.default.a.forEach(function (item) {
        dataCtx.beginPath();
        dataCtx.arc(item.x, item.y, 5, 0, Math.PI * 2);
        dataCtx.fill();
    });

    dataCtx.fillStyle = 'green';
    _data2.default.b.forEach(function (item) {
        dataCtx.beginPath();
        dataCtx.arc(item.x, item.y, 5, 0, Math.PI * 2);
        dataCtx.fill();
        console.log(1);
    });
}
renderData();
function renderTrain() {
    //var w = canvas.width;
    //var h = canvas.height;
    //var imageData = ctx.getImageData(0, 0, w, h);
    //var pix = imageData.data;
    //for (var i = 0, n = pix.length; i < n; i += 4) {
    //    var x = (i / 4) % w - 200;
    //    var y = 200 - Math.floor((i / 4) / w);
    //    if ( network.compute([x/200,y/200])[0] > 0.5 ) {
    //        pix[i] = 155;
    //        pix[i + 1] = 20;
    //
    //    } else {
    //        pix[i] = 20;
    //        pix[i + 1] = 155;
    //    }
    //    pix[i + 2] = 20;
    //    pix[i + 3] = 125;
    //}
    //
    //ctx.putImageData(imageData, 0, 0)

    ctx.clearRect(-200, -200, 400, 400);
    for (var i = 0; i < 80; i++) {
        for (var j = 0; j < 80; j++) {
            var x = i * 5 + 2.5 - 200;
            var y = 200 - j * 5 - 2.5;
            if (network.compute([x / 200, y / 200])[0] > 0.5) {
                ctx.fillStyle = 'rgba(155,20,20,0.5)';
            } else {
                ctx.fillStyle = 'rgba(20,155,20,0.5)';
            }
            ctx.fillRect(x - 2.5, y - 2.5, 5, 5);
        }
    }
}

function renderXY() {
    ctx.moveTo(-200, 0);
    ctx.lineTo(200, 0);
    ctx.stroke();
    ctx.moveTo(0, -200);
    ctx.lineTo(0, 200);
    ctx.stroke();
}

function preprocessing(data) {
    var arr = [];

    data.a.forEach(function (p) {
        p.tag = true;
        arr.push(p);
    });

    data.b.forEach(function (p) {
        p.tag = false;
        arr.push(p);
    });
    return arr;
}

var arr = preprocessing(_data2.default),
    index = 0,
    count = 0;

function train() {
    var p = arr[index];
    network.train(p.tag === true ? 1 : 0, 1, {
        input: [p.x / 200, p.y / 200],
        onEnd: function onEnd() {
            count++;
            index++;

            if (index === arr.length) {
                index = 0;
            }

            if (count % 1000 === 0) {
                renderTrain();
                setTimeout(train, 100);
            } else {
                train();
            }
        }
    });
}

train();
window.network = network;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _network = __webpack_require__(2);

var _network2 = _interopRequireDefault(_network);

var _netural = __webpack_require__(6);

var _netural2 = _interopRequireDefault(_netural);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_netural2.default.Network = _network2.default;
module.exports = _netural2.default;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _layer = __webpack_require__(3);

var _layer2 = _interopRequireDefault(_layer);

var _netural = __webpack_require__(6);

var _netural2 = _interopRequireDefault(_netural);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Network = function () {
    function Network(option) {
        _classCallCheck(this, Network);

        this.framework = option.framework;
        this.layersData = option.layers;
        this.length = this.framework.length;
        this.input = option.input;
        this.learningRate = option.learningRate || 0.3;
        this.logs = [];
        this.output = [];

        this._init();
    }

    _createClass(Network, [{
        key: '_init',
        value: function _init() {
            var _this = this;

            this.layers = [];
            this.framework.forEach(function (item, index) {
                _this.layers[index] = new _layer2.default(index);
                var layer = _this.layers[index];
                if (index !== 0) {
                    if (_this.layersData) {
                        layer.create(item, _this.framework[index - 1], _this.layersData[index - 1]);
                    } else {
                        layer.create(item, _this.framework[index - 1]);
                    }
                }
            });
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            this._init();
        }
    }, {
        key: 'compute',
        value: function compute(input, onTrain) {
            var _this2 = this;

            if (input) {
                this.input = input;
            }
            this.layers[0].create(this.framework[0], 0);
            this.input.forEach(function (value, _index) {
                _this2.layers[0].neurons[_index].value = value;
            });
            var prevLayer = this.layers[0];
            for (var i = 1; i < this.length; i++) {
                for (var j = 0, len = this.layers[i].neurons.length; j < len; j++) {
                    var sum = 0;
                    for (var k = 0, nLen = prevLayer.neurons.length; k < nLen; k++) {
                        sum += prevLayer.neurons[k].value * this.layers[i].neurons[j].weights[k];
                    }
                    if (this.layers[i].type === _netural2.default.SIGMOID) {
                        this.layers[i].neurons[j].value = this.sigmoid(sum + this.layers[i].neurons[j].b);
                    } else if (this.layers[i].type === _netural2.default.SOFTMAX) {
                        this.layers[i].neurons[j].value = sum + this.layers[i].neurons[j].b;
                    } else if (this.layers[i].type === _netural2.default.RELU) {
                        this.layers[i].neurons[j].value = this.relu(sum + this.layers[i].neurons[j].b);
                    }
                }
                if (this.layers[i].type === _netural2.default.SOFTMAX) {
                    this.softmax(this.layers[i].neurons);
                }
                prevLayer = this.layers[i];
            }

            var output = [];

            this.layers[this.layers.length - 1].neurons.forEach(function (neuron) {
                output.push(neuron.value);
            });

            // this._log(onTrain)
            this.output = output;
            return output;
        }
    }, {
        key: 'train',
        value: function train(target, times, option) {
            if (typeof target === 'number') target = [target];
            if (!option) option = {};
            for (var i = 0; i < times; i++) {
                this.compute(option.input, option.onTrain);
                for (var j = this.length - 1; j > 0; j--) {
                    if (j === this.length - 1) {
                        this.derivationOutputSquareError(target, this.layers[j]);
                    } else {
                        this.derivationSquareError(this.layers[j], j);
                    }
                }
            }
            option.onEnd && option.onEnd.call(this);
            return this.out;
        }
    }, {
        key: 'derivationSquareError',
        value: function derivationSquareError(layer, layerIndex) {
            var _this3 = this;

            if (layer.type === _netural2.default.SIGMOID) {
                layer.neurons.forEach(function (neuron, index) {
                    var sum = 0;
                    _this3.layers[layerIndex + 1].neurons.forEach(function (_neuron, _index) {
                        sum += _neuron.squareErrorList[index];
                    });

                    var d = sum * neuron.value * (1 - neuron.value);
                    neuron.squareErrorList = [];

                    neuron.b -= _this3.learningRate * d;
                    neuron.weights.forEach(function (w, _index) {
                        neuron.squareErrorList.push(d * w);
                        neuron.weights[_index] = w - _this3.learningRate * d * _this3.getPreOut(layerIndex, _index);
                    });
                });
            } else if (layer.type === _netural2.default.RELU) {
                layer.neurons.forEach(function (neuron, index) {
                    var sum = 0;
                    _this3.layers[layerIndex + 1].neurons.forEach(function (_neuron, _index) {
                        sum += _neuron.squareErrorList[index];
                    });

                    var d = sum * (neuron.value > 0 ? 1 : 0);
                    neuron.squareErrorList = [];

                    neuron.b -= _this3.learningRate * d;
                    neuron.weights.forEach(function (w, _index) {
                        neuron.squareErrorList.push(d * w);
                        neuron.weights[_index] = w - _this3.learningRate * d * _this3.getPreOut(layerIndex, _index);
                    });
                });
            }
        }
    }, {
        key: 'derivationOutputSquareError',
        value: function derivationOutputSquareError(target, layer) {
            if (layer.type === _netural2.default.SOFTMAX) {
                this.derivationSoftMaxSquareError(target, layer);
            } else if (layer.type === _netural2.default.SIGMOID) {
                this.derivationSigmoidSquareError(target, layer);
            } else if (layer.type === _netural2.default.RELU) {
                this.derivationReluSquareError(target, layer);
            }
        }
    }, {
        key: 'derivationReluSquareError',
        value: function derivationReluSquareError(target, layer) {
            var _this4 = this;

            target.forEach(function (tv, index) {
                var neuron = layer.neurons[index];
                var d = (neuron.value - target[index]) * (neuron.value > 0 ? 1 : 0);
                neuron.bError = d;
                neuron.squareErrorList = [];
                neuron.b -= _this4.learningRate * d;
                neuron.weights.forEach(function (w, _index) {
                    neuron.squareErrorList.push(d * w);
                    neuron.weights[_index] = w - _this4.learningRate * d * _this4.getPreOut(layer.index, _index);
                });
            });
        }
    }, {
        key: 'derivationSigmoidSquareError',
        value: function derivationSigmoidSquareError(target, layer) {
            var _this5 = this;

            target.forEach(function (tv, index) {
                var neuron = layer.neurons[index];
                var d = (neuron.value - target[index]) * neuron.value * (1 - neuron.value);
                neuron.bError = d;
                neuron.squareErrorList = [];
                neuron.b -= _this5.learningRate * d;
                neuron.weights.forEach(function (w, _index) {
                    neuron.squareErrorList.push(d * w);
                    neuron.weights[_index] = w - _this5.learningRate * d * _this5.getPreOut(layer.index, _index);
                });
            });
        }
    }, {
        key: 'derivationSoftMaxSquareError',
        value: function derivationSoftMaxSquareError(target, layer) {
            var _this6 = this;

            var ds = this.derivationSoftMax(target, layer.neurons);
            target.forEach(function (tv, index) {
                var neuron = layer.neurons[index];
                var loss = ds[index];
                neuron.bError = loss;
                neuron.squareErrorList = [];
                neuron.b -= _this6.learningRate * neuron.bError;
                neuron.weights.forEach(function (w, _index) {
                    neuron.squareErrorList.push(loss * w);
                    neuron.weights[_index] = w - _this6.learningRate * loss * _this6.getPreOut(layer.index, _index);
                });
            });
        }
    }, {
        key: 'derivationSoftMax',
        value: function derivationSoftMax(target, neurons) {
            var index = target.indexOf(1);

            var ds = [];
            neurons.forEach(function (neuron, _index) {
                if (_index === index) {
                    ds.push(neuron.value - 1);
                } else {
                    ds.push(neuron.value);
                }
            });

            return ds;
        }
    }, {
        key: 'getPreOut',
        value: function getPreOut(layerIndex, weightIndex) {
            return this.layers[layerIndex - 1].neurons[weightIndex].value;
        }
    }, {
        key: '_log',
        value: function _log(onTrain) {
            var arr = [];
            this.layers.forEach(function (layer, index) {
                if (index !== 0) {
                    layer.neurons.forEach(function (neuron) {
                        arr.push(neuron.weights.slice(0));
                    });
                }
            });
            onTrain && onTrain.call(this, arr);
            this.logs.push(arr);
        }
    }, {
        key: 'sigmoid',
        value: function sigmoid(x) {
            return 1 / (1 + Math.exp(-x));
        }
    }, {
        key: 'softmaxArr',
        value: function softmaxArr(arr) {
            var max3 = arr.reduce(function (p, c) {
                return p > c ? p : c;
            });
            var nominators = arr.map(function (e) {
                return Math.exp(e - max3);
            });
            var denominator = nominators.reduce(function (p, c) {
                return p + c;
            });
            var output = nominators.map(function (e) {
                return e / denominator;
            });

            return output;
        }
    }, {
        key: 'relu',
        value: function relu(x) {
            return Math.max(0, x);
        }
    }, {
        key: 'softmax',
        value: function softmax(neurons) {
            var arr = [];
            neurons.forEach(function (neuron) {
                arr.push(neuron.value);
            });
            this.softmaxArr(arr).forEach(function (value, index) {
                neurons[index].value = value;
            });
        }
    }]);

    return Network;
}();

exports.default = Network;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _neuron = __webpack_require__(4);

var _neuron2 = _interopRequireDefault(_neuron);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Layer = function () {
    function Layer(index) {
        _classCallCheck(this, Layer);

        this.index = index;
        this.neurons = [];
    }

    _createClass(Layer, [{
        key: 'create',
        value: function create(count, wCount, wb) {
            this.neurons = [];
            if (wb) {
                this.type = wb.type;
            }

            for (var i = 0; i < count; i++) {
                var n = new _neuron2.default();
                if (!wb) {
                    n.create(wCount);
                } else {
                    if (wb.w) {
                        n.weights = wb.w.slice(0).splice(i * wCount, wCount);
                    } else {
                        n.create(wCount);
                    }

                    if (wb.b != null) {
                        n.b = typeof wb.b === 'number' ? wb.b : wb.b[i];
                    }
                }

                this.neurons.push(n);
            }
        }
    }]);

    return Layer;
}();

exports.default = Layer;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Neuron = function () {
    function Neuron(w, b) {
        _classCallCheck(this, Neuron);

        this.value = 0;
        this.weights = w || [];
        this.b = b || 0;
    }

    _createClass(Neuron, [{
        key: "create",
        value: function create(count) {
            this.weights = [];
            for (var i = 0; i < count; i++) {
                // this.weights.push(Math.random()) 以前的权重是这个，被坑惨了。梯度一直无法下降
                this.weights.push(0.2 * Math.random() - 0.1);
            }
        }
    }]);

    return Neuron;
}();

exports.default = Neuron;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    a: [{ "x": -6, "y": 60 }, { "x": 13, "y": 72 }, { "x": 33, "y": 83 }, { "x": 54, "y": 83 }, { "x": 71, "y": 65 }, { "x": 78, "y": 41 }, { "x": 79, "y": 13 }, { "x": 75, "y": -11 }, { "x": 65, "y": -41 }, { "x": 53, "y": -63 }, { "x": 36, "y": -80 }, { "x": 15, "y": -93 }, { "x": -6, "y": -101 }, { "x": -23, "y": -100 }, { "x": -44, "y": -74 }, { "x": -63, "y": -51 }, { "x": -79, "y": -27 }, { "x": -91, "y": -3 }, { "x": -104, "y": 27 }, { "x": -106, "y": 43 }, { "x": -102, "y": 71 }, { "x": -83, "y": 83 }, { "x": -71, "y": 88 }, { "x": -45, "y": 91 }, { "x": -26, "y": 77 }, { "x": -15, "y": 67 }, { "x": -66, "y": 51 }, { "x": -55, "y": 15 }, { "x": -25, "y": 22 }, { "x": 32, "y": 36 }, { "x": 50, "y": 39 }, { "x": 38, "y": -10 }, { "x": 20, "y": -22 }, { "x": -14, "y": 4 }, { "x": 10, "y": -1 }, { "x": -22, "y": -22 }, { "x": -34, "y": -48 }, { "x": -7, "y": -62 }, { "x": 20, "y": -50 }, { "x": 43, "y": -34 }, { "x": -4, "y": 33 }, { "x": -42, "y": 54 }, { "x": 38, "y": 59 }, { "x": -1, "y": -37 }, { "x": -54, "y": -12 }, { "x": 0, "y": 0 }, { "x": 0, "y": 0 }, { "x": 0, "y": 0 }, { "x": 40, "y": 95 }],
    b: [{ "x": 158, "y": 126 }, { "x": 160, "y": 75 }, { "x": 160, "y": 2 }, { "x": 158, "y": -26 }, { "x": 147, "y": -116 }, { "x": 127, "y": -126 }, { "x": 67, "y": -148 }, { "x": 6, "y": -155 }, { "x": -62, "y": -148 }, { "x": -103, "y": -137 }, { "x": -128, "y": -96 }, { "x": -150, "y": -3 }, { "x": -159, "y": 93 }, { "x": -157, "y": 147 }, { "x": -103, "y": 158 }, { "x": 9, "y": 179 }, { "x": 82, "y": 187 }, { "x": 121, "y": 173 }, { "x": 140, "y": 160 }, { "x": 28, "y": 152 }, { "x": -38, "y": 156 }, { "x": -88, "y": 144 }, { "x": -118, "y": 124 }, { "x": -174, "y": 11 }, { "x": -155, "y": -84 }, { "x": -150, "y": -128 }, { "x": -130, "y": -157 }, { "x": 3, "y": -178 }, { "x": 144, "y": -171 }, { "x": 157, "y": -81 }, { "x": 162, "y": 47 }, { "x": 142, "y": -12 }, { "x": 115, "y": -89 }, { "x": 91, "y": -111 }, { "x": 69, "y": -123 }, { "x": -42, "y": -134 }, { "x": -122, "y": -61 }, { "x": -147, "y": 63 }, { "x": -4, "y": 133 }, { "x": 98, "y": 149 }, { "x": 113, "y": 98 }, { "x": 125, "y": 63 }, { "x": 66, "y": 146 }, { "x": 129, "y": -46 }, { "x": -157, "y": -46 }, { "x": 0, "y": 90 }, { "x": 0, "y": 90 }, { "x": 0, "y": 90 }, { "x": 0, "y": 95 }]

    //export  default  {
    //    a:[{"x":-15,"y":55},{"x":-28,"y":-6},{"x":18,"y":12},{"x":-5,"y":29},{"x":-29,"y":19},{"x":-36,"y":44},{"x":-22,"y":69},{"x":-10,"y":74},{"x":3,"y":72},{"x":14,"y":68},{"x":22,"y":63},{"x":31,"y":58},{"x":37,"y":44},{"x":47,"y":30},{"x":46,"y":9},{"x":44,"y":-19},{"x":36,"y":-64},{"x":25,"y":-89},{"x":6,"y":-97},{"x":-12,"y":-80},{"x":-41,"y":-33},{"x":19,"y":-28},{"x":13,"y":-49},{"x":-6,"y":-42},{"x":0,"y":11},{"x":6,"y":32},{"x":-17,"y":40},{"x":-30,"y":59},{"x":-32,"y":62},{"x":-45,"y":55},{"x":-52,"y":47},{"x":-53,"y":36},{"x":-56,"y":17},{"x":-56,"y":2},{"x":-58,"y":-6},{"x":-67,"y":-15},{"x":-70,"y":-23},{"x":-76,"y":-33},{"x":-79,"y":-37},{"x":-83,"y":-52},{"x":-87,"y":-63},{"x":-93,"y":-84},{"x":-94,"y":-96},{"x":-84,"y":-87},{"x":-76,"y":-74},{"x":56,"y":17},{"x":54,"y":0},{"x":57,"y":-14},{"x":64,"y":-27},{"x":64,"y":-41},{"x":71,"y":-60},{"x":77,"y":-77},{"x":80,"y":-92},{"x":71,"y":-87},{"x":64,"y":-77},{"x":59,"y":-70},{"x":57,"y":-53},{"x":44,"y":-47},{"x":-4,"y":-46},{"x":-11,"y":-62},{"x":-40,"y":-67},{"x":-45,"y":-74},{"x":-45,"y":-89},{"x":-46,"y":-91},{"x":-70,"y":-92},{"x":-63,"y":-102},{"x":-56,"y":-114},{"x":-57,"y":-124},{"x":-68,"y":-129},{"x":-76,"y":-135},{"x":-61,"y":-139},{"x":-47,"y":-137},{"x":-35,"y":-137},{"x":-16,"y":-135},{"x":1,"y":-136},{"x":9,"y":-136},{"x":33,"y":-137},{"x":44,"y":-136},{"x":55,"y":-136},{"x":57,"y":-136},{"x":50,"y":-128},{"x":38,"y":-120},{"x":43,"y":-109},{"x":48,"y":-101},{"x":54,"y":-90},{"x":46,"y":-77},{"x":32,"y":-85},{"x":27,"y":-99},{"x":9,"y":-111},{"x":-7,"y":-118},{"x":-17,"y":-109},{"x":-3,"y":-89},{"x":8,"y":-83},{"x":14,"y":-64},{"x":18,"y":-51},{"x":28,"y":-21},{"x":46,"y":-35},{"x":52,"y":-32},{"x":40,"y":-32},{"x":5,"y":-31},{"x":-11,"y":-26},{"x":-14,"y":-11},{"x":1,"y":11},{"x":19,"y":5},{"x":26,"y":8},{"x":18,"y":32},{"x":-1,"y":54},{"x":4,"y":56},{"x":28,"y":40},{"x":31,"y":31},{"x":32,"y":8},{"x":-8,"y":8},{"x":4,"y":-8},{"x":-18,"y":5},{"x":-46,"y":10},{"x":-32,"y":-13},{"x":-43,"y":-21},{"x":-50,"y":-31},{"x":-54,"y":-46},{"x":-49,"y":-42},{"x":-30,"y":-32},{"x":-27,"y":-47},{"x":-26,"y":-69},{"x":-52,"y":-58},{"x":-54,"y":-70},{"x":-27,"y":-100},{"x":-26,"y":-87},{"x":-31,"y":-97},{"x":-39,"y":-115},{"x":-33,"y":-123},{"x":-6,"y":-124},{"x":27,"y":-121},{"x":30,"y":-124},{"x":21,"y":-119},{"x":27,"y":-35},{"x":30,"y":-58},{"x":25,"y":-68},{"x":21,"y":-75},{"x":17,"y":-98},{"x":39,"y":-93},{"x":-9,"y":-95},{"x":-21,"y":-119},{"x":9,"y":-119},{"x":23,"y":-8}],
    //    b:[{"x":123,"y":81},{"x":86,"y":64},{"x":47,"y":96},{"x":-12,"y":117},{"x":-61,"y":129},{"x":-101,"y":122},{"x":-121,"y":94},{"x":-139,"y":50},{"x":-162,"y":-8},{"x":-149,"y":-100},{"x":-134,"y":-139},{"x":-71,"y":-179},{"x":51,"y":-191},{"x":144,"y":-171},{"x":172,"y":-109},{"x":166,"y":-38},{"x":137,"y":109},{"x":116,"y":178},{"x":14,"y":175},{"x":-64,"y":144},{"x":-93,"y":87},{"x":-111,"y":19},{"x":-109,"y":10},{"x":-109,"y":-6},{"x":-123,"y":-45},{"x":-131,"y":-73},{"x":-130,"y":-107},{"x":-120,"y":-130},{"x":-94,"y":-119},{"x":-80,"y":-111},{"x":61,"y":-115},{"x":71,"y":-107},{"x":78,"y":-122},{"x":-82,"y":-122},{"x":91,"y":-50},{"x":87,"y":-37},{"x":82,"y":-15},{"x":71,"y":18},{"x":65,"y":42},{"x":65,"y":49},{"x":43,"y":81},{"x":-14,"y":99},{"x":-46,"y":90},{"x":-71,"y":74},{"x":-82,"y":54},{"x":-86,"y":35},{"x":-90,"y":9},{"x":-96,"y":-10},{"x":-102,"y":-36},{"x":-113,"y":-60},{"x":-114,"y":-85},{"x":-113,"y":-104},{"x":-115,"y":-152},{"x":-103,"y":-164},{"x":-164,"y":-181},{"x":-152,"y":-182},{"x":8,"y":-167},{"x":-41,"y":-164},{"x":-6,"y":-167},{"x":85,"y":-174},{"x":84,"y":-171},{"x":22,"y":-169},{"x":50,"y":-163},{"x":126,"y":-161},{"x":140,"y":-139},{"x":147,"y":-101},{"x":142,"y":-57},{"x":144,"y":-28},{"x":137,"y":7},{"x":132,"y":22},{"x":81,"y":119},{"x":68,"y":137},{"x":47,"y":147},{"x":-30,"y":154},{"x":-103,"y":163},{"x":-148,"y":164},{"x":-162,"y":157},{"x":3,"y":136},{"x":27,"y":124},{"x":163,"y":155},{"x":175,"y":104},{"x":174,"y":45},{"x":176,"y":27},{"x":104,"y":13},{"x":117,"y":-73},{"x":116,"y":-101},{"x":114,"y":-116},{"x":98,"y":-134},{"x":90,"y":-143},{"x":124,"y":-181},{"x":171,"y":-159},{"x":171,"y":-73},{"x":-161,"y":-125},{"x":-144,"y":-67},{"x":-143,"y":-36},{"x":-135,"y":7},{"x":-115,"y":59},{"x":-148,"y":100},{"x":-149,"y":143},{"x":-123,"y":141},{"x":-141,"y":121},{"x":-103,"y":143},{"x":-54,"y":173},{"x":-27,"y":180},{"x":-34,"y":125},{"x":58,"y":179},{"x":105,"y":147},{"x":122,"y":133},{"x":105,"y":104},{"x":153,"y":68},{"x":121,"y":47},{"x":97,"y":40},{"x":119,"y":-29},{"x":170,"y":-3},{"x":-28,"y":-186},{"x":-78,"y":-156},{"x":-22,"y":-155},{"x":72,"y":-154},{"x":8,"y":93},{"x":26,"y":86},{"x":57,"y":66},{"x":76,"y":0},{"x":-103,"y":-21},{"x":-87,"y":-7},{"x":99,"y":-72},{"x":97,"y":-91},{"x":92,"y":-110},{"x":-146,"y":81},{"x":-163,"y":42},{"x":-167,"y":21}]
    //}

};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var netural = {
    SIGMOID: 0,
    SOFTMAX: 1,
    RELU: 2
};

/***/ })
/******/ ]);