import { hover } from '../input/hover.js'
import { getUnitAt } from './unitUtils.js'

export const unitSelection = {
  unit: null,
}

export function selectUnitUnderCursor() {
  const unit = getUnitAt(hover.tileX, hover.tileY)

  unitSelection.unit = unit
}

export function clearUnitSelection() {
  unitSelection.unit = null
}
