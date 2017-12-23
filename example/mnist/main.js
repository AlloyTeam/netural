import { Network } from '../../src/index.js'

let network = new Network({
    framework: [784, 9, 10],
    layers:[
        {   type:'sigmoid'},
        {   type:'sigmoid'}
    ]
})

train()

function train(){

    let data = mnist.set(8000, 2000)
    data.training.forEach(item => {
        network.train(item.output, 1, {
            input: item.input
        })
    })

    let count = 0
    data.test.forEach(item => {
        network.compute(item.input)
        if (network.output.indexOf(Math.max.apply(null, network.output)) === item.output.indexOf(1)) {
            count++
        }
    })

    setTimeout(()=> {
        console.log('识别成功率:' + count / data.test.length)
        train()
    }, 2000)
}







//http://myselph.de/neuralNet.html
//前向传播更新下 bs