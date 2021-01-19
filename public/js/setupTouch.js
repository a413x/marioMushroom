let direction = 1, prevY

export function setupTouch(mario){
  window.ontouchstart = (e) => {
    const touch = e.changedTouches[0]
    const touchX = touch.pageX
    prevY = touch.pageY

    const pageW = document.documentElement.clientWidth
    direction = touchX < pageW/2 ? -1 : 1
    mario.direction += direction
  }
  window.ontouchmove = (e) => {
    const touch = e.changedTouches[0]
    const touchY = touch.pageY

    const distance = prevY - touchY
    const swipeUp = distance > 10

    if(swipeUp){
      mario.startJump()
    }

    prevY = touchY
  }
  window.ontouchend = (e) => {
    mario.direction += -direction
  }
}
