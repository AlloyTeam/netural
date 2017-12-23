import Neuron from './neuron.js'

class Layer {
    constructor(index) {
        this.index = index
        this.neurons = []
    }

    create(count, wCount, wb) {
        this.neurons = []
        if (wb) {
            this.type = wb.type
        }

        for (let i = 0; i < count; i++) {
            let n = new Neuron()
            if (!wb) {
                n.create(wCount)
            } else {
                if (wb.w) {
                    n.weights = wb.w.slice(0).splice(i * wCount, wCount)
                } else {
                    n.create(wCount)
                }

                if (wb.b != null) {
                    n.b = typeof wb.b === 'number' ? wb.b : wb.b[i]
                }
            }

            this.neurons.push(n)
        }
    }
}

export default Layer
