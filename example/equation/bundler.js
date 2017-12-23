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

//4x -y + 7
var network = new _index.Network({
    framework: [2, 1]
});
//0.7176824119316172, -0.1504590998663642
//0.9358915226740789, -0.2308114751415382
var tick;

function train() {
    var count = 1,
        len = 0;
    network.refresh();
    _data2.default.forEach(function (item) {
        var out = network.compute([item.x, item.y]);

        if (item.tag) {
            len++;
        }
        if (out[0] >= 0.5 && item.tag) {
            count++;
        }
    });

    console.log(count + "__" + len);

    if (count === len) {
        clearInterval(tick);
        console.log(network);
    }
}
tick = setInterval(train, 16);

function mockData() {
    var data = [];
    for (var i = 0; i < 500; i++) {
        data.push({ x: random(-500, 500), y: random(-500, 500) });
    }
    return data;
}

function random(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

//data.forEach(item=>{
//    if(item.x*4 - item.y+7>=0){
//        item.tag = true
//    }else{
//        item.tag = false
//    }
//
//})

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _network = __webpack_require__(2);

var _network2 = _interopRequireDefault(_network);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
    Network: _network2.default
};

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Network = function () {
    function Network(option) {
        _classCallCheck(this, Network);

        this.framework = option.framework;

        this.b = option.b;
        this.w = option.w;

        this.refresh();
        //this.init()
    }

    _createClass(Network, [{
        key: 'refresh',
        value: function refresh() {
            var _this = this;

            this.layers = [];
            this.framework.forEach(function (item, index) {
                _this.layers[index] = new _layer2.default();
                var layer = _this.layers[index];
                if (index !== 0) {
                    layer.create(item, _this.framework[index - 1]);
                }
            });
        }
    }, {
        key: 'sigmoid',
        value: function sigmoid(x) {
            return 1 / (1 + Math.exp(-x));
        }
    }, {
        key: 'compute',
        value: function compute(input) {
            var _this2 = this;

            this.input = input;
            this.layers[0].create(this.framework[0], 0);
            this.input.forEach(function (value, _index) {
                _this2.layers[0].neurons[_index].value = value;
            });
            var prevLayer = this.layers[0]; // Previous layer is input layer.

            for (var i = 1; i < this.layers.length; i++) {
                for (var j in this.layers[i].neurons) {
                    // For each Neuron in each layer.
                    var sum = 0;
                    for (var k in prevLayer.neurons) {
                        // Every Neuron in the previous layer is an input to each Neuron in
                        // the next layer.
                        sum += prevLayer.neurons[k].value * this.layers[i].neurons[j].weights[k];
                    }

                    // Compute the activation of the Neuron.
                    this.layers[i].neurons[j].value = this.sigmoid(sum + this.layers[i].neurons[j].b);
                }
                prevLayer = this.layers[i];
            }

            // All outputs of the Network.
            var out = [];
            var lastLayer = this.layers[this.layers.length - 1];
            for (var i in lastLayer.neurons) {
                out.push(lastLayer.neurons[i].value);
            }
            return out;
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

        this.id = index || 0;
        this.neurons = [];
    }

    _createClass(Layer, [{
        key: 'create',
        value: function create(count, wCount) {
            this.neurons = [];
            for (var i = 0; i < count; i++) {
                var n = new _neuron2.default();
                n.create(wCount);
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

/**
 * Created by dntzhang on 2017/8/26.
 */
var Neuron = function () {
    function Neuron(b) {
        _classCallCheck(this, Neuron);

        this.b = b || 0;
        this.value = 0;
        this.weights = [];
    }

    _createClass(Neuron, [{
        key: "create",
        value: function create(count) {
            this.weights = [];
            for (var i = 0; i < count; i++) {
                this.weights.push(Math.random() * 2 - 1);
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
exports.default = [{ "x": -269, "y": 312, "tag": false }, { "x": 168, "y": 181, "tag": true }, { "x": -134, "y": -25, "tag": false }, { "x": -294, "y": 283, "tag": false }, { "x": 406, "y": -86, "tag": true }, { "x": -343, "y": 341, "tag": false }, { "x": -483, "y": 496, "tag": false }, { "x": -415, "y": 100, "tag": false }, { "x": 300, "y": -337, "tag": true }, { "x": -74, "y": -246, "tag": false }, { "x": -14, "y": 73, "tag": false }, { "x": -49, "y": -199, "tag": true }, { "x": -51, "y": -258, "tag": true }, { "x": 367, "y": 386, "tag": true }, { "x": 222, "y": -414, "tag": true }, { "x": 154, "y": 261, "tag": true }, { "x": 241, "y": 37, "tag": true }, { "x": 499, "y": 255, "tag": true }, { "x": -290, "y": -188, "tag": false }, { "x": 245, "y": 276, "tag": true }, { "x": 493, "y": -472, "tag": true }, { "x": -255, "y": -372, "tag": false }, { "x": -490, "y": -286, "tag": false }, { "x": 51, "y": 74, "tag": true }, { "x": -245, "y": 445, "tag": false }, { "x": -109, "y": 374, "tag": false }, { "x": -450, "y": -38, "tag": false }, { "x": -98, "y": 423, "tag": false }, { "x": 320, "y": -249, "tag": true }, { "x": -51, "y": -384, "tag": true }, { "x": 184, "y": 266, "tag": true }, { "x": -495, "y": -234, "tag": false }, { "x": 468, "y": -171, "tag": true }, { "x": -16, "y": -442, "tag": true }, { "x": -336, "y": 297, "tag": false }, { "x": 317, "y": 68, "tag": true }, { "x": -366, "y": -113, "tag": false }, { "x": 299, "y": -471, "tag": true }, { "x": -91, "y": 21, "tag": false }, { "x": 108, "y": 318, "tag": true }, { "x": 224, "y": -353, "tag": true }, { "x": 47, "y": -267, "tag": true }, { "x": 231, "y": -112, "tag": true }, { "x": -419, "y": 273, "tag": false }, { "x": 63, "y": 168, "tag": true }, { "x": -491, "y": 56, "tag": false }, { "x": 97, "y": 37, "tag": true }, { "x": -176, "y": 340, "tag": false }, { "x": 495, "y": 14, "tag": true }, { "x": -420, "y": 353, "tag": false }, { "x": -491, "y": -345, "tag": false }, { "x": -444, "y": -173, "tag": false }, { "x": 463, "y": -135, "tag": true }, { "x": -262, "y": 416, "tag": false }, { "x": -366, "y": 472, "tag": false }, { "x": -385, "y": 179, "tag": false }, { "x": -44, "y": 30, "tag": false }, { "x": 398, "y": -186, "tag": true }, { "x": -322, "y": 240, "tag": false }, { "x": 269, "y": 196, "tag": true }, { "x": 284, "y": 410, "tag": true }, { "x": 169, "y": 161, "tag": true }, { "x": 281, "y": 401, "tag": true }, { "x": -473, "y": 324, "tag": false }, { "x": 176, "y": 176, "tag": true }, { "x": 389, "y": 67, "tag": true }, { "x": -299, "y": -216, "tag": false }, { "x": 336, "y": 262, "tag": true }, { "x": -39, "y": 120, "tag": false }, { "x": 140, "y": -413, "tag": true }, { "x": 42, "y": -484, "tag": true }, { "x": -237, "y": 494, "tag": false }, { "x": 391, "y": 253, "tag": true }, { "x": 457, "y": -263, "tag": true }, { "x": 340, "y": -169, "tag": true }, { "x": -426, "y": 39, "tag": false }, { "x": 472, "y": -439, "tag": true }, { "x": -32, "y": 291, "tag": false }, { "x": -267, "y": -122, "tag": false }, { "x": -212, "y": 133, "tag": false }, { "x": 189, "y": -133, "tag": true }, { "x": 145, "y": 12, "tag": true }, { "x": 318, "y": -275, "tag": true }, { "x": -441, "y": 338, "tag": false }, { "x": 475, "y": -184, "tag": true }, { "x": 429, "y": 459, "tag": true }, { "x": 389, "y": 307, "tag": true }, { "x": 150, "y": -151, "tag": true }, { "x": 316, "y": 335, "tag": true }, { "x": 49, "y": -18, "tag": true }, { "x": 214, "y": -353, "tag": true }, { "x": 178, "y": 290, "tag": true }, { "x": -402, "y": -241, "tag": false }, { "x": -236, "y": 241, "tag": false }, { "x": 315, "y": 236, "tag": true }, { "x": 97, "y": 129, "tag": true }, { "x": 464, "y": -37, "tag": true }, { "x": -405, "y": 118, "tag": false }, { "x": -334, "y": -53, "tag": false }, { "x": 217, "y": -103, "tag": true }, { "x": 131, "y": 493, "tag": true }, { "x": -473, "y": -280, "tag": false }, { "x": 494, "y": -187, "tag": true }, { "x": 420, "y": -13, "tag": true }, { "x": 102, "y": 130, "tag": true }, { "x": 390, "y": 31, "tag": true }, { "x": 41, "y": 273, "tag": false }, { "x": 422, "y": -89, "tag": true }, { "x": 195, "y": 115, "tag": true }, { "x": 64, "y": -251, "tag": true }, { "x": -345, "y": 343, "tag": false }, { "x": -278, "y": 335, "tag": false }, { "x": -148, "y": 126, "tag": false }, { "x": 415, "y": -351, "tag": true }, { "x": -322, "y": -218, "tag": false }, { "x": 232, "y": -491, "tag": true }, { "x": -451, "y": 51, "tag": false }, { "x": -100, "y": -160, "tag": false }, { "x": 422, "y": 438, "tag": true }, { "x": 192, "y": 423, "tag": true }, { "x": -175, "y": 388, "tag": false }, { "x": 150, "y": 294, "tag": true }, { "x": -368, "y": -215, "tag": false }, { "x": -167, "y": -180, "tag": false }, { "x": -150, "y": -257, "tag": false }, { "x": 156, "y": -474, "tag": true }, { "x": 55, "y": -94, "tag": true }, { "x": -124, "y": 443, "tag": false }, { "x": -232, "y": 41, "tag": false }, { "x": 76, "y": 251, "tag": true }, { "x": -212, "y": 300, "tag": false }, { "x": 339, "y": 344, "tag": true }, { "x": 161, "y": -300, "tag": true }, { "x": 352, "y": 278, "tag": true }, { "x": 241, "y": -64, "tag": true }, { "x": -264, "y": -215, "tag": false }, { "x": -95, "y": -488, "tag": true }, { "x": -251, "y": -24, "tag": false }, { "x": 347, "y": 271, "tag": true }, { "x": -2, "y": -119, "tag": true }, { "x": -345, "y": 442, "tag": false }, { "x": 397, "y": 146, "tag": true }, { "x": -201, "y": -104, "tag": false }, { "x": -478, "y": 436, "tag": false }, { "x": 369, "y": 210, "tag": true }, { "x": -385, "y": 215, "tag": false }, { "x": -496, "y": -7, "tag": false }, { "x": -134, "y": 469, "tag": false }, { "x": 205, "y": -460, "tag": true }, { "x": 135, "y": 80, "tag": true }, { "x": -54, "y": -350, "tag": true }, { "x": 36, "y": -63, "tag": true }, { "x": -381, "y": 77, "tag": false }, { "x": 485, "y": 207, "tag": true }, { "x": 34, "y": 466, "tag": false }, { "x": -456, "y": -23, "tag": false }, { "x": 169, "y": -47, "tag": true }, { "x": -370, "y": -414, "tag": false }, { "x": 272, "y": -424, "tag": true }, { "x": 321, "y": -273, "tag": true }, { "x": 34, "y": 216, "tag": false }, { "x": -431, "y": 399, "tag": false }, { "x": 396, "y": -242, "tag": true }, { "x": -56, "y": -61, "tag": false }, { "x": 44, "y": 391, "tag": false }, { "x": 226, "y": 415, "tag": true }, { "x": 435, "y": -80, "tag": true }, { "x": 65, "y": -172, "tag": true }, { "x": 457, "y": 256, "tag": true }, { "x": -156, "y": 135, "tag": false }, { "x": -381, "y": 305, "tag": false }, { "x": -455, "y": -188, "tag": false }, { "x": -165, "y": 318, "tag": false }, { "x": 384, "y": -56, "tag": true }, { "x": -442, "y": -498, "tag": false }, { "x": 95, "y": 465, "tag": false }, { "x": -447, "y": -215, "tag": false }, { "x": -429, "y": 230, "tag": false }, { "x": 468, "y": -428, "tag": true }, { "x": 138, "y": 43, "tag": true }, { "x": -67, "y": -55, "tag": false }, { "x": 394, "y": 430, "tag": true }, { "x": -469, "y": -448, "tag": false }, { "x": 478, "y": 491, "tag": true }, { "x": -117, "y": 313, "tag": false }, { "x": 491, "y": -244, "tag": true }, { "x": -114, "y": -352, "tag": false }, { "x": 134, "y": -205, "tag": true }, { "x": -189, "y": 486, "tag": false }, { "x": 497, "y": -27, "tag": true }, { "x": 197, "y": 64, "tag": true }, { "x": -20, "y": 472, "tag": false }, { "x": -119, "y": 216, "tag": false }, { "x": -155, "y": -48, "tag": false }, { "x": -476, "y": 437, "tag": false }, { "x": -457, "y": -172, "tag": false }, { "x": 441, "y": -71, "tag": true }, { "x": 494, "y": -464, "tag": true }, { "x": 150, "y": 307, "tag": true }, { "x": -43, "y": -424, "tag": true }, { "x": 64, "y": 79, "tag": true }, { "x": 424, "y": -143, "tag": true }, { "x": -79, "y": -23, "tag": false }, { "x": -232, "y": -379, "tag": false }, { "x": 437, "y": -400, "tag": true }, { "x": 73, "y": 41, "tag": true }, { "x": -431, "y": -253, "tag": false }, { "x": 398, "y": 361, "tag": true }, { "x": 4, "y": -184, "tag": true }, { "x": 196, "y": -394, "tag": true }, { "x": -233, "y": 316, "tag": false }, { "x": -120, "y": 480, "tag": false }, { "x": -431, "y": -496, "tag": false }, { "x": -248, "y": -74, "tag": false }, { "x": -51, "y": -362, "tag": true }, { "x": -113, "y": 264, "tag": false }, { "x": -331, "y": -284, "tag": false }, { "x": 402, "y": -16, "tag": true }, { "x": 369, "y": 310, "tag": true }, { "x": 183, "y": -156, "tag": true }, { "x": 231, "y": -181, "tag": true }, { "x": 83, "y": -434, "tag": true }, { "x": 216, "y": 173, "tag": true }, { "x": 121, "y": 13, "tag": true }, { "x": 493, "y": 276, "tag": true }, { "x": -290, "y": -328, "tag": false }, { "x": 492, "y": 236, "tag": true }, { "x": 433, "y": 499, "tag": true }, { "x": -122, "y": 115, "tag": false }, { "x": -414, "y": -67, "tag": false }, { "x": 316, "y": -94, "tag": true }, { "x": 184, "y": 229, "tag": true }, { "x": -390, "y": 115, "tag": false }, { "x": 466, "y": -111, "tag": true }, { "x": 168, "y": 438, "tag": true }, { "x": -86, "y": -29, "tag": false }, { "x": 11, "y": 64, "tag": false }, { "x": -52, "y": 494, "tag": false }, { "x": -406, "y": -65, "tag": false }, { "x": -399, "y": 240, "tag": false }, { "x": -391, "y": -198, "tag": false }, { "x": 364, "y": 62, "tag": true }, { "x": -392, "y": -289, "tag": false }, { "x": 364, "y": -366, "tag": true }, { "x": 467, "y": -226, "tag": true }, { "x": -252, "y": 261, "tag": false }, { "x": 162, "y": -386, "tag": true }, { "x": 298, "y": 75, "tag": true }, { "x": -68, "y": -14, "tag": false }, { "x": -210, "y": 58, "tag": false }, { "x": -297, "y": 320, "tag": false }, { "x": 362, "y": 90, "tag": true }, { "x": -230, "y": 283, "tag": false }, { "x": 483, "y": -161, "tag": true }, { "x": 171, "y": 246, "tag": true }, { "x": 369, "y": -60, "tag": true }, { "x": 169, "y": -474, "tag": true }, { "x": -131, "y": 421, "tag": false }, { "x": 136, "y": -439, "tag": true }, { "x": -43, "y": 500, "tag": false }, { "x": -406, "y": 414, "tag": false }, { "x": 41, "y": 166, "tag": true }, { "x": -353, "y": 53, "tag": false }, { "x": -488, "y": 66, "tag": false }, { "x": -135, "y": -105, "tag": false }, { "x": -19, "y": -118, "tag": true }, { "x": -160, "y": 396, "tag": false }, { "x": 130, "y": 244, "tag": true }, { "x": 244, "y": 226, "tag": true }, { "x": 35, "y": 471, "tag": false }, { "x": 462, "y": 14, "tag": true }, { "x": 134, "y": 187, "tag": true }, { "x": -452, "y": -191, "tag": false }, { "x": -175, "y": 162, "tag": false }, { "x": -310, "y": 144, "tag": false }, { "x": -423, "y": -50, "tag": false }, { "x": 36, "y": -200, "tag": true }, { "x": 39, "y": 456, "tag": false }, { "x": -456, "y": -125, "tag": false }, { "x": -145, "y": 474, "tag": false }, { "x": 78, "y": 59, "tag": true }, { "x": 277, "y": -150, "tag": true }, { "x": 421, "y": 97, "tag": true }, { "x": 212, "y": -345, "tag": true }, { "x": 476, "y": 305, "tag": true }, { "x": 59, "y": 64, "tag": true }, { "x": -116, "y": 484, "tag": false }, { "x": -488, "y": 76, "tag": false }, { "x": -282, "y": 490, "tag": false }, { "x": -275, "y": -381, "tag": false }, { "x": 56, "y": -9, "tag": true }, { "x": 198, "y": -443, "tag": true }, { "x": 316, "y": 96, "tag": true }, { "x": 439, "y": 196, "tag": true }, { "x": 266, "y": -202, "tag": true }, { "x": 324, "y": -305, "tag": true }, { "x": 199, "y": 265, "tag": true }, { "x": 465, "y": -43, "tag": true }, { "x": 111, "y": 122, "tag": true }, { "x": 173, "y": 187, "tag": true }, { "x": 426, "y": 326, "tag": true }, { "x": 121, "y": 200, "tag": true }, { "x": 311, "y": -293, "tag": true }, { "x": -380, "y": 240, "tag": false }, { "x": 143, "y": -343, "tag": true }, { "x": -331, "y": -456, "tag": false }, { "x": -422, "y": -407, "tag": false }, { "x": 246, "y": -305, "tag": true }, { "x": -432, "y": -324, "tag": false }, { "x": -171, "y": -225, "tag": false }, { "x": 459, "y": 438, "tag": true }, { "x": 14, "y": -401, "tag": true }, { "x": -427, "y": 57, "tag": false }, { "x": 295, "y": -485, "tag": true }, { "x": 73, "y": -15, "tag": true }, { "x": -202, "y": -392, "tag": false }, { "x": -409, "y": 153, "tag": false }, { "x": -218, "y": 290, "tag": false }, { "x": -180, "y": 319, "tag": false }, { "x": 213, "y": -270, "tag": true }, { "x": 68, "y": 306, "tag": false }, { "x": -407, "y": -387, "tag": false }, { "x": 431, "y": 345, "tag": true }, { "x": -366, "y": -280, "tag": false }, { "x": 500, "y": -259, "tag": true }, { "x": 472, "y": -229, "tag": true }, { "x": -268, "y": 214, "tag": false }, { "x": 184, "y": 155, "tag": true }, { "x": -174, "y": 274, "tag": false }, { "x": 87, "y": -49, "tag": true }, { "x": -207, "y": -208, "tag": false }, { "x": -368, "y": -438, "tag": false }, { "x": -446, "y": -352, "tag": false }, { "x": -235, "y": 21, "tag": false }, { "x": 349, "y": -262, "tag": true }, { "x": -242, "y": -28, "tag": false }, { "x": 273, "y": -301, "tag": true }, { "x": 17, "y": -272, "tag": true }, { "x": 375, "y": -483, "tag": true }, { "x": -109, "y": -312, "tag": false }, { "x": -368, "y": -304, "tag": false }, { "x": 297, "y": -220, "tag": true }, { "x": -76, "y": -460, "tag": true }, { "x": -225, "y": -313, "tag": false }, { "x": 303, "y": 379, "tag": true }, { "x": -150, "y": -476, "tag": false }, { "x": -208, "y": -473, "tag": false }, { "x": 153, "y": -283, "tag": true }, { "x": -361, "y": -54, "tag": false }, { "x": 382, "y": 485, "tag": true }, { "x": -262, "y": -13, "tag": false }, { "x": 173, "y": 192, "tag": true }, { "x": 28, "y": -470, "tag": true }, { "x": 357, "y": 317, "tag": true }, { "x": 200, "y": 52, "tag": true }, { "x": 484, "y": -126, "tag": true }, { "x": -234, "y": -174, "tag": false }, { "x": 444, "y": 54, "tag": true }, { "x": -400, "y": 388, "tag": false }, { "x": -468, "y": 70, "tag": false }, { "x": 308, "y": 496, "tag": true }, { "x": -483, "y": 415, "tag": false }, { "x": -372, "y": -247, "tag": false }, { "x": -10, "y": -90, "tag": true }, { "x": -213, "y": 76, "tag": false }, { "x": -238, "y": -43, "tag": false }, { "x": 292, "y": 205, "tag": true }, { "x": -306, "y": 291, "tag": false }, { "x": 280, "y": -270, "tag": true }, { "x": -251, "y": 307, "tag": false }, { "x": 386, "y": 395, "tag": true }, { "x": -248, "y": -69, "tag": false }, { "x": 229, "y": 282, "tag": true }, { "x": -46, "y": -450, "tag": true }, { "x": 216, "y": 346, "tag": true }, { "x": -240, "y": 206, "tag": false }, { "x": 294, "y": 181, "tag": true }, { "x": -479, "y": -260, "tag": false }, { "x": 95, "y": -408, "tag": true }, { "x": 463, "y": -223, "tag": true }, { "x": 215, "y": 481, "tag": true }, { "x": 423, "y": 312, "tag": true }, { "x": -389, "y": -421, "tag": false }, { "x": 216, "y": 165, "tag": true }, { "x": 455, "y": 21, "tag": true }, { "x": 346, "y": -368, "tag": true }, { "x": -5, "y": 338, "tag": false }, { "x": -92, "y": 472, "tag": false }, { "x": -141, "y": -469, "tag": false }, { "x": -307, "y": -59, "tag": false }, { "x": 468, "y": -143, "tag": true }, { "x": 277, "y": -390, "tag": true }, { "x": -405, "y": 248, "tag": false }, { "x": 246, "y": 457, "tag": true }, { "x": 293, "y": 97, "tag": true }, { "x": -425, "y": 363, "tag": false }, { "x": 46, "y": -348, "tag": true }, { "x": 108, "y": 95, "tag": true }, { "x": 69, "y": -202, "tag": true }, { "x": -322, "y": 72, "tag": false }, { "x": -135, "y": 249, "tag": false }, { "x": -1, "y": 432, "tag": false }, { "x": -8, "y": -126, "tag": true }, { "x": 283, "y": 372, "tag": true }, { "x": -315, "y": 43, "tag": false }, { "x": 427, "y": 478, "tag": true }, { "x": -40, "y": 473, "tag": false }, { "x": 183, "y": 442, "tag": true }, { "x": -272, "y": 27, "tag": false }, { "x": -146, "y": 252, "tag": false }, { "x": 157, "y": 456, "tag": true }, { "x": 294, "y": -95, "tag": true }, { "x": 251, "y": 409, "tag": true }, { "x": -344, "y": 76, "tag": false }, { "x": -454, "y": 375, "tag": false }, { "x": -259, "y": 396, "tag": false }, { "x": 302, "y": -13, "tag": true }, { "x": 44, "y": 417, "tag": false }, { "x": 292, "y": 236, "tag": true }, { "x": -125, "y": 194, "tag": false }, { "x": 315, "y": -220, "tag": true }, { "x": 493, "y": 141, "tag": true }, { "x": -276, "y": 258, "tag": false }, { "x": -390, "y": 407, "tag": false }, { "x": 311, "y": 19, "tag": true }, { "x": -337, "y": 209, "tag": false }, { "x": 432, "y": 320, "tag": true }, { "x": -125, "y": -297, "tag": false }, { "x": 7, "y": 266, "tag": false }, { "x": 100, "y": -239, "tag": true }, { "x": -456, "y": -61, "tag": false }, { "x": -256, "y": 118, "tag": false }, { "x": -218, "y": 403, "tag": false }, { "x": -430, "y": -251, "tag": false }, { "x": 456, "y": -172, "tag": true }, { "x": -343, "y": 413, "tag": false }, { "x": -358, "y": -448, "tag": false }, { "x": -4, "y": 422, "tag": false }, { "x": 134, "y": 27, "tag": true }, { "x": 468, "y": 75, "tag": true }, { "x": -231, "y": 20, "tag": false }, { "x": 134, "y": -417, "tag": true }, { "x": -174, "y": 66, "tag": false }, { "x": -437, "y": -230, "tag": false }, { "x": -215, "y": -249, "tag": false }, { "x": -26, "y": 104, "tag": false }, { "x": 376, "y": -389, "tag": true }, { "x": -203, "y": 125, "tag": false }, { "x": 482, "y": -460, "tag": true }, { "x": 71, "y": 163, "tag": true }, { "x": -55, "y": 186, "tag": false }, { "x": -490, "y": -432, "tag": false }, { "x": 238, "y": 60, "tag": true }, { "x": 498, "y": 271, "tag": true }, { "x": 366, "y": -486, "tag": true }, { "x": -245, "y": -303, "tag": false }, { "x": -358, "y": -284, "tag": false }, { "x": -455, "y": -181, "tag": false }, { "x": 391, "y": 269, "tag": true }, { "x": -193, "y": -234, "tag": false }, { "x": 310, "y": -263, "tag": true }, { "x": -60, "y": -179, "tag": false }, { "x": -236, "y": -322, "tag": false }, { "x": -40, "y": -436, "tag": true }, { "x": 375, "y": 52, "tag": true }, { "x": 123, "y": -287, "tag": true }, { "x": -201, "y": 126, "tag": false }, { "x": -366, "y": 417, "tag": false }, { "x": 368, "y": -367, "tag": true }, { "x": 185, "y": 227, "tag": true }, { "x": 220, "y": 3, "tag": true }, { "x": -282, "y": -55, "tag": false }, { "x": 291, "y": 191, "tag": true }, { "x": -305, "y": -236, "tag": false }, { "x": -145, "y": -294, "tag": false }, { "x": 401, "y": 318, "tag": true }, { "x": -111, "y": 271, "tag": false }, { "x": 256, "y": 8, "tag": true }, { "x": 263, "y": -420, "tag": true }, { "x": 88, "y": 295, "tag": true }, { "x": 133, "y": 449, "tag": true }, { "x": -386, "y": 341, "tag": false }, { "x": -369, "y": 367, "tag": false }, { "x": 59, "y": -229, "tag": true }, { "x": -453, "y": 37, "tag": false }, { "x": -205, "y": 204, "tag": false }, { "x": -440, "y": 489, "tag": false }, { "x": -111, "y": -415, "tag": false }, { "x": 61, "y": 248, "tag": true }, { "x": -392, "y": 12, "tag": false }, { "x": 175, "y": 412, "tag": true }, { "x": 481, "y": 390, "tag": true }, { "x": -444, "y": 206, "tag": false }, { "x": 250, "y": 210, "tag": true }, { "x": 308, "y": -391, "tag": true }, { "x": -50, "y": -95, "tag": false }, { "x": -299, "y": 281, "tag": false }, { "x": -439, "y": 365, "tag": false }, { "x": -209, "y": 49, "tag": false }, { "x": 307, "y": 165, "tag": true }];

/***/ })
/******/ ]);