import { TERRAIN_TYPES } from '../world/terrainTypes.js'
import { getCityWorkedTiles } from './cityGrowth.js'
import { PRODUCTION_ITEMS } from './productionItems.js'

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

export function startCityProduction(city, itemType) {
  const item = PRODUCTION_ITEMS[itemType]

  if (!item) {
    console.log(`Unknown production item: ${itemType}`)
    return false
  }

  city.productionItem = itemType
  city.productionProgress = 0

  console.log(`${city.name} started production of ${item.name}`)

  return true
}

export function processCityProduction(city) {
  if (!city.productionItem) {
    return
  }
  const production = getCityProduction(city)

  city.production += production
}
