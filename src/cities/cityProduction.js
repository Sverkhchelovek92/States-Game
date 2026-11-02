import { world } from '../world.js'
import { TERRAIN_TYPES } from '../world/terrainTypes.js'
import { getCityWorkedTiles } from './cityGrowth.js'
import { PRODUCTION_ITEMS } from './productionItems.js'
import { createUnit } from '../units/unitFactory.js'
import { findCitySpawnTile } from './citySpawn.js'

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

  const item = PRODUCTION_ITEMS[city.productionItem]

  if (!item) {
    return
  }

  const production = getCityProduction(city)

  city.productionProgress += production

  if (city.productionProgress >= item.cost) {
    const spawnTile = findCitySpawnTile(city)

    if (!spawnTile) {
      console.log(`${city.name} has no space to spawn a unit`)
      return
    }

    const overflow = city.productionProgress - item.cost

    console.log(`${city.name} completed ${item.name}`)

    if (item.type === 'unit') {
      const unit = createUnit(
        city.productionItem,
        spawnTile.x,
        spawnTile.y,
        city.owner,
      )

      world.units.push(unit)

      console.log(`${item.name} appeared near ${city.name}`)
    }

    city.productionItem = null
    city.productionProgress = overflow
  }
}
