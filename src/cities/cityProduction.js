import { TERRAIN_TYPES } from '../world/terrainTypes.js'
import { getCityWorkedTiles } from './cityGrowth.js'

export function getCityProduction(city) {
  const workedTiles = getCityWorkedTiles(city)

  let production = 0

  for (const tile of workedTiles) {
    const terrain = TERRAIN_TYPES[tile.terrain]

    if (!terrain) continue

    production += terrain.production

    if (tile.elevation === 'hill') {
      production += 1
    }
  }

  return production
}

export function processCityProduction(city) {
  if (!city.productionItem) {
    return
  }
  const production = getCityProduction(city)

  city.production += production
}
