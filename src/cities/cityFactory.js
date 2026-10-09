let nextCityId = 1

export function createCity(x, y, owner) {
  return {
    id: nextCityId++,

    name: `City ${nextCityId - 1}`,

    x,
    y,

    owner,

    population: 1,

    health: 100,
    maxHealth: 100,
  }
}
