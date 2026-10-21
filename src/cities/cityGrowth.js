import { world } from '../world.js'
import { TERRAIN_TYPES } from '../world/terrainTypes.js'

export function getCityFood(city) {
  let food = 0

  for (let y = 0; y < world.height; y++) {
    for (let x = 0; x < world.width; x++) {
      const tile = world.tiles[y][x]

      if (tile.owner !== city.id) {
        continue
      }

      const terrain = TERRAIN_TYPES[tile.terrain]

      if (!terrain) {
        continue
      }

      food += terrain.food
    }
  }

  return food
}

export function processCityGrowth(city) {
  const foodProduction = getCityFood(city)

  city.food += foodProduction

  if (city.food < city.foodToGrow) {
    return
  }

  city.food -= city.foodToGrow
  city.population += 1

  city.foodToGrow = city.population * 10

  console.log(`${city.name} grew to population ${city.population}`)
}
