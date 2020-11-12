import { textureW } from './textures.js'
import { setupKeyboard } from './setupKeyboard.js'
import Background from './classes/Background.js'
import { Mario } from './classes/Mario.js'
import { createRandomMushroom } from './classes/Mushroom.js'
import Collider from './classes/Collider.js'
import { drawAll } from './draw.js'

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const gridW = canvas.width/textureW
const gridH = canvas.height/textureW

const background = new Background('sky', gridW, gridH)
const mario = new Mario(2*textureW, 0, textureW, textureW)

const mushrooms = []
mushrooms.push(createRandomMushroom(gridW, gridH))
mushrooms.push(createRandomMushroom(gridW, gridH))
mushrooms.push(createRandomMushroom(gridW, gridH))
mushrooms.push(createRandomMushroom(gridW, gridH))
mushrooms.push(createRandomMushroom(gridW, gridH))

const layers = {}
layers.background = [background]
layers.surfaces = mushrooms
layers.creatures = [mario]

const collider = new Collider(layers.surfaces)

setupKeyboard(mario)

function update(deltaTime){
  mario.x += mario.vx * deltaTime
  collider.checkX(mario)

  mario.y += mario.vy * deltaTime
  collider.checkY(mario)

  const gravity = 1000
  mario.vy += gravity * deltaTime
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

  drawAll(context, layers)

  requestAnimationFrame(game)
}

requestAnimationFrame(game)
