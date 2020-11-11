import { getRandom } from '../utils.js'
import { textureW, fillTexture } from '../textures.js'

class Mushroom{
  constructor(x, y, capSize, stipeSize){
    this.x = x
    this.y = y
    this.capSize = capSize
    this.stipeSize = stipeSize
  }

  getBounds(){
    return {
      x1: this.x * textureW,
      y1: this.y * textureW,
      x2: (this.x + this.capSize) * textureW,
      y2: (this.y + 1) * textureW
    }
  }

  draw(context){
    fillTexture(
      context,
      'mushroom-cap-left',
      {
        xStart: this.x,
        xEnd: this.x + 1,
        yStart: this.y,
        yEnd: this.y + 1
      }
    )
    fillTexture(
      context,
      'mushroom-cap',
      {
        xStart: this.x + 1,
        xEnd: this.x + this.capSize - 1,
        yStart: this.y,
        yEnd: this.y + 1
      }
    )
    fillTexture(
      context,
      'mushroom-cap-right',
      {
        xStart: this.x + this.capSize - 1,
        xEnd: this.x + this.capSize,
        yStart: this.y,
        yEnd: this.y + 1
      }
    )
    fillTexture(
      context,
      'mushroom-stipe-top',
      {
        xStart: this.x + Math.floor(this.capSize/2),
        xEnd: this.x + Math.floor(this.capSize/2) + 1,
        yStart: this.y + 1,
        yEnd: this.y + 2
      }
    )
    fillTexture(
      context,
      'mushroom-stipe',
      {
        xStart: this.x + Math.floor(this.capSize/2),
        xEnd: this.x + Math.floor(this.capSize/2) + 1,
        yStart: this.y + 2,
        yEnd: this.y + this.stipeSize + 1
      }
    )
  }
}

export function createRandomMushroom(gridW, gridH){
  let capSize = getRandom(3, 10)
  //cap size must be odd
  if(capSize%2 === 0) capSize ++
  const stipeSize = getRandom(1, 15)
  const x = getRandom(0, gridW)
  const y = gridH - stipeSize - 1

  return new Mushroom(x, y, capSize, stipeSize)
}
