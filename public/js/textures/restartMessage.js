export function showRestartMessage(c){
  const msg = 'Press "R" or click to restart'
  c.fillStyle = 'yellow'
  c.font = '20px serif'
  c.shadowColor = 'black'
  c.shadowBlur = 0
  c.shadowOffsetX = 1
  c.shadowOffsetY = 1
  c.fillText(msg, 20, 90)
  c.shadowOffsetX = 0
  c.shadowOffsetY = 0
  c.strokeStyle = 'green'
  c.lineWidth = 5
  c.beginPath()
  c.ellipse(130, 140, 25, 25, Math.PI*2, 0, Math.PI*2)
  c.stroke()
  c.fillStyle = 'orange'
  c.beginPath()
  c.ellipse(130, 140, 25, 25, Math.PI*2, 0, Math.PI*2)
  c.fill()
  c.fillStyle = 'yellow'
  c.font = '32px serif'
  c.fillText('↻', 118, 150)
}
