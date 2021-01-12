import World from './classes/World.js'
import {showRestartMessage} from './textures/restartMessage.js'
import {onResize} from './resize.js'

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

let world = new World(canvas)

const deltaTime = 1/60
let prevTime = 0
let accumulatedTime = 0

function game(time){
  accumulatedTime += (time - prevTime) / 1000
  prevTime = time

  while(accumulatedTime > deltaTime){
    const isOver = world.update(deltaTime)
    if(isOver) {
      world.draw()
      showRestartMessage(context)
      return
    }
    accumulatedTime -= deltaTime
  }

  world.draw()

  requestAnimationFrame(game)
}

requestAnimationFrame(game)

//R to restart
window.addEventListener('keydown',(e) => {
  if(e.keyCode === 82) newGame()
})
canvas.addEventListener('click',() => newGame())

window.addEventListener('resize', () => onResize(canvas.width, canvas.height))
onResize(canvas.width, canvas.height)

function newGame(){
  world = new World(canvas)
  requestAnimationFrame(game)
}
