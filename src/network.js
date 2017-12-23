import Layer from './layer.js'
import netural from './netural.js'

class Network {
    constructor(option) {
        this.framework = option.framework
        this.layersData = option.layers
        this.length = this.framework.length
        this.input = option.input
        this.learningRate = option.learningRate || 0.3
        this.logs = []
        this.output = []

        this._init()
    }

    _init() {
        this.layers = []
        this.framework.forEach((item, index) => {
            this.layers[index] = new Layer(index)
            let layer = this.layers[index]
            if (index !== 0) {
                if (this.layersData) {
                    layer.create(item, this.framework[index - 1], this.layersData[index - 1])
                } else {
                    layer.create(item, this.framework[index - 1])
                }
            }
        })
    }

    refresh() {
        this._init()
    }

    compute(input, onTrain) {
        if (input) {
            this.input = input
        }
        this.layers[0].create(this.framework[0], 0)
        this.input.forEach((value, _index) => {
            this.layers[0].neurons[_index].value = value
        })
        let prevLayer = this.layers[0]
        for (let i = 1; i < this.length; i++) {
            for (let j = 0, len = this.layers[i].neurons.length; j < len; j++) {
                let sum = 0
                for (let k = 0, nLen = prevLayer.neurons.length; k < nLen; k++) {
                    sum += prevLayer.neurons[k].value * this.layers[i].neurons[j].weights[k]
                }
                if (this.layers[i].type === netural.SIGMOID) {
                    this.layers[i].neurons[j].value = this.sigmoid(sum + this.layers[i].neurons[j].b)
                } else if (this.layers[i].type === netural.SOFTMAX) {
                    this.layers[i].neurons[j].value = sum + this.layers[i].neurons[j].b
                } else if (this.layers[i].type === netural.RELU) {
                    this.layers[i].neurons[j].value = this.relu(sum + this.layers[i].neurons[j].b)
                }
            }
            if (this.layers[i].type === netural.SOFTMAX) {
                this.softmax(this.layers[i].neurons)
            }
            prevLayer = this.layers[i]
        }

        let output = []

        this.layers[this.layers.length - 1].neurons.forEach(neuron => {
            output.push(neuron.value)
        })

        // this._log(onTrain)
        this.output = output
        return output
    }

    train(target, times, option) {
        if (typeof target === 'number')target = [target]
        if (!option) option = {}
        for (let i = 0; i < times; i++) {
            this.compute(option.input, option.onTrain)
            for (let j = this.length - 1; j > 0; j--) {
                if (j === this.length - 1) {
                    this.derivationOutputSquareError(target, this.layers[j])
                } else {
                    this.derivationSquareError(this.layers[j], j)
                }
            }
        }
        option.onEnd && option.onEnd.call(this)
        return this.out
    }

    derivationSquareError(layer, layerIndex) {
        if (layer.type === netural.SIGMOID) {
            layer.neurons.forEach((neuron, index) => {
                let sum = 0
                this.layers[layerIndex + 1].neurons.forEach((_neuron, _index) => {
                    sum += _neuron.squareErrorList[index]
                })

                let d = sum * neuron.value * (1 - neuron.value)
                neuron.squareErrorList = []

                neuron.b -= this.learningRate * d
                neuron.weights.forEach((w, _index) => {
                    neuron.squareErrorList.push(d * w)
                    neuron.weights[_index] = w - this.learningRate * d * this.getPreOut(layerIndex, _index)
                })
            })
        } else if (layer.type === netural.RELU) {
            layer.neurons.forEach((neuron, index) => {
                let sum = 0
                this.layers[layerIndex + 1].neurons.forEach((_neuron, _index) => {
                    sum += _neuron.squareErrorList[index]
                })

                let d = sum * (neuron.value > 0 ? 1 : 0)
                neuron.squareErrorList = []

                neuron.b -= this.learningRate * d
                neuron.weights.forEach((w, _index) => {
                    neuron.squareErrorList.push(d * w)
                    neuron.weights[_index] = w - this.learningRate * d * this.getPreOut(layerIndex, _index)
                })
            })
        }
    }

    derivationOutputSquareError(target, layer) {
        if (layer.type === netural.SOFTMAX) {
            this.derivationSoftMaxSquareError(target, layer)
        } else if (layer.type === netural.SIGMOID) {
            this.derivationSigmoidSquareError(target, layer)
        } else if (layer.type === netural.RELU) {
            this.derivationReluSquareError(target, layer)
        }
    }

    derivationReluSquareError(target, layer) {
        target.forEach((tv, index) => {
            let neuron = layer.neurons[index]
            let d = (neuron.value - target[index]) * (neuron.value > 0 ? 1 : 0)
            neuron.bError = d
            neuron.squareErrorList = []
            neuron.b -= this.learningRate * d
            neuron.weights.forEach((w, _index) => {
                neuron.squareErrorList.push(d * w)
                neuron.weights[_index] = w - this.learningRate * d * this.getPreOut(layer.index, _index)
            })
        })
    }

    derivationSigmoidSquareError(target, layer) {
        target.forEach((tv, index) => {
            let neuron = layer.neurons[index]
            let d = (neuron.value - target[index]) * neuron.value * (1 - neuron.value)
            neuron.bError = d
            neuron.squareErrorList = []
            neuron.b -= this.learningRate * d
            neuron.weights.forEach((w, _index) => {
                neuron.squareErrorList.push(d * w)
                neuron.weights[_index] = w - this.learningRate * d * this.getPreOut(layer.index, _index)
            })
        })
    }

    derivationSoftMaxSquareError(target, layer) {
        let ds = this.derivationSoftMax(target, layer.neurons)
        target.forEach((tv, index) => {
            let neuron = layer.neurons[index]
            let loss = ds[index]
            neuron.bError = loss
            neuron.squareErrorList = []
            neuron.b -= this.learningRate * neuron.bError
            neuron.weights.forEach((w, _index) => {
                neuron.squareErrorList.push(loss * w)
                neuron.weights[_index] = w - this.learningRate * loss * this.getPreOut(layer.index, _index)
            })
        })
    }

    derivationSoftMax(target, neurons) {
        let index = target.indexOf(1)

        let ds = []
        neurons.forEach((neuron, _index) => {
            if (_index === index) {
                ds.push(neuron.value - 1)
            } else {
                ds.push(neuron.value)
            }
        })

        return ds
    }

    getPreOut(layerIndex, weightIndex) {
        return this.layers[layerIndex - 1].neurons[weightIndex].value
    }

    _log(onTrain) {
        let arr = []
        this.layers.forEach((layer, index) => {
            if (index !== 0) {
                layer.neurons.forEach(neuron => {
                    arr.push(neuron.weights.slice(0))
                })
            }
        })
        onTrain && onTrain.call(this, arr)
        this.logs.push(arr)
    }

    sigmoid(x) {
        return 1 / (1 + Math.exp(-x))
    }

    softmaxArr(arr) {
        var max3 = arr.reduce(function(p, c) { return p > c ? p : c })
        var nominators = arr.map(function(e) { return Math.exp(e - max3) })
        var denominator = nominators.reduce(function(p, c) { return p + c })
        var output = nominators.map(function(e) { return e / denominator })

        return output
    }

    relu(x) {
        return Math.max(0, x)
    }

    softmax(neurons) {
        let arr = []
        neurons.forEach(neuron => {
            arr.push(neuron.value)
        })
        this.softmaxArr(arr).forEach((value, index) => {
            neurons[index].value = value
        })
    }
}

export default Network
