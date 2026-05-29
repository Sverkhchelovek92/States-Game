import { world } from '../world.js'
import { camera } from '../camera.js'

export function renderWorld(ctx) {
  for (let y = 0; y < world.height; y++) {
    for (let x = 0; x < world.width; x++) {
      const tile = world.tiles[y][x]

      const worldX = x * world.tileSize
      const worldY = y * world.tileSize

      const screenX = worldX - camera.x
      const screenY = worldY - camera.y

      // temporary colors
      if (tile.type === 'grass') {
        ctx.fillStyle = '#4caf50'
      }

      if (tile.type === 'water') {
        ctx.fillStyle = '#2196f3'
      }

      if (tile.type === 'forest') {
        ctx.fillStyle = '#2e7d32'
      }

      ctx.fillRect(screenX, screenY, world.tileSize, world.tileSize)

      // grid lines
      ctx.strokeStyle = '#111'
      ctx.strokeRect(screenX, screenY, world.tileSize, world.tileSize)
    }
  }
}
