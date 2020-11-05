import { textureW, drawTexture, fillTexture } from './textures.js'

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const gridW = canvas.clientWidth/textureW
const gridH = canvas.clientHeight/textureW

fillTexture(
  context,
  'sky',
  {xStart: 0, yStart: 0, xEnd: gridW, yEnd: gridH}
)
fillTexture(
  context,
  'ground',
  {xStart: 0, yStart: gridH-2, xEnd: gridW, yEnd: gridH}
)
drawTexture(context, 'mario', 2*textureW, gridH*textureW - 3*textureW)
