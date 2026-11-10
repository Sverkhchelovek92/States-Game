import { world } from './world.js'

export const camera = {
  x: 0,
  y: 0,

  speed: 12,

  edgeSize: 32,

  mode: 'world',

  zoom: 1,
}

export function clampCameraY(maxY) {
  if (camera.y < 0) {
    camera.y = 0
  }

  if (camera.y > maxY) {
    camera.y = maxY
  }
}

export function enterCityMode(city, screenWidth, screenHeight) {
  camera.mode = 'city'
  camera.zoom = 2

  const cityPixelX = city.x * world.tileSize
  const cityPixelY = city.y * world.tileSize

  camera.x = cityPixelX - screenWidth / (2 * camera.zoom)
  camera.y = cityPixelY - screenHeight / (2 * camera.zoom)
}
