import { textureW, fillTexture } from './textures.js'
import { setupKeyboard } from './setupKeyboard.js'
import Background from './classes/Background.js'
import { Mario } from './classes/Mario.js'
import Collider from './classes/Collider.js'

import { createMushrooms } from './classes/Mushroom.js'

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const gridW = canvas.width/textureW
const gridH = canvas.height/textureW

const background = new Background('sky', gridW, gridH)
const mario = new Mario(2*textureW, 0, textureW, textureW)

const mushrooms = createMushrooms(0,canvas.width,canvas.height)

const collider = new Collider(mushrooms)

setupKeyboard(mario)

function update(deltaTime){
  mario.x += mario.vx * deltaTime
  collider.checkX(mario)

  mario.y += mario.vy * deltaTime
  collider.checkY(mario)

  const gravity = 1000
  mario.vy += gravity * deltaTime

  if(mario.x > 256/2) {
    mario.x = 256/2
    mushrooms.forEach(mushroom => mushroom.x--)
  }
  if(mario.x < 0) {
    mario.x = 0
  }
}

function drawAll(context){
  context.clearRect(0, 0, canvas.width, canvas.height)
  background.draw(context)
  mushrooms.forEach(mushroom => {
    mushroom.drawStipe(context)
  })
  mushrooms.forEach(mushroom => {
    mushroom.drawCap(context)
  })
  mario.draw(context)
}

const deltaTime = 1/60
let prevTime = 0
let accumulatedTime = 0

function game(time){
  accumulatedTime += (time - prevTime) / 1000
  prevTime = time

  while(accumulatedTime > deltaTime){
    update(deltaTime)
    accumulatedTime -= deltaTime
  }

  drawAll(context)

  requestAnimationFrame(game)
}

requestAnimationFrame(game)
