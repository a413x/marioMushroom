const [PRESSED, RELEASED] = [1, 0]

export default class Keyboard{
  constructor(){
    this.keysState = {}
    this.callbacks = {}
  }

  addCallback(keyCode, callback){
    this.callbacks[keyCode] = callback
  }

  handleEvent(e){
    const {keyCode} = e

    if(!this.callbacks[keyCode]) return

    e.preventDefault()

    const state = e.type === 'keydown' ? PRESSED : RELEASED

    if(this.keysState[keyCode] === state) return

    this.keysState[keyCode] = state

    this.callbacks[keyCode](state)
  }

  listen(window){
    window.onkeyup = (e) => this.handleEvent(e)
    window.onkeydown = (e) => this.handleEvent(e)
  }
}
