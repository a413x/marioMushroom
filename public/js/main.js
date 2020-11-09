import { textureW, drawTexture, fillTexture } from './textures.js'
import { Mario } from './classes/Mario.js'

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const gridW = canvas.width/textureW
const gridH = canvas.height/textureW

const mario = new Mario(2*textureW, gridH*textureW - 3*textureW)

function drawAll(){
  context.clearRect(0, 0, canvas.width, canvas.height)
  fillTexture(
    context,
    'sky',
    {xStart: 0, yStart: 0, xEnd: gridW, yEnd: gridH}
  )
  fillTexture(
    context,
    'ground',
    {xStart: 0, yStart: gridH-2, xEnd: gridW, yEnd: gridH}
  )
  mario.draw(context)
}

const deltaTime = 1/60
let prevTime = 0
let accumulatedTime = 0

mario.vx = 200
mario.vy = -400

function game(time){
  accumulatedTime += (time - prevTime) / 1000
  prevTime = time

  while(accumulatedTime > deltaTime){
    mario.update(deltaTime)
    accumulatedTime -= deltaTime
  }

  drawAll()

  requestAnimationFrame(game)
}

requestAnimationFrame(game)
