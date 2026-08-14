import { unitSelection } from './unitSelection.js'
import { hover } from '../input/hover.js'
import { getUnitAt } from './unitUtils.js'
import { getMovementCost } from '../world/movement.js'
import { world } from '../world.js'

export function moveSelectedUnit() {
  const unit = unitSelection.unit

  if (!unit) {
    return
  }

  if (unit.movement <= 0) {
    return
  }

  if (unit.x === hover.tileX && unit.y === hover.tileY) {
    return
  }

  const unitOnTarget = getUnitAt(hover.tileX, hover.tileY)

  if (unitOnTarget) {
    return
  }

  const targetTile = world.tiles[hover.tileY][hover.tileX]

  const movementCost = getMovementCost(targetTile)

  if (unit.movement < movementCost) {
    return
  }

  unit.x = hover.tileX
  unit.y = hover.tileY

  unit.movement -= movementCost
}
