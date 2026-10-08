import { world } from '../world.js'
import { WORLD_SETTINGS } from './worldSettings.js'

const PLAYER_ID = 1

export function isTileVisible(x, y) {
  if (!WORLD_SETTINGS.fogOfWar) {
    return true
  }

  for (const unit of world.units) {
    if (unit.owner !== PLAYER_ID) {
      continue
    }

    const distanceX = getWrappedDistanceX(unit.x, x, world.width)

    const distanceY = Math.abs(unit.y - y)

    const distance = Math.max(distanceX, distanceY)

    if (distance <= unit.vision) {
      return true
    }
  }

  return false
}

function getWrappedDistanceX(x1, x2, worldWidth) {
  const distance = Math.abs(x1 - x2)

  return Math.min(distance, worldWidth - distance)
}
