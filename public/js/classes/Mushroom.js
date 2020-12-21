import { getRandom } from '../utils.js'
import { textureW, drawTexture, fillTextureRange } from '../textures/textures.js'

export class Mushroom{
  constructor(x, y, capSize, stipeSize){
    this.x = x
    this.y = y
    this.capSize = capSize
    this.stipeSize = stipeSize
    this.skin = 'm-orange'
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
    drawTexture(context, this.skin, 'cap-left', this.x, this.y)
    fillTextureRange(
      context,
      this.skin,
      'cap',
      this.x + textureW,
      this.capSize - 2,
      this.y,
      1
    )
    drawTexture(
      context,
      this.skin,
      'cap-right',
      this.x + (this.capSize-1) * textureW,
      this.y
    )
  }
  drawStipe(context){
    const type = this.skin[0]
    const centerX = this.x + (this.capSize - 1)/2 * textureW
    if(type === 't'){
      fillTextureRange(
        context,
        this.skin,
        'stipe',
        this.x + textureW,
        this.capSize - 2,
        this.y + textureW,
        this.stipeSize
      )
    } else {
      fillTextureRange(
        context,
        this.skin,
        'stipe',
        centerX,
        1,
        this.y + textureW,
        this.stipeSize
      )
      drawTexture(
        context,
        this.skin,
        'stipe-top',
        centerX,
        this.y + textureW
      )
    }
  }
}

export function createMushroom(gridX, gridY, gridH){
  let capSize = getRandom(3, 10)
  //cap size must be odd
  if(capSize%2 === 0) capSize ++

  const stipeSize = gridH - gridY - 1

  return new Mushroom(
    gridX * textureW,
    gridY * textureW,
    capSize,
    stipeSize
  )
}

export function createMushrooms(number, lastMushroom, gridH){
  const mushrooms = []
  let prevMushroom = lastMushroom

  for(let i = 0; i < number; i++){
    //get a new x after previous mushroom stipe position
    //to aviod mushrooms overlapping
    const center = (prevMushroom.capSize + 1)/2
    const newX = Math.round(prevMushroom.x/textureW) + center + getRandom(1,8)

    //new mushroom must not be too high
    //to be possible for mario to jump on
    let newY = getRandom(1, gridH - 2)
    const prevY = Math.round(prevMushroom.y/textureW)
    if(prevY === newY) {
      newY --
    }else if(newY < prevY - 3){
      newY = prevY - 3
    }

    const mushroom = createMushroom(newX, newY, gridH)
    mushrooms.push(mushroom)
    prevMushroom = mushroom
  }
  return mushrooms
}
