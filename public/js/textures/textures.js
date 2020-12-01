import image from './texturesImage.js'
import {marioTextures} from './marioTextures.js'
import {backgroundTextures} from './backgroundTextures.js'
import {mushroomTextures} from './mushroomTextures.js'

export const textureW = 16

const textures = {
  ...createTextures(marioTextures),
  ...createTextures(marioTextures, true),
  ...createTextures(backgroundTextures),
  ...createTextures(mushroomTextures)
}

function createTextures(texturesPositions, mirrored = false){
  const returnedTextures = {}
  for(let type in texturesPositions){
    const texturesForType = {}
    const positions = texturesPositions[type]
    for(let textureName in positions){
      texturesForType[textureName] = getTextureImage(
        textureName,
        positions,
        mirrored
      )
    }
    const returnedType = mirrored ? type + '-mirror' : type;
    returnedTextures[returnedType] = texturesForType
  }
  return returnedTextures
}

function getTextureImage(textureName, positions, mirrored = false){
  const [x, y] = positions[textureName]
	const buffer = document.createElement('canvas')
  const bufferContext = buffer.getContext('2d')

  if(mirrored) {
    bufferContext.scale(-1, 1)
    bufferContext.translate(-textureW, 0)
  }

  bufferContext.drawImage(
    image, x, y, textureW, textureW, 0, 0, textureW, textureW
  )
	return buffer
}

export function drawTexture(context, type, textureName, x, y){
  context.drawImage(textures[type][textureName], x, y)
}

export function fillTextureRange(
  context,
  type,
  textureName,
  xStart,
  xCount,
  yStart,
  yCount){
  for(let i = 0; i < xCount; i++){
    for(let j = 0; j < yCount; j++){
      drawTexture(
        context,
        type,
        textureName,
        xStart + i*textureW,
        yStart + j*textureW
      )
    }
  }
}

export function fillTexture(context, type, textureName, gridOptions){
  for(let i = gridOptions.xStart; i < gridOptions.xEnd; i++){
    for(let j = gridOptions.yStart; j < gridOptions.yEnd; j++){
      drawTexture(context, type, textureName, i*textureW, j*textureW)
    }
  }
}
