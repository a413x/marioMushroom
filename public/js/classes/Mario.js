import { drawTexture } from '../textures.js'

export class Mario{
  constructor(x, y){
    this.x = x
    this.y = y
    this.vx = 0
    this.vy = 0
    this.textureName = 'mario'
  }
  update(deltaTime){
    this.x += this.vx * deltaTime
    this.y += this.vy * deltaTime
  }
  draw(context){
    drawTexture(context, this.textureName, this.x, this.y)
  }
}
