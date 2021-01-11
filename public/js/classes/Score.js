export default class Score{
  constructor(){
    this.distance = 0
    this.score = 0
  }

  updateScore(deltaX){
    this.distance += deltaX
    this.score = Math.round(this.distance/100)
  }

  draw(context){
    context.font = '8px serif'
    context.fillStyle = 'white'
    context.fillText(this.score, 3, 8)
  }
}
