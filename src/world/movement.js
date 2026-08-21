import { TERRAIN_TYPES } from './terrainTypes.js'

export function getMovementCost(tile) {
  const terrain = TERRAIN_TYPES[tile.terrain]

  if (!terrain) {
    return Infinity
  }

  if (!terrain.passable) {
    return Infinity
  }

  let cost = terrain.movementCost

  if (tile.elevation === 'hill') {
    cost += 1
  }

  if (tile.elevation === 'mountain') {
    return Infinity
  }

  return cost
}
