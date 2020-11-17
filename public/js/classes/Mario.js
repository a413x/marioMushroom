import { drawTexture } from '../textures.js'

export default class Mario{
  constructor(x, y, w, h){
    this.x = x
    this.y = y
    this.vx = 0
    this.vy = 0
    this.w = w
    this.h = h
    this.textureName = 'mario'
  }
  draw(context){
    drawTexture(context, this.textureName, this.x, this.y)
  }
}
