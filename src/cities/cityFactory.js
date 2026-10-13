import { CITY_NAMES } from './cityNames.js'

let nextCityId = 1

export function createCity(x, y, owner) {
  const cityId = nextCityId++

  const name = CITY_NAMES[cityId - 1] || `City ${cityId}`

  return {
    id: cityId,

    name,

    x,
    y,

    owner,

    population: 1,

    health: 100,
    maxHealth: 100,
  }
}
