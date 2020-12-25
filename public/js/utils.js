export function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export function getRandomArrayElement(arr){
  const num = getRandom(0, arr.length)
  return arr[num]
}
