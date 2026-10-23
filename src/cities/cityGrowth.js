import { world } from '../world.js'
import { TERRAIN_TYPES } from '../world/terrainTypes.js'

export function getCityWorkedTiles(city) {
  const territory = []

  for (let y = 0; y < world.height; y++) {
    for (let x = 0; x < world.width; x++) {
      const tile = world.tiles[y][x]

      if (tile.owner !== city.id) continue

      territory.push(tile)
    }
  }

  const centerTile = world.tiles[city.y][city.x]

  const otherTiles = territory
    .filter((tile) => tile !== centerTile)
    .sort((a, b) => {
      const foodA = TERRAIN_TYPES[a.terrain]?.food ?? 0
      const foodB = TERRAIN_TYPES[b.terrain]?.food ?? 0

      return foodB - foodA
    })

  const maxWorkedTiles = city.population + 1

  return [centerTile, ...otherTiles.slice(0, maxWorkedTiles - 1)]
}

export function getCityFood(city) {
  const workedTiles = getCityWorkedTiles(city)

  let food = 0

  for (const tile of workedTiles) {
    const terrain = TERRAIN_TYPES[tile.terrain]

    if (!terrain) continue

    food += terrain.food
  }

  return food
}

export function getCityFoodConsumption(city) {
  return city.population * 2
}

export function processCityGrowth(city) {
  const foodProduction = getCityFood(city)
  const foodConsumption = getCityFoodConsumption(city)

  const netFood = foodProduction - foodConsumption

  city.food += netFood

  if (city.food < 0) {
    city.food = 0
  }

  if (city.food < city.foodToGrow) {
    return
  }

  city.food -= city.foodToGrow
  city.population += 1

  city.foodToGrow = city.population * 10

  console.log(`${city.name} grew to population ${city.population}`)
}
