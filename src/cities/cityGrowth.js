import { world } from '../world.js'
import { TERRAIN_TYPES } from '../world/terrainTypes.js'

export function getCityWorkedTiles(city) {
  if (city.workedTiles !== null) {
    return city.workedTiles.map(({ x, y }) => world.tiles[y][x])
  }
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

export function assignBestAvailableWorkedTile(city) {
  if (city.workedTiles === null) {
    return false
  }

  const territory = []

  for (let y = 0; y < world.height; y++) {
    for (let x = 0; x < world.width; x++) {
      const tile = world.tiles[y][x]

      if (tile.owner !== city.id) {
        continue
      }

      territory.push(tile)
    }
  }

  const workedKeys = new Set(
    city.workedTiles.map((tile) => `${tile.x},${tile.y}`),
  )

  const availableTiles = territory
    .filter((tile) => !workedKeys.has(`${tile.x},${tile.y}`))
    .sort((a, b) => {
      const foodA = TERRAIN_TYPES[a.terrain]?.food ?? 0

      const foodB = TERRAIN_TYPES[b.terrain]?.food ?? 0

      return foodB - foodA
    })

  if (availableTiles.length === 0) {
    return false
  }

  const tile = availableTiles[0]

  city.workedTiles.push({
    x: tile.x,
    y: tile.y,
  })

  return true
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

export function toggleCityWorkedTile(city, x, y) {
  if (x < 0 || x >= world.width || y < 0 || y >= world.height) {
    return false
  }

  const tile = world.tiles[y][x]

  // Tile should belong to City
  if (tile.owner !== city.id) {
    return false
  }

  // City center always working
  if (x === city.x && y === city.y) {
    return false
  }

  // First choice is automatic
  if (city.workedTiles === null) {
    city.workedTiles = getCityWorkedTiles(city).map((workedTile) => ({
      x: workedTile.x,
      y: workedTile.y,
    }))
  }

  const index = city.workedTiles.findIndex(
    (workedTile) => workedTile.x === x && workedTile.y === y,
  )

  if (index !== -1) {
    // Remove tile from working
    city.workedTiles.splice(index, 1)
    return true
  }

  // Restrain the amount of working tiles
  const maxWorkedTiles = city.population + 1

  if (city.workedTiles.length >= maxWorkedTiles) {
    return false
  }

  city.workedTiles.push({ x, y })

  return true
}
