import netural from '../../src/index.js'

let network = new netural.Network({
    framework: [2, 2, 2],
    layers: [
        {w: [0.15, 0.20, 0.25, 0.30], b: 0.35, type: netural.SIGMOID},
        {w: [0.40, 0.45, 0.50, 0.55], b: 0.60, type: netural.SIGMOID}
    ],
    input: [0.05, 0.10]
})

//output: [0.010000000002984098, 0.9899999999997068]
network.train( [0.01 , 0.99],300000)

console.log(network.output)



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


