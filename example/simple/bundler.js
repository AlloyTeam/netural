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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    SIGMOID: 0,
    SOFTMAX: 1,
    RELU: 2
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(2);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var network = new _index2.default.Network({
    framework: [2, 2, 2],
    layers: [{ w: [0.15, 0.20, 0.25, 0.30], b: 0.35, type: _index2.default.SIGMOID }, { w: [0.40, 0.45, 0.50, 0.55], b: 0.60, type: _index2.default.SIGMOID }],
    input: [0.05, 0.10]
});

//output: [0.010000000002984098, 0.9899999999997068]
network.train([0.01, 0.99], 300000);

console.log(network.output);

//let network = new Network({
//    framework: [2, 2, 3],
//    layers: [
//        {w: [0.15, 0.20, 0.25, 0.30], b: 0.35 , type: 'sigmoid'},
//        {w: [0.40, 0.45, 0.50, 0.55, 0.116, 0.115], b: 0.60, type:'softmax'}
//    ],
//    input: [0.05, 0.10]
//})
//
//
//network.train( [1 , 0, 0],1000)
//
////output: [0.999033065128129, 0.0005035441791657339, 0.00046339069270522325]
//console.log(network.output)

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _network = __webpack_require__(3);

var _network2 = _interopRequireDefault(_network);

var _netural = __webpack_require__(0);

var _netural2 = _interopRequireDefault(_netural);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_netural2.default.Network = _network2.default;
module.exports = _netural2.default;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _layer = __webpack_require__(4);

var _layer2 = _interopRequireDefault(_layer);

var _netural = __webpack_require__(0);

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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _neuron = __webpack_require__(5);

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
/* 5 */
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

/***/ })
/******/ ]);