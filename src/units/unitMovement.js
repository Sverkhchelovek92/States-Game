import { world } from '../world.js'
import { getMovementCost } from '../world/movement.js'
import { getUnitAt } from './unitUtils.js'
import { getNeighbors } from '../world/neighbors.js'

export const movementState = {
  path: null,
}

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

export function moveAlongPath(unit, path) {
  if (!path || path.length === 0) {
    return
  }

  for (const tile of path) {
    const targetTile = world.tiles[tile.y][tile.x]
    const movementCost = getMovementCost(targetTile)

    if (unit.movement < movementCost) {
      break
    }

    unit.x = tile.x
    unit.y = tile.y

    unit.movement -= movementCost
  }
}
