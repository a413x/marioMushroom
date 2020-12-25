import { drawTexture, fillTexture, textureW } from '../textures/textures.js'
import { getRandom } from '../utils.js'

export default class Background{
  constructor(x, gridW, gridH){
    this.x = x
    this.y = 0
    this.canvas = document.createElement('canvas')
    this.canvas.width = gridW*textureW
    this.canvas.height = gridH*textureW
    this.context = this.canvas.getContext('2d')
    this.sky = new Sky(gridW, gridH)
    this.clouds = createClouds(gridW, gridH)
  }
  draw(context){
    this.sky.draw(this.context)
    this.clouds.forEach(cloud => cloud.draw(this.context))
    context.drawImage(this.canvas, this.x, this.y)
  }
}

class Sky{
  constructor(gridW, gridH){
    this.w = gridW
    this.h = gridH
    this.skyTexture = 'light-blue'
  }
  draw(context){
    fillTexture(
      context,
      'sky',
      this.skyTexture,
      {
        xStart: 0,
        xEnd: this.w,
        yStart: 0,
        yEnd: this.h
      }
    )
  }
}

class Cloud{
  constructor(x, y, size){
    this.x = x
    this.y = y
    this.size = size
    this.skin = 'c-blue'
  }
  draw(context){
    const skin = this.skin
    const x = this.x
    const y = this.y

    drawTexture(context, skin, 'top-left', x, y)
    drawTexture(context, skin, 'bot-left', x, y + textureW)

    for(let i = 0; i < this.size; i++){
      const offset = (i + 1)*textureW
      drawTexture(context, skin, 'top-center', x + offset, y)
      drawTexture(context, skin, 'bot-center', x + offset, y + textureW)
    }

    const offset = (this.size + 1)*textureW
    drawTexture(context, skin, 'top-right', x + offset, y)
    drawTexture(context, skin, 'bot-right', x + offset, y + textureW)
  }
}

function createClouds(gridW, gridH){
  const number = getRandom(1, 4)

  const cloudH = 2
  const clouds = []
  const generated = []

  for(let i = 0; i < number; i++){
    const size = getRandom(1, 4)
    const cloudW = size + 2
    const y = getRandom(0, gridH - cloudH)
    const x = getRandom(0, gridW - cloudW)

    //prevent overlapping
    let overlap = false
    generated.forEach(cloud => {
      if( (x + cloudW >= cloud.x && x <= cloud.x + cloud.w) ||
          (y + cloudH >= cloud.y && y <= cloud.y + cloudH)  ) {
            overlap = true
      }
    })
    if(overlap) continue

    generated.push({x: x, y: y, w: cloudW})
    const cloud = new Cloud(x*textureW, y*textureW, size)
    clouds.push(cloud)
  }
  return clouds
}
