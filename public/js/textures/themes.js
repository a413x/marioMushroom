import {getRandomArrayElement, getRandom} from '../utils.js'

const themes = {
  'light': {
    'mario': [
      'mario',
      'luigi',
      'fire',
      'invincible-1',
      'invincible-2',
      'invincible-3',
      'underground-1',
      'underground-2',
    ],
    'mushroom': [
      'm-orange',
      'm-green-1',
      'm-green-2',
      'm-white-2',
      't-green-2',
      't-orange',
      't-white-2',
      'm-purple',
      't-purple-1',
      't-purple-2',
    ],
    'background': [
      'light-blue',
      'light-blue-2'
    ],
    'cloud': [
      'c-light-blue',
      'c-light-blue-2',
      'c-blue'
    ]
  },
  'dark-1' : {
    'mario': [
      'mario',
      'luigi',
      'fire',
      'invincible-2',
      'invincible-3',
      'underground-1',
      'underground-2',
    ],
    'mushroom': [
      'm-orange',
      'm-green-1',
      'm-green-2',
      't-green-2',
      't-orange',
    ],
    'background': [
      'black',
    ],
    'cloud': [
      'c-light-blue',
      'c-light-blue-2',
      'c-blue',
    ]
  },
  'dark-2' : {
    'mario': [
      'mario',
      'luigi',
      'fire',
      'invincible-2',
      'invincible-3',
      'underground-1',
      'underground-2',
      'castle',
      'yellow'
    ],
    'mushroom': [
      'm-white-1',
      'm-white-2',
      't-white-1',
      't-white-2'
    ],
    'background': [
      'black',
    ],
    'cloud': [
      'c-red',
    ]
  },
  'red' : {
    'mario': [
      'castle',
      'yellow'
    ],
    'mushroom': [
      'm-white-1',
      'm-white-2',
      't-white-1',
      't-white-2'
    ],
    'background': [
      'red',
    ],
    'cloud': [
      'c-red',
    ]
  },
}

export function generateTheme(){
  //50% chance to get light theme
  const lightChance = getRandom(0, 2) === 0

  const themeName = lightChance ?
                  'light' : getRandomArrayElement(Object.keys(themes).slice(1))

  const randomTextures = {}
  const theme = themes[themeName]

  for(let obj in theme){
    const textures = theme[obj]
    const randomTexture = getRandomArrayElement(textures)
    randomTextures[obj] = randomTexture
  }

  return randomTextures
}
