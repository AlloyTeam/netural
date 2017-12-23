import { Network } from '../../src/index.js'
import data from './data.js'
let network = new Network({
    framework: [2, 6,6,1],
    layers:[
        {type:"sigmoid"},
        {type:"sigmoid"},
        {type:"sigmoid"}
    ]
})


var canvas = document.querySelector('canvas')
var ctx = canvas.getContext('2d')
ctx.translate(200,200)
ctx.scale(1,-1)

var dataCanvas = document.querySelector('#dataCanvas')
var dataCtx = dataCanvas.getContext('2d')
dataCtx.translate(200,200)
dataCtx.scale(1,-1)

function renderData(){
    dataCtx.fillStyle = 'red'
    data.a.forEach(function(item){
        dataCtx.beginPath()
        dataCtx.arc(item.x,item.y,5,0,Math.PI*2)
        dataCtx.fill()

    })


    dataCtx.fillStyle = 'green'
    data.b.forEach(function(item){
        dataCtx.beginPath()
        dataCtx.arc(item.x,item.y,5,0,Math.PI*2)
        dataCtx.fill()
        console.log(1)
    })
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

    ctx.clearRect(-200, -200, 400, 400)
    for (let i = 0; i < 80; i++) {
        for (let j = 0; j < 80; j++) {
            var x = i * 5 + 2.5 - 200
            var y = 200 - j * 5 - 2.5
            if (network.compute([x / 200, y / 200])[0] > 0.5) {
                ctx.fillStyle = 'rgba(155,20,20,0.5)'
            } else {
                ctx.fillStyle = 'rgba(20,155,20,0.5)'
            }
            ctx.fillRect(x - 2.5, y - 2.5, 5, 5)
        }
    }
}


function renderXY(){
    ctx.moveTo(-200,0)
    ctx.lineTo(200,0)
    ctx.stroke()
    ctx.moveTo(0,-200)
    ctx.lineTo(0,200)
    ctx.stroke()
}






function preprocessing(data){
    var arr = []

    data.a.forEach(function(p){
        p.tag = true
        arr.push(p)

    })


    data.b.forEach(function(p){
        p.tag = false
        arr.push(p)
    })
    return arr
}



var arr = preprocessing(data),
    index = 0,
    count =0

function train() {
    var p = arr[index]
    network.train(p.tag === true ? 1 : 0, 1, {
        input: [p.x / 200, p.y / 200],
        onEnd: function () {
            count++
            index++

            if (index === arr.length){
                index = 0
            }

            if (count % 1000 === 0) {
                renderTrain()
                setTimeout(train, 100)
            } else {
                train()
            }
        }
    })
}

train()
window.network = network

