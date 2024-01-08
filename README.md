## Netural

JavaScript的前向神经网络和反向传播的实现。

## 安装

```
npm install netural
```

## Hello Netural 

``` js
import netural from 'netural'

const network = new netural.Network({
  framework: [2, 2, 2],
  layers: [
    // 支持 SIGMOID、SOFTMAX 和 RELU 三种激活函数
    { w: [0.15, 0.20, 0.25, 0.30], b: 0.35, type: netural.SIGMOID },
    { w: [0.40, 0.45, 0.50, 0.55], b: 0.60, type: netural.SIGMOID }
  ],
  input: [0.05, 0.10]
})

// output: [0.010000000002984098, 0.9899999999997068]
network.train([0.01, 0.99], 300000)
```

## 分类示例

分类过程可视化如下:

![](https://raw.githubusercontent.com/AlloyTeam/netural/master/example/train/classification.gif)

a 和 b 数据集:

```js
const data = {
  a: [{"x":-6,"y":60},{"x":13,"y":72},{"x":33,"y":83},{"x":54,"y":83},{"x":71,"y":65},{"x":78,"y":41},{"x":79,"y":13},{"x":75,"y":-11},{"x":65,"y":-41},{"x":53,"y":-63},{"x":36,"y":-80},{"x":15,"y":-93},{"x":-6,"y":-101},{"x":-23,"y":-100},{"x":-44,"y":-74},{"x":-63,"y":-51},{"x":-79,"y":-27},{"x":-91,"y":-3},{"x":-104,"y":27},{"x":-106,"y":43},{"x":-102,"y":71},{"x":-83,"y":83},{"x":-71,"y":88},{"x":-45,"y":91},{"x":-26,"y":77},{"x":-15,"y":67},{"x":-66,"y":51},{"x":-55,"y":15},{"x":-25,"y":22},{"x":32,"y":36},{"x":50,"y":39},{"x":38,"y":-10},{"x":20,"y":-22},{"x":-14,"y":4},{"x":10,"y":-1},{"x":-22,"y":-22},{"x":-34,"y":-48},{"x":-7,"y":-62},{"x":20,"y":-50},{"x":43,"y":-34},{"x":-4,"y":33},{"x":-42,"y":54},{"x":38,"y":59},{"x":-1,"y":-37},{"x":-54,"y":-12},{"x":0,"y":0},{"x":0,"y":0},{"x":0,"y":0},{"x":40,"y":95}],
  b: [{"x":158,"y":126},{"x":160,"y":75},{"x":160,"y":2},{"x":158,"y":-26},{"x":147,"y":-116},{"x":127,"y":-126},{"x":67,"y":-148},{"x":6,"y":-155},{"x":-62,"y":-148},{"x":-103,"y":-137},{"x":-128,"y":-96},{"x":-150,"y":-3},{"x":-159,"y":93},{"x":-157,"y":147},{"x":-103,"y":158},{"x":9,"y":179},{"x":82,"y":187},{"x":121,"y":173},{"x":140,"y":160},{"x":28,"y":152},{"x":-38,"y":156},{"x":-88,"y":144},{"x":-118,"y":124},{"x":-174,"y":11},{"x":-155,"y":-84},{"x":-150,"y":-128},{"x":-130,"y":-157},{"x":3,"y":-178},{"x":144,"y":-171},{"x":157,"y":-81},{"x":162,"y":47},{"x":142,"y":-12},{"x":115,"y":-89},{"x":91,"y":-111},{"x":69,"y":-123},{"x":-42,"y":-134},{"x":-122,"y":-61},{"x":-147,"y":63},{"x":-4,"y":133},{"x":98,"y":149},{"x":113,"y":98},{"x":125,"y":63},{"x":66,"y":146},{"x":129,"y":-46},{"x":-157,"y":-46},{"x":0,"y":90},{"x":0,"y":90},{"x":0,"y":90},{"x":0,"y":95}]
}
```

数据打标预处理函数:

```js
function preprocessing(data) {
  const arr = []
  data.a.forEach(function (p) {
    p.tag = true
    arr.push(p)
  })
  data.b.forEach(function (p) {
    p.tag = false
    arr.push(p)
  })
  return arr
}
```

训练脚本:

```js
import netural from 'netural'

const network = new Network({
  framework: [2, 6, 6, 1],
  layers: [
    { type: "sigmoid" },
    { type: "sigmoid" },
    { type: "sigmoid" }
  ]
})

const arr = preprocessing(data)
let index = 0, count = 0

function train() {
  const p = arr[index]
  network.train(p.tag === true ? 1 : 0, 1, {
    input: [p.x / 200, p.y / 200],
    onEnd: function () {
      count++
      index++

      if (index === arr.length) {
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
```

# License
This content is released under the [MIT](http://opensource.org/licenses/MIT) License.
