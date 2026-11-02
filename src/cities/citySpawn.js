import { getUnitAt } from '../units/unitUtils.js'

export function findCitySpawnTile(city) {
  const neighbors = getNeighbors(city.x, city.y)

  for (const neighbor of neighbors) {
    const tile = world.tiles[neighbor.y][neighbor.x]

    // Check if tile is usable
    if (!Number.isFinite(getMovementCost(tile))) {
      continue
    }

    // Check for another unit
    if (getUnitAt(neighbor.x, neighbor.y)) {
      continue
    }

    // Check for another city
    const anotherCity = world.cities.some(
      (otherCity) =>
        otherCity.id !== city.id &&
        otherCity.x === neighbor.x &&
        otherCity.y === neighbor.y,
    )

    if (anotherCity) {
      continue
    }

    return neighbor
  }

  return null
}
