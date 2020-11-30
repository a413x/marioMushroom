export default class Collider{
  constructor(collideObjects){
    this.collideObjects = collideObjects
  }

  update(objects){
    this.collideObjects = objects
  }

  checkX(creature) {
    this.collideObjects.forEach(obj => {
      const {x1: ox1, y1: oy1, x2: ox2, y2: oy2} = obj.getBounds()
      if(! (
        creature.x + creature.w > ox1 &&
        creature.x < ox2 &&
        creature.y + creature.h > oy1 &&
        creature.y < oy2
      )) return

      if (creature.vx > 0) {
        if (creature.x + creature.w > ox1) {
          creature.x = ox1 - creature.w
          creature.vx = 0
        }
      } else if (creature.vx < 0) {
        if (creature.x < ox2) {
          creature.x = ox2
          creature.vx = 0
        }
      }
    })
  }

  checkY(creature) {
    let obstruct = 'none'
    this.collideObjects.forEach(obj => {
      const {x1: ox1, y1: oy1, x2: ox2, y2: oy2} = obj.getBounds()
      if(! (
        creature.x + creature.w > ox1 &&
        creature.x < ox2 &&
        creature.y + creature.h > oy1 &&
        creature.y < oy2
      )) return

      if (creature.vy > 0) {
        if (creature.y + creature.h > oy1) {
          creature.y = oy1 - creature.h
          creature.vy = 0

          obstruct = 'bottom'
        }
      } else if (creature.vy < 0) {
        if (creature.y < oy2) {
          creature.y = oy2
          creature.vy = 0

          obstruct = 'top'
        }
      }
    })
    creature.obstruct(obstruct)
  }

}
