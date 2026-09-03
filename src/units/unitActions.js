import { unitSelection } from './unitSelection.js'
import { hover } from '../input/hover.js'
import { getUnitAt } from './unitUtils.js'
import { getMovementCost } from '../world/movement.js'
import { world } from '../world.js'
import { findPath } from './pathfinding.js'
import { movementState } from './unitMovement.js'

export function moveSelectedUnit() {
  const unit = unitSelection.unit

  if (!unit) {
    return
  }

  if (unit.movement <= 0) {
    return
  }

  if (!hover.tile) {
    return
  }

  if (unit.x === hover.tileX && unit.y === hover.tileY) {
    return
  }

  const path = findPath(unit, hover.tileX, hover.tileY)

  if (!path) {
    return
  }

  movementState.path = path

  console.log('PATH:', path)

  moveAlongPath(unit, path)
}

function isAdjacent(unit, targetX, targetY) {
  const dx = Math.abs(targetX - unit.x)
  const dy = Math.abs(targetY - unit.y)

  const wrappedDx = Math.min(dx, world.width - dx)

  return wrappedDx <= 1 && dy <= 1
}
