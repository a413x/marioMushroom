import { drawTexture } from '../textures.js'

export class Mario{
  constructor(x, y){
    this.x = x
    this.y = y
    this.vx = 0
    this.vy = 0
    this.ax = 0
    this.ay = 0
    this.textureName = 'mario'
  }
  update(deltaTime){
    this.x += this.vx * deltaTime
    this.y += this.vy * deltaTime

    const gravity = 1000

    this.vy += gravity * deltaTime
  }
  draw(context){
    drawTexture(context, this.textureName, this.x, this.y)
  }
}
