import { world } from '../world.js'
import { camera } from '../camera.js'
import { hover } from '../input/hover.js'
import { selection } from '../input/selection.js'
import { unitSelection } from '../units/unitSelection.js'
import { UNIT_TYPES } from '../units/unitTypes.js'

export function renderWorld(ctx) {
  for (let y = 0; y < world.height; y++) {
    for (let x = 0; x < world.width; x++) {
      const tile = world.tiles[y][x]

      const mapPixelWidth = world.getPixelWidth()

      const worldX = x * world.tileSize
      const worldY = y * world.tileSize

      for (const offset of [-1, 0, 1]) {
        const screenX = worldX + offset * mapPixelWidth - camera.x

        const screenY = worldY - camera.y

        // draw tile here
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

      // hover tile
      if (hover.tile) {
        const worldX = hover.tileX * world.tileSize

        const worldY = hover.tileY * world.tileSize

        const mapPixelWidth = world.getPixelWidth()

        for (const offset of [-1, 0, 1]) {
          const screenX = worldX + offset * mapPixelWidth - camera.x

          const screenY = worldY - camera.y

          ctx.strokeStyle = '#ffff00'
          ctx.lineWidth = 3

          ctx.strokeRect(screenX, screenY, world.tileSize, world.tileSize)
        }
      }

      // select tile
      if (selection.tile) {
        const worldX = selection.tileX * world.tileSize

        const worldY = selection.tileY * world.tileSize

        const mapPixelWidth = world.getPixelWidth()

        for (const offset of [-1, 0, 1]) {
          const screenX = worldX + offset * mapPixelWidth - camera.x

          const screenY = worldY - camera.y

          ctx.strokeStyle = '#00ff00'
          ctx.lineWidth = 3

          ctx.strokeRect(screenX, screenY, world.tileSize, world.tileSize)
        }
      }

      // units
      for (const unit of world.units) {
        const worldX = unit.x * world.tileSize
        const worldY = unit.y * world.tileSize

        const mapPixelWidth = world.getPixelWidth()

        for (const offset of [-1, 0, 1]) {
          const screenX = worldX + offset * mapPixelWidth - camera.x

          const screenY = worldY - camera.y

          const unitType = UNIT_TYPES[unit.type]

          ctx.fillStyle = unitType.color

          ctx.fillRect(
            screenX + 8,
            screenY + 8,
            world.tileSize - 16,
            world.tileSize - 16,
          )
        }
      }

      if (unitSelection.unit) {
        const unit = unitSelection.unit

        const worldX = unit.x * world.tileSize

        const worldY = unit.y * world.tileSize

        const mapPixelWidth = world.getPixelWidth()

        for (const offset of [-1, 0, 1]) {
          const screenX = worldX + offset * mapPixelWidth - camera.x

          const screenY = worldY - camera.y

          const unitType = UNIT_TYPES[unit.type]

          ctx.fillStyle = unitType.color
          ctx.lineWidth = 3

          ctx.strokeRect(
            screenX + 4,
            screenY + 4,
            world.tileSize - 8,
            world.tileSize - 8,
          )
        }
      }
    }
  }
}
