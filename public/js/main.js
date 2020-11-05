import { textureW, drawTexture, fillTexture } from './textures.js'
import { Mario } from './classes/Mario.js'

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const gridW = canvas.width/textureW
const gridH = canvas.height/textureW

let deltaTime = 0
let prevTimeStamp = 0

const mario = new Mario(gridW/2*textureW, gridH*textureW - 3*textureW)

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

function game(timeStamp){
  deltaTime = (timeStamp - prevTimeStamp) / 1000
  prevTimeStamp = timeStamp

  mario.update(deltaTime)

  drawAll()

  requestAnimationFrame(game)
}
game(0)
