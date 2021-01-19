export function onResize(canvW, canvH){
  const scale = 2

  const w = canvW * scale
  const h = canvH * scale

  const docW = document.documentElement.clientWidth
  const docH = document.documentElement.clientHeight

  if(docH < h || docW < w){
    document.body.style.zoom = (docH/h < docW/w ? docH/h : docW/w) * scale
  }else{
    document.body.style.zoom = scale
  }
}
