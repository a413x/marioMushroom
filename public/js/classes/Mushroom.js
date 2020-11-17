import { getRandom } from '../utils.js'
import { textureW, drawTexture, fillTextureRange } from '../textures.js'

export class Mushroom{
  constructor(x, y, capSize, stipeSize){
    this.x = x
    this.y = y
    this.capSize = capSize
    this.stipeSize = stipeSize
  }

  getBounds(){
    return {
      x1: this.x,
      y1: this.y,
      x2: this.x + this.capSize * textureW,
      y2: this.y + textureW
    }
  }

  drawCap(context){
    drawTexture(context, 'mushroom-cap-left', this.x, this.y)
    fillTextureRange(
      context,
      'mushroom-cap',
      this.x + textureW,
      this.capSize - 2,
      this.y,
      1
    )
    drawTexture(
      context,
      'mushroom-cap-right',
      this.x + (this.capSize-1) * textureW,
      this.y
    )
  }
  drawStipe(context){
    const centerX = this.x + (this.capSize - 1)/2 * textureW
    drawTexture(
      context,
      'mushroom-stipe-top',
      centerX,
      this.y + textureW
    )
    fillTextureRange(
      context,
      'mushroom-stipe',
      centerX,
      1,
      this.y + 2 * textureW,
      this.stipeSize - 1
    )
  }
}

export function createRandomMushroom(xStart, xEnd, canvH){
  let capSize = getRandom(3, 10)
  //cap size must be odd
  if(capSize%2 === 0) capSize ++
  const gridH = canvH/textureW
  const stipeSize = getRandom(1, gridH - 1)
  const x = getRandom(xStart, xEnd - capSize*textureW)
  const y = (gridH - stipeSize - 1)*textureW

  return new Mushroom(x, y, capSize, stipeSize)
}

export function createMushrooms(xStart, xEnd, canvH){
  const number = getRandom(3, 5)
  const mushrooms = []
  for(let i = 0; i < number; i++){
    mushrooms.push(createRandomMushroom(xStart, xEnd, canvH))
  }
  return mushrooms
}
