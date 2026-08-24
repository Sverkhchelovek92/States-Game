import { world } from '../world.js'
import { getMovementCost } from '../world/movement.js'
import { getUnitAt } from './unitUtils.js'
import { getNeighbors } from '../world/neighbors.js'

export function getAvailableMoves(unit) {
  const moves = []

  const neighbors = getNeighbors(unit.x, unit.y)

  for (const neighbor of neighbors) {
    const tile = world.tiles[neighbor.y][neighbor.x]

    const movementCost = getMovementCost(tile)

    // Impossible square
    if (!Number.isFinite(movementCost)) {
      continue
    }

    // No movement cost
    if (unit.movement < movementCost) {
      continue
    }

    // Another unit
    if (getUnitAt(neighbor.x, neighbor.y)) {
      continue
    }

    moves.push(neighbor)
  }

  return moves
}
