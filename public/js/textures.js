import image from './texturesImage.js'

export const textureW = 16
const texturesPositions = {
  'ground': {x: 372, y: 124},
  'sky': {x: 274, y: 365},
  'mario': {x: 23, y: 507},
  'mushroom-stipe': {x: 74, y: 377},
  'mushroom-stipe-top': {x: 74, y: 360},
  'mushroom-cap': {x: 74, y: 343},
  'mushroom-cap-left': {x: 57, y: 343},
  'mushroom-cap-right': {x: 91, y: 343}
}
const textures = {}
for(let name in texturesPositions){
  textures[name] = getTextureImage(name)
}

function getTextureImage(textureName){
  const {x, y} = texturesPositions[textureName]
	const buffer = document.createElement('canvas')
  buffer.getContext('2d').drawImage(
    image, x, y, textureW, textureW, 0, 0, textureW, textureW
  )
	return buffer
}

export function drawTexture(context, textureName, x, y){
  context.drawImage(textures[textureName], x, y)
}

export function fillTextureRange(
  context,
  textureName,
  xStart,
  xCount,
  yStart,
  yCount){
  for(let i = 0; i < xCount; i++){
    for(let j = 0; j < yCount; j++){
      drawTexture(context, textureName, xStart + i*textureW, yStart + j*textureW)
    }
  }
}

export function fillTexture(context, textureName, gridOptions){
  for(let i = gridOptions.xStart; i < gridOptions.xEnd; i++){
    for(let j = gridOptions.yStart; j < gridOptions.yEnd; j++){
      drawTexture(context, textureName, i*textureW, j*textureW)
    }
  }
}
