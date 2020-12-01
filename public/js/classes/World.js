import { textureW } from '../textures.js'
import { setupKeyboard } from '../setupKeyboard.js'
import Mario from './Mario.js'
import Background from './Background.js'
import Collider from './Collider.js'
import { createMushrooms, createMushroom } from './Mushroom.js'

export default class World{
  constructor(canvas){
    this.context = canvas.getContext('2d')
    this.w = canvas.width
    this.h = canvas.height

    this.gridW = this.w/textureW
    this.gridH = this.h/textureW

    this.mario = new Mario(textureW*2, textureW*2, textureW, textureW)
    setupKeyboard(this.mario)

    this.background = new Background(this.gridW, this.gridH)

    const numberOfMushrooms = 20
    const startMushroom = createMushroom(1, 8, this.gridH)
    this.mushrooms = [
      startMushroom,
      ...createMushrooms(numberOfMushrooms, startMushroom, this.gridH)
    ]

    this.collider = new Collider(this.mushrooms)

    this.cameraX = 0
  }

  updateMushrooms(deltaX){
    const mushroomsToRemove = []
    this.mushrooms.forEach(mushroom => {
      mushroom.x -= deltaX
      if(mushroom.x + mushroom.capSize*textureW < 0){
        mushroomsToRemove.push(mushroom)
      }
    })
    if(mushroomsToRemove.length) {
      this.mushrooms = this.mushrooms.filter(mushroom => {
        return !mushroomsToRemove.includes(mushroom)
      })
      this.generateMushrooms(mushroomsToRemove.length)
    }
    this.collider.update(this.mushrooms)
  }

  generateMushrooms(number){
    if(!number) return
    const newMushrooms = createMushrooms(
      number,
      this.mushrooms[this.mushrooms.length-1],
      this.gridH
    )
    this.mushrooms = [...this.mushrooms, ...newMushrooms]
  }

  update(deltaTime){
    const mario = this.mario

    mario.update(deltaTime)

    mario.x += mario.vx * deltaTime
    this.collider.checkX(mario)

    mario.y += mario.vy * deltaTime
    this.collider.checkY(mario)

    const gravity = 1000
    this.mario.vy += gravity * deltaTime

    if(mario.x > 100) {
      const deltaX = Math.round(mario.x - 100)
      this.updateMushrooms(deltaX)
      mario.x = 100
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
