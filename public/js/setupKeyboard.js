import Keyboard from './classes/Keyboard.js'

const [UP, LEFT, RIGHT] = [38, 37, 39]

export function setupKeyboard(mario){
  const keyboard = new Keyboard()
  keyboard.addCallback(UP, keyState => {
    if(keyState){
      mario.startJump()
    }else {
      mario.stopJump()
    }
  })
  keyboard.addCallback(LEFT, keyState => {
    mario.direction += keyState ? -1 : 1;
  })
  keyboard.addCallback(RIGHT, keyState => {
    mario.direction += keyState ? 1 : -1;
  })
  keyboard.listen(window)
}
