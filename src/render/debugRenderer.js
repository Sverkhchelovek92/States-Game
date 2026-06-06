import { hover } from '../input/hover.js'
import { camera } from '../camera.js'

export function renderDebug(ctx) {
  ctx.fillStyle = '#ffffff'
  ctx.font = '16px Arial'

  ctx.fillText('STATES DEV BUILD', 10, 25)

  if (hover.tile) {
    ctx.fillText(`Tile: ${hover.tileX}, ${hover.tileY}`, 10, 50)

    ctx.fillText(`Terrain: ${hover.tile.type}`, 10, 75)
  }

  ctx.fillText(
    `Camera: ${Math.floor(camera.x)}, ${Math.floor(camera.y)}`,
    10,
    100,
  )
}
