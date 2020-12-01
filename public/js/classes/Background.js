import { fillTexture } from '../textures/textures.js'

export default class Background{
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
