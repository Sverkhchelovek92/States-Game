import { world } from '../world.js'

export function getUnitAt(tileX, tileY) {
  return world.units.find((unit) => unit.x === tileX && unit.y === tileY)
}
