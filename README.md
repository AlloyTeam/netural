## Netural

netural === neural net, simple ai for the web.

## Features

* Simple API
* Super tiny size, 1 KB (gzip)
* Support for forward propagation and back propagation

## Install

```
npm install netural
```

## Hello Netural 

``` js
import netural from 'netural'

let network = new netural.Network({
    framework: [2, 2, 2],
    layers: [
        {w: [0.15, 0.20, 0.25, 0.30], b: 0.35, type: netural.SIGMOID},
        {w: [0.40, 0.45, 0.50, 0.55], b: 0.60, type: netural.SIGMOID}
    ],
    input: [0.05, 0.10]
})

//output: [0.010000000002984098, 0.9899999999997068]
network.train([0.01, 0.99], 300000)
```

# License
This content is released under the [MIT](http://opensource.org/licenses/MIT) License.