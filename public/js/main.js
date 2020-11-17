import World from './classes/World.js'

const canvas = document.getElementById('canvas')

const world = new World(canvas)

const deltaTime = 1/60
let prevTime = 0
let accumulatedTime = 0

function game(time){
  accumulatedTime += (time - prevTime) / 1000
  prevTime = time

  while(accumulatedTime > deltaTime){
    world.update(deltaTime)
    accumulatedTime -= deltaTime
  }

  world.draw()

  requestAnimationFrame(game)
}

requestAnimationFrame(game)
