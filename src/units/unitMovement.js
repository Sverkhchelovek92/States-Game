import { world } from '../world.js'
import { getMovementCost } from '../world/movement.js'
import { getUnitAt } from './unitUtils.js'

export function getAvailableMoves(unit) {
  const moves = []

  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      // Don't check unit's square
      if (dx === 0 && dy === 0) {
        continue
      }

      const targetY = unit.y + dy

      // Top and bottom edges
      if (targetY < 0 || targetY >= world.height) {
        continue
      }

      // Horizontal cycling
      const targetX =
        (((unit.x + dx) % world.width) + world.width) % world.width

      const tile = world.tiles[targetY][targetX]

      const movementCost = getMovementCost(tile)

      // Not passable
      if (!Number.isFinite(movementCost)) {
        continue
      }

      // Not enought movement cost
      if (unit.movement < movementCost) {
        continue
      }

      // Another unit
      if (getUnitAt(targetX, targetY)) {
        continue
      }

      moves.push({
        x: targetX,
        y: targetY,
      })
    }
  }

  return moves
}
