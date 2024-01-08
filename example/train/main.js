import { Network, SIGMOID } from '../../src/index.js'
import data from './data.js'

const network = new Network({
  framework: [2, 6, 6, 1],
  layers: [
    { type: SIGMOID },
    { type: SIGMOID },
    { type: SIGMOID }
  ]
})

const canvas = document.querySelector('canvas')
const ctx = setupCanvas(canvas)

const dataCanvas = document.querySelector('#dataCanvas')
const dataCtx = setupCanvas(dataCanvas)

renderData(dataCtx, data)

const arr = preprocessing(data)
let index = 0, count = 0

train()

window.network = network 

function setupCanvas(canvas) {
  const ctx = canvas.getContext('2d')
  ctx.translate(200, 200)
  ctx.scale(1, -1)
  return ctx
}

function renderData(ctx, data) {
  ['red', 'green'].forEach((color, i) => {
    ctx.fillStyle = color
    data[i === 0 ? 'a' : 'b'].forEach(item => {
      ctx.beginPath()
      ctx.arc(item.x, item.y, 5, 0, Math.PI * 2)
      ctx.fill()
    })
  })
}

function preprocessing(data) {
  const arr = []

  data.a.forEach(function(p) {
    const newObj = { x: p.x, y: p.y, tag: true }
    arr.push(newObj)
  })

  data.b.forEach(function(p) {
    const newObj = { x: p.x, y: p.y, tag: false }
    arr.push(newObj)
  })

  return arr
}

function train() {
  let p = arr[index]
  network.train(p.tag ? 1 : 0, 1, {
    input: [p.x / 200, p.y / 200],
    onEnd: () => {
      count++
      index++
      index = index === arr.length ? 0 : index

      if (count % 1000 === 0) {
        renderTrain()
        setTimeout(train, 100)
      } else {
        train()
      }
    }
  })
}

function renderTrain() {
  ctx.clearRect(-200, -200, 400, 400)
  for (let i = 0; i < 80; i++) {
    for (let j = 0; j < 80; j++) {
      let x = i * 5 + 2.5 - 200
      let y = 200 - j * 5 - 2.5
      ctx.fillStyle = network.compute([x / 200, y / 200])[0] > 0.5 ? 'rgba(155,20,20,0.5)' : 'rgba(20,155,20,0.5)'
      ctx.fillRect(x - 2.5, y - 2.5, 5, 5)
    }
  }
}