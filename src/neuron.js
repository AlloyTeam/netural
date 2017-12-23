class Neuron {
    constructor(w, b) {
        this.value = 0
        this.weights = w || []
        this.b = b || 0
    }

    create(count) {
        this.weights = []
        for (var i = 0; i < count; i++) {
            // this.weights.push(Math.random()) 以前的权重是这个，无法收敛
            this.weights.push(0.2 * Math.random() - 0.1)
        }
    }
}

export default Neuron
