import { textureW, drawTexture, fillTexture } from './textures.js'
import Keyboard from './classes/Keyboard.js'
import { Mario } from './classes/Mario.js'
import {createRandomMushroom} from './classes/Mushroom.js'
import Collider from './classes/Collider.js'

const [UP, LEFT, RIGHT] = [38, 37, 39]

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const gridW = canvas.width/textureW
const gridH = canvas.height/textureW

const mario = new Mario(2*textureW, 0, textureW, textureW)

const mushrooms = []
mushrooms.push(createRandomMushroom(gridW, gridH))
mushrooms.push(createRandomMushroom(gridW, gridH))
mushrooms.push(createRandomMushroom(gridW, gridH))
mushrooms.push(createRandomMushroom(gridW, gridH))
mushrooms.push(createRandomMushroom(gridW, gridH))
mushrooms.push(createRandomMushroom(gridW, gridH))

const collider = new Collider(mushrooms)

const keyboard = new Keyboard()
keyboard.addCallback(UP, keyState => {
  if(keyState){
    mario.vy = -300
  }else{
    mario.vy = 0
  }
})
keyboard.addCallback(LEFT, keyState => {
  if(keyState){
    mario.vx = -50
  }else{
    mario.vx = 0
  }
})
keyboard.addCallback(RIGHT, keyState => {
  if(keyState){
    mario.vx = 50
  }else{
    mario.vx = 0
  }
})
keyboard.listen(window)

function drawAll(){
  context.clearRect(0, 0, canvas.width, canvas.height)
  fillTexture(
    context,
    'sky',
    {xStart: 0, yStart: 0, xEnd: gridW, yEnd: gridH}
  )
  mushrooms.forEach(mushroom => mushroom.draw(context))
  mario.draw(context)
}

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

  drawAll()

  requestAnimationFrame(game)
}

requestAnimationFrame(game)
