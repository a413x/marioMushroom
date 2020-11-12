import { fillTexture } from '../textures.js'

export default class Background{
  constructor(textureName, gridW, gridH){
    this.w = gridW
    this.h = gridH
    this.textureName = textureName
  }
  draw(context){
    fillTexture(
      context,
      this.textureName,
      {
        xStart: 0,
        xEnd: this.w,
        yStart: 0,
        yEnd: this.h
      }
    )
  }
}
