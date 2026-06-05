import { camera } from '../camera.js'
import { world } from '../world.js'

export const hover = {
  tileX: 0,
  tileY: 0,
  tile: null,
}

export function updateHover(mouseX, mouseY) {
  const worldX = mouseX + camera.x
  const worldY = mouseY + camera.y

  let tileX = Math.floor(worldX / world.tileSize)

  const tileY = Math.floor(worldY / world.tileSize)

  tileX = ((tileX % world.width) + world.width) % world.width

  if (tileY < 0 || tileY >= world.height) {
    hover.tile = null
    return
  }

  hover.tileX = tileX
  hover.tileY = tileY

  hover.tile = world.tiles[tileY][tileX]

  console.log(hover.tileX, hover.tileY)
}
