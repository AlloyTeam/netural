import { Network } from '../../src/index.js'
import data from './data.js'

//4x -y + 7
let network = new Network({
    framework: [2, 1]
})
//0.7176824119316172, -0.1504590998663642
//0.9358915226740789, -0.2308114751415382
var tick

function train(){
    var count = 1,len = 0
    network.refresh()
    data.forEach(item => {
        var out = network.compute([item.x,item.y])

        if(item.tag){
            len++
        }
        if(out[0]>=0.5&&item.tag){
            count++
        }
    })

    console.log(count+"__"+len)

    if(count === len){
        clearInterval(tick)
        console.log(network)
    }
}
tick = setInterval(train,16)

function mockData() {
    let data = []
    for (let i = 0; i < 500; i++) {
        data.push({x: random(-500, 500), y: random(-500, 500)})
    }
    return data
}

function random(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1))
}

//data.forEach(item=>{
//    if(item.x*4 - item.y+7>=0){
//        item.tag = true
//    }else{
//        item.tag = false
//    }
//
//})
