import { UNIT_TYPES } from './unitTypes.js'

let nextUnitId = 1

export function createUnit(type, x, y, owner) {
  const unitType = UNIT_TYPES[type]

  if (!unitType) {
    throw new Error(`Unknown unit type: ${type}`)
  }

  return {
    id: nextUnitId++,

    owner,

    type,

    x,
    y,

    movement: unitType.movement,
    maxMovement: unitType.movement,
  }
}
