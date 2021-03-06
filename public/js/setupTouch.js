let direction = 1, prevY

export function setupTouch(mario){
  document.documentElement.oncontextmenu = () => false;

  window.ontouchstart = (e) => {
    if(e.touches.length > 1) return
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
    if(e.touches.length !== 0) return
    mario.direction += -direction
  }
}
