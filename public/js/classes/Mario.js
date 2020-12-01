import { drawTexture } from '../textures/textures.js'

export default class Mario{
  constructor(x, y, w, h){
    this.x = x; this.y = y
    this.vx = 0; this.vy = 0
    this.w = w; this.h = h

    this.direction = 0
    this.distance = 0

    this.jumpGain = 0
    this.canJump = false
    this.jumping = false

    this.skin = 'mario'
    this.animRun = createAnimation(['run-1','run-2','run-3'], 10)
  }

  draw(context){
    let currentTexture = 'idle'
    if(this.distance > 0) {
      currentTexture = this.animRun(this.distance)
    }
    if(this.jumping) {
      currentTexture = 'jump'
    }
    drawTexture(context, this.skin, currentTexture, this.x, this.y)
  }

  obstruct(side){
    if(side === 'bottom'){
      this.canJump = true
      this.jumping = false
    }else if(side === 'top'){
      this.jumpGain = 0
    }else {
      this.canJump = false
    }
  }

  startJump(){
    if(this.canJump) {
      this.jumpGain = .2
      this.jumping = true
    }
  }
  stopJump(){
    this.jumpGain = 0
  }

  jump(deltaTime){
    const jumpVelocity = 200

    if(this.jumpGain > 0){
      this.vy = -(jumpVelocity + Math.abs(this.vx * .2))
      this.jumpGain -= deltaTime
    }
  }

  run(deltaTime){
    const maxSpeed = 300
    const acceleration = 300
    const friction = 5

    if(this.direction !== 0){
      this.vx += acceleration * this.direction * deltaTime
      if(Math.abs(this.vx) > maxSpeed) {
        this.vx = maxSpeed
      }
    } else if(this.vx !== 0) {
      if(Math.abs(this.vx) > friction){
        this.vx += this.vx > 0 ? -friction : friction
      }else {
        this.vx = 0
      }
    } else {
      this.distance = 0
    }
    this.distance += Math.abs(this.vx) * deltaTime
  }

  update(deltaTime){
    this.run(deltaTime)
    this.jump(deltaTime)
  }
}

function createAnimation(frames, frameLen){
  return function resolve(distance){
    const frameInd = Math.floor(distance/frameLen) % frames.length
    return frames[frameInd]
  }
}
