import { textureW } from '../textures/textures.js'
import { setupKeyboard } from '../setupKeyboard.js'
import Mario from './Mario.js'
import Background from './Background.js'
import Collider from './Collider.js'
import Score from './Score.js'
import { createMushrooms, createMushroom } from './Mushroom.js'
import { generateTheme } from '../textures/themes.js'

export default class World{
  constructor(canvas){
    this.context = canvas.getContext('2d')
    this.w = canvas.width
    this.h = canvas.height

    this.gridW = this.w/textureW
    this.gridH = this.h/textureW

    this.theme = generateTheme()
    this.theme.background = {
      background: this.theme.background,
      cloud: this.theme.cloud
    }

    this.mario = new Mario(textureW*2, textureW*2, this.theme.mario)
    setupKeyboard(this.mario)

    this.backgrounds = [
      new Background(0, this.gridW, this.gridH, this.theme.background),
      new Background(this.w, this.gridW, this.gridH, this.theme.background),
      new Background(2*this.w, this.gridW, this.gridH, this.theme.background),
    ]

    const numberOfMushrooms = 20
    const startMushroom = createMushroom(1, 8, this.gridH, this.theme.mushroom)
    this.mushrooms = [
      startMushroom,
      ...createMushrooms(
        numberOfMushrooms,
        startMushroom,
        this.gridH,
        this.theme.mushroom
      )
    ]

    this.collider = new Collider(this.mushrooms)
    this.score = new Score()

    this.distance = 0
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
      this.gridH,
      this.theme.mushroom
    )
    this.mushrooms = [...this.mushrooms, ...newMushrooms]
  }

  updateBackground(deltaX){
    this.backgrounds.forEach(background => {
      background.x -= deltaX
    })

    this.distance += deltaX
    if(this.distance < this.w) return

    this.distance = 0

    const lastX = this.backgrounds[this.backgrounds.length-1].x
    this.backgrounds.push(
      new Background(
        lastX + this.w, this.gridW, this.gridH, this.theme.background
      )
    )
    this.backgrounds.shift()
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
      this.updateBackground(deltaX)
      this.score.updateScore(deltaX)
      mario.x = 100
    }
    if(mario.x < 0) {
      mario.x = 0
    }

    //game over
    return mario.y > this.h
  }

  draw(){
    const context = this.context
    context.clearRect(0, 0, this.w, this.h)
    this.backgrounds.forEach(background => background.draw(context))
    this.mushrooms.forEach(mushroom => mushroom.drawStipe(context))
    this.mushrooms.forEach(mushroom => mushroom.drawCap(context))
    this.mario.draw(context)
    this.score.draw(context)
  }
}
