import { unitSelection } from './unitSelection.js'
import { hover } from '../input/hover.js'

export function moveSelectedUnit() {
  const unit = unitSelection.unit

  if (!unit) {
    return
  }

  if (unit.movement <= 0) {
    return
  }

  unit.x = hover.tileX
  unit.y = hover.tileY

  unit.movement--
}
