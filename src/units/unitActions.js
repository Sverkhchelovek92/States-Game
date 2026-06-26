import { unitSelection } from './unitSelection.js'
import { hover } from '../input/hover.js'
import { getUnitAt } from './unitUtils.js'

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

  unit.x = hover.tileX
  unit.y = hover.tileY

  unit.movement--
}
