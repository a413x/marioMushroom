import { textureW } from '../textures.js'
import { setupKeyboard } from '../setupKeyboard.js'
import Mario from './Mario.js'
import Background from './Background.js'
import Collider from './Collider.js'
import { createMushrooms } from './Mushroom.js'

export default class World{
  constructor(canvas){
    this.context = canvas.getContext('2d')
    this.w = canvas.width
    this.h = canvas.height

    this.gridW = this.w/textureW
    this.gridH = this.h/textureW

    this.mario = new Mario(textureW*2, textureW*2, textureW, textureW)
    setupKeyboard(this.mario)

    this.background = new Background('sky', this.gridW, this.gridH)

    this.mushrooms = createMushrooms(0, this.w*2, this.h)

    this.collider = new Collider(this.mushrooms)
  }

  updateMushrooms(){
    const mushroomsToRemove = []
    let xMax = 0
    this.mushrooms.forEach(mushroom => {
      mushroom.x --
      if(mushroom.x > xMax) {
        xMax = mushroom.x
      }
      if(mushroom.x + mushroom.capSize*textureW < 0){
        mushroomsToRemove.push(mushroom)
      }
    })
    if(mushroomsToRemove.length) {
      this.mushrooms = this.mushrooms.filter(mushroom => {
        return !mushroomsToRemove.includes(mushroom)
      })
    }
    if(xMax < this.w) {
      const newMushrooms = createMushrooms(this.w*1.5, this.w*3.5, this.h)
      this.mushrooms = [...this.mushrooms, ...newMushrooms]
    }
    this.collider.update(this.mushrooms)
  }

  update(deltaTime){
    const mario = this.mario

    mario.x += mario.vx * deltaTime
    this.collider.checkX(mario)

    mario.y += mario.vy * deltaTime
    this.collider.checkY(mario)

    const gravity = 1000
    this.mario.vy += gravity * deltaTime

    if(mario.x > this.w/2) {
      mario.x = this.w/2
      this.updateMushrooms()
    }
    if(mario.x < 0) {
      mario.x = 0
    }
  }

  draw(){
    const context = this.context
    context.clearRect(0, 0, this.w, this.h)
    this.background.draw(context)
    this.mushrooms.forEach(mushroom => mushroom.drawStipe(context))
    this.mushrooms.forEach(mushroom => mushroom.drawCap(context))
    this.mario.draw(context)
  }
}
