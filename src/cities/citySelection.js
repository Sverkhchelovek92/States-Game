import { hover } from '../input/hover.js'
import { world } from '../world.js'

export const citySelection = {
  city: null,
}

export function selectCityUnderCursor() {
  const city = world.cities.find(
    (city) => city.x === hover.tileX && city.y === hover.tileY,
  )

  citySelection.city = city || null
}

export function clearCitySelection() {
  citySelection.city = null
}
