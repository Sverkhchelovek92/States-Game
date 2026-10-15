import { world } from '../world.js'

export function claimCityTile(city, x, y) {
  if (y < 0 || y >= world.height) {
    return false
  }

  const wrappedX = ((x % world.width) + world.width) % world.width

  const tile = world.tiles[y][wrappedX]

  if (tile.owner !== null) {
    return false
  }

  tile.owner = city.id

  return true
}

export function getCityTerritory(city) {
  return world.tiles.flat().filter((tile) => tile.owner === city.id)
}

export function getCityTerritorySize(city) {
  return getCityTerritory(city).length
}
