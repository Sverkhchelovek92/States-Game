import { world } from '../world.js'
import { getNeighbors } from '../world/neighbors.js'
import { getMovementCost } from '../world/movement.js'
import { getUnitAt } from './unitUtils.js'

export function findPath(unit, targetX, targetY) {
  const startX = unit.x
  const startY = unit.y

  const targetTile = world.tiles[targetY][targetX]
}
