import { drawTexture } from '../textures/textures.js'

export default class Mario{
  constructor(x, y, w, h){
    this.x = x; this.y = y
    this.vx = 0; this.vy = 0
    this.w = w; this.h = h

    this.direction = 0
    this.facing = 1
    this.distance = 0

    this.jumpGain = 0
    this.onGround = false
    this.jumping = false

    this.skin = 'mario'
    this.animRun = createAnimation(['run-1','run-2','run-3'], 8)
  }

  draw(context){
    let currentTexture = 'idle'
    if(!this.onGround) {
      currentTexture = 'jump'
    }
    else if(this.distance > 0) {
      //turning
      if(this.vx * this.direction < 0 && Math.abs(this.vx) > 30){
        currentTexture = 'turn'
      }
      else{
        currentTexture = this.animRun(this.distance)
      }
    }
    const skin = this.skin + (this.facing > 0 ? '' : '-mirror')
    drawTexture(context, skin, currentTexture, this.x, this.y)
  }

  obstruct(side){
    if(side === 'bottom'){
      this.onGround = true
      this.jumping = false
    }else if(side === 'top'){
      this.jumpGain = 0
    }else {
      this.onGround = false
    }
  }

  startJump(){
    if(this.onGround) {
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
    const maxSpeed = 200
    let acceleration = 200
    const friction = 5

    if(this.direction !== 0){
      if(this.onGround) {
        this.facing = this.direction
      }
      //shorten braking
      if(this.direction * this.vx < 0) {
        acceleration *= 2
      }
      this.vx += acceleration * this.direction * deltaTime
      if(Math.abs(this.vx) > maxSpeed) {
        this.vx = maxSpeed * this.direction
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
