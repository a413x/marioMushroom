import Camera from './classes/Camera.js'

const camera = new Camera()

window.camera = camera

const buffer = document.createElement('canvas')
buffer.width = 256 + 16
buffer.height = 240
const bufferContext = buffer.getContext('2d')

export function drawAll(context, layers){
  context.clearRect(0, 0, 256, 240)
  for(let layer in layers){
    layers[layer].forEach(obj => obj.draw(bufferContext))
  }
  context.drawImage(buffer, -camera.x, -camera.y)
}
