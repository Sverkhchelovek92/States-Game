export const camera = {
  x: 0,
  y: 0,

  speed: 12,

  edgeSize: 32,
}

export function clampCameraY(maxY) {
  if (camera.y < 0) {
    camera.y = 0
  }

  if (camera.y > maxY) {
    camera.y = maxY
  }
}
