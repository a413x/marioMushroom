import Keyboard from './classes/Keyboard.js'

const [UP, LEFT, RIGHT] = [38, 37, 39]

export function setupKeyboard(mario){
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
}
